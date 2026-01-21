<script setup>
/**
 * ThemePreferenceDemo.vue - MINIMAL (Live Coding)
 * 
 * Bare-bones starter for instructor live coding.
 * Build the localStorage persistence from scratch.
 */

// Applies theme to the page (provided helper)
function applyThemeToPage(themeName) {
  document.documentElement.dataset.theme = themeName
}

function toggleTheme() {
  // TODO
}

function resetTheme() {
  // TODO
}
</script>

<template>
  <div class="demo">
    <h1>Practice: Theme Preference (Minimal)</h1>

    <p class="description">
      Build theme persistence with localStorage from scratch.
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
  </div>
</template>

<style scoped>
</style>
