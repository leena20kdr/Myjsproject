<!-- src/components/HeaderMenu.vue -->
<template>
  <header class="header">
    <img :src="fallbackLogo" alt="Logo" class="logo" />
    <nav>
      <ul class="menu">
        <li v-for="item in menu" :key="item.ID">
          <router-link :to="item.url">{{ item.title }}</router-link> <!-- Utiliser router-link -->
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchMenu } from '../composables/useWordpressAPI.js';

const props = defineProps({
  menuEndpoint: String,
  fallbackLogo: String
});

const menu = ref([]);

onMounted(async () => {
  menu.value = await fetchMenu(props.menuEndpoint);
});
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
.logo {
  height: 50px;
  margin-right: 2rem;
}
.menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
}
.menu li a {
  text-decoration: none;
  color: #333;
}
</style>
