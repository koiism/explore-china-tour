import type { Post } from 'cms/sanity.types'
import groq from 'groq'

export const POSTS_QUERY = groq`*[_type == "post" && language == $language && defined(slug.current)] | order(publishedAt desc)`
export async function queryPosts() {
  const i18n = useI18n()
  const sanity = useSanity()

  const res = await useAsyncData('posts', () => sanity.fetch<Post[]>(POSTS_QUERY, {
    language: i18n.locale.value,
  }))

  return res
}

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug && ( language == $language || language == 'en' )][0]`
export async function queryPostBySlug(slug: string) {
  const i18n = useI18n()
  const sanity = useSanity()

  const res = await useAsyncData('post', () => sanity.fetch<Post>(POST_QUERY, {
    language: i18n.locale.value,
    slug,
  }))

  return res
}
