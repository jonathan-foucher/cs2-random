<script setup lang="ts">
import WeaponRandom from '@/components/WeaponRandom.vue'
import { useWeapons } from '@/composables/weapons'

defineProps<{ playerName: string }>()

const { getPistolGroups, getMainWeaponGroups } = useWeapons()
</script>

<template>
  <q-card class="player-card">
    <q-card-section class="name-section q-pb-sm text-center">
      {{ playerName }}
    </q-card-section>

    <q-card-section class="weapon-section q-py-sm">
      <WeaponRandom :weapon-groups="getPistolGroups()" />
    </q-card-section>

    <q-card-section class="weapon-section q-pt-sm">
      <WeaponRandom :weapon-groups="getMainWeaponGroups()" />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.player-card {
  width: 100%;
  max-width: 18%;
  height: 100%;
  max-height: 800px;
  background: #a5a5a5;
}
</style>
