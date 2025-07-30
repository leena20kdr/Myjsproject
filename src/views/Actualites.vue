
<script setup>
import WordPressPage from '../components/WordPressPage.vue'

defineOptions({
  name: 'ActualitesView'
})
</script>

<template>
  <main>
    <WordPressPage pageTitle="Actualités et perspectives" pageSlug="actualites" />
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
}
</style>
