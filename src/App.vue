<script setup lang="ts">
import PlayerCard from '@/components/PlayerCard.vue'
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="column main-page">
        <div class="row justify-around">
          <q-btn color="amber-10" size="lg" icon-right="refresh" class="q-ma-xl">Launch</q-btn>
        </div>
        <div class="row justify-around items-center">
          <PlayerCard v-for="index in 5" :key="index" :player-name="`Player ${index}`" />
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
