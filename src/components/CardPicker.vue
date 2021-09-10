<template>
  <div class="col-auto card-responsive">
    <div class="card-select">
      <label :for="`card${id}`" class="form-label">Card {{ id }}</label>
      <select
        :name="`card${id}`"
        :id="`card${id}`"
        v-model="selected"
        class="form-select"
        required
      >
        <option v-for="card in cards" :value="card.value" :key="card.value">
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

<script lang="ts">
import { defineComponent } from "vue";

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
  props: {
    id: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    colorScheme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cards,
      selected: this.value,
      image: this.getImage(this.value),
    };
  },
  watch: {
    selected(newValue) {
      this.image = this.getImage(newValue);
      this.$emit("select", newValue);
    },
    value(newValue) {
      this.selected = newValue;
    },
    colorScheme() {
      this.image = this.getImage(this.value);
    },
  },
  methods: {
    // TODO: Can this be computed instead?
    getImage(value: number): Image {
      const face = faces[Math.floor(Math.random() * 4)];
      return {
        src: `images/${this.colorScheme}/${value}${face[0]}.svg`,
        alt: `${cards[value - 1].text} of ${face}`,
        title: `${cards[value - 1].text} of ${face}`,
      };
    },
  },
  emits: {
    select(selected: number) {
      return selected >= 1 && selected <= 13;
    },
  },
});
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
</style>
