<template>
  <header class="site-header">
    <nav class="navbar">
      <ul>
        <li v-for="item in menuItems" :key="item.ID">
          <!-- Liens internes -> RouterLink -->
          <RouterLink v-if="isInternal(item.url)" :to="toInternalPath(item.url)">
            {{ item.title }}
          </RouterLink>

          <!-- Liens externes (au cas où) -->
          <a v-else :href="item.url" target="_blank" rel="noopener">
            {{ item.title }}
          </a>

          <!-- Sous-menus -->
          <ul v-if="item.children?.length">
            <li v-for="child in item.children" :key="child.ID">
              <RouterLink v-if="isInternal(child.url)" :to="toInternalPath(child.url)">
                {{ child.title }}
              </RouterLink>
              <a v-else :href="child.url" target="_blank" rel="noopener">
                {{ child.title }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
defineOptions({ name: 'AppNavbar' })
import { ref, onMounted } from 'vue'
import axios from 'axios'

const menuItems = ref([])

const SITE = 'https://insidjam.com'

function isInternal(url) {
  try {
    const u = new URL(url)
    return u.origin === SITE
  } catch {
    return false
  }
}

function toInternalPath(url) {
  try {
    const u = new URL(url)
    // pathname sans trailing slash
    let p = u.pathname.replace(/\/+$/, '')
    // / ou /accueil -> /
    if (p === '' || p === '/' || p === '/accueil') return '/'
    return p
  } catch {
    return '/'
  }
}

onMounted(async () => {
  try {
    const res = await axios.get(`${SITE}/wp-json/menus/v1/menus/main-menu`)
    menuItems.value = res.data.items || []
  } catch (err) {
    console.error('Erreur récupération menu', err)
  }
})
</script>

<style scoped>
.site-header { background:#222; padding:15px 20px; }
.navbar ul { display:flex; gap:20px; list-style:none; margin:0; padding:0; }
.navbar a, .navbar :deep(a.router-link-active) { color:#fff; text-decoration:none; }
.navbar :deep(a.router-link-active) { font-weight:600; text-decoration:underline; }
.navbar ul ul { display:block; position:absolute; background:#222; padding:10px; margin-top:8px; }
.navbar li { position:relative; }
.navbar li:hover > ul { display:block; }
</style>
