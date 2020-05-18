<template>
  <div id="home">
    <section>
      <SfHero>
        <SfHeroItem
          v-for="(hero, i) in heroes"
          :key="i"
          :title="hero.title"
          :subtitle="hero.subtitle"
          :button-text="hero.buttonText"
          :background="hero.background"
          :image="hero.image"
          :class="hero.className"
        />
      </SfHero>
    </section>
    <section>
      <SfBannerGrid :banner-grid="bannerGrid" :style="{ maxWidth: '1240px', margin: 'auto' }">
        <template v-for="item in banners" v-slot:[item.slot]>
          <SfBanner
            :key="item.slot"
            :title="item.title"
            :subtitle="item.subtitle"
            :description="item.description"
            :button-text="item.buttonText"
            :image="item.image"
            :class="item.class"
          />
        </template>
      </SfBannerGrid>
    </section>
  </div>
</template>
<script>
import '@storefront-ui/vue/styles.scss'
import { SfHero, SfBanner, SfBannerGrid } from '@storefront-ui/vue'
export default {
  name: 'Home',
  components: { SfHero, SfBanner, SfBannerGrid },
  created () {
    this.$store.dispatch('core/authorize')
  },
  setup () {
    return {
      heroes: [
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#eceff1',
          image:
            'https://github.com/DivanteLtd/vsf-capybara/blob/v1.0-rc.1/assets/banner/png/bannerC.png?raw=true'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#efebe9',
          image:
            'https://github.com/DivanteLtd/vsf-capybara/blob/v1.0-rc.1/assets/banner/png/full_width_banner.png?raw=true',
          className:
            'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
        },
        {
          title: 'Colorful summer dresses are already in store',
          subtitle: 'SUMMER COLLECTION 2019',
          buttonText: 'Learn more',
          background: '#fce4ec',
          image:
            'https://github.com/DivanteLtd/vsf-capybara/blob/v1.0-rc.1/assets/banner/png/full_width_banner2.png?raw=true'
        }
      ],
      banners: [
        {
          slot: 'banner-A',
          subtitle: 'Dresses',
          title: 'Cocktail & Party',
          description:
            "Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses from all your favorite brands.",
          buttonText: 'Shop now',
          image: '/ban1.jpg',
          class: ['sf-banner--slim']
        },
        {
          slot: 'banner-B',
          subtitle: 'T-Shirts',
          title: 'The Office Life',
          buttonText: 'Shop now',
          image: '/ban2.jpg',
          class: ['sf-banner--slim']
        },
        {
          slot: 'banner-C',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          buttonText: 'Shop now',
          image: '/bannerE.png',
          class: ['sf-banner--slim']
        },
        {
          slot: 'banner-D',
          subtitle: 'Summer Sandals',
          title: 'Eco Sandals',
          buttonText: 'Shop now',
          image: '/bannerF.png',
          class: ['sf-banner--slim']
        }
      ],
      bannerGrid: 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
section {
  margin-bottom: 50px;
}
</style>
