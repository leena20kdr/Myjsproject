<script setup>
defineOptions({
  name: 'ClientsPageView',
})

import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import WordPressPage from '../components/WordPressPage.vue'

const articles = ref([])
const searchTerm = ref('')

onMounted(async () => {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/posts?_embed')
    articles.value = response.data
  } catch {
    articles.value = []
  }





})

const filteredArticles = computed(() => {
  return articles.value.filter(article =>
    article.title.rendered.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})
</script>

<template>
  <main>
    <WordPressPage pageTitle="Clients" pageSlug="clients" />

    <!-- Barre de recherche -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="🔍 Rechercher par titre..."
      style="padding: 0.5rem; margin: 2rem 0 1rem 0; width: 100%;"
    />

    <div v-for="article in filteredArticles" :key="article.id" style="background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 2rem; padding: 1.5rem; max-width: 600px; margin-left:auto; margin-right:auto;">
      <!-- Image associée -->
      <img
        v-if="article._embedded && article._embedded['wp:featuredmedia']"
        :src="article._embedded['wp:featuredmedia'][0].source_url"
        alt="Image de l'article"
        style="width:100%; max-width:400px; display:block; margin:0 auto 1rem auto; border-radius:8px;"
      />
      <!-- Titre -->
      <h3 v-html="article.title.rendered" style="margin-bottom:0.5rem; text-align:center;"></h3>
      <!-- 15 premiers mots du contenu -->
      <p style="text-align:center; color:#444;">
        {{ article.content.rendered.replace(/<[^>]+>/g, '').split(/\s+/).slice(0, 15).join(' ') }}...
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
}
</style>
