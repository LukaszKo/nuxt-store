<template>
  <div class>
    <div class="main title">
      <h1>Garden</h1>
    </div>
    <div class="main section">
      <div class="products">
        <div v-if="products" class="products__list">
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
import { SfProductCard } from '@storefront-ui/vue'
export default {
  components: { SfProductCard },
  middleware: ['check-auth'],
  data () {
    return {
      products: null
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
            query CategoryByUrl {
            site {
                route(path: "/garden/") {
                node {
                    id
                    ... on Category {
                    name
                    entityId
                    description
                    products {
                        edges {
                        node {
                            entityId
                            name
                            addToCartUrl
                            defaultImage {
                            url(width: 1200)
                            }
                            prices {
                            price {
                                value
                                currencyCode
                            }
                            }
                            addToWishlistUrl
                            plainTextDescription
                            path
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        `
    )
    this.products = result.data.site.route.node.products.edges

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
