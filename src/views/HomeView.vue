<script setup>
/**
 * HomeView.vue - Landing page for the Storage Demos app
 * 
 * This page provides an overview of what learners will explore
 * and sets expectations for the training session.
 */
</script>

<template>
  <div class="home">
    <h1>Browser Storage APIs Demo</h1>

    <p class="intro">
      Welcome to this hands-on training session! You'll learn how to use
      <strong>localStorage</strong> and <strong>sessionStorage</strong>
      to create better user experiences.
    </p>

    <section class="what-you-learn">
      <h2>What You'll Learn</h2>
      <ul>
        <li>How to <strong>save</strong> data with <code>setItem()</code></li>
        <li>How to <strong>read</strong> data with <code>getItem()</code></li>
        <li>How to <strong>remove</strong> data with <code>removeItem()</code></li>
        <li>How to handle <strong>missing values</strong> (when data doesn't exist yet)</li>
        <li>The <strong>difference</strong> between localStorage and sessionStorage</li>
        <li>How to <strong>inspect</strong> storage in DevTools</li>
      </ul>
    </section>

    <section class="demos-overview">
      <h2>Demo Pages</h2>
      <ol>
        <li>
          <strong>Theme Preference</strong> - Save light/dark mode to localStorage
        </li>
        <li>
          <strong>Display Name</strong> - Persist user input across page reloads
        </li>
        <li>
          <strong>Session vs Local</strong> - Compare the two storage types side-by-side
        </li>
        <li>
          <strong>DevTools Helper</strong> - Learn to inspect and debug storage
        </li>
      </ol>
    </section>

    <section class="quick-reference">
      <h2>Quick Reference</h2>
      <div class="code-examples">
        <div class="code-block">
          <h3>localStorage (persists forever)</h3>
          <pre><code>// Save data
localStorage.setItem('key', 'value')

// Read data
const value = localStorage.getItem('key')

// Remove data
localStorage.removeItem('key')</code></pre>
        </div>
        <div class="code-block">
          <h3>sessionStorage (clears when tab closes)</h3>
          <pre><code>// Save data
sessionStorage.setItem('key', 'value')

// Read data  
const value = sessionStorage.getItem('key')

// Remove data
sessionStorage.removeItem('key')</code></pre>
        </div>
      </div>
    </section>

    <p class="get-started">
      Use the navigation on the left to explore each demo.
      <strong>Don't forget to open DevTools!</strong>
    </p>
  </div>
</template>

<style scoped>
/* Component-specific styles only */
.home {
  max-width: 800px;
}

.home h1 {
  font-size: 2rem;
}

.home h2 {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.intro {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.code-examples {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin-top: 1rem;
}

.get-started {
  margin-top: 2rem;
  padding: 1rem;
  background-color: hsla(195, 85%, 52%, 0.1);
  border-radius: 8px;
  border-left: 4px solid hsla(195, 85%, 52%, 1);
}
</style>
