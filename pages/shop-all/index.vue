<template>
  <div>
    <SfHeading
      :level="1"
      title="Shop All"
      subtitle=""
    />
    <SfDivider class="main" />
    <div class="main">
      <div class="products">
        <div v-if="category" class="products__list">
          <SfProductCard
            v-for="(product, i) in category.products.edges"
            :key="i"
            :title="product.node.name"
            :image="product.node.defaultImage.url"
            :link="'/shop-all/' + product.node.entityId"
            :regular-price="'$' + product.node.prices.price.value.toFixed(2)"
            class="products__product-card"
          />
        </div>
        <content-loader v-else>
          <rect
            x="0"
            y="0"
            rx="3"
            ry="3"
            width="400"
            height="100"
          />
        </content-loader>
      </div>
    </div>
  </div>
</template>
<script>
import { SfProductCard, SfHeading, SfDivider } from '@storefront-ui/vue'
import { ContentLoader } from 'vue-content-loader'
export default {
  components: { ContentLoader, SfProductCard, SfHeading, SfDivider },
  middleware: ['check-auth'],
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
      return this.$store.state.token
    }
  },
  async mounted () {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    const result = await this.$store.dispatch(
      'runQuery',
      `
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
    )
    this.category = result.data.site
    this.$nuxt.$loading.finish()
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
