<template>
  <SfHeader
    :title="title"
    :logo="logo"
    :active-icon="activeIcon"
    :search-placeholder="searchPlaceholder"
    :search-value="searchValue"
    :cart-icon="cartIcon"
    :wishlist-icon="wishlistIcon"
    :is-sticky="isSticky"
    :account-icon="accountIcon"
    :cart-items-qty="cartItemsQty"
    @click:cart="cartHandler"
    @click:wishlist="wishlistHandler"
    @click:account="accountHandler"
    @change:search="searchValue = $event"
  >
    <template #navigation>
      <SfHeaderNavigationItem v-for="item in categories" :key="item.name">
        <SfLink :href="item.path">
          {{ item.name }}
        </SfLink>
      </SfHeaderNavigationItem>
    </template>
  </SfHeader>
</template>
<script>
import { SfHeader, SfLink } from '@storefront-ui/vue'

export default {
  components: {
    SfHeader,
    SfLink
  },
  setup () {
    function cartHandler () {
      window.location = 'https://nuxt-store.mybigcommerce.com/checkout'
    }
    function accountHandler () {}
    function wishlistHandler () {}

    return {
      isMobile: false,
      searchValue: '',
      title: 'Storefront UI',
      logo: {
        mobile: { url: '/logo.svg' },
        desktop: { url: '/logo.svg' }
      },
      activeIcon: 'account',
      isSticky: false,
      searchPlaceholder: 'Search for items',
      cartIcon: 'empty_cart',
      wishlistIcon: 'heart',
      accountIcon: 'profile',
      cartItemsQty: '0',
      cartHandler,
      accountHandler,
      wishlistHandler,
      categories: [
        {
          name: 'Shop All',
          path: '/shop-all'
        },
        {
          name: 'Garden',
          path: '/garden'
        },
        {
          name: 'Kitchen',
          path: '/kitchen'
        },
        {
          name: 'Bath',
          path: '/bath'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
