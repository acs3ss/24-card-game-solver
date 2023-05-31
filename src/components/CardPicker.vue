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
        <option v-for="card in cards" :key="card.value" :value="card.value">
          {{ card.text }}
        </option>
      </select>
    </div>
    <Card :id="id" :rank="rank" :suit="getRandomSuit()" class="my-3" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

const cards = [
  { text: "Ace", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
  { text: "9", value: 9 },
  { text: "10", value: 10 },
  { text: "Jack", value: 11 },
  { text: "Queen", value: 12 },
  { text: "King", value: 13 },
] as const;

const faces = ["clubs", "diamonds", "hearts", "spades"] as const;

const props = defineProps<{
  id: number;
  value: number;
  colorScheme: string;
}>();

const emit = defineEmits<{
  select: [selected: number];
}>();

// Use selected as a "proxy" since props.value is readonly
const selected = computed({
  get: () => props.value,
  set: (newValue) => emit("select", newValue),
});

const rank = computed(
  () =>
    cards[selected.value - 1].text.toLowerCase() as Lowercase<
      (typeof cards)[number]["text"]
    >
);

const getRandomSuit = () => faces[Math.floor(Math.random() * faces.length)];
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
