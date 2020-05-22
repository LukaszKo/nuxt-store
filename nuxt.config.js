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
    SERVER_URL: process.env.SERVER_URL,
    FUNCTIONS_API: process.env.FUNCTIONS_API
  },
  generate: {
    routes () {
      const body = {
        channel_id: 1,
        expires_at: 1602288000,
        allowed_cors_origins: ['https://nuxt-store.netlify.app']
      }
      const server = process.env.FUNCTIONS_API || 'https://nuxt-store.netlify.app/.netlify/functions'
      return axios
        .post(`${server}/auth`, body)
        .then((response) => {
          const token = response.data.data.token
          const query = {
            query: {
              site: {
                products: {
                  __args: {
                    first: 30
                  },
                  edges: {
                    node: {
                      entityId: true,
                      name: true,
                      addToCartUrl: true,
                      options: {
                        edges: {
                          node: {
                            displayName: true,
                            values: {
                              edges: {
                                node: {
                                  label: true
                                }
                              }
                            }
                          }
                        }
                      },
                      addToWishlistUrl: true,
                      plainTextDescription: true,
                      path: true,
                      defaultImage: {
                        url: {
                          __args: {
                            width: 150
                          }
                        }
                      },
                      prices: {
                        price: {
                          value: true,
                          currencyCode: true
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          return axios.post(`${server}/query`, {
            token,
            query
          })
        })
        .then((res) => {
          const routes = []
          const products = res.data.data.site.products.edges
          products.map((product) => {
            routes.push({
              route: '/shop-all/' + product.node.entityId,
              payload: product.node
            })
            routes.push({
              route: '/garden/' + product.node.entityId,
              payload: product.node
            })
          })
          return routes
        })
    }
  }
}
