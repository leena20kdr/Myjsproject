<script setup>
import { ref } from 'vue'

// tableau dynamique d'images (ici j'ai mis des exemples de liens WordPress)
const images = ref([
  "https://insidjam.com/wp-content/uploads/2023/12/photo1.jpg",
  "https://insidjam.com/wp-content/uploads/2023/12/photo2.jpg",
  "https://insidjam.com/wp-content/uploads/2023/12/photo3.jpg"
])
</script>

<template>
  <div class="gallery">
    <h2>Galerie dynamique</h2>
    <div class="images">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        alt="image dynamique"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  padding: 20px;
  text-align: center;
}
.images {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}
.images img {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
.images img:hover {
  transform: scale(1.05);
}
</style>


