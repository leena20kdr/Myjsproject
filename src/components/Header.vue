<template>
  <header class="site-header">
    <div class="container">
      <!-- Logo -->
      <a href="/" class="logo">
        <img :src="logoUrl" alt="Logo" />
      </a>

      <!-- Menu -->
      <nav class="menu">
        <a
          v-for="item in menuItems"
          :key="item.id"
          :href="item.link"
          class="menu-link"
        >
          {{ item.title }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
defineOptions({ name: 'SiteHeader' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const logoUrl = ref('')
const menuItems = ref([])

onMounted(async () => {
  try {
    // Récupération du logo
    const siteInfo = await axios.get('https://insidjam.com/wp-json')
    logoUrl.value = siteInfo.data.site_logo || '/default-logo.png'

    // Récupération du menu WordPress
    const res = await axios.get('https://insidjam.com/wp-json/wp-api-menus/v2/menus/2')
    menuItems.value = res.data.items.map(item => ({
      id: item.ID,
      title: item.title,
      link: item.url
    }))
  } catch (e) {
    console.error('Erreur Navbar', e)
  }
})
</script>

<style scoped>
.site-header {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.container {
  max-width: 1200px;
  margin: auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}
.logo img {
  height: 50px;
}
.menu {
  display: flex;
  gap: 2rem;
}
.menu-link {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}

</style>
