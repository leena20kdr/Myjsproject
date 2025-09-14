<template>
  <section class="hero">
    <div class="container">
      <h1>{{ title }}</h1>
      <p class="lead">Reproduction dynamique du site InsidJam — contenu tiré de WordPress.</p>
    </div>
  </section>
</template>

<script setup>
const { title } = defineProps({ title: String })
</script>

<style scoped>
.hero { padding: 2.5rem 0; background: linear-gradient(#fff,#f7f7f7); border-bottom:1px solid #eee; }
.lead { color:#666; }
</style>
