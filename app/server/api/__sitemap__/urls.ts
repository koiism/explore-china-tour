async function getSlugs(contentName: string) {
  const sanity = useSanity()
  const SLUG_QUERY = groq`*[defined(slug.current)]{
    _type == "${contentName}" &&  
    (language == 'en' || language == null) => {
      "slug": "/${contentName}/" + slug.current
    },
  }.slug`
  const slugs = await sanity.fetch<string[]>(SLUG_QUERY)
  const urls = slugs.filter(Boolean).map((slug: string) => ({
    loc: slug,
    // will be transformed into /en/about-us and /fr/about-us
    _i18nTransform: true,
  }))
  return urls
}

export default defineSitemapEventHandler(async () => {
  const sitemap: string[] = []
  const contents = ['post', 'product']
  for (const content of contents) {
    const urls = await getSlugs(content)
    sitemap.push(...urls)
  }
  return sitemap
})
