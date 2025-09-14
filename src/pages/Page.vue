<template>
  <div class="page-container" v-if="page">
    <!-- titre de la page -->
    <h1 v-html="page.title.rendered"></h1>

    <!-- contenu principal (texte + images transformées) -->
    <div v-html="parsedContent"></div>

    <!-- image mise en avant (si disponible) -->
    <div v-if="featuredImage" class="featured">
      <img :src="featuredImage" alt="Image mise en avant" />
    </div>
  </div>

  <!-- état de chargement -->
  <div v-else>
    <p>Chargement...</p>
  </div>
</template>

<script setup>
defineOptions({ name: 'CustomPage' })

import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const page = ref(null)
const featuredImage = ref(null)
const parsedContent = ref('')

const props = defineProps({
  slug: {
    type: String,
    default: null,
  },
})

// 👉 Fonction pour parser et remplacer les shortcodes [vc_single_image]
async function parseShortcodes(content) {
  let newContent = content

  // Regex plus flexible : capture "image=…"
  const regex = /\[vc_single_image[^\]]*?image\s*=\s*["'«»“”&Prime;]+(\d+)["'«»“”&Prime;]+[^\]]*?\]/g

  let match
  while ((match = regex.exec(content)) !== null) {
    const imageId = match[1]
    console.log('🔎 Image trouvée avec ID:', imageId)

    try {
      const { data } = await axios.get(
        `https://insidjam.com/wp-json/wp/v2/media/${imageId}`
      )
      console.log('✅ API image:', data.source_url)

      const imageUrl = data.source_url
      newContent = newContent.replace(
        match[0],
        `<img src="${imageUrl}" alt="image" style="max-width:100%;margin:1rem auto;display:block;" />`
      )
    } catch (err) {
      console.error('❌ Erreur chargement image', imageId, err)
    }
  }

  return newContent
}


// Fonction pour récupérer une page depuis WordPress
async function fetchPage(slug) {
  try {
    const { data } = await axios.get(
      `https://insidjam.com/wp-json/wp/v2/pages?slug=${slug}&_embed&_fields=title,content,_embedded`
    )

    if (data.length > 0) {
      page.value = data[0]
      featuredImage.value =
        page.value._embedded?.['wp:featuredmedia']?.[0]?.source_url || null

      // Parser le contenu pour remplacer les shortcodes
      parsedContent.value = await parseShortcodes(page.value.content.rendered)
    } else {
      page.value = null
      parsedContent.value = ''
    }
  } catch (err) {
    console.error('Erreur chargement page', err)
  }
}

// Au montage → charge la page courante
onMounted(() => {
  const slug = props.slug || route.params.slug
  fetchPage(slug)
})

// Quand on change de route → recharge la bonne page
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) fetchPage(newSlug)
  }
)
</script>
<style scoped>
.page-container {
  max-width: 1000px; /* largeur max du contenu */
  margin: 2rem auto; /* centre horizontalement */
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center; /* ✅ texte centré */
  line-height: 1.6;
  font-size: 1rem;
}

/* toutes les images du contenu WordPress */
.page-container img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 1.5rem auto; /* centre les images */
  border-radius: 6px;
  object-fit: contain;
}

/* image mise en avant */
.featured img {
  max-width: 100%;
  margin: 1.5rem auto;
  border-radius: 6px;
  display: block;
}

/* Responsive design */
@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
    font-size: 0.95rem;
  }

  .page-container img,
  .featured img {
    margin: 1rem auto;
  }
}
</style>
