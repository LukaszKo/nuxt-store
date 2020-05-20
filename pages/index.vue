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
  middleware: 'check-auth',
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const files = await require.context('~/assets/content/banner/', false, /\.json$/)
    const list = files.keys().map((key) => {
      const res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    return {
      heroes: list.slice(0, 2)
    }
  },
  head () {
    return {
      script: [{ src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }]
    }
  },
  setup () {
    return {
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
