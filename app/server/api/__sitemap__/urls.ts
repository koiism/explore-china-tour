const SLUG_QUERY = groq`*[defined(slug.current)]{
  _type == "post" && language == "en" => {
    "slug": "/post/" + slug.current
  },
}.slug`

export default defineSitemapEventHandler(async () => {
  const sanity = useSanity()
  const slugs = await sanity.fetch<string[]>(SLUG_QUERY)
  const urls = slugs.filter(Boolean).map((slug: string) => ({
    loc: slug,
    // will be transformed into /en/about-us and /fr/about-us
    _i18nTransform: true,
  }))
  return urls
})
