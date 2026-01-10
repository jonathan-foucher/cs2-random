<script setup lang="ts">
import { ref } from 'vue'
import WeaponRandom from '@/components/WeaponRandom.vue'
import { useWeapons } from '@/composables/weapons'
import { usePlayerStore } from '@/stores/player'

const props = defineProps<{ playerId: number }>()

const { getPistolGroups, getMainWeaponGroups } = useWeapons()

const playerStore = usePlayerStore()
const { getPlayerName, editPlayerName } = playerStore

const playerName = ref<string>(getPlayerName(props.playerId))

const pistolRandom = ref<WeaponRandom>()
const mainWeaponRandom = ref<WeaponRandom>()

const savePlayerName = (value: string): void => {
  editPlayerName(props.playerId, value)
}

const startRandomize = () => {
  pistolRandom.value.startRandomize()
  mainWeaponRandom.value.startRandomize()
}

defineExpose({
  startRandomize,
})
</script>

<template>
  <q-card class="player-card">
    <q-card-section class="q-pb-sm text-center text-bold text-h6 ellipsis">
      {{ playerName }}
    </q-card-section>

    <q-btn flat round size="sm" icon="edit" class="absolute-top-right q-pa-sm">
      <q-popup-edit v-model="playerName" v-slot="playerNameInput" @save="savePlayerName">
        <q-input
          v-model="playerNameInput.value"
          dense
          autofocus
          @keyup.enter="playerNameInput.set"
          @keyup.esc="playerNameInput.cancel"
        />
      </q-popup-edit>
    </q-btn>

    <q-card-section class="q-py-sm">
      <WeaponRandom ref="pistolRandom" :weapon-groups="getPistolGroups()" />
    </q-card-section>

    <q-card-section class="q-pt-sm">
      <WeaponRandom ref="mainWeaponRandom" :weapon-groups="getMainWeaponGroups()" />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.player-card {
  width: 100%;
  max-width: 18%;
  background: #a5a5a5;
}
</style>
