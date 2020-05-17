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
      <SfHeaderNavigationItem v-for="item in navigation" :key="item">
        <SfLink href="#">
          {{ item }}
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
    function cartHandler () {}
    function accountHandler () {}
    function wishlistHandler () {}

    return {
      isMobile: false,
      navigation: ['women', 'man', 'kids'],
      searchValue: '',
      title: 'Storefront UI',
      logo: {
        mobile: { url: '/assets/logo.svg' },
        desktop: { url: '/assets/logo.svg' }
      },
      activeIcon: 'account',
      isSticky: true,
      searchPlaceholder: 'Search for items',
      cartIcon: 'empty_cart',
      wishlistIcon: 'heart',
      accountIcon: 'profile',
      cartItemsQty: '0',
      cartHandler,
      accountHandler,
      wishlistHandler
    }
  }
}
</script>
<style lang="scss" scoped>
header {
    position: fixed;
    top:0;
    left: 0;
}
</style>
