<script setup>
defineOptions({ name: 'ActualitesSection' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const posts = ref([])

async function fetchActualites() {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/posts?_embed&per_page=5')
    posts.value = response.data.map(post => {
      return {
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        image: post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : ''
      }
    })
    console.log('Posts récupérés :', posts.value)
  } catch (error) {
    console.error('Erreur Actualités :', error)
  }
}

onMounted(() => {
  fetchActualites()
})
</script>

<template>
  <section class="actualites">
    <h2>Actualités</h2>
    <div class="cartes-container">
      <div class="carte" v-for="(post, index) in posts" :key="index">
        <img :src="post.image" :alt="post.title" v-if="post.image"/>
        <h3 v-html="post.title"></h3>
        <div v-html="post.excerpt"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.actualites { padding: 50px 20px; text-align: center; background-color: #fff; }
.actualites h2 { margin-bottom: 40px; font-size: 2em; }
.cartes-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
.carte { background: #f9f9f9; padding: 20px; width: 300px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center; }
.carte img { max-width: 100%; height: auto; margin-bottom: 15px; }
.carte h3 { margin-bottom: 10px; font-size: 1.2em; }
</style>
