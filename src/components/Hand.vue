<template>
  <div class="row justify-content-around my-3 mx-0">
    <CardPicker
      v-for="(value, index) in hand"
      :id="index"
      :key="index"
      :value="value"
      @select="updateHand(index, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import CardPicker from "./CardPicker.vue";

export interface Card {
  id: number;
  value: number;
}

defineProps<{
  hand: number[];
}>();

const emit = defineEmits<{
  handUpdated: [card: Card];
}>();

const updateHand = (id: number, value: number) => {
  emit("handUpdated", { id, value });
};
</script>
