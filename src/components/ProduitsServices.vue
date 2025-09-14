<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const produitsHtml = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('https://insidjam.com/wp-json/wp/v2/pages?slug=accueil&_embed')
    const homePage = res.data[0]

    if (homePage) {
      const content = homePage.content.rendered

      // Extraction du bloc "Produit et Services"
      const regex = /(<h2[^>]*>Produit et Services<\/h2>[\s\S]*?)(?=<h2|$)/i
      const match = content.match(regex)

      if (match) {
        produitsHtml.value = match[1]
      } else {
        produitsHtml.value = '<p>Bloc "Produit et Services" introuvable.</p>'
      }
    }
  } catch (err) {
    console.error('Erreur API WordPress:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="produits-services">
    <h2 class="section-title">Produit et Services</h2>
    <div v-if="loading">Chargement...</div>
    <div v-else v-html="produitsHtml"></div>
  </section>
</template>

<style scoped>
.produits-services {
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 2rem 0;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}
</style>
