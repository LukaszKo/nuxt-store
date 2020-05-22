<template>
  <div class>
    <SfHeading :level="1" title="Garden" subtitle />
    <SfDivider class="main" />
    <div class="main">
      <div class="products">
        <content-loader v-if="$fetchState.pending">
          <rect
            x="0"
            y="0"
            rx="3"
            ry="3"
            width="400"
            height="100"
          />
        </content-loader>
        <div v-else class="products__list">
          <SfProductCard
            v-for="(product, i) in products"
            :key="i"
            :title="product.node.name"
            :image="product.node.defaultImage.url"
            :link="'/garden/' + product.node.entityId"
            :regular-price="'$' + product.node.prices.price.value.toFixed(2)"
            class="products__product-card"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard, SfHeading, SfDivider } from '@storefront-ui/vue'
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { SfProductCard, ContentLoader, SfHeading, SfDivider },
  middleware: ['check-auth'],
  async fetch () {
    const query = {
      query: {
        site: {
          route: {
            __args: {
              path: '/garden/'
            },
            node: {
              id: true,
              __on: {
                __typeName: 'Category',
                entityId: true,
                name: true,
                products: {
                  edges: {
                    node: {
                      entityId: true,
                      name: true,
                      addToCartUrl: true,
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
        }
      }
    }
    const result = await this.$store.dispatch('runQuery', query)
    this.products = result.data.site.route.node.products.edges
  },
  data () {
    return {
      products: null
    }
  },
  computed: {
    getToken () {
      return this.$store.state.token
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
  max-width: 1240px;
  margin: auto;
}

.title {
  padding: 50px 0;
  justify-content: center;
  background-color: lightgrey;
}

.products {
  box-sizing: border-box;
  flex: 1;
  margin: $spacer 0;

  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    flex: 0 0 50%;
  }
  &__pagination {
    @include for-desktop {
      display: flex;
      justify-content: center;
      margin-top: $spacer-extra-big;
    }
  }
}
</style>
