<script setup lang="ts">
import { useRegisterSW } from "virtual:pwa-register/vue";

const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegisteredSW(url, registration) {
    if (registration) {
      // Check every hour for updates (which if found will then show the reload prompt)
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);
    }
  },
});
</script>

<template>
  <div
    v-if="needRefresh"
    class="toast position-fixed bottom-0 end-0 m-3 rounded show"
    role="dialog"
    aria-labelledby="toast-title"
    aria-describedby="toast-description"
    aria-live="polite"
    aria-atomic="true"
  >
    <div class="toast-header">
      <strong id="toast-title" class="me-auto">Updates available</strong>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="needRefresh = false"
      ></button>
    </div>
    <div class="toast-body">
      <div id="toast-description" class="mb-3">
        Reload to get the latest changes!
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="updateServiceWorker()"
      >
        Reload
      </button>
    </div>
  </div>
</template>
