<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps({
  pageTitle: String,
  pageSlug: String
})

const content = ref('')
const loading = ref(true)
const error = ref(null)

onMounted(() => {
  fetchPageContent()
})

const fetchPageContent = async () => {
  try {
    // Replace with your actual WordPress API endpoint
    const response = await axios.get(`https://insidjam.com/wp-json/wp/v2/pages?slug=${props.pageSlug}`)
    
    if (response.data && response.data.length > 0) {
      content.value = response.data[0].content.rendered
    } else {
      content.value = `<h1>${props.pageTitle}</h1><p>Page content not found.</p>`
    }
  } catch (err) {
    console.error('Error fetching page content:', err)
    error.value = 'Failed to load page content'
    content.value = `<h1>${props.pageTitle}</h1><p>Error loading content. Please try again later.</p>`
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="wordpress-page">
    <div v-if="loading" class="loading">
      Loading {{ pageTitle }}...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else v-html="content"></div>
  </div>
</template>

<style scoped>
.wordpress-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #d70d0d;
}
</style>
