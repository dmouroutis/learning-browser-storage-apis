<script setup>
/**
 * DisplayNameDemo.vue - Simple User Input Persistence
 * 
 * LEARNING GOALS:
 * - How to persist simple user input (like a name) to localStorage
 * - How to pre-fill inputs from stored data on page load
 * - Understanding the read/write lifecycle
 * - How to clear stored values
 * 
 * This is a common real-world pattern:
 * - Remembering usernames on login forms
 * - Saving draft content in text editors
 * - Preserving form data if the user accidentally closes the tab
 */
import { ref, watch, onMounted } from 'vue'

// ============================================
// STEP 1: Define reactive state
// ============================================
// This ref holds the display name entered by the user
const displayName = ref('')

// Track whether we loaded a saved value (for UI feedback)
const wasRestored = ref(false)

// ============================================
// STEP 2: Load saved name when component mounts
// ============================================
onMounted(() => {
  // Attempt to read the saved display name from localStorage
  const savedName = localStorage.getItem('demo.displayName')

  // getItem() returns null if the key doesn't exist
  // We need to check for this to avoid showing "null" in the input
  if (savedName !== null) {
    displayName.value = savedName
    wasRestored.value = true
    console.log('✅ Restored display name from localStorage:', savedName)
  } else {
    console.log('ℹ️ No saved display name found')
  }
})

// ============================================
// STEP 3: Save name whenever it changes
// ============================================
// Using watch() to automatically save as the user types
// This is called "auto-save" - no need for a Save button!
watch(displayName, (newName) => {
  // Save to localStorage
  // Note: We save even empty strings - this is intentional
  // so users can "clear" their name by deleting all text
  localStorage.setItem('demo.displayName', newName)
  console.log('💾 Saved display name to localStorage:', newName)
})

// ============================================
// STEP 4: Clear the stored value
// ============================================
function clearName() {
  // Remove the key from localStorage
  localStorage.removeItem('demo.displayName')
  console.log('🗑️ Removed display name from localStorage')

  // Also clear the input field
  displayName.value = ''
  wasRestored.value = false
}
</script>

<template>
  <div class="demo">
    <h1>Demo 2: Display Name Persistence</h1>

    <p class="description">
      This demo shows how to <strong>persist user input</strong> across page reloads.
      Type your name below - it will be saved automatically!
    </p>

    <!-- Input section -->
    <div class="input-section">
      <label for="display-name" class="input-label">Your Display Name:</label>

      <!-- 
        v-model creates two-way binding:
        - Changes to the input update displayName.value
        - Changes to displayName.value update the input
      -->
      <input id="display-name" v-model="displayName" type="text" placeholder="Enter your name..." class="text-input" />

      <!-- Show a badge if the value was restored -->
      <span v-if="wasRestored && displayName" class="restored-badge">
        Restored from localStorage!
      </span>
    </div>

    <!-- Preview of the saved value -->
    <div class="preview" v-if="displayName">
      <p>Hello, <strong>{{ displayName }}</strong>! 👋</p>
    </div>

    <!-- Clear button -->
    <div class="actions">
      <button @click="clearName" class="btn btn-secondary">
        Clear Saved Name
      </button>
    </div>

    <!-- Instructions for testing -->
    <div class="test-instructions">
      <h2>Try This:</h2>
      <ol>
        <li>Type your name in the input field above</li>
        <li>Open DevTools → Application → Local Storage</li>
        <li>Find the key <code>demo.displayName</code> - it updates as you type!</li>
        <li><strong>Reload the page</strong> - your name should still be there!</li>
        <li>Click "Clear Saved Name" and reload - the input should be empty</li>
      </ol>
    </div>

    <!-- Code explanation -->
    <div class="code-explanation">
      <h2>Key Code Patterns</h2>

      <div class="code-block">
        <h3>Auto-save with watch()</h3>
        <pre><code>// This runs every time displayName changes
watch(displayName, (newName) => {
  localStorage.setItem('demo.displayName', newName)
})</code></pre>
        <p class="code-note">
          <strong>Why watch()?</strong> It automatically saves whenever the user types,
          without needing a "Save" button. Great for drafts and preferences!
        </p>
      </div>

      <div class="code-block">
        <h3>Pre-fill on mount</h3>
        <pre><code>onMounted(() => {
  const saved = localStorage.getItem('demo.displayName')
  if (saved !== null) {
    displayName.value = saved
  }
})</code></pre>
        <p class="code-note">
          <strong>Why check for null?</strong> If the key doesn't exist,
          getItem() returns null. Without this check, you'd show "null" in the input!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  margin-bottom: 1.5rem;
}
</style>
