<script setup>
/**
 * DisplayNameDemo.vue - GUIDED PRACTICE
 *
 * Fill in the TODO sections to make this work.
 * Goal: Auto-save the user's name as they type.
 */

// TODO: Import what you need from 'vue'


// TODO: Create a reactive `displayName` variable (default: empty string)


// For UI feedback - shows "Restored!" badge when loaded from storage
import { ref } from 'vue'
const wasRestored = ref(false)

// TODO: When the component loads, check localStorage for a saved name
//       Key: 'demo.displayName'
//       If found, set displayName AND set wasRestored to true


// TODO: Auto-save: whenever displayName changes, save it to localStorage
//       Hint: watch() runs a function whenever a value changes


// TODO: Implement clear (remove from storage, reset the input)
function clearName() {

}
</script>

<template>
  <div class="demo">
    <h1>Practice: Display Name (Guided)</h1>

    <p class="description">
      Make the input <strong>auto-save</strong> to localStorage as the user types.
    </p>

    <div class="input-section">
      <label for="display-name" class="input-label">Your Name:</label>
      <input
        id="display-name"
        v-model="displayName"
        type="text"
        placeholder="Type here..."
        class="text-input"
      />
      <span v-if="wasRestored && displayName" class="restored-badge">
        Restored!
      </span>
    </div>

    <div class="preview" v-if="displayName">
      <p>Hello, <strong>{{ displayName }}</strong>!</p>
    </div>

    <div class="actions">
      <button @click="clearName" class="btn btn-secondary">
        Clear
      </button>
    </div>

    <div class="test-instructions">
      <h2>Success Criteria:</h2>
      <ol>
        <li>Type in the input - should save automatically</li>
        <li>Reload the page - name should still be there</li>
        <li>Clear removes the saved name</li>
        <li>Watch DevTools → Local Storage update in real-time</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  margin-bottom: 1.5rem;
}
</style>
