<script setup lang="ts">
import { ref } from 'vue'
import PlayerCard from '@/components/PlayerCard.vue'
import MapCard from './components/MapCard.vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePlayerStore } from '@/stores/player'
import LanguageSelection from './components/LanguageSelection.vue'

const { t } = useI18n()

const playerCards = ref<Array<typeof PlayerCard>>()
const mapCard = ref<typeof MapCard>()

const playerStore = usePlayerStore()
const { PLAYER_IDS } = playerStore
const { numberOfPlayers } = storeToRefs(playerStore)

const startRandomize = (): void => {
  for (const playerCard of playerCards.value ?? []) {
    playerCard.startRandomize()
  }
  mapCard.value?.startRandomize()
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="column main-page">
        <div class="row justify-center items-center q-my-lg">
          <q-btn color="amber-10" size="lg" icon-right="refresh" class="column" @click="startRandomize">
            {{ t('global.launch') }}
          </q-btn>
          <q-select
            filled
            v-model="numberOfPlayers"
            :options="PLAYER_IDS"
            :prefix="`${t('global.number-of-players')}:`"
            bg-color="grey-5"
            class="column q-mx-md"
          />
          <LanguageSelection class="absolute-top-right q-ma-md" />
        </div>

        <div class="row justify-center items-center player-card">
          <PlayerCard v-for="playerId in numberOfPlayers" :key="playerId" ref="playerCards" :player-id="playerId" />
        </div>
        <div class="row justify-center items-center q-mt-lg">
          <MapCard ref="mapCard" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.main-page {
  background: #2d2d2d;
}

.player-card {
  gap: 2%;
}
</style>
