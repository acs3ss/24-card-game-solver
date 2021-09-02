<template>
  <div :id="`card${id}-container`" class="col-auto mx-3">
    <div class="card-select">
      <label :for="`card${id}`" class="form-label">Card {{ id }}</label>
      <select
        :name="`card${id}`"
        :id="`card${id}`"
        class="card-picker form-select"
        required
      >
        <option value="1">Ace</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">Jack</option>
        <option value="12">Queen</option>
        <option value="13">King</option>
      </select>
    </div>
    <div class="card-image p-3">
      <img src="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    id: Number,
  },
});
</script>
