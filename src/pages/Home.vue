<template>
  <div class="home">
    <p>Page d’accueil de l’app Vue. Utilise le menu pour naviguer.</p>

    <HeroSection />
    <ProductsServices />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HOME/HeroSection.vue'
import ProductsServices from '@/components/HOME/ProductsServices.vue'
defineOptions({
  name: 'HomePage',
})
</script>

<style scoped>
.home {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
}
</style>
