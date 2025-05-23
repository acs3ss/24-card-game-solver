<template>
  <div class="col-auto card-responsive">
    <div class="card-select">
      <label :for="`card${id}`" class="form-label">Card {{ id + 1 }}</label>
      <select
        :id="`card${id}`"
        v-model="selected"
        :name="`card${id}`"
        class="form-select"
        required
      >
        <option v-for="(rank, index) in ranks" :key="index" :value="index + 1">
          {{ rank[0].toUpperCase() + rank.slice(1) }}
        </option>
      </select>
    </div>
    <Card :id :rank="selected" :suit="getRandomSuit()" class="my-3" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

const ranks = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
] as const;

const suits = ["clubs", "diamonds", "hearts", "spades"] as const;

const props = defineProps<{
  id: number;
  value: number;
}>();

const emit = defineEmits<{
  select: [selected: number];
}>();

// Use selected as a "proxy" since props.value is readonly
const selected = computed({
  get: () => props.value,
  set: (newValue) => {
    emit("select", newValue);
  },
});

const getRandomSuit = () => suits[Math.floor(Math.random() * suits.length)];
</script>

<style lang="scss" scoped>
// Scale down the cards to at most 50% of the screen width when height > width,
// and 25% at >= 972px (skip 3 cards on one row and go straight to all 4).
// This allows us to still blow up the cards if zoom is requested,
// because higher zooms mean less width and the queries won't trigger.
.card-responsive {
  @media (orientation: portrait) {
    max-width: 50vw;
  }

  @media (min-width: 972px) {
    max-width: 25vw;
  }
}
</style>
