<script setup>
import ArticlesList from '../components/ArticlesList.vue'
import Header from '../components/Header.vue'
</script>

<template>
  <main>
    <Header />
    <div class="container">
      <ArticlesList />
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
</style>
