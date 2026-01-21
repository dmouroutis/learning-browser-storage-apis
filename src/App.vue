<script setup>
/**
 * App.vue - Main application layout
 * 
 * This is the root component that provides:
 * - A left sidenav for navigation between demos
 * - A main content area where each demo is rendered via RouterView
 * - A small reminder to open DevTools
 */
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

// localStorage keys
const SIDENAV_OPEN_KEY = 'demo.sidenavOpen'

// Sidenav open/close state
const isSidenavOpen = ref(true)

// Collapsible sections state
const sections = reactive({
  demos: false,
  practiceGuided: false,
  practiceMinimal: false,
})

// Get current route to auto-expand the section containing the active link
const route = useRoute()

// Determine which section contains a given route
function getSectionForRoute(path) {
  if (path.startsWith('/practice/guided')) return 'practiceGuided'
  if (path.startsWith('/practice/minimal')) return 'practiceMinimal'
  if (path === '/theme' || path === '/display-name' || path === '/session-vs-local' || path === '/devtools') {
    return 'demos'
  }
  return null // Home page - no section
}

// Track the active section (contains the current route)
const activeSection = computed(() => getSectionForRoute(route.path))

// When route changes, close non-active sections and ensure active section is open
watch(() => route.path, (newPath, oldPath) => {
  const newSection = getSectionForRoute(newPath)
  const oldSection = oldPath ? getSectionForRoute(oldPath) : null

  // If navigating to a different section, close the old one
  if (oldSection && oldSection !== newSection) {
    sections[oldSection] = false
  }

  // Always ensure the active section is open
  if (newSection) {
    sections[newSection] = true
  }
}, { immediate: true })

onMounted(() => {
  // Restore sidenav open state
  const savedSidenav = localStorage.getItem(SIDENAV_OPEN_KEY)
  if (savedSidenav !== null) {
    isSidenavOpen.value = savedSidenav === 'true'
  }
})

watch(isSidenavOpen, (open) => {
  localStorage.setItem(SIDENAV_OPEN_KEY, String(open))
})

function toggleSidenav() {
  isSidenavOpen.value = !isSidenavOpen.value
}

function toggleSection(section) {
  // The active section (containing current route) cannot be closed
  if (section === activeSection.value) {
    return // Can't close the active section
  }

  // Toggle other sections freely
  sections[section] = !sections[section]
}

const menuButtonLabel = computed(() => (isSidenavOpen.value ? 'Hide menu' : 'Show menu'))
</script>

<template>
  <div class="app-layout" :class="{ 'sidenav-collapsed': !isSidenavOpen }">
    <!-- 
      SIDENAV: Navigation between demo pages
      Using RouterLink for declarative navigation with Vue Router
    -->
    <aside id="app-sidenav" class="sidenav">
      <!-- Keep the toggle always visible (even when collapsed) -->
      <div class="sidenav-header">
        <button type="button" class="menu-button" :aria-label="menuButtonLabel" :aria-controls="'app-sidenav'"
          :aria-expanded="isSidenavOpen" @click="toggleSidenav">
          <!-- Classic "hamburger" icon -->
          <svg class="menu-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 v-show="isSidenavOpen" class="sidenav-title">
          Learning Browser APIs
        </h2>
      </div>

      <div class="sidenav-content" :aria-hidden="!isSidenavOpen">
        <!-- Each RouterLink navigates to a different demo -->
        <nav class="sidenav-nav">
          <RouterLink to="/" class="nav-link">Home</RouterLink>

          <!-- Demos section (collapsible) -->
          <button type="button" class="section-toggle" :class="{ expanded: sections.demos }"
            @click="toggleSection('demos')">
            <span class="chevron">›</span>
            Demos
          </button>
          <div class="section-links" :class="{ collapsed: !sections.demos }">
            <RouterLink to="/theme" class="nav-link">1. Theme Preference</RouterLink>
            <RouterLink to="/display-name" class="nav-link">2. Display Name</RouterLink>
            <RouterLink to="/session-vs-local" class="nav-link">3. Session vs Local</RouterLink>
            <RouterLink to="/devtools" class="nav-link">4. DevTools Helper</RouterLink>
          </div>

          <!-- Practice Guided section (collapsible) -->
          <button type="button" class="section-toggle" :class="{ expanded: sections.practiceGuided }"
            @click="toggleSection('practiceGuided')">
            <span class="chevron">›</span>
            Practice (Guided)
          </button>
          <div class="section-links" :class="{ collapsed: !sections.practiceGuided }">
            <RouterLink to="/practice/guided/theme" class="nav-link">1. Theme Preference</RouterLink>
            <RouterLink to="/practice/guided/display-name" class="nav-link">2. Display Name</RouterLink>
          </div>

          <!-- Practice Minimal section (collapsible) -->
          <button type="button" class="section-toggle" :class="{ expanded: sections.practiceMinimal }"
            @click="toggleSection('practiceMinimal')">
            <span class="chevron">›</span>
            Practice (Minimal)
          </button>
          <div class="section-links" :class="{ collapsed: !sections.practiceMinimal }">
            <RouterLink to="/practice/minimal/theme" class="nav-link">1. Theme Preference</RouterLink>
            <RouterLink to="/practice/minimal/display-name" class="nav-link">2. Display Name</RouterLink>
          </div>
        </nav>

        <!-- Reminder for learners to open DevTools -->
        <div class="devtools-reminder">
          <strong>Tip:</strong> Open DevTools → Application → Storage to see changes live!
        </div>
      </div>
    </aside>

    <!-- 
      MAIN CONTENT: RouterView renders the current route's component
      This is where each demo page will appear
    -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/*
 * Simple two-column layout:
 * - Fixed-width sidenav on the left
 * - Flexible main content area on the right
 */
