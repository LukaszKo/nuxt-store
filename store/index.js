export const state = () => ({
  token: null,
  product: null,
  categories: []
})

export const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  clearToken (state) {
    state.token = null
  },
  setProduct (state, payload) {
    state.product = payload
  },
  setCategories (state, payload) {
    state.categories = payload
  }
}

export const getters = {
  isAuthenticated: state => state.token != null
}

export const actions = {
  async authorize ({ commit, state }) {
    if (state.token) { return }
    const body = {
      channel_id: 1,
      expires_at: 1602288000,
      allowed_cors_origins: ['https://nuxt-store.netlify.app']
    }
    const { data } = await this.$axios.$post(
      `${process.env.FUNCTIONS_API}/auth`,
      body
    )
    this.$axios.setHeader('Authorization', `Bearer ${data.token}`, 'common')
    commit('setToken', data.token)
  },
  runQuery ({ state }, payload) {
    return this.$axios.$post(`${process.env.FUNCTIONS_API}/query`, { query: payload, token: state.token })
  }
}
