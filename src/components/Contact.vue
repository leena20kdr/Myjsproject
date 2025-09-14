<script setup>
defineOptions({ name: 'AppContacts' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const contactContent = ref('')

async function fetchContact() {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/pages?_embed')
    const page = response.data.find(p => p.title.rendered.toLowerCase().includes("contact"))
    contactContent.value = page ? page.content.rendered : ''
    console.log('Page Contact :', page)
  } catch (error) {
    console.error('Erreur Contact :', error)
  }
}

onMounted(() => { fetchContact() })
</script>

<template>
  <section class="contact" v-html="contactContent"></section>
</template>

<style scoped>
.contact { padding: 50px 20px; text-align: center; background-color: #f1f1f1; }
</style>
