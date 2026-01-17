import type { Ref } from 'vue'

export const useUtils = () => {
  const preloadSlides = (slideNumber: Ref<number>, slideLength: number) => {
    const initialSlide = slideNumber.value
    for (let index = 0; index < slideLength; index++) {
      setTimeout(() => {
        slideNumber.value = (initialSlide + index) % slideLength
      }, 1)
    }
  }

  return {
    preloadSlides,
  }
}
