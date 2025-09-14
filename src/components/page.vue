  <template>
  <div class="page-wrap">
    <div v-if="loading" class="hint">Chargement…</div>

    <template v-else>
      <div v-if="page">
        <h1 v-html="page.title.rendered"></h1>
        <div v-html="html"></div>
      </div>
      <div v-else class="hint error">Page introuvable.</div>
    </template>
  </div>
</template>

<script setup>
defineOptions({ name: 'PageView' })
import { ref, watch, computed } from 'vue'
import axios from 'axios'

const props = defineProps({
  slug: { type: String, required: true } // ex. "nos-clients" OU "parent/enfant"
})

const API = 'https://insidjam.com/wp-json/wp/v2'
const page = ref(null)
const loading = ref(true)
const html = ref('')

// on prend le dernier segment comme slug WordPress
const wpSlug = computed(() => {
  return (props.slug || '')
    .split('/')
    .filter(Boolean)
    .pop() || ''
})

watch(wpSlug, async () => {
  await fetchPage()
}, { immediate: true })

async function fetchPage() {
  loading.value = true
  page.value = null
  html.value = ''

  try {
    const res = await axios.get(`${API}/pages?slug=${encodeURIComponent(wpSlug.value)}`)
    const p = res.data?.[0]
    page.value = p || null

    if (!p) return

    // contenu brut depuis WP
    let content = p.content?.rendered || ''

    // 1) si WP a déjà rendu du HTML -> on l’affiche
    // 2) sinon, on essaie de convertir au moins les [vc_single_image]
    const needsVC = /\[vc_single_image/i.test(content)

    if (!needsVC) {
      html.value = content
      return
    }

    // Remplacement des [vc_single_image] par des <img> en allant chercher les médias
    html.value = await renderVCImages(content)

  } catch (e) {
    console.error('Erreur chargement page', e)
  } finally {
    loading.value = false
  }
}

/**
 * Remplace les shortcodes [vc_single_image image="123"...] par <img src="...">
 * - gère aussi les guillemets français « » “” et espaces bizarres
 */
async function renderVCImages(content) {
  // récupérer tous les IDs
  const idSet = new Set()
  const re = /\[vc_single_image[\s\S]*?image\s*=\s*["“”«»]?(\d+)["“”«»]?/gi
  let m
  while ((m = re.exec(content)) !== null) idSet.add(m[1])

  if (idSet.size === 0) return content

  // fetch médias
  const ids = Array.from(idSet)
  const map = {} // id -> url
  try {
    const requests = ids.map(id => axios.get(`https://insidjam.com/wp-json/wp/v2/media/${id}`))
    const responses = await Promise.allSettled(requests)
    responses.forEach((r, i) => {
      const id = ids[i]
      if (r.status === 'fulfilled') {
        map[id] = r.value.data?.source_url || ''
      } else {
        map[id] = ''
      }
    })
  } catch (e) {
    console.warn('Erreur récupération media', e)
  }

  // Remplace chaque shortcode par une balise <img>
  const replaced = content.replace(/\[vc_single_image[\s\S]*?image\s*=\s*["“”«»]?(\d+)["“”«»]?.*?\]/gi, (match, id) => {
    const src = map[id] || ''
    // si on n’a pas trouvé l’URL, on garde un placeholder discret
    if (!src) return '<div class="img-missing" style="opacity:.6">[image introuvable]</div>'
    return `<img src="${src}" alt="" style="max-width:100%;height:auto;display:block;margin:12px auto;" />`
  })

  return replaced
}
</script>

<style scoped>
.page-wrap { background:#fff; padding:2rem; border-radius:12px; max-width:1100px; margin:0 auto; }
.hint { opacity:.7; }
.error { color:#b00020; }
</style>
