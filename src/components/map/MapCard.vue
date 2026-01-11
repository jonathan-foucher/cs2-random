<script setup lang="ts">
import { ref } from 'vue'
import MapRandom from '@/components/map/MapRandom.vue'

const mapRandom = ref<typeof MapRandom>()

const startRandomize = () => {
  mapRandom.value?.startRandomize()
}

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-card class="map-card">
    <q-card-section class="q-py-md">
      <MapRandom ref="mapRandom" />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.map-card {
  width: 100%;
  max-width: 25%;
  background: #a5a5a5;
}
</style>
