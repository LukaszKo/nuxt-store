export const state = () => ({
  token: null
})

export const mutations = {
  setToken (state, payload) {
    state.token = payload
  },
  clearToken (state) {
    state.token = null
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
      `${process.env.SERVER_URL}/api/auth`,
      body
    )
    this.$axios.setHeader('Authorization', `Bearer ${data.token}`, 'common')
    commit('setToken', data.token)
  },
  runQuery ({ state }, payload) {
    return this.$axios.$post(process.env.BASE_URL, payload, {
      headers: { Authorization: `Bearer ${state.token}` }
    })
  }
}
