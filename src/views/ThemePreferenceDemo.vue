<script setup>
/**
 * ThemePreferenceDemo.vue - Persistent UI State with localStorage
 * 
 * LEARNING GOALS:
 * - How to save user preferences to localStorage
 * - How to restore preferences on page load
 * - How to handle missing values (first-time visitors)
 * - How to sync stored data with reactive Vue state
 * 
 * KEY CONCEPTS:
 * - localStorage.setItem(key, value) - saves a string
 * - localStorage.getItem(key) - returns string or null if missing
 * - localStorage.removeItem(key) - deletes the key
 */
import { ref, watch, onMounted } from 'vue'

// ============================================
// STEP 1: Define reactive state for the theme
// ============================================
// We use a ref to make `theme` reactive.
// When it changes, Vue will update the UI automatically.
const theme = ref('light') // Default value

// ============================================
// STEP 2: Load saved theme when component mounts
// ============================================
onMounted(() => {
  // Try to get the saved theme from localStorage
  // getItem() returns null if the key doesn't exist
  const savedTheme = localStorage.getItem('demo.theme')

  // Check if we actually have a saved value
  // This handles first-time visitors who have no stored preference
  if (savedTheme !== null) {
    // We have a saved theme! Use it.
    theme.value = savedTheme
    console.log('✅ Loaded theme from localStorage:', savedTheme)
  } else {
    // No saved theme - this is a first-time visitor
    // We'll use the default ('light') that we set above
    console.log('ℹ️ No saved theme found, using default:', theme.value)
  }

  // Apply the theme to the page
  // We set a data attribute on <html> that CSS can target
  applyThemeToPage(theme.value)
})

// ============================================
// STEP 3: Save theme whenever it changes
// ============================================
// watch() runs a callback whenever the watched value changes
watch(theme, (newTheme) => {
  // Save the new theme to localStorage
  // setItem() converts the value to a string automatically
  localStorage.setItem('demo.theme', newTheme)
  console.log('💾 Saved theme to localStorage:', newTheme)

  // Apply the theme to the page
  applyThemeToPage(newTheme)
})

// ============================================
// HELPER: Apply theme to the document
// ============================================
// This sets a data-theme attribute on the <html> element
// Our CSS uses this to apply the correct colors
function applyThemeToPage(themeName) {
  document.documentElement.dataset.theme = themeName
}

// ============================================
// STEP 4: Toggle between light and dark
// ============================================
function toggleTheme() {
  // Simple toggle: if light, switch to dark; if dark, switch to light
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

// ============================================
// STEP 5: Reset to default (remove stored preference)
// ============================================
function resetTheme() {
  // removeItem() deletes the key from localStorage
  // Next time the page loads, getItem() will return null
  localStorage.removeItem('demo.theme')
  console.log('🗑️ Removed theme from localStorage')

  // Reset to default light theme
  theme.value = 'light'
  applyThemeToPage('light')
}
</script>

<template>
  <div class="demo">
    <h1>Demo 1: Theme Preference</h1>

    <p class="description">
      This demo shows how to persist <strong>UI state</strong> using localStorage.
      The selected theme is saved and restored automatically on page reload.
    </p>

    <!-- Current state display -->
    <div class="current-state">
      <p>Current theme: <strong>{{ theme }}</strong></p>
    </div>

    <!-- Action buttons -->
    <div class="actions">
      <button @click="toggleTheme" class="btn btn-primary">
        Toggle Theme ({{ theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light' }})
      </button>

      <button @click="resetTheme" class="btn btn-secondary">
        Reset Preference
      </button>
    </div>

    <!-- Instructions for testing -->
    <div class="test-instructions">
      <h2>Try This:</h2>
      <ol>
        <li>Toggle the theme using the button above</li>
        <li>Open DevTools → Application → Local Storage</li>
        <li>Find the key <code>demo.theme</code> and see its value</li>
        <li><strong>Reload the page</strong> - your theme should persist!</li>
        <li>Click "Reset Preference" and reload - it should use the default</li>
      </ol>
    </div>

    <!-- Code explanation -->
    <div class="code-explanation">
      <h2>Key Code Patterns</h2>
      <div class="code-block">
        <h3>Reading (with fallback)</h3>
        <pre><code>const saved = localStorage.getItem('demo.theme')
if (saved !== null) {
  theme.value = saved
}</code></pre>
      </div>
      <div class="code-block">
        <h3>Writing</h3>
        <pre><code>localStorage.setItem('demo.theme', newTheme)</code></pre>
      </div>
      <div class="code-block">
        <h3>Removing</h3>
        <pre><code>localStorage.removeItem('demo.theme')</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* All common styles are in main.css */
</style>
