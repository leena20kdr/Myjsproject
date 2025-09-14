<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const aproposContent = ref('')

async function fetchAPropos() {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/pages?_embed')
    const page = response.data.find(p => p.title.rendered.toLowerCase().includes("à propos") || p.title.rendered.toLowerCase().includes("a propos"))
    aproposContent.value = page ? page.content.rendered : ''
    console.log('Page À propos :', page)
  } catch (error) {
    console.error('Erreur À propos :', error)
  }
}

onMounted(() => { fetchAPropos() })
</script>

<template>
  <section class="apropos" v-html="aproposContent"></section>
</template>

<style scoped>
.apropos { padding: 50px 20px; text-align: center; background-color: #fff; }
</style>
