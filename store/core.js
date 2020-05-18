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
  async authorize ({ commit }, payload) {
    this.$axios.setHeader('X-Auth-Client', process.env.CLIENT_ID)
    this.$axios.setHeader('X-Auth-Token', process.env.ACCESS_TOKEN)
    const body = {
      channel_id: 1,
      expires_at: 1602288000,
      allowed_cors_origins: [
        'https://nuxt-store.netlify.app'
      ]
    }
    const { data } = await this.$axios.$post(process.env.AUTHORIZE_URL, body)
    commit('setToken', data.token)
  }
}
