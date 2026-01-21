/**
 * Vue Router Configuration
 *
 * This file defines all the routes (URLs) for our demo app.
 * Each route maps a URL path to a Vue component (view).
 *
 * Routes:
 * - Home page with overview and quick reference
 * - 4 completed demo pages for localStorage/sessionStorage concepts
 * - Practice pages in two flavors: guided (with hints) and minimal (for live coding)
 */
import { createRouter, createWebHistory } from 'vue-router'

// Completed demo views (working examples)
import HomeView from '../views/HomeView.vue'
import ThemePreferenceDemo from '../views/ThemePreferenceDemo.vue'
import DisplayNameDemo from '../views/DisplayNameDemo.vue'
import SessionVsLocalDemo from '../views/SessionVsLocalDemo.vue'
import DevToolsHelperDemo from '../views/DevToolsHelperDemo.vue'

// Practice views - Guided (with helpful comments)
import GuidedThemePreference from '../views/practice/guided/ThemePreferenceDemo.vue'
import GuidedDisplayName from '../views/practice/guided/DisplayNameDemo.vue'

// Practice views - Minimal (bare-bones for live coding)
import MinimalThemePreference from '../views/practice/minimal/ThemePreferenceDemo.vue'
import MinimalDisplayName from '../views/practice/minimal/DisplayNameDemo.vue'

// Create the router instance
const router = createRouter({
  // Use HTML5 history mode (clean URLs without #)
  history: createWebHistory(import.meta.env.BASE_URL),

  // Define all routes - each object maps a path to a component
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/theme',
      name: 'theme-preference',
      component: ThemePreferenceDemo,
    },
    {
      path: '/display-name',
      name: 'display-name',
      component: DisplayNameDemo,
    },
    {
      path: '/session-vs-local',
      name: 'session-vs-local',
      component: SessionVsLocalDemo,
    },
    {
      path: '/devtools',
      name: 'devtools-helper',
      component: DevToolsHelperDemo,
    },
    // Guided practice (with hints)
    {
      path: '/practice/guided/theme',
      name: 'practice-guided-theme',
      component: GuidedThemePreference,
    },
    {
      path: '/practice/guided/display-name',
      name: 'practice-guided-display-name',
      component: GuidedDisplayName,
    },
    // Minimal practice (for live coding)
    {
      path: '/practice/minimal/theme',
      name: 'practice-minimal-theme',
      component: MinimalThemePreference,
    },
    {
      path: '/practice/minimal/display-name',
      name: 'practice-minimal-display-name',
      component: MinimalDisplayName,
    },
  ],
})

export default router
