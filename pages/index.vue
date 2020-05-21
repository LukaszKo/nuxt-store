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
  middleware: ['check-auth'],
  data () {
    return {
      bannerGrid: 1,
      heroes: null,
      banners: null
    }
  },
  async mounted () {
    await this.$nextTick()
    this.$nuxt.$loading.start()
    const bannersFiles = await require.context('~/assets/content/banner/', false, /\.json$/)
    const banners = bannersFiles.keys().map((key) => {
      const res = bannersFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })
    const heroesFiles = await require.context('~/assets/content/heroes/', false, /\.json$/)
    const heroes = heroesFiles.keys().map((key) => {
      const res = heroesFiles(key)
      res.slug = key.slice(2, -5)
      return res
    })

    this.banners = banners
    this.heroes = heroes
    this.$nuxt.$loading.finish()
  }
}
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
section {
  margin-bottom: 50px;
}
</style>
