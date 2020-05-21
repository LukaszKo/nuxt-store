import axios from 'axios'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#4CAF50', height: '3px' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/composition-api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^@storefront-ui/],
    extend (config, ctx) {}
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    AUTHORIZE_URL: process.env.AUTHORIZE_URL,
    SERVER_URL: process.env.SERVER_URL
  },
  generate: {
    routes () {
      const body = {
        channel_id: 1,
        expires_at: 1602288000,
        allowed_cors_origins: ['https://nuxt-store.netlify.app']
      }
      const server = process.env.SERVER_URL
      return axios
        .post(`${server}/api/auth`, body)
        .then((response) => {
          const token = response.data.data.token
          return axios.post(`${server}/api/query`, {
            token,
            query: `
            query products {
              site {
                products (first: 30) {
                  edges {
                    node {
                      entityId
                      name
                      addToCartUrl
                      options {
                        edges {
                          node {
                            displayName
                            values {
                              edges {
                                node {
                                  label
                                }
                              }
                            }
                          }
                        }
                      }
                      addToWishlistUrl
                      plainTextDescription
                      path
                      defaultImage {
                        url(width: 150)
                      }
                      prices {
                        price {
                          value
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          `
          })
        })
        .then((res) => {
          const products = res.data.data.site.products.edges
          return products.map(product => ({
            route: '/products/' + product.node.entityId,
            payload: product.node
          }))
        })
    }
  }
}
