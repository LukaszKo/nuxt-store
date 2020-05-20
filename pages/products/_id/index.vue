<template>
  <div v-if="product" class="product">
    <div class="section" :style="{ maxWidth: '1240px' }">
      <SfProductCard
        class="mobile-only"
        :image="product.defaultImage.url"
        :image-width="imageWidth"
        :image-height="imageHeight"
        badge-label=""
        badge-color="color-primary"
        :title="product.name"
        :link="link"
        :link-tag="linkTag"
        :score-rating="scoreRating"
        :max-rating="maxRating"
        :reviews-count="reviewsCount"
        :regular-price="product.prices.price.value"
        :special-price="specialPrice"
        :wishlist-icon="wishlistIcon"
        :is-on-wishlist-icon="isOnWishlistIcon"
        :is-on-wishlist="isOnWishlist"
        :show-add-to-cart-button="true"
        :add-to-cart-disabled="addToCartDisabled"
        :is-added-to-cart="isAddedToCart"
        @click:is-added-to-cart="alert('@click:is-added-to-cart')"
        @click:wishlist="alert('@click:wishlist')"
        @click:reviews="alert('@click:reviews')"
      />
      <SfProductCardHorizontal
        class="desktop-only"
        :image="product.defaultImage.url"
        :image-width="imageWidth"
        :image-height="imageHeight"
        :title="product.name"
        :link="link"
        :link-tag="linkTag"
        :regular-price="product.prices.price.value"
        :special-price="specialPrice"
        :score-rating="scoreRating"
        :max-rating="maxRating"
        :wishlist-icon="wishlistIcon"
        :reviews-count="reviewsCount"
        :is-added-to-cart="isAddedToCart"
        :add-to-cart-disabled="addToCartDisabled"
        :description="product.plainTextDescription"
        :qty="quantity"
        :is-on-wishlist-icon="isOnWishlistIcon"
        :is-on-wishlist="isOnWishlist"
        @input="quantity = $event"
      >
        <template v-if="product.options && product.options.edges.length" #configuration>
          <div style="display: flex; align-items: center">
            <SfProperty class="desktop-only" name="Sizes" value="" />
            <SfProperty
              v-for="size in product.options.edges[0].node.values.edges"
              :key="size.node.displayName"
              class="desktop-only"
              style="margin: 0 1rem"
            >
              <template #name>
                {{ size.node.label }}
              </template>
            </SfProperty>
          </div>
          <div style="display: flex; align-items: center">
            <SfProperty class="desktop-only" name="Colors" value="" />
            <SfColor
              v-for="color in product.options.edges[1].node.values.edges"
              :key="color.node.displayName"
              :color="color.node.label"
              :selected="false"
              :has-badge="true"
              :aria-label="color.node.label"
              style="margin: 10px;"
              @click="selected = !selected"
            />
          </div>
        </template>
        <template #actions>
          <SfButton
            class="sf-button--text desktop-only"
            style="margin: 0 0 1rem auto; display: block;"
            @click="$emit('click:add-to-wishlist')"
          >
            Save for later
          </SfButton>
          <SfButton
            class="sf-button--text desktop-only"
            style="margin: 0 0 0 auto; display: block;"
            @click="$emit('click:add-to-compare')"
          >
            Add to compare
          </SfButton>
        </template>
        <template #add-to-cart>
          <div style="display: flex">
            <SfQuantitySelector
              v-model="value"
              aria-label="Quantity"
            />
            <SfButton
              class="sf-button desktop-only"
              style="margin: 0 0 0 10px; display: block;"
              @click="addToCart"
            >
              Add to cart
            </SfButton>
          </div>
        </template>
      </SfProductCardHorizontal>
    </div>
  </div>
</template>
<script>
import {
  SfProductCardHorizontal,
  SfButton,
  SfProperty,
  SfProductCard,
  SfQuantitySelector,
  SfColor
} from '@storefront-ui/vue'

export default {
  components: {
    SfProductCardHorizontal,
    SfButton,
    SfProperty,
    SfProductCard,
    SfQuantitySelector,
    SfColor
  },
  data () {
    return {
      selected: true,
      value: '1',
      quantity: 1,
      image: 'assets/storybook/SfProductCardHorizontal/productA.jpg',
      imageWidth: 200,
      imageHeight: 300,
      title: 'Cream Beach Bag',
      description:
        'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      link: '',
      linkTag: '',
      regularPrice: '$10,99',
      specialPrice: '',
      wishlistIcon: 'heart',
      isOnWishlist: true,
      isOnWishlistIcon: 'heart_fill',
      maxRating: 5,
      scoreRating: 4,
      reviewsCount: 7,
      isAddedToCart: false,
      qty: 1,
      addToCartDisabled: false
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  middleware: ['check-auth', 'product'],
  methods: {
    addToCart () {
      window.location = this.product.addToCartUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  display: flex;
  justify-content: center;
  padding: 64px 0;
}
</style>
