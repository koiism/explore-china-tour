import type { PriceOption } from 'cms/sanity.types'

export type TTicketOptions = {
  priceOptions: Partial<PriceOption>[]
}[]
export function getMinimumPriceFromTicketOptions(ticketOptions?: TTicketOptions) {
  if (!ticketOptions) {
    return 0
  }

  return Math.min(...ticketOptions.map((option) => {
    const price = Math.min(...option.priceOptions.map(priceOption => priceOption.price!))
    return price
  }))
}
