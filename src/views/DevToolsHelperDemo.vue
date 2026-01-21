<script setup>
/**
 * DevToolsHelperDemo.vue - DevTools Awareness & Debugging
 * 
 * LEARNING GOALS:
 * - Know how to inspect storage in browser DevTools
 * - Understand how to debug storage-related issues
 * - Learn to iterate over all stored keys
 * - See a practical pattern for logging storage contents
 * 
 * WHY THIS MATTERS:
 * Being able to inspect and debug storage is essential!
 * You'll use DevTools constantly when building real apps.
 */
import { ref } from 'vue'

// ============================================
// STATE: Store the snapshot for display
// ============================================
const storageSnapshot = ref(null)

// ============================================
// FUNCTION: Log all storage values to console
// ============================================
function logStorageToConsole() {
  // Build an object with all localStorage values
  const localData = {}

  // localStorage.length tells us how many keys are stored
  // We can iterate using localStorage.key(index) to get each key name
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)  // Get the key name at index i
    const value = localStorage.getItem(key)  // Get the value for that key
    localData[key] = value
  }

  // Same for sessionStorage
  const sessionData = {}
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i)
    const value = sessionStorage.getItem(key)
    sessionData[key] = value
  }

  // Log to console with nice formatting
  console.log('='.repeat(50))
  console.log('📦 STORAGE SNAPSHOT')
  console.log('='.repeat(50))
  console.log('\n🔒 localStorage:')
  console.log(localData)
  console.log('\n⏱️ sessionStorage:')
  console.log(sessionData)
  console.log('\n' + '='.repeat(50))

  // Also store for display in the UI
  storageSnapshot.value = {
    local: localData,
    session: sessionData,
    timestamp: new Date().toLocaleTimeString()
  }

  console.log('💡 Tip: You can also see this in DevTools → Application → Storage')
}

// ============================================
// FUNCTION: Clear ALL storage (use with caution!)
// ============================================
function clearAllStorage() {
  // localStorage.clear() removes ALL keys from localStorage
  // This is a nuclear option - use carefully in real apps!
  localStorage.clear()
  console.log('🗑️ Cleared ALL localStorage')

  // Same for sessionStorage
  sessionStorage.clear()
  console.log('🗑️ Cleared ALL sessionStorage')

  // Clear the snapshot display
  storageSnapshot.value = null

  alert('All storage cleared! Refresh the page to see the effect on other demos.')
}
</script>

<template>
  <div class="demo">
    <h1>Demo 4: DevTools Helper</h1>

    <p class="description">
      Learn how to <strong>inspect and debug</strong> browser storage
      using DevTools and JavaScript.
    </p>

    <!-- Main instructions -->
    <div class="devtools-guide">
      <h2>How to Open Storage in DevTools</h2>

      <div class="steps">
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Open DevTools</strong>
            <p>
              Press <kbd>F12</kbd> or <kbd>Cmd+Option+I</kbd> (Mac) /
              <kbd>Ctrl+Shift+I</kbd> (Windows/Linux)
            </p>
          </div>
        </div>

        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Go to Application Tab</strong>
            <p>Click the "Application" tab (might be hidden under ">>")</p>
          </div>
        </div>

        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Find Storage Section</strong>
            <p>In the left sidebar, expand "Storage" → "Local Storage" or "Session Storage"</p>
          </div>
        </div>

        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Select Your Domain</strong>
            <p>Click on "localhost:5173" (or your app's URL)</p>
          </div>
        </div>
      </div>

      <p class="tip">
        <strong>Pro Tip:</strong> You can edit, add, or delete values directly in DevTools!
        Try changing a value and then refresh the page.
      </p>
    </div>

    <!-- Action buttons -->
    <div class="actions">
      <button @click="logStorageToConsole" class="btn btn-primary">
        Log All Storage to Console
      </button>

      <button @click="clearAllStorage" class="btn btn-danger">
        Clear ALL Storage
      </button>
    </div>

    <!-- Display snapshot if available -->
    <div v-if="storageSnapshot" class="snapshot">
      <h2>Storage Snapshot ({{ storageSnapshot.timestamp }})</h2>

      <div class="snapshot-grid">
        <div class="snapshot-section">
          <h3>localStorage ({{ Object.keys(storageSnapshot.local).length }} keys)</h3>
          <pre
            v-if="Object.keys(storageSnapshot.local).length">{{ JSON.stringify(storageSnapshot.local, null, 2) }}</pre>
          <p v-else class="empty-message">No data in localStorage</p>
        </div>

        <div class="snapshot-section">
          <h3>sessionStorage ({{ Object.keys(storageSnapshot.session).length }} keys)</h3>
          <pre
            v-if="Object.keys(storageSnapshot.session).length">{{ JSON.stringify(storageSnapshot.session, null, 2) }}</pre>
          <p v-else class="empty-message">No data in sessionStorage</p>
        </div>
      </div>
    </div>

    <!-- Code examples -->
    <div class="code-examples">
      <h2>Useful Code Patterns</h2>

      <div class="code-block">
        <h3>Iterate over all keys</h3>
        <pre><code>// Loop through all localStorage keys
for (let i = 0; i &lt; localStorage.length; i++) {
  const key = localStorage.key(i)
  const value = localStorage.getItem(key)
  console.log(key, ':', value)
}</code></pre>
      </div>

      <div class="code-block">
        <h3>Clear all storage (careful!)</h3>
        <pre><code>// Remove EVERYTHING from localStorage
localStorage.clear()

// Remove EVERYTHING from sessionStorage
sessionStorage.clear()</code></pre>
        <p class="warning">
          ⚠️ <strong>Warning:</strong> clear() removes ALL data, not just your app's data!
          In production, prefer removeItem() for specific keys.
        </p>
      </div>

      <div class="code-block">
        <h3>Check if key exists</h3>
        <pre><code>// getItem returns null if key doesn't exist
const value = localStorage.getItem('myKey')

if (value === null) {
  console.log('Key does not exist')
} else {
  console.log('Value:', value)
}</code></pre>
      </div>

      <div class="code-block">
        <h3>Store objects (JSON)</h3>
        <pre><code>// Storage only holds strings!
// Use JSON.stringify to save objects
const user = { name: 'Alice', age: 25 }
localStorage.setItem('user', JSON.stringify(user))

// Use JSON.parse to read objects
const saved = localStorage.getItem('user')
const parsed = JSON.parse(saved)
console.log(parsed.name) // 'Alice'</code></pre>
        <p class="note">
          <strong>Note:</strong> We didn't cover JSON in the main demos to keep things simple,
          but this is how you'd store complex data in real apps!
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles only */
.demo {
  max-width: 800px;
}

/* DevTools guide styling */
.devtools-guide {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: hsla(195, 85%, 52%, 1);
  color: white;
  border-radius: 50%;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content strong {
  display: block;
  margin-bottom: 0.25rem;
}

.step-content p {
  font-size: 0.95rem;
  color: var(--color-text);
  margin: 0;
}

/* Snapshot display */
.snapshot {
  background-color: var(--color-background-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.snapshot h2 {
  margin-top: 0;
}

.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.snapshot-section {
  background-color: var(--color-background);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-border);
}

.snapshot-section pre {
  padding: 0.75rem;
}

.empty-message {
  color: var(--color-text);
  opacity: 0.7;
  font-style: italic;
}

/* Code examples as column */
.code-examples {
  display: flex;
  flex-direction: column;
}
</style>
