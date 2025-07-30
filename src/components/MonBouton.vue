<script setup>
import { ref } from 'vue'

defineProps({
  titre: String,
})
const compteur = ref(0)

function augmenter() {
  compteur.value++
}
</script>
<template>
  <div>
    <-- Display the prop right here -->
    <h2>{{ titre }}</h2>
    <h3>already clicked {{ compteur }} times</h3>
    <button @click="augmenter">click here to increase the counter</button>
  </div>
</template>

<style scoped>
button {
  background-color: rgb(242, 19, 131);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: rgb(242, 19, 131);
}
</style>
