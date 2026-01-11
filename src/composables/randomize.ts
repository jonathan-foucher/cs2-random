import { ref } from 'vue'
import type { Ref } from 'vue'

export const useRandomize = () => {
  const MAX_SPEED: number = 50
  const MIN_SPEED: number = 1000

  const timer = ref<ReturnType<typeof setTimeout>>()

  const randomize = (speed: Ref<number>): void => {
    if (speed.value > MIN_SPEED) {
      speed.value = 0
      return
    }
    speed.value += 10
    timer.value = setTimeout(() => randomize(speed), 200)
  }

  const launchRandomize = (speed: Ref<number>): void => {
    clearTimeout(timer.value)
    speed.value = MAX_SPEED
    randomize(speed)
  }

  return { launchRandomize }
}
