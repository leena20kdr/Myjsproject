<template>
  <div id="app">
    <Navbar />   <!-- 🔹 Header -->
    <main>
      <router-view />
    </main>
    <Footer />   <!-- 🔹 Footer -->
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
#app {
  font-family: Inter, system-ui, Arial, sans-serif;
  background: #f5f5f5;
  min-height: 100vh;
  color: #222;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1; /* pousse le footer en bas */
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
