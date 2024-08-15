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
const productGetter = groq`{
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
}`
export interface TProductCard {
  _id: string
  category: Category
  city: City
  title: string
  image: { url: string, alt: string }
  slug: string
  ticketOptions: TTicketOption[]
}
const productCardGetter = groq`{
  "_id": _id,
  "category": category->,
  "city": city->,
  "title": title,
  "image": image[]{
    "url": asset->url,
    "alt": asset->altText,
  }[0],
  "slug": slug.current,
  "ticketOptions": ticketOptions[] {
    ...,
    "priceOptions": priceOptions[] ->
  }
}`
export const queryProductBySlug = generateQueryByProperty<TProduct>({
  module: 'product',
  propertyName: 'slug',
  propertyPath: 'slug.current',
  getter: productGetter,
})
export const queryProductById = generateQueryByProperty<TProduct>({
  module: 'product',
  propertyName: '_id',
  getter: productGetter,
})

export const useQueryProductList = generateQueryListGenerator<TProductCard>({
  module: 'product',
  getter: productCardGetter,
})
