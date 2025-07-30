<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// Données réactives
const articles = ref([])
const searchTerm = ref('')

// Charger les articles depuis l’APIa la page dacceil
onMounted(async () => {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/posts?_embed')
    articles.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error)
  }
})

// Articles filtrés par titre
const filteredArticles = computed(() => {
  return articles.value.filter((article) =>
    article.title.rendered.toLowerCase().includes(searchTerm.value.toLowerCase()),
  )
})
</script>

<template>
  <div>
    <h2>Liste des Articles</h2>

    <!-- Champ de recherche -->
    <input
      v-model="searchTerm"
      type="text"
      placeholder="🔍 Rechercher par titre..."
      style="padding: 0.5rem; margin-bottom: 1rem; width: 100%"
    />

    <ul>
      <li v-for="article in filteredArticles" :key="article.id">
        <h3>
          <a
            :href="article.link"
            target="_blank"
            rel="noopener noreferrer"
            v-html="article.title.rendered"
          ></a>
        </h3>
        <small>
          Publié le :
          {{
            new Date(article.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </small>
        <p v-html="article.excerpt.rendered"></p>

        <!-- Affichage image si disponible -->
        <img
          v-if="article._embedded && article._embedded['wp:featuredmedia']"
          :src="article._embedded['wp:featuredmedia'][0].source_url"
          alt="Image de l'article"
          width="300"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>

h2 {
  color: #2c3e50;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
}

h2:after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 10px auto 0;
}

ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}
input {
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
img {
  margin-top: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
/* Add these styles to ArticlesList.vue */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
}

input {
  width: 100%;
  padding: 12px 20px;
  margin: 0 auto 2rem;
  display: block;
  border: 2px solid #ddd;
  border-radius: 25px;
  font-size: 16px;
  transition: border-color 0.3s;
  max-width: 500px;
}

input:focus {
  border-color: #667eea;
  outline: none;
  box-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
}

ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

li {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

h3 a {
  color: #333;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
}

h3 a:hover {
  color: #667eea;
}

small {
  color: #666;
  display: block;
  margin: 0.5rem 0;
}

p {
  color: #555;
  line-height: 1.6;
}

img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 1rem;
}
</style>
