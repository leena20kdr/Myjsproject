<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import WordPressPage from '../components/WordPressPage.vue'

const dropdownItems = ref([])

const fetchDropdownMenuItems = async () => {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/menus/v1/menus/15')
    if (response.data && response.data.items) {
      // Fonction récursive pour récupérer tous les items avec sous-menus
      
      const findDropdowns = (items) => {
        let dropdowns = []
        for (const item of items) {
          if (item.child_items && item.child_items.length) {
            dropdowns.push({
              title: item.title,
              url: item.url,
              children: item.child_items,
            })
          }
          if (item.child_items) {
            dropdowns = dropdowns.concat(findDropdowns(item.child_items))
          }
        }
        return dropdowns
      }
      dropdownItems.value = findDropdowns(response.data.items)
    }
  } catch {
    dropdownItems.value = []
  }
}

onMounted(() => {
  fetchDropdownMenuItems()
})
</script>

<template>
  <main>
    <WordPressPage pageTitle="Produits et services" pageSlug="produits-et-services" />

    <section v-if="dropdownItems.length" style="margin-top: 2rem">
      <h2>Menu avec sous-menus</h2>
      <ul>
        <li v-for="item in dropdownItems" :key="item.title">
          <strong>{{ item.title }}</strong>
          <ul>
            <li v-for="child in item.children" :key="child.id">
              <a :href="child.url" target="_blank" rel="noopener noreferrer">{{ child.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
main {
  background-color: #f5f5f5;
}
</style>
