<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { MAPS_PATH, PNG_FILE_EXTENSION } from '@/constants'
import { useMapStore } from '@/stores/map'
import { useImages } from '@/composables/images'
import { useRandomize } from '@/composables/randomize'
import { useUtils } from '@/composables/utils'

const mapStore = useMapStore()
const { selectedMaps } = storeToRefs(mapStore)
const { disableRandomMap } = mapStore

const { getImagePath } = useImages()

const getRandomSlideNumber = (): number => Math.floor(Math.random() * selectedMaps.value.length)

const slideNumber = ref<number>(getRandomSlideNumber())
const speed = ref<number>(0)

const { launchRandomize } = useRandomize()
const startRandomize = (): void => {
  slideNumber.value = getRandomSlideNumber()
  launchRandomize(speed)
}

const { preloadSlides } = useUtils()
preloadSlides(slideNumber, selectedMaps.value.length)

watch(selectedMaps, (newValue: Array<string>) => {
  if (newValue?.length > 0) {
    slideNumber.value = getRandomSlideNumber()
    preloadSlides(slideNumber, selectedMaps.value.length)
  } else {
    disableRandomMap()
  }
})

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-carousel
    v-model="slideNumber"
    class="random-carousel rounded-borders"
    animated
    infinite
    keep-alive
    transition-next="slide-down"
    :autoplay="speed"
  >
    <q-carousel-slide
      v-for="(map, index) in selectedMaps"
      :key="index"
      :name="index"
      loading="eager"
      class="column no-wrap justify-center q-pa-none"
    >
      <div class="row items-center no-wrap full-height">
        <q-img :src="getImagePath(map, MAPS_PATH, PNG_FILE_EXTENSION)" loading="eager" height="100%" fit="fill" />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>
.random-carousel {
  background: linear-gradient(to right, #1e4b73, 60%, #cc9900);
  max-height: 25vh;
  border-style: solid;
  border-width: 4px;
}
</style>
