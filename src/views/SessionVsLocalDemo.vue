<script setup>
/**
 * SessionVsLocalDemo.vue - Session Storage vs Local Storage Comparison
 * 
 * LEARNING GOALS:
 * - Understand the KEY DIFFERENCE between sessionStorage and localStorage
 * - Know when to use each one
 * - See them working side-by-side for direct comparison
 * 
 * THE BIG DIFFERENCE:
 * - localStorage: Data persists FOREVER (until explicitly deleted)
 *   → Good for: user preferences, saved settings, long-term data
 * 
 * - sessionStorage: Data is cleared when the TAB/WINDOW is closed
 *   → Good for: temporary data, single-session info, sensitive data
 *   → Note: Data DOES survive page refresh, just not tab close!
 * 
 * IMPORTANT: Both have the SAME API (setItem, getItem, removeItem)
 * The only difference is how long the data lasts.
 */
import { ref, watch, onMounted } from 'vue'

// ============================================
// STATE: Two separate values for comparison
// ============================================
const sessionValue = ref('')  // Will use sessionStorage
const localValue = ref('')    // Will use localStorage

// ============================================
// LOAD: Restore both values on mount
// ============================================
onMounted(() => {
  // Load from sessionStorage
  // This will be empty if you closed and reopened the tab
  const savedSession = sessionStorage.getItem('demo.sessionValue')
  if (savedSession !== null) {
    sessionValue.value = savedSession
    console.log('✅ Restored from sessionStorage:', savedSession)
  } else {
    console.log('ℹ️ No sessionStorage value found (tab was closed or first visit)')
  }
  
  // Load from localStorage
  // This will persist even after closing the browser entirely
  const savedLocal = localStorage.getItem('demo.localValue')
  if (savedLocal !== null) {
    localValue.value = savedLocal
    console.log('✅ Restored from localStorage:', savedLocal)
  } else {
    console.log('ℹ️ No localStorage value found')
  }
})

// ============================================
// SAVE: Auto-save both values as user types
// ============================================

// Watch sessionStorage value
watch(sessionValue, (newValue) => {
  // Same API as localStorage!
  sessionStorage.setItem('demo.sessionValue', newValue)
  console.log('💾 Saved to sessionStorage:', newValue)
})

// Watch localStorage value
watch(localValue, (newValue) => {
  localStorage.setItem('demo.localValue', newValue)
  console.log('💾 Saved to localStorage:', newValue)
})

// ============================================
// CLEAR: Remove values from storage
// ============================================
function clearSession() {
  sessionStorage.removeItem('demo.sessionValue')
  sessionValue.value = ''
  console.log('🗑️ Cleared sessionStorage value')
}

function clearLocal() {
  localStorage.removeItem('demo.localValue')
  localValue.value = ''
  console.log('🗑️ Cleared localStorage value')
}

function clearBoth() {
  clearSession()
  clearLocal()
}
</script>

<template>
  <div class="demo">
    <h1>Demo 3: Session vs Local Storage</h1>
    
    <p class="description">
      Compare <strong>sessionStorage</strong> and <strong>localStorage</strong> side-by-side.
      Type in both inputs, then try closing the tab vs just refreshing!
    </p>

    <!-- Side-by-side comparison -->
    <div class="comparison-grid">
      
      <!-- SESSION STORAGE -->
      <div class="storage-card session">
        <h2>sessionStorage</h2>
        <p class="storage-description">
          Data is cleared when you <strong>close the tab/window</strong>.<br />
          Survives page refresh, but not tab close.
        </p>
        
        <input
          v-model="sessionValue"
          type="text"
          placeholder="Type something..."
          class="text-input"
        />
        
        <div class="value-display" v-if="sessionValue">
          Stored: "{{ sessionValue }}"
        </div>
        
        <button @click="clearSession" class="btn btn-clear">
          Clear sessionStorage
        </button>
        
        <div class="use-cases">
          <h3>Good for:</h3>
          <ul>
            <li>Temporary form data</li>
            <li>Single-session authentication tokens</li>
            <li>Shopping cart during checkout</li>
            <li>Wizard/multi-step form progress</li>
          </ul>
        </div>
      </div>
      
      <!-- LOCAL STORAGE -->
      <div class="storage-card local">
        <h2>localStorage</h2>
        <p class="storage-description">
          Data <strong>persists forever</strong> until explicitly deleted.<br />
          Survives tab close, browser close, even restarts!
        </p>
        
        <input
          v-model="localValue"
          type="text"
          placeholder="Type something..."
          class="text-input"
        />
        
        <div class="value-display" v-if="localValue">
          Stored: "{{ localValue }}"
        </div>
        
        <button @click="clearLocal" class="btn btn-clear">
          Clear localStorage
        </button>
        
        <div class="use-cases">
          <h3>Good for:</h3>
          <ul>
            <li>User preferences (theme, language)</li>
            <li>Saved drafts</li>
            <li>Remember me / username</li>
            <li>App settings</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Clear both button -->
    <div class="actions">
      <button @click="clearBoth" class="btn btn-secondary">
        Clear Both
      </button>
    </div>

    <!-- Test instructions -->
    <div class="test-instructions">
      <h2>Try This Experiment:</h2>
      <ol>
        <li>Type different text in both inputs above</li>
        <li>Open DevTools → Application → Storage (see both storages!)</li>
        <li><strong>Refresh the page</strong> → Both values should still be there</li>
        <li><strong>Close this tab</strong> and open the app in a new tab</li>
        <li>
          <strong>Result:</strong> 
          sessionStorage is gone, localStorage is still there!
        </li>
      </ol>
    </div>

    <!-- Code comparison -->
    <div class="code-comparison">
      <h2>The API is Identical!</h2>
      <p>The only difference is which object you use:</p>
      
      <div class="code-grid">
        <div class="code-block">
          <h3>sessionStorage</h3>
          <pre><code>// Save
sessionStorage.setItem('key', 'value')

// Read
sessionStorage.getItem('key')

// Remove
sessionStorage.removeItem('key')</code></pre>
        </div>
        
        <div class="code-block">
          <h3>localStorage</h3>
          <pre><code>// Save
localStorage.setItem('key', 'value')

// Read
localStorage.getItem('key')

// Remove
localStorage.removeItem('key')</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles only */
.demo {
  max-width: 900px;
}

/* Side-by-side comparison layout */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.storage-card {
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  background-color: var(--color-background-soft);
}

.storage-card.session {
  border-color: #e67e22;
}

.storage-card.session h2 {
  color: #e67e22;
}

.storage-card.local {
  border-color: hsla(195, 85%, 52%, 1);
}

.storage-card.local h2 {
  color: hsla(195, 85%, 52%, 1);
}

.storage-description {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  min-height: 3rem;
}

.storage-card .text-input {
  max-width: 100%;
  margin-bottom: 0.75rem;
}

.value-display {
  padding: 0.5rem 0.75rem;
  background-color: var(--color-background-mute);
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  word-break: break-all;
}

.storage-card .btn-clear {
  margin-bottom: 1rem;
}

.use-cases {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.use-cases h3 {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.use-cases ul {
  padding-left: 1.25rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

.code-comparison {
  margin-top: 2rem;
}

.code-comparison > p {
  margin-bottom: 1rem;
}
</style>
