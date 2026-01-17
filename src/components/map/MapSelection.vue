<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useMaps } from '@/composables/maps'
import { useMapStore } from '@/stores/map'

const { t } = useI18n()

const { getMaps } = useMaps()

const mapOptions = getMaps().map((map) => {
  return {
    label: map,
    value: map,
  }
})

const mapStore = useMapStore()
const { selectedMaps } = storeToRefs(mapStore)

const tempSelectedMaps = ref<Array<string>>(selectedMaps.value)

const saveSelectedMaps = (): void => {
  selectedMaps.value = tempSelectedMaps.value
}
</script>

<template>
  <q-card class="map-edition-card">
    <q-card-section>
      <q-option-group v-model="tempSelectedMaps" :options="mapOptions" color="green" type="checkbox" />
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
      <q-btn flat :label="t('action.cancel')" v-close-popup />
      <q-btn flat :label="t('action.save')" v-close-popup @click="saveSelectedMaps" />
    </q-card-actions>
  </q-card>
</template>

<style scoped>
.map-edition-card {
  min-width: 300px;
}
</style>
