<template>
  <div class="col-auto mx-3">
    <div class="card-select">
      <label :for="`card${id}`" class="form-label">Card {{ id }}</label>
      <select
        :name="`card${id}`"
        v-model="selected"
        class="card-picker form-select"
        required
      >
        <option v-for="card in cards" :value="card.value" :key="card.value">
          {{ card.text }}
        </option>
      </select>
    </div>
    <div class="card-image p-3">
      <img :src="image.src" :alt="image.alt" :title="image.title" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

interface Image {
  src: string;
  alt: string;
  title: string;
}

const cards = [
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
];

const faces = ["Clubs", "Diamonds", "Hearts", "Spades"];

export default defineComponent({
  setup(props, { emit }) {
    const selected = ref(1 + Math.floor(Math.random() * 13));

    const updateImage = (): Image => {
      const face = faces[Math.floor(Math.random() * 4)];
      return {
        src: `images/light/${selected.value}${face[0]}.svg`,
        alt: `${cards[selected.value - 1].text} of ${face}`,
        title: `${cards[selected.value - 1].text} of ${face}`,
      };
    };

    const image = ref(updateImage());
    emit("select", selected.value);

    watch(selected, (newValue) => {
      emit("select", newValue);
      image.value = updateImage();
    });

    return {
      selected,
      image,
    };
  },
  props: {
    id: Number,
  },
  data() {
    return {
      cards,
    };
  },
  emits: {
    select(selected: number) {
      return selected >= 1 && selected <= 13;
    },
  },
});
</script>
