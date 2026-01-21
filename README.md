# Browser Storage APIs - Training Demo

A hands-on Vue 3 demo app for teaching **localStorage** and **sessionStorage** to frontend developers.

## Purpose

This app is designed for a 60-minute training session. It provides simple, interactive demos that help learners understand how to use browser storage APIs to build better user experiences.

**This is teaching code, not production code.** The code is intentionally simple, heavily commented, and avoids abstractions to maximize clarity and "aha" moments.

## Demo Pages

| Page | Route | What It Teaches |
|------|-------|-----------------|
| **Home** | `/` | Overview and quick reference for storage APIs |
| **Theme Preference** | `/theme` | Persisting UI state (light/dark mode) with localStorage |
| **Display Name** | `/display-name` | Auto-saving user input with `watch()` and localStorage |
| **Session vs Local** | `/session-vs-local` | Side-by-side comparison of sessionStorage vs localStorage |
| **DevTools Helper** | `/devtools` | How to inspect and debug storage in browser DevTools |

### Practice Pages

Two flavors for different teaching styles:

**Guided** (with hints and structure):
| Page | Route |
|------|-------|
| Theme Preference | `/practice/guided/theme` |
| Display Name | `/practice/guided/display-name` |

**Minimal** (bare-bones for live coding):
| Page | Route |
|------|-------|
| Theme Preference | `/practice/minimal/theme` |
| Display Name | `/practice/minimal/display-name` |

## Key Concepts Covered

- `localStorage.setItem(key, value)` - Save data
- `localStorage.getItem(key)` - Read data (returns `null` if missing)
- `localStorage.removeItem(key)` - Delete data
- Handling missing values (first-time visitors)
- Syncing stored data with Vue reactive state
- When to use sessionStorage vs localStorage

## Getting Started

```sh
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Then open http://localhost:5173 in your browser.

**Tip:** Open DevTools → Application → Storage to see changes live as you interact with the demos.

## Tech Stack

- Vue 3 (Composition API)
- Vue Router
- Vite
- Plain CSS (no UI libraries)

## Project Structure

```
src/
├── App.vue                      # Sidenav layout + RouterView
├── main.js                      # App entry point
├── router/index.js              # Route definitions
├── views/
│   ├── HomeView.vue             # Landing page with overview
│   ├── ThemePreferenceDemo.vue  # Demo 1: localStorage for UI state
│   ├── DisplayNameDemo.vue      # Demo 2: Auto-save user input
│   ├── SessionVsLocalDemo.vue   # Demo 3: Compare storage types
│   ├── DevToolsHelperDemo.vue   # Demo 4: Debugging guidance
│   └── practice/
│       ├── guided/              # With hints and TODO comments
│       │   ├── ThemePreferenceDemo.vue
│       │   └── DisplayNameDemo.vue
│       └── minimal/             # Bare-bones for live coding
│           ├── ThemePreferenceDemo.vue
│           └── DisplayNameDemo.vue
└── assets/
    ├── base.css                 # Theme variables + dark mode support
    └── main.css                 # Shared component styles
```

## Clarifications

- All demo code is inline (no composables) for teaching clarity
- Comments explain "why" not just "what"
- Each demo page includes step-by-step instructions and code examples
- Console logs are included to help learners see what's happening
- Practice pages provide skeleton code with TODO comments for live coding exercises
