import { Buffer } from 'node:buffer'
import process from 'node:process'
import type { ICart } from '~/components/business/product/ProductBook.vue'
import { queryPriceOptionById } from '~/sanity/queries'

const base = 'https://api-m.paypal.com'
const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET!
const paypalClientId = process.env.PAYPAL_CLIENT_ID!

async function generateAccessToken() {
  try {
    if (!paypalClientId || !paypalClientSecret) {
      throw new Error('MISSING_API_CREDENTIALS')
    }
    const auth = Buffer.from(
      `${paypalClientId}:${paypalClientSecret}`,
    ).toString('base64')
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const data = await response.json()
    return data.access_token
  }
  catch (error) {
    console.error('Failed to generate Access Token:', error)
  }
}

async function createOrder(cart: ICart) {
  const tickets = cart.tickets
  if (!tickets?.length) {
    throw new Error('MISSING_CART_DATA')
  }
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`
  let amount = 0
  for (const ticket of tickets) {
    try {
      if (!ticket?.priceOptionId || !ticket?.quantity) {
        break
      }
      const priceOption = await queryPriceOptionById(ticket.priceOptionId)
      amount = priceOption.price * ticket.quantity
    }
    catch (e: any) {
      console.error(e)
      throw new Error('create order failed')
    }
  }

  const payload = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount,
        },
      },
    ],
    payment_source: {
      paypal: {
        experience_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      },
    },
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return handleResponse(response)
}

async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json()
    return {
      id: jsonResponse.id as string,
    }
  }
  catch (error) {
    const errorMessage = await response.text()
    console.error(error)
    throw new Error(errorMessage)
  }
}

export default defineEventHandler(async (event) => {
  try {
    const { cart } = await readBody<{ cart: ICart, id: string }>(event)
    const { id } = await createOrder(cart)
    return {
      id,
    }
  }
  catch (error: any) {
    throw new Error(error)
  }
})
