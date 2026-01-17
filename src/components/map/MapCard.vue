<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import MapRandom from '@/components/map/MapRandom.vue'
import MapSelection from '@/components/map/MapSelection.vue'
import { useMapStore } from '@/stores/map'

const mapRandom = ref<typeof MapRandom>()
const showMapEdition = ref<boolean>(false)

const mapStore = useMapStore()
const { disableRandomMap } = mapStore

const { t } = useI18n()

const startRandomize = (): void => {
  mapRandom.value?.startRandomize()
}

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-card class="map-card">
    <q-card-section class="q-py-none text-center text-bold text-h6 ellipsis">
      {{ t('global.map') }}
    </q-card-section>

    <div class="absolute-top-right q-pa-xs">
      <q-btn flat round size="sm" icon="edit" @click="showMapEdition = true" />
      <q-btn flat round size="sm" icon="delete" @click="disableRandomMap" />
    </div>

    <q-card-section class="q-pt-xs q-pb-md">
      <MapRandom ref="mapRandom" />
    </q-card-section>
  </q-card>

  <q-dialog v-model="showMapEdition" persistent>
    <MapSelection />
  </q-dialog>
</template>

<style scoped>
.map-card {
  width: 100%;
  max-width: 25%;
  background: #a5a5a5;
}
</style>
