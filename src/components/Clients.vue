<template>
  <div class="clients-page">
    <h1>{{ title }}</h1>

    <!-- si la page est en cours de chargement -->
    <p v-if="loading">Chargement...</p>

    <!-- si erreur -->
    <p v-if="error" class="error">{{ error }}</p>

    <!-- contenu WordPress rendu tel quel -->
    <div v-html="content" class="wp-content"></div>
  </div>
</template>

<script setup>
defineOptions({ name: 'ClientsPage' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const title = ref('Nos Clients')
const content = ref('')
const loading = ref(true)
const error = ref('')

// slug de la page WordPress
const slug = 'clients'

onMounted(async () => {
  try {
    const res = await axios.get(`https://insidjam.com/wp-json/wp/v2/pages?slug=${slug}`)
    if (res.data.length > 0) {
      title.value = res.data[0].title.rendered
      content.value = res.data[0].content.rendered
    } else {
      error.value = 'Page introuvable dans WordPress'
    }
  } catch (err) {
    error.value = 'Erreur lors du chargement'
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.clients-page {
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
}

.wp-content {
  margin-top: 1rem;
}

/* style simple pour erreurs */
.error {
  color: red;
}
</style>
