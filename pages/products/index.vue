<template>
  <div class>
    <div class="main title">
      <h1>All Products</h1>
    </div>
    <div class="main section">
      <div class="products">
        <div v-if="category" class="products__list">
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
  async asyncData ({ params, $axios }) {
    const result = await $axios({
      method: 'POST',
      url: process.env.BASE_URL,
      headers: {
        Authorization:
          `Bearer ${process.env.API_TOKEN}`
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

    const productsData = result.data.data.site
    return { category: productsData }
  },
  setup () {
    return {
      breadcrumbs: [
        { text: 'Home', link: '#' },
        { text: 'All', link: '#' }
      ],
      category: {}
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
