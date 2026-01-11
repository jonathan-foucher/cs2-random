import { BASE_PATH } from '@/constants'

export const useImages = () => {
  const getImagePath = (name: string, path: string, fileExtension: string): string => {
    const fileName: string = name.replace(' ', '_')
    return `${BASE_PATH}${path}${fileName}${fileExtension}`
  }

  return { getImagePath }
}
