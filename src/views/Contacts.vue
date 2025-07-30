<script setup>
import WordPressPage from '../components/WordPressPage.vue'

defineOptions({
  name: 'ContactsPage'
})
</script>

<template>
  <main>
    <WordPressPage pageTitle="Contacts" pageSlug="contacts" />
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
}
</style>
