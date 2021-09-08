<template>
  <hand @handUpdated="updateHand" :hand="hand" :colorScheme="colorScheme" />
  <solutions @redraw="redraw" :solutions="solutions" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Hand, { Card } from "./components/Hand.vue";
import Solutions from "./components/Solutions.vue";
import { Solver } from "./solver";

export default defineComponent({
  components: {
    Hand,
    Solutions,
  },
  data() {
    const hand = this.generateHand();
    // Query for dark, so that if prefers-color-scheme isn't supported
    // we fall back to light
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return {
      hand,
      solutions: this.solve(hand),
      colorScheme,
    };
  },
  methods: {
    generateHand() {
      return [
        this.getRandomValue(),
        this.getRandomValue(),
        this.getRandomValue(),
        this.getRandomValue(),
      ];
    },
    solve(hand: number[]) {
      return Solver.print(Solver.solve(hand));
    },
    updateHand({ id, value }: Card) {
      this.hand[id] = value;
    },
    redraw() {
      this.hand = this.generateHand();
    },
    getRandomValue() {
      return 1 + Math.floor(Math.random() * 13);
    },
  },
  watch: {
    hand: {
      handler(newValue) {
        this.solutions = this.solve(newValue);
      },
      deep: true,
    },
  },
  mounted() {
    // Query for dark, so that if prefers-color-scheme isn't supported
    // we fall back to light
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        this.colorScheme = event.matches ? "dark" : "light";
      });
  },
});
</script>
