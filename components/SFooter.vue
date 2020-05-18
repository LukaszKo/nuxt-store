<template>
  <SfFooter :column="column" :multiple="multiple">
    <SfFooterColumn
      v-for="col in columns"
      :key="col.title"
      :title="col.title"
    >
      <SfList v-if="col.items">
        <SfListItem v-for="item in col.items" :key="item">
          <SfMenuItem :label="item" />
        </SfListItem>
      </SfList>
      <div v-else :style="{ display: 'flex' }">
        <SfImage
          v-for="picture in col.pictures"
          :key="picture"
          width="12"
          height="12"
          :src="'/' + picture + '.svg'"
          :style="{ margin: '0 1.5rem 0 0' }"
        />
      </div>
    </SfFooterColumn>
  </SfFooter>
</template>
<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue'

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  data () {
    return {
      isMobile: false,
      columns: [
        {
          title: 'About us',
          items: ['Who we are', 'Quality in the details', 'Customer Reviews']
        },
        {
          title: 'Departments',
          items: ['Women fashion', 'Men fashion', 'Kidswear', 'Home']
        },
        {
          title: 'Help',
          items: ['Customer service', 'Size guide', 'Contact us']
        },
        { title: 'Payment & delivery', items: ['Purchase terms', 'Guarantee'] },
        {
          title: 'Social',
          pictures: ['facebook', 'pinterest', 'twitter', 'youtube']
        }
      ],
      column: 4,
      multiple: false
    }
  }
}
</script>
<style lang="scss" scoped>
footer {
    background: lightgrey
}
</style>
