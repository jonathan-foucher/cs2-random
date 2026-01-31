<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import PlayerCard from '@/components/player/PlayerCard.vue'
import MapCard from '@/components/map/MapCard.vue'
import LanguageSelection from '@/components/common/LanguageSelection.vue'
import { usePlayerStore } from '@/stores/player'
import { useMapStore } from '@/stores/map'

const { t } = useI18n()

const playerCards = ref<Array<typeof PlayerCard>>()
const mapCard = ref<typeof MapCard>()
const showCards = ref<boolean>(false)

const playerStore = usePlayerStore()
const { PLAYER_IDS } = playerStore
const { numberOfPlayers } = storeToRefs(playerStore)

const mapStore = useMapStore()
const { enableRandomMap } = mapStore
const { isRandomMapEnabled } = storeToRefs(mapStore)

const startRandomize = (): void => {
  for (const playerCard of playerCards.value ?? []) {
    playerCard.startRandomize()
  }
  mapCard.value?.startRandomize()
}

setTimeout(() => {
  showCards.value = true
}, 200)
</script>

<template>
  <q-layout class="disable-select">
    <q-page-container>
      <q-page class="column main-page">
        <div class="row justify-center items-center q-my-lg">
          <q-btn
            color="amber-10"
            size="lg"
            icon-right="refresh"
            class="column"
            :label="t('global.launch')"
            @click="startRandomize"
          />

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

        <div v-show="showCards" class="row justify-center items-center player-card">
          <PlayerCard
            v-for="playerId in 5"
            v-show="playerId <= numberOfPlayers"
            :key="playerId"
            ref="playerCards"
            :player-id="playerId"
          />
        </div>

        <div v-show="showCards" class="row justify-center items-center q-mt-lg">
          <div v-show="isRandomMapEnabled" class="column full-width items-center">
            <MapCard ref="mapCard" />
          </div>
          <q-btn
            v-show="!isRandomMapEnabled"
            color="green"
            size="lg"
            icon-right="map"
            class="column"
            @click="enableRandomMap"
          />
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

.disable-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
