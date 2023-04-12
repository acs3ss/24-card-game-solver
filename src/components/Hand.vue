<template>
  <div class="row justify-content-around my-3">
    <CardPicker
      v-for="id in 4"
      :id="id"
      :key="id"
      :value="hand[id - 1]"
      :color-scheme="colorScheme"
      @select="updateHand(id - 1, $event)"
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
  colorScheme: string;
}>();

const emit = defineEmits<{
  (event: "handUpdated", { id, value }: Card): void;
}>();

const updateHand = (id: number, value: number) => {
  emit("handUpdated", { id, value });
};
</script>
