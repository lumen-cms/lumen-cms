<template>
  <component :is="item.divider ? 'v-layout':'div'">
    <v-menu v-if="item.items"
            :value="item.active"
            bottom
            attach
            left
            :key="item.title + i">
      <v-btn slot="activator"
             :small="small"
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
    <v-spacer v-else-if="item.divider"
              :key="'div' + i"/>
    <v-btn v-else
           flat
           :small="small"
           v-bind="attrs"
           :key="'tile' + i"
           :prepend-icon="item.action"
           nuxt>
      <v-icon v-if="item.action">{{item.action}}</v-icon>
      {{ item.title || item.subheader }}
    </v-btn>
  </component>
</template>
<script>
  export default {
    name: 'LcToolbarMenuItem',
    props: {
      small: Boolean,
      item: Object,
      i: {type: Number, 'default': 0},
      level: {type: Number, 'default': 0},
      subGroup: {type: Boolean}
    },
    computed: {
      attrs () {
        console.log(this.item)
        return {
          [this.item.linkOpenExternal ? 'href' : 'to']: this.link
        }
      },
      link () {
        const link = this.item['subheader-link'] || this.item.to
        if (link && !this.item.linkOpenExternal) {
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
