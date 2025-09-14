<script setup>
defineOptions({ name: 'SecteursPage' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const secteurList = ref([])
const pageContent = ref('')

async function fetchSecteurs() {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/wp/v2/pages?_embed')
    const page = response.data.find(p => p.title.rendered.toLowerCase().includes("secteur"))

    console.log('Page Secteurs récupérée :', page)

    if (page) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(page.content.rendered, 'text/html')
      const blocs = Array.from(doc.querySelectorAll('h3'))

      if (blocs.length > 0) {
        secteurList.value = blocs.map(h3 => {
          const img = h3.nextElementSibling?.querySelector('img')?.src || ''
          const description = h3.nextElementSibling?.textContent || ''
          return { title: h3.textContent, description, image: img }
        })
      } else {
        pageContent.value = page.content.rendered
      }
    }
  } catch (error) {
    console.error('Erreur Secteurs :', error)
  }
}

onMounted(() => {
  fetchSecteurs()
})
</script>
