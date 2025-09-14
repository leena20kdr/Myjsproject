<template>
  <div class="page-accueil">
    <!-- Chaque section charge dynamiquement le contenu WordPress par slug -->
    <PageSection pageSlug="home" />
    <PageSection pageSlug="produits-services" />
    <PageSection pageSlug="secteurs-activites" />
    <PageSection pageSlug="actualites-perspectives" />
    <PageSection pageSlug="clients" />
    <PageSection pageSlug="a-propos" />
    <PageSection pageSlug="contact" />
  </div>
</template>

<script setup>
import PageSection from '@/components/PageSection.vue'

defineOptions({
  name: 'PageAccueil'
})
</script>

<style scoped>
.page-accueil {
  display: flex;
  flex-direction: column;
  gap: 80px; /* espacement entre les sections */
  width: 100%;
}
</style>
