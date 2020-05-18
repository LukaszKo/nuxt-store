<template>
  <div class>
    <div class="main title">
      <h1>All Products</h1>
    </div>
    <div class="main section">
      <div class="products">
        <!-- <p v-if="$fetchState.pending">
          Fetching post...
        </p> -->
        <div v-if="category && category.products" class="products__list">
          <SfProductCard
            v-for="(product, i) in category.products.edges"
            :key="i"
            :title="product.node.name"
            :image="product.node.defaultImage.url"
            :link="'/products' + product.node.path"
            :regular-price="'$' + product.node.prices.price.value.toFixed(2)"
            class="products__product-card"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard } from '@storefront-ui/vue'
export default {
  components: { SfProductCard },
  async fetch () {
    const result = await this.$axios({
      method: 'POST',
      url: process.env.BASE_URL,
      headers: {
        Authorization: `Bearer ${this.getToken}`
      },
      data: {
        query: `
          query paginateProducts {
            site {
              products {
                pageInfo {
                  startCursor
                  endCursor
                }
                edges {
                  cursor
                  node {
                    entityId
                    name
                    path
                    defaultImage {
                      url(width: 150)
                    }
                    prices {
                      price {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        `
      }
    })
    this.category = result.data.data.site
  },
  // async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error, $axios }) {
  //   $axios.setHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJlYXQiOjE2MDIyODgwMDAsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxLCJjb3JzIjpbXSwiY2lkIjoxLCJpYXQiOjE1ODk4MTE5NDIsInN1YiI6ImRlN2EwMzVmaThtdXNrZjVycnJmc3Qzdzhid3pjbiIsInNpZCI6MTAwMTEzNTgwOCwiaXNzIjoiQkMifQ.wqbOIcRMpYwWJS-eAfOx0L8XVYNq82X9UBX5TD6zNhmwdyqVccAe0IZVecep2Ljtx9YwuICGVmAqEUqo_NoteA')
  //   const result = await $axios.$post(process.env.BASE_URL, {
  //     query: `
  //         query paginateProducts {
  //           site {
  //             products {
  //               pageInfo {
  //                 startCursor
  //                 endCursor
  //               }
  //               edges {
  //                 cursor
  //                 node {
  //                   entityId
  //                   name
  //                   path
  //                   defaultImage {
  //                     url(width: 150)
  //                   }
  //                   prices {
  //                     price {
  //                       value
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       `
  //   })
  //   return {
  //     category: result.data.site
  //   }
  // },
  data () {
    return {
      breadcrumbs: [
        { text: 'Home', link: '#' },
        { text: 'All', link: '#' }
      ],
      category: null
    }
  },
  computed: {
    getToken () {
      return this.$store.state.core.token
    }
  }
}
</script>
<style lang="scss" scoped>
$spacer: 32px;
$spacer-big: 64px;
$spacer-extra-big: 128px;
@import "~@storefront-ui/vue/styles";
.main {
  display: flex;
}

.title {
  padding: 50px 0;
  justify-content: center;
  background-color: lightgrey;
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: 0 - $spacer;
  @include for-desktop {
    margin: $spacer-big;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    flex: 0 0 50%;
    padding: $spacer;
    @include for-desktop {
      flex: 0 0 25%;
      padding: $spacer-big;
    }
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin-top: $spacer-extra-big;
    }
  }
}
.section {
  padding-left: $spacer-big;
  padding-right: $spacer-big;
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
