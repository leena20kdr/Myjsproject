import axios from 'axios'
const API_URL = 'https://insidjam.com/wp-json/wp/v2'
export default {
  async fetchHomeData() {
    try {
      const res = await axios.get(`${API_URL}/posts?_embed&per_page=6&page=1`)
      return { posts: res.data }
    } catch (error) {
      console.error('Erreur API WordPress:', error)
      return { posts: [] }
    }
  },
}
