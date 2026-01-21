<script setup>
/**
 * DisplayNameDemo.vue - MINIMAL (Live Coding)
 * 
 * Bare-bones starter for instructor live coding.
 * Build the auto-save functionality from scratch.
 */

function clearName() {
  // TODO
}
</script>

<template>
  <div class="demo">
    <h1>Practice: Display Name (Minimal)</h1>

    <p class="description">
      Build auto-save input persistence from scratch.
    </p>

    <div class="input-section">
      <label for="display-name" class="input-label">Your Name:</label>
      <input id="display-name" v-model="displayName" type="text" placeholder="Type here..." class="text-input" />
    </div>

    <div class="preview" v-if="displayName">
      <p>Hello, <strong>{{ displayName }}</strong>!</p>
    </div>

    <div class="actions">
      <button @click="clearName" class="btn btn-secondary">
        Clear
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  margin-bottom: 1.5rem;
}
</style>
