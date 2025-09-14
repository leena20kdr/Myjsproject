<template>
  <footer class="site-footer">
    <div class="footer-container">

      <!-- Bloc Pages -->
      <div class="footer-section">
        <h3>Pages</h3>
        <ul>
          <li v-for="page in pages" :key="page.id">
            <router-link :to="'/' + page.slug">{{ page.title.rendered }}</router-link>
          </li>
        </ul>
      </div>

      <!-- Bloc Catégories -->
      <div class="footer-section">
        <h3>Catégories</h3>
        <ul>
          <li v-for="cat in categories" :key="cat.id">
            <router-link :to="'/category/' + cat.slug">{{ cat.name }}</router-link>
          </li>
        </ul>
      </div>

    </div>
    <p class="footer-copy">© 2025 Mon Site. Tous droits réservés.</p>
  </footer>
</template>

<script setup>
defineOptions({ name: 'SiteFooter' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const pages = ref([])
const categories = ref([])

onMounted(async () => {
  try {
    // Récupération des pages
    const resPages = await axios.get('https://insidjam.com/wp-json/wp/v2/pages')
    pages.value = resPages.data

    // Récupération des catégories
    const resCats = await axios.get('https://insidjam.com/wp-json/wp/v2/categories')
    categories.value = resCats.data
  } catch (err) {
    console.error('Erreur Footer', err)
  }
})
</script>

<style scoped>
.site-footer {
  background: #222;
  color: #fff;
  padding: 2rem 1rem;
  margin-top: 2rem;
}
.footer-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.footer-section h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
.footer-section ul {
  list-style: none;
  padding: 0;
}
.footer-section li {
  margin: 0.3rem 0;
}
.footer-section a {
  color: #ddd;
  text-decoration: none;
}
.footer-section a:hover {
  color: #fff;
  text-decoration: underline;
}
.footer-copy {
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #aaa;
}
</style>
