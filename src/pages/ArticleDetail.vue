<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const article = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://insidjam.com/wp-json/wp/v2/posts/${route.params.id}?_embed`
    )
    article.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement de l’article', error)
  }
})
</script>

<template>
  <div v-if="article">
    <h1 v-html="article.title.rendered"></h1>

    <img
      v-if="article._embedded?.['wp:featuredmedia']?.[0]?.source_url"
      :src="article._embedded['wp:featuredmedia'][0].source_url"
      alt="Image"
      style="max-width: 100%; height: auto;"
    />

    <div v-html="article.content.rendered"></div>
  </div>
  <div v-else>Chargement...</div>
</template>
