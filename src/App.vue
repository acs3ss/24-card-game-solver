<template>
  <hand :hand="hand" :color-scheme="colorScheme" @hand-updated="updateHand" />
  <solutions :solutions="solutions" @redraw="redraw" />
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
  <reload-prompt />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from "vue";
import ReloadPrompt from "./ReloadPrompt.vue";
import Hand, { type Card } from "./components/Hand.vue";
import Solutions from "./components/Solutions.vue";
import { Solver } from "./solver";

// Query for dark, so that if prefers-color-scheme isn't supported
// we fall back to light
const colorScheme = ref(
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
);
onMounted(() =>
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      colorScheme.value = event.matches ? "dark" : "light";
    })
);

const getRandomValue = () => 1 + Math.floor(Math.random() * 13);

const generateHand = () => {
  return [
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
    getRandomValue(),
  ];
};
const solve = (hand: number[]) => Solver.print(Solver.solve(hand));

let hand = reactive(generateHand());
let solutions = reactive(solve(hand));
watchEffect(() => (solutions = solve(hand)));

const updateHand = ({ id, value }: Card) => (hand[id] = value);

const redraw = () => (hand = generateHand());
</script>
