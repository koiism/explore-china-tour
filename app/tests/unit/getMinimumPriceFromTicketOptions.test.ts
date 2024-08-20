import { describe, expect, it } from 'vitest'
import { getMinimumPriceFromTicketOptions } from '~/utils/getMinimumPriceFromTicketOptions'

describe('getMinimumPriceFromTicketOptions', () => {
  it('should return the minimum price', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 10 },
          { price: 5 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(5)
  })

  it('should return the minimum price without zero', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 10 },
          { price: 5 },
          { price: 0 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(5)
  })

  it('should handle empty ticketOptions', () => {
    const ticketOptions: TTicketOptions = []

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(Infinity)
  })

  it('should handle no priceOptions', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(Infinity)
  })

  it('should not return negative prices', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: -10 },
          { price: -5 },
          { price: 0 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(Infinity)
  })

  it('should handle large prices', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 1000 },
          { price: 500 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(500)
  })

  it('should handle decimal prices', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 3.14 },
          { price: 2.71 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(2.71)
  })

  it('should handle mixed prices', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 10 },
          { price: -5 },
          { price: 0 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(10)
  })

  it('should handle different priceOptions lengths', () => {
    const ticketOptions: TTicketOptions = [
      {
        priceOptions: [
          { price: 10 },
          { price: 5 },
        ],
      },
      {
        priceOptions: [
          { price: 20 },
        ],
      },
    ]

    const minPrice = getMinimumPriceFromTicketOptions(ticketOptions)

    expect(minPrice).toEqual(5)
  })
})
