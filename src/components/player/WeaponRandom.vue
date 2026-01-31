<script setup lang="ts">
import { ref } from 'vue'
import { WEAPONS_PATH, WEBPB_FILE_EXTENSION } from '@/constants'
import { useImages } from '@/composables/images'
import { useRandomize } from '@/composables/randomize'
import { useUtils } from '@/composables/utils'

const props = defineProps<{ weaponGroups: Array<Array<string>> }>()
const { getImagePath } = useImages()

const getRandomSlideNumber = (): number => Math.floor(Math.random() * props.weaponGroups.length)

const slideNumber = ref<number>(getRandomSlideNumber())
const speed = ref<number>(0)
const isPreloading = ref<boolean>(true)

const { launchRandomize } = useRandomize()
const startRandomize = (): void => {
  slideNumber.value = getRandomSlideNumber()
  launchRandomize(speed)
}

const { preloadSlides } = useUtils()
preloadSlides(slideNumber, isPreloading, props.weaponGroups.length)

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-inner-loading :showing="isPreloading" class="carousel-loader" />
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
      v-for="(weaponGroup, index) in weaponGroups"
      :key="index"
      :name="index"
      loading="eager"
      class="column no-wrap justify-center q-pa-xs"
    >
      <div class="row items-center no-wrap weapon-images-row">
        <q-img
          v-show="!isPreloading"
          v-for="weapon in weaponGroup"
          :key="weapon"
          :src="getImagePath(weapon, WEAPONS_PATH, WEBPB_FILE_EXTENSION)"
          loading="eager"
          height="100%"
          fit="scale-down"
        />
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<style scoped>
.random-carousel {
  background: linear-gradient(to right, #1e4b73, 60%, #cc9900);
  max-height: 20vh;
  border-style: solid;
  border-width: 4px;
}

.weapon-images-row {
  height: 100%;
}

.carousel-loader {
  height: 20vh;
  background: transparent;
  z-index: 1;
}
</style>
