import type MapType from '@/types/MapType'
import weaponsData from '@/assets/json/maps.json'

export const useMaps = () => {
  const data: Array<MapType> = weaponsData

  const getMaps = (): Array<string> => data.flatMap((d: MapType) => d.maps)

  return { getMaps }
}
