<script setup>
defineOptions({ name: 'AppHeader' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const menuItems = ref([])
const isMenuLoading = ref(true)

const fetchMenu = async () => {
  try {
    const response = await axios.get('https://insidjam.com/wp-json/menus/v1/menus/15')
    if (response.data && response.data.items) {
      // Fonction récursive pour mapper toute la structure du menu (sous-menus inclus)
      const mapMenu = (items) => {
        return items.map((item) => ({
          id: item.ID || item.id,
          title: item.title,
          url: item.url,
          child_items: item.child_items ? mapMenu(item.child_items) : [],
        }))
      }
      menuItems.value = mapMenu(response.data.items)
    }
  } catch (error) {
    console.error('Erreur lors du chargement du menu:', error)
    menuItems.value = []
  } finally {
    isMenuLoading.value = false
  }
}

onMounted(() => {
  fetchMenu()
})
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <h1>Mon Site WordPress</h1>
      </div>
      <ul>
        <li v-if="isMenuLoading"><a href="#">Chargement...</a></li>
        <li v-else v-for="item in menuItems" :key="item.id" style="position: relative">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
          <template v-if="item.child_items && item.child_items.length">
            <ul
              style="
                position: absolute;
                left: 0;
                top: 100%;
                background: #fff;
                color: #000;
                min-width: 200px;
                z-index: 1000;
                display: none;
              "
            >
              <template v-for="child in item.child_items" :key="child.id">
                <li style="position: relative">
                  <a :href="child.url" target="_blank" rel="noopener noreferrer">{{
                    child.title
                  }}</a>
                  <template v-if="child.child_items && child.child_items.length">
                    <ul
                      style="
                        position: absolute;
                        left: 100%;
                        top: 0;
                        background: #fff;
                        color: #000;
                        min-width: 200px;
                        z-index: 1000;
                        display: none;
                      "
                    >
                      <li v-for="subchild in child.child_items" :key="subchild.id">
                        <a :href="subchild.url" target="_blank" rel="noopener noreferrer">{{
                          subchild.title
                        }}</a>
                      </li>
                    </ul>
                  </template>
                </li>
              </template>
            </ul>
          </template>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: #d70d0dff;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 1);
  width: 100%;
  position: relative;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0 2vw;
  box-sizing: border-box;
}

.logo h1 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
}

ul {
  display: flex;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

li {
  margin-left: 1.5rem;
}

a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover {
  color: #000000ff;
}
/* Centrage du contenu principal de la page */
#app > *:not(header) {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
</style>
