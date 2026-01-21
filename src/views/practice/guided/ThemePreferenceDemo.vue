<script setup>
/**
 * ThemePreferenceDemo.vue - GUIDED PRACTICE
 *
 * Fill in the TODO sections to make this work.
 * Hint: You'll need ref, watch, and onMounted from Vue.
 */

// TODO: Import what you need from 'vue'


// TODO: Create a reactive `theme` variable (default: 'light')


// TODO: When the component loads, check localStorage for a saved theme
//       Key: 'demo.theme'
//       Remember: getItem returns null if nothing is saved


// TODO: When `theme` changes, save it to localStorage and apply it


// Helper function - applies theme to the page
function applyThemeToPage(themeName) {
  document.documentElement.dataset.theme = themeName
}

// TODO: Implement toggle (switch between 'light' and 'dark')
function toggleTheme() {

}

// TODO: Implement reset (remove from storage, go back to default)
function resetTheme() {

}
</script>

<template>
  <div class="demo">
    <h1>Practice: Theme Preference (Guided)</h1>

    <p class="description">
      Make the theme toggle <strong>persist</strong> across page reloads using localStorage.
    </p>

    <div class="current-state">
      <p>Current theme: <strong>{{ theme }}</strong></p>
    </div>

    <div class="actions">
      <button @click="toggleTheme" class="btn btn-primary">
        Toggle Theme
      </button>
      <button @click="resetTheme" class="btn btn-secondary">
        Reset
      </button>
    </div>

    <div class="test-instructions">
      <h2>Success Criteria:</h2>
      <ol>
        <li>Toggle changes the theme visually</li>
        <li>Reload the page - theme should persist</li>
        <li>Reset clears the preference</li>
        <li>Check DevTools → Application → Local Storage</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
/* Styles loaded from main.css */
</style>
