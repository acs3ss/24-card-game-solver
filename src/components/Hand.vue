<template>
  <div class="row justify-content-around my-3">
    <card-picker
      v-for="id in [1, 2, 3, 4]"
      :id="id"
      :key="id"
      :value="hand[id - 1]"
      :colorScheme="colorScheme"
      @select="updateHand(id - 1, $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardPicker from "./CardPicker.vue";

export interface Card {
  id: number;
  value: number;
}

export default defineComponent({
  components: {
    CardPicker,
  },
  props: {
    hand: {
      type: Array,
      required: true,
    },
    colorScheme: {
      type: String,
      required: true,
    },
  },
  emits: {
    handUpdated({ id, value }: Card) {
      return id >= 0 && id < 4 && value >= 1 && value <= 13;
    },
  },
  methods: {
    updateHand(id: number, value: number) {
      this.$emit("handUpdated", { id, value });
    },
  },
});
</script>
