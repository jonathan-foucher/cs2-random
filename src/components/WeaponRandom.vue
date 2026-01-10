<script setup lang="ts">
import { ref } from 'vue'
import { useWeapons } from '@/composables/weapons'

const MAX_SPEED: number = 50
const MIN_SPEED: number = 1000

const props = defineProps<{ weaponGroups: Array<Array<string>> }>()
const { getWeaponImagePath } = useWeapons()

const getRandomSlideNumber = (): number => Math.floor(Math.random() * props.weaponGroups.length)

const slideNumber = ref<number>(getRandomSlideNumber())
const speed = ref<number | boolean>(false)
const timer = ref<ReturnType<typeof setTimeout>>()

const randomize = () => {
  if (speed.value > MIN_SPEED) {
    speed.value = false
    return
  }
  speed.value += 10
  timer.value = setTimeout(() => randomize(), 200)
}

const startRandomize = () => {
  clearTimeout(timer.value)
  speed.value = MAX_SPEED
  randomize()
}

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-carousel
    v-model="slideNumber"
    class="weapon-carousel rounded-borders"
    animated
    infinite
    transition-next="slide-down"
    :autoplay="speed"
  >
    <q-carousel-slide
      v-for="(weaponGroup, index) in weaponGroups"
      :key="index"
      :name="index"
      class="column no-wrap justify-center"
    >
      <div class="row items-center no-wrap">
        <q-img v-for="weapon in weaponGroup" :key="weapon" :src="getWeaponImagePath(weapon)" />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>
.weapon-carousel {
  background: linear-gradient(to right, #1e4b73, 60%, #cc9900);
  max-height: 30vh;
  border-style: solid;
  border-width: 4px;
}
</style>
