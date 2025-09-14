<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// Récupère la route actuelle (permet de lire :slug depuis l'URL)
const route = useRoute()

const pageContent = ref('')
const loading = ref(true)

// Fonction pour récupérer une page via son slug
async function fetchPage(slug) {
  try {
    loading.value = true
    // Appel direct avec le slug (plus rapide que tout charger)
    const response = await axios.get(`https://insidjam.com/wp-json/wp/v2/pages?slug=${slug}`)

    if (response.data.length > 0) {
      const page = response.data[0]
      pageContent.value = page.content.rendered
      console.log(`Page "${slug}" trouvée :`, page)
    } else {
      pageContent.value = `<p style="color:red;">Page "${slug}" non trouvée</p>`
      console.warn(`Page "${slug}" non trouvée.`)
    }
  } catch (error) {
    pageContent.value = `<p style="color:red;">Erreur lors de la récupération de la page "${slug}"</p>`
    console.error(`Erreur lors de la récupération de "${slug}" :`, error)
  } finally {
    loading.value = false
  }
}

// Charger quand le composant est monté
onMounted(() => {
  fetchPage(route.params.slug)
})

// Recharger si l’URL change (exemple : de /nos-clients → /a-propos)
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) fetchPage(newSlug)
  }
)
</script>

<template>
  <section class="page-section">
    <div v-if="loading">Chargement...</div>
    <div v-else v-html="pageContent"></div>
  </section>
</template>

<style scoped>
.page-section {
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
}
</style>
