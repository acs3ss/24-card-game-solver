<template>
  <div class="row justify-content-around">
    <card-picker :id="1" />
    <card-picker :id="2" />
    <card-picker :id="3" />
    <card-picker :id="4" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CardPicker from "./CardPicker.vue";
export default defineComponent({
  components: {
    CardPicker,
  },
});
</script>
