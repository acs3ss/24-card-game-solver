<template>
  <div class="row my-3">
    <span v-if="solutions.length === 0">No solutions</span>
    <pre
      v-else
      v-for="(solution, index) in solutions"
      :key="index"
      class="text-center col-12 col-sm-4 col-md-3 col-lg-2"
    >
      {{ solution }}
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    solutions: Array,
  },
});
</script>
