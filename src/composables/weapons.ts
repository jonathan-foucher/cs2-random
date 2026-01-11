import type WeaponType from '@/types/WeaponType'
import weaponsData from '@/assets/json/weapons.json'
import { PISTOL_TYPE } from '@/constants'

export const useWeapons = () => {
  const data: Array<WeaponType> = weaponsData

  const getPistolGroups = (): Array<Array<string>> => data.find((d: WeaponType) => d.type === PISTOL_TYPE)?.groups ?? []

  const getMainWeaponGroups = (): Array<Array<string>> =>
    data.filter((d: WeaponType) => d.type !== PISTOL_TYPE)?.flatMap((d: WeaponType) => d.groups)

  return { getPistolGroups, getMainWeaponGroups }
}
