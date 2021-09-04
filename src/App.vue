<template>
  <card-form @solve="solve" />
  <solutions v-if="solutionsRequested" :solutions="solutions" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardForm from "./components/CardForm.vue";
import Solutions from "./components/Solutions.vue";
import { Solver } from "./solver";

export default defineComponent({
  components: {
    CardForm,
    Solutions,
  },
  data() {
    return {
      solutions: [] as string[],
      solutionsRequested: false,
    };
  },
  methods: {
    solve(hand: number[]) {
      this.solutions = Solver.print(Solver.solve(hand));
      this.solutionsRequested = true;
    },
  },
});
</script>
