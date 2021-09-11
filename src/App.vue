<template>
  <hand :hand="hand" :color-scheme="colorScheme" @handUpdated="updateHand" />
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
});
</script>
