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
    if (state.token) {
      return
    }
    const body = {
      channel_id: 1,
      expires_at: 1602288000,
      allowed_cors_origins: ['https://nuxt-store.netlify.app/']
    }
    const { data } = await this.$axios.$post(
      `${process.env.SERVER_URL}/api/auth`,
      {
        body
      }
    )
    commit('setToken', data.token)
  }
}
