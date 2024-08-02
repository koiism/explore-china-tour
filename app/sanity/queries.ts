import type { Category, City, Post, PriceOption, Product } from 'cms/sanity.types'
import { generateQueryByProperty, generateQueryListGenerator } from './queryUtils'

export const useQueryPostList = generateQueryListGenerator<Post>({
  module: 'post',
})

export const queryPostBySlug = generateQueryByProperty<Post>({
  module: 'post',
  propertyName: 'slug',
  propertyPath: 'slug.current',
})

export const queryPriceOptionById = generateQueryByProperty<PriceOption>({
  module: 'priceOption',
  propertyName: '_id',
})

type SafeType<T> = T extends undefined ? never : T
export type TTicketOption = Omit<SafeType<Product['ticketOptions']> extends Array<infer T> ? T : never, 'priceOptions'> & {
  priceOptions: PriceOption[]
}
export type TProduct = Omit<Product, 'category' | 'city' | 'image' | 'ticketOptions'> & {
  category: Category
  city: City
  image: { url: string, alt: string }[]
  ticketOptions: TTicketOption[]
}
export const queryProductBySlug = generateQueryByProperty<TProduct>({
  module: 'product',
  propertyName: 'slug',
  propertyPath: 'slug.current',
  getter: groq`{
    ...,
    "category": category->,
    "city": city->,
    "image": image[]{
      "url": asset->url,
      "alt": asset->altText,
    },
    "ticketOptions": ticketOptions[] {
      ...,
      "priceOptions": priceOptions[] ->
    }
  }`,
})
