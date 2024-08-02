export type PickFrom<T, K extends Array<string>> = T extends Array<any> ? T : T extends Record<string, any> ? keyof T extends K[number] ? T : K[number] extends never ? T : Pick<T, K[number]> : T
export type KeysOf<T> = Array<T extends T ? keyof T extends string ? keyof T : never : never>
interface IParamsQueryByProperty {
  module: string
  propertyName: string
  propertyPath?: string
  getter?: string
}
export function generateQueryByProperty<T>({
  module,
  propertyName,
  propertyPath = propertyName,
  getter = groq`{...}`,
}: IParamsQueryByProperty) {
  const queryString = groq`*[
    _type == "${module}" &&
    ${propertyPath} == $${propertyName} &&
    (language == $language || language == 'en' || language == null)
  ][0] ${getter}`
  async function query(property: string) {
    const i18n = useI18n()
    const sanity = useSanity()

    const res = await useAsyncData(module, () => sanity.fetch<T>(queryString, {
      language: i18n.locale.value,
      [propertyName]: property,
    }))

    return res
  }
  return query
}

interface IParamsQueryList {
  module: string
  orderby?: string
  getter?: string
}
export function generateQueryListGenerator<T extends Record<string, any>>({
  module,
  orderby = '_updatedAt',
  getter = groq`{...}`,
}: IParamsQueryList) {
  const queryString = groq`*[
    _type == "${module}" &&
    language == $language  && (
      ${orderby} > $orderbyValue
      || (${orderby} == $orderbyValue && _id > $lastId)
    )
  ] | order(${orderby}) [0...20] ${getter}`
  function useQueryList() {
    let lastId: string | null = ''
    let orderbyValue = ''
    const list = ref<T[]>([]) as Ref<T[]>
    async function next() {
      if (lastId === null) {
        return [] as T[]
      }
      const i18n = useI18n()
      const sanity = useSanity()

      const res = await useAsyncData(module, () => sanity.fetch<T[]>(queryString, {
        language: i18n.locale.value,
        lastId,
        orderbyValue,
      }))
      const data = res.data.value
      if (data) {
        if (data.length > 0) {
          orderbyValue = data[data.length - 1][orderby]
          lastId = data[data.length - 1]._id
          list.value.push(...data)
        }
        else {
          lastId = null // Reached the end
        }
      }
      return data
    }
    return {
      list,
      next,
    }
  }
  return useQueryList
}
