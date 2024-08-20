import { Buffer } from 'node:buffer'
import process from 'node:process'
import type { PriceOption } from 'cms/sanity.types'
import { useSanity } from '#imports'
import type { ICart } from '~/components/business/product/ProductBook.vue'

const base = process.env.PAYPAL_BASE_URL!
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

async function queryPriceOptionById(id: string) {
  const sanity = useSanity()
  const priceOption = await sanity.fetch(
    `*[_type == "priceOption" && _id == "${id}"][0] {
      ...
    }`,
  )
  return priceOption
}

async function createOrder(cart: ICart) {
  const priceInfo = cart.priceInfo
  if (!priceInfo?.length) {
    throw new Error('MISSING_CART_DATA')
  }
  const accessToken = await generateAccessToken()
  const url = `${base}/v2/checkout/orders`
  let amount = 0
  for (const price of priceInfo) {
    try {
      if (!price?.priceOptionId || !price?.quantity) {
        break
      }
      const priceOption = await queryPriceOptionById(price.priceOptionId)
      amount = priceOption.price * price.quantity
    }
    catch (e: any) {
      console.error(e)
      throw new Error(e)
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
