<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Variable réactive pour stocker les images
const images = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/media')
    images.value = response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des images :', error)
  }
})
</script>

<template>
  <div class="media-gallery">
    <h2>Galerie d'images</h2>
    <div class="images">
      <div v-for="image in images" :key="image.id" class="image-item">
        <img :src="image.source_url" :alt="image.alt_text || 'Image'" />
      </div>
    </div>
  </div>
</template>

<style>
.media-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.image-item img {
  max-width: 200px;
  border-radius: 8px;
}
</style>