.app-layout {
  display: flex;
  min-height: 100vh;
}

/* SIDENAV STYLES */
.sidenav {
  width: 240px;
  background-color: var(--color-background-soft);
  border-right: 1px solid var(--color-border);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 0.2s ease, padding 0.2s ease, border-right-color 0.2s ease;
}

.sidenav-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.app-layout.sidenav-collapsed .sidenav {
  width: 56px;
  /* keep a slim rail visible */
  padding: 0.75rem 0.5rem;
}

.app-layout.sidenav-collapsed .sidenav-header {
  justify-content: center;
  margin-bottom: 0;
}

.sidenav-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: opacity 0.15s ease, transform 0.2s ease;
}

.app-layout.sidenav-collapsed .sidenav-content {
  opacity: 0;
  pointer-events: none;
  transform: translateX(-8px);
}

.sidenav-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-heading);
}

.sidenav-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.5rem 1rem 0.5rem 1.5rem;
  border-radius: 6px;
  color: var(--color-text);
  text-decoration: none;
  transition: background-color 0.2s;
  font-size: 0.9rem;
}

.nav-link:hover {
  background-color: var(--color-background-mute);
}

/* Active link styling - Vue Router adds this class automatically */
.nav-link.router-link-active {
  background-color: hsla(195, 85%, 52%, 0.2);
  color: hsla(195, 85%, 52%, 1);
  font-weight: 500;
}

/* Collapsible section toggle button */
.section-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--color-heading);
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background-color 0.2s, font-weight 0.1s;
}

.section-toggle.expanded {
  font-weight: 600;
}

.section-toggle:hover {
  background-color: var(--color-background-mute);
}

.section-toggle .chevron {
  display: inline-block;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.section-toggle.expanded .chevron {
  transform: rotate(90deg);
}

/* Collapsible section links container */
.section-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
  max-height: 500px;
  transition: max-height 0.25s ease, opacity 0.2s ease;
}

.section-links.collapsed {
  max-height: 0;
  opacity: 0;
}

.devtools-reminder {
  margin-top: auto;
  padding: 1rem;
  background-color: var(--color-background-mute);
  border-radius: 6px;
  font-size: 0.85rem;
  line-height: 1.4;
}

/* MAIN CONTENT STYLES */
.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.menu-button {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-background-mute);
  color: var(--color-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.05s ease;
}

.menu-button:hover {
  background-color: var(--color-background-soft);
}

.menu-button:active {
  transform: translateY(1px);
}

.menu-button:focus-visible {
  outline: 2px solid hsla(195, 85%, 52%, 1);
  outline-offset: 2px;
}

.menu-icon {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
