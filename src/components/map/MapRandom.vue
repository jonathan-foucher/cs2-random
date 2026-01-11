<script setup lang="ts">
import { ref } from 'vue'
import { useMaps } from '@/composables/maps'
import { useImages } from '@/composables/images'
import { useRandomize } from '@/composables/randomize'
import { MAPS_PATH, PNG_FILE_EXTENSION } from '@/constants'

const { getMaps } = useMaps()
const maps = getMaps()

const { getImagePath } = useImages()

const getRandomSlideNumber = (): number => Math.floor(Math.random() * maps.length)

const slideNumber = ref<number>(getRandomSlideNumber())
const speed = ref<number>(0)

const { launchRandomize } = useRandomize()
const startRandomize = () => {
  launchRandomize(speed)
}

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
    transition-next="slide-down"
    :autoplay="speed"
  >
    <q-carousel-slide
      v-for="(map, index) in maps"
      :key="index"
      :name="index"
      class="column no-wrap justify-center q-pa-none"
    >
      <div class="row items-center no-wrap full-height">
        <q-img :src="getImagePath(map, MAPS_PATH, PNG_FILE_EXTENSION)" class="full-height" />
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
