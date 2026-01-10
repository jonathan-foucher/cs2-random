import type WeaponType from '@/types/WeaponType'
import weaponsData from '@/assets/json/weapons.json'
import { BASE_PATH } from '@/constants'

export const useWeapons = () => {
  const pistolType: string = 'pistol'
  const data: Array<WeaponType> = weaponsData

  const getWeaponImagePath = (name: string): string => {
    const fileName: string = name.replace(' ', '_')
    return `${BASE_PATH}/images/weapons/${fileName}.webp`
  }

  const getPistolGroups = (): Array<Array<string>> => data.find((d: WeaponType) => d.type === pistolType)?.groups ?? []

  const getMainWeaponGroups = (): Array<Array<string>> =>
    data.filter((d: WeaponType) => d.type !== pistolType)?.flatMap((d: WeaponType) => d.groups)

  return { getWeaponImagePath, getPistolGroups, getMainWeaponGroups }
}
