<script setup lang="ts">
import { ref } from 'vue'
import { useWeapons } from '@/composables/weapons'

const props = defineProps<{ weaponGroups: Array<Array<string>> }>()
const { getWeaponImagePath } = useWeapons()
const initialSlide: number = Math.floor(Math.random() * props.weaponGroups.length)

const slideNumber = ref<number>(initialSlide)
let speed: number = 2000
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
  max-height: 200px;
  border-style: solid;
  border-width: 4px;
}
</style>
