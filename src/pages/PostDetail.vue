<template>
  <div class="post-detail">
    <div v-if="post">
      <h1 class="title" v-html="post.title.rendered"></h1>

      <img
        v-if="post._embedded?.['wp:featuredmedia']?.[0]?.source_url"
        :src="post._embedded['wp:featuredmedia'][0].source_url"
        class="featured-img"
        alt="Image de l’article"
      />

      <div class="content" v-html="post.content.rendered"></div>
    </div>
    <div v-else>
      <p>Chargement...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://insidjam.com/wp-json/wp/v2/posts/${route.params.id}?_embed`
    )
    post.value = response.data
  } catch (err) {
    console.error('Erreur lors du chargement de l’article', err)
  }
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0,0,0,0.1);
}
.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  padding-top: 1.5rem;
  padding-left: 1.5rem;
}
.featured-img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}
.content {
  padding: 0 1.5rem 2rem;
  line-height: 1.6;
}
</style>
