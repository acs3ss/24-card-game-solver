<template>
  <div class="col-auto card-responsive">
    <div class="card-select">
      <label :for="`card${id}`" class="form-label">Card {{ id + 1 }}</label>
      <select
        :id="`card${id}`"
        v-model="selected"
        :name="`card${id}`"
        class="form-select"
        required
      >
        <option v-for="card in cards" :key="card.value" :value="card.value">
          {{ card.text }}
        </option>
      </select>
    </div>
    <img
      class="img-fluid py-3"
      :src="image.src"
      :alt="image.alt"
      :title="image.title"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";

interface Image {
  src: string;
  alt: string;
  title: string;
}

const cards = reactive([
  { text: "Ace", value: 1 },
  { text: "2", value: 2 },
  { text: "3", value: 3 },
  { text: "4", value: 4 },
  { text: "5", value: 5 },
  { text: "6", value: 6 },
  { text: "7", value: 7 },
  { text: "8", value: 8 },
  { text: "9", value: 9 },
  { text: "10", value: 10 },
  { text: "Jack", value: 11 },
  { text: "Queen", value: 12 },
  { text: "King", value: 13 },
]);

const faces = ["Clubs", "Diamonds", "Hearts", "Spades"];

const props = defineProps<{
  id: number;
  value: number;
  colorScheme: string;
}>();
const selected = ref(props.value);

// Can't be computed because it's the target of a v-model.
watchEffect(() => (selected.value = props.value));

const emit = defineEmits<{
  (event: "select", selected: number): void;
}>();

const image = computed((): Image => {
  const face = faces[Math.floor(Math.random() * 4)];
  return {
    // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
    src: new URL(
      `../images/${props.colorScheme}/${selected.value}${face[0]}.svg`,
      import.meta.url
    ).href,
    alt: `${cards[selected.value - 1].text} of ${face}`,
    title: `${cards[selected.value - 1].text} of ${face}`,
  };
});

watchEffect(() => emit("select", selected.value));
</script>

<style lang="scss" scoped>
// Scale down the cards to at most 50% of the screen width
// when height > width, and 25% when width > height.
// This helps ensure that cards can be visible on the screen
// without (too much) scrolling.
.card-responsive {
  max-width: 50vw;
  @media (orientation: landscape) {
    max-width: 25vw;
  }
}

// Taken directly from the SVGs to reduce content shifts when loading
img {
  width: 2.5in;
  height: 3.5in;
}
</style>
