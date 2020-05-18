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
  async authorize ({ commit, state }, payload) {
    if (state.token) { return }
    const body = {
      channel_id: 1,
      expires_at: 1602288000,
      allowed_cors_origins: ['http://localhost:3000']
    }
    const { data } = await this.$axios.$post('http://localhost:4200/api/auth', {
      authorizeUrl: process.env.AUTHORIZE_URL,
      body,
      headers: {
        'X-Auth-Client': process.env.CLIENT_ID,
        'X-Auth-Token': process.env.ACCESS_TOKEN
      }
    })
    commit('setToken', data.token)
  }
}
