<template>
  <div class="row justify-content-around">
    <card-picker
      v-for="id in [1, 2, 3, 4]"
      :id="id"
      :key="id"
      @select="updateCard(id - 1, $event)"
    />
  </div>
  <button
    type="submit"
    name="solve"
    class="btn btn-primary"
    @click="$emit('solve', this.values)"
  >
    Solve
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardPicker from "./CardPicker.vue";
export default defineComponent({
  components: {
    CardPicker,
  },
  data() {
    return {
      values: [0, 0, 0, 0],
    };
  },
  emits: {
    solve(values: number[]) {
      return (
        values.length === 4 &&
        values.every((value) => value >= 1 && value <= 13)
      );
    },
  },
  methods: {
    updateCard(card: number, value: number) {
      this.values[card] = value;
    },
  },
});
</script>
