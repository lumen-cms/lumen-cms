<template>
  <div>
    <v-menu v-if="item.items"
            :value="item.active"
            bottom left
            :key="item.title + i">
      <v-btn slot="activator"
             flat>
        {{ item.title }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for="(subItem, j) in item.items"
                     :i="j"
                     :key="subItem.title + j"
                     :to="getLink(subItem.to)"
                     nuxt
                     router
                     :prepend-icon="subItem.action">
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-spacer v-else-if="item.spacer || item.divider"
              :key="'div' + i"/>
    <v-btn v-else
           flat
           :to="link"
           :key="'tile' + i"
           :prepend-icon="item.action"
           nuxt>
      {{ item.title || item.subheader }}
    </v-btn>
  </div>
</template>
<script>
  export default {
    name: 'LcToolbarMenuItem',
    props: {
      item: Object,
      i: {type: Number, 'default': 0},
      level: {type: Number, 'default': 0},
      subGroup: {type: Boolean}
    },
    computed: {
      link () {
        const link = this.item['subheader-link'] || this.item.to
        if (link) {
          return link.startsWith('/', link) ? link : '/' + link
        }
        return link
      }
    },
    methods: {
      getLink (link) {
        if (link) {
          return link.startsWith('/', link) ? link : '/' + link
        }
        return link
      }
    }
  }
</script>
