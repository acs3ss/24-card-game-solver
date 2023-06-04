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
        <option v-for="(rank, index) in ranks" :key="index" :value="index">
          {{ rank[0].toUpperCase() + rank.slice(1) }}
        </option>
      </select>
    </div>
    <Card :id="id" :rank="selected + 1" :suit="getRandomSuit()" class="my-3" />
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
  set: (newValue) => emit("select", newValue),
});

const getRandomSuit = () => suits[Math.floor(Math.random() * suits.length)];
</script>

<style lang="scss" scoped>
// Scale down the cards to at most 50% of the screen width
// when height > width, and 25% when width > height.
// This helps ensure that cards can be visible on the screen
// without (too much) scrolling.
.card-responsive {
  max-width: 50vw;
  @media (orientation: landscape) {
    max-width: 25vw;
  }
}
</style>
