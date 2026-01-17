import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type Player from '@/types/Player'
import { useI18n } from 'vue-i18n'

export const usePlayerStore = defineStore('player', () => {
  const LOCAL_STORAGE_PLAYERS = 'players'
  const LOCAL_STORAGE_NUMBER_OF_PLAYERS = 'numberOfPlayers'
  const players = ref<Array<Player>>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_PLAYERS) ?? '[]'))

  const numberOfPlayers = ref<number>(parseInt(localStorage.getItem(LOCAL_STORAGE_NUMBER_OF_PLAYERS) ?? '1'))
  const PLAYER_IDS = [...Array(5).keys()].map((i) => i + 1)

  const savePlayers = () => {
    localStorage.setItem(LOCAL_STORAGE_PLAYERS, JSON.stringify(players.value))
  }

  const { t } = useI18n()

  const getPlayerById = (id: number): Player | undefined => players.value.find((player: Player) => player.id === id)

  const getPlayerName = (id: number): string => getPlayerById(id)?.name ?? `${t('global.player')} ${id}`

  const editPlayerName = (id: number, name: string): void => {
    const foundPlayer = getPlayerById(id)
    if (foundPlayer) {
      foundPlayer.name = name
    } else {
      const newPlayer = {} as Player
      newPlayer.id = id
      newPlayer.name = name
      players.value.push(newPlayer)
    }

    savePlayers()
  }

  const deletePlayer = (id: number): void => {
    players.value = players.value.filter((player: Player) => player.id !== id)

    for (const player of players.value) {
      if (player.id > id) {
        player.id--
      }
    }

    numberOfPlayers.value--
    savePlayers()
  }

  watch(numberOfPlayers, (newValue: number) => {
    localStorage.setItem(LOCAL_STORAGE_NUMBER_OF_PLAYERS, String(newValue))
  })

  return {
    numberOfPlayers,
    PLAYER_IDS,
    getPlayerName,
    editPlayerName,
    deletePlayer,
  }
})
