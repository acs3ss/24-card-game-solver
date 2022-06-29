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
      <pre
        v-for="(solution, index) in solutions"
        :key="index"
        class="text-center col-12 col-sm-4 col-md-3 col-lg-2"
      >
        {{ solution }}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
export default defineComponent({
  props: {
    solutions: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  emits: {
    redraw: null,
  },
  data() {
    return {
      showSolutions: false,
    };
  },
  computed: {
    hasSolutions() {
      return this.solutions.length !== 0;
    },
  },
  watch: {
    solutions() {
      this.showSolutions = false;
    },
  },
  methods: {
    toggleSolutions() {
      this.showSolutions = !this.showSolutions;
    },
  },
});
</script>

<style lang="scss" scoped>
pre {
  // prettier insists for the solution to be on a newline,
  // which adds unnecessary whitespace that white-space: pre preserves,
  // so we need to explicitly ignore the extra padding :/.
  white-space: normal;
}
</style>
