<template>
  <div class="mb-3">
    <div class="text-center">
      <h1 class="fw-light">
        {{ hasSolutions ? "Solutions found!" : "No solutions" }}
      </h1>
      <button
        class="btn btn-primary mx-1"
        :disabled="!hasSolutions"
        @click="toggleSolutions"
      >
        {{ showSolutions ? "Hide" : "Show" }} solutions
      </button>
      <button class="btn btn-secondary mx-1" @click="$emit('redraw')">
        Draw again
      </button>
    </div>
    <div v-if="showSolutions" class="row my-3">
      <math
        v-for="(solution, index) in solutions"
        :key="index"
        class="text-center col-12 col-sm-4 col-md-3 col-lg-2"
      >
        <MathExpression :expression="solution" />
        <!-- {{ solution }} -->
      </math>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import MathExpression from "./MathExpression.vue";
import type { Expression } from "../solver";

const props = defineProps<{
  solutions: Expression[];
}>();

defineEmits<{
  redraw: [];
}>();

const hasSolutions = computed(() => props.solutions.length !== 0);

// Hide solutions until the button is clicked.
const showSolutions = ref(false);
const toggleSolutions = () => (showSolutions.value = !showSolutions.value);

// Re-hide solutions if the cards change.
watch(
  () => props.solutions,
  () => (showSolutions.value = false)
);
</script>

<style lang="scss" scoped>
pre {
  // prettier insists for the solution to be on a newline,
  // which adds unnecessary whitespace that white-space: pre preserves,
  // so we need to explicitly ignore the extra padding :/.
  white-space: normal;
}
</style>
