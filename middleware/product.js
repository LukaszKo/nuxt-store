export default async ({ store, payload, params }) => {
  if (payload) {
    return store.commit('setProduct', payload)
  } else {
    const id = parseInt(params.id)
    const query = {
      query: {
        site: {
          product: {
            __args: {
              entityId: id
            },
            id: true,
            entityId: true,
            name: true,
            addToCartUrl: true,
            // options: {
            //   edges: {
            //     node: {
            //       displayName: true,
            //       values: {
            //         edges: {
            //           node: {
            //             label: true
            //           }
            //         }
            //       }
            //     }
            //   }
            // },
            addToWishlistUrl: true,
            plainTextDescription: true,
            defaultImage: {
              url: {
                __args: {
                  width: 250
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
    const result = await store.dispatch(
      'runQuery',
      query
    )
    store.commit('setProduct', result.data.site.product)
  }
}
