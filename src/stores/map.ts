import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useMaps } from '@/composables/maps'

const LOCAL_STORAGE_SELECTED_MAPS: string = 'selected-maps'
const LOCAL_STORAGE_IS_RANDOM_MAP_ENABLED: string = 'is-random-map-enabled'
const DEFAULT_IS_RANDOM_MAP_ENABLED: boolean = true

export const useMapStore = defineStore('map', () => {
  const { getMaps } = useMaps()

  const getSelectedMapsFromLocalStorage = (): Array<string> => {
    const localStorageValue: string | null = localStorage.getItem(LOCAL_STORAGE_SELECTED_MAPS)
    return localStorageValue ? JSON.parse(localStorageValue) : getMaps()
  }

  const getIsRandomMapEnabledFromLocalStorage = (): boolean => {
    const localStorageValue: string | null = localStorage.getItem(LOCAL_STORAGE_IS_RANDOM_MAP_ENABLED)
    return localStorageValue ? JSON.parse(localStorageValue) : DEFAULT_IS_RANDOM_MAP_ENABLED
  }

  const selectedMaps = ref<Array<string>>(getSelectedMapsFromLocalStorage())
  const isRandomMapEnabled = ref<boolean>(getIsRandomMapEnabledFromLocalStorage())

  const setIsRandomMapEnabled = (newValue: boolean): void => {
    isRandomMapEnabled.value = newValue
    localStorage.setItem(LOCAL_STORAGE_IS_RANDOM_MAP_ENABLED, JSON.stringify(newValue))
  }

  const disableRandomMap = (): void => setIsRandomMapEnabled(false)

  const enableRandomMap = (): void => {
    if (selectedMaps.value.length === 0) {
      selectedMaps.value = getMaps()
    }
    setIsRandomMapEnabled(true)
  }

  watch(selectedMaps, (newValue: Array<string>) => {
    localStorage.setItem(LOCAL_STORAGE_SELECTED_MAPS, JSON.stringify(newValue))
  })

  return {
    selectedMaps,
    isRandomMapEnabled,
    disableRandomMap,
    enableRandomMap,
  }
})
