import type { Ref } from 'vue'

export const useUtils = () => {
  const preloadSlides = (slideNumber: Ref<number>, slidesLength: number, limit: number = slidesLength + 1) => {
    if (limit < 0) {
      return
    }
    slideNumber.value = (slideNumber.value + 1) % slidesLength
    setTimeout(() => {
      preloadSlides(slideNumber, slidesLength, limit - 1)
    }, 80)
  }

  return {
    preloadSlides,
  }
}
