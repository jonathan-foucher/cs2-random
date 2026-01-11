<script setup lang="ts">
import { ref } from 'vue'
import { useImages } from '@/composables/images'
import { useRandomize } from '@/composables/randomize'
import { WEAPONS_PATH, WEBPB_FILE_EXTENSION } from '@/constants'

const props = defineProps<{ weaponGroups: Array<Array<string>> }>()
const { getImagePath } = useImages()

const getRandomSlideNumber = (): number => Math.floor(Math.random() * props.weaponGroups.length)

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
      v-for="(weaponGroup, index) in weaponGroups"
      :key="index"
      :name="index"
      class="column no-wrap justify-center"
    >
      <div class="row items-center no-wrap">
        <q-img
          v-for="weapon in weaponGroup"
          :key="weapon"
          :src="getImagePath(weapon, WEAPONS_PATH, WEBPB_FILE_EXTENSION)"
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
</style>
