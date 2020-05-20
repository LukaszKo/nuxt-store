export default async ({ store, payload, params }) => {
  if (payload) {
    return store.commit('setProduct', payload)
  } else {
    const id = parseInt(params.id)
    const result = await store.dispatch(
      'runQuery',
      `
        query SingleProduct {
            site {
                product(entityId: ${id}) {
                  id
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
                  defaultImage {
                    url(width: 250)
                  }
                  prices {
                    price {
                      value
                      currencyCode
                    }
                  }
                }
              }
        }`
    )
    store.commit('setProduct', result.data.site.product)
  }
}
