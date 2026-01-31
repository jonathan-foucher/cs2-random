import type { Ref } from 'vue'

export const useUtils = () => {
  const preloadSlides = (
    slideNumber: Ref<number>,
    isPreloading: Ref<boolean>,
    slidesLength: number,
    limit: number = slidesLength
  ) => {
    isPreloading.value = true
    if (limit < 0) {
      isPreloading.value = false
      return
    }
    slideNumber.value = (slideNumber.value + 1) % slidesLength
    setTimeout(() => {
      preloadSlides(slideNumber, isPreloading, slidesLength, limit - 1)
    }, 1)
  }

  return {
    preloadSlides,
  }
}
