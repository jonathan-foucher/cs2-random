<script setup lang="ts">
import { ref } from 'vue'
import PlayerCard from '@/components/PlayerCard.vue'
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '@/stores/player'

const playerCards = ref<PlayerCard>()

const playerStore = usePlayerStore()
const { PLAYER_IDS } = playerStore
const { numberOfPlayers } = storeToRefs(playerStore)

const startRandomize = (): void => {
  for (const playerCard of playerCards.value) {
    playerCard.startRandomize()
  }
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="column main-page">
        <div class="row justify-center items-center">
          <q-btn color="amber-10" size="lg" icon-right="refresh" class="column q-my-xl q-mx-lg" @click="startRandomize">
            Launch
          </q-btn>
          <q-select filled v-model="numberOfPlayers" :options="PLAYER_IDS" bg-color="grey-5" class="column" />
        </div>
        <div class="row justify-around items-center">
          <PlayerCard v-for="playerId in numberOfPlayers" :key="playerId" ref="playerCards" :player-id="playerId" />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.main-page {
  background: #2d2d2d;
}
</style>
