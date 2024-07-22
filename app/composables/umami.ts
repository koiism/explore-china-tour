const UMAMI_KEY = Symbol('umami')

export function useUmami() {
  const uParamsExtended = inject(UMAMI_KEY, {})
  const uParams = ref({
    ...uParamsExtended,
  })
  const useUParams = (data: Record<string, any>) => {
    uParams.value = {
      ...uParams.value,
      ...data,
    }
    provide(UMAMI_KEY, uParams.value)
  }
  const trackView = () => {
    umTrackView()
  }
  const trackEvent = (name: string, data?: Record<string, any>) => {
    const trackParams = {
      ...uParams.value,
      ...data,
    }
    umTrackEvent(name, trackParams)
  }
  return {
    useUParams,
    trackView,
    trackEvent,
  }
}
