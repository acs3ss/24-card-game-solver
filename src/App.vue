<template>
  <main>
    <Hand :hand @hand-updated="updateHand" />
    <Solutions :solutions @redraw="redraw" />
  </main>
  <footer class="text-center mt-auto mb-3">
    <small>
      By
      <a href="https://www.linkedin.com/in/austin-sullivan">Austin Sullivan</a>
      and
      <a href="https://www.linkedin.com/in/winston-liu">Winston Liu</a>
      on
      <a href="https://www.github.com/acs3ss/24-card-game-solver">GitHub</a>
    </small>
  </footer>
  <ReloadPrompt />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ReloadPrompt from "./ReloadPrompt.vue";
import Hand, { type Card } from "./components/Hand.vue";
import Solutions from "./components/Solutions.vue";
import { solve } from "./solver";

const getRandomValue = () => 1 + Math.floor(Math.random() * 13);

const generateHand = () => {
  return [
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
  ];
};

// Arrays must use ref because we're replacing them
const hand = ref(generateHand());
// const solutions = computed(() => print(solve(hand.value)));
const solutions = computed(() => solve(hand.value));

const updateHand = ({ id, value }: Card) => (hand.value[id] = value);

const redraw = () => (hand.value = generateHand());
</script>
