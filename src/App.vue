<template>
  <hand @handUpdated="updateHand" :hand="hand" />
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
    return {
      hand,
      solutions: this.solve(hand),
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
});
</script>
