<template>
  <section class="products-services">
    <div class="container">
      <h2 class="section-title">Produits et Services</h2>

      <div v-if="loading">Chargement...</div>
      <div v-else v-html="produitsHtml"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'   // <-- ici
import axios from 'axios'

const produitsHtml = ref('')
const loading = ref(true)

onMounted(async () => {   // <-- c'est cette fonction qu'on modifie
  try {
    const res = await axios.get('https://insidjam.com/wp-json/wp/v2/pages?slug=accueil&_embed')
    const homePage = res.data[0]

    if (homePage) {
      const content = homePage.content.rendered

      // Liste juste tous les titres h2 pour identifier le vrai
      const titres = content.match(/<h2[^>]*>.*?<\/h2>/gi) || []
      console.log('Titres trouvés:', titres)

      produitsHtml.value = titres.join('<br>') // affichage temporaire
    }
  } catch (err) {
    console.error('Erreur API WordPress:', err)
  } finally {
    loading.value = false
  }
})
</script>
