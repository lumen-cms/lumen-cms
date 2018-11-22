<template>
  <component :is="item.divider ? 'v-layout':'div'">
    <v-menu v-if="item.items"
            :value="item.active"
            bottom
            attach
            :class="item.linkClass"
            left
            :key="item.title + i">
      <v-btn slot="activator"
             :small="small"
             flat>
        <v-icon v-if="item.action">{{ item.action }}</v-icon>
        {{ item.title }}
        <v-icon>arrow_drop_down</v-icon>
      </v-btn>
      <v-list>
        <lc-toolbar-menu-item v-for="(subItem, j) in item.items"
                              :item="subItem"
                              :key="subItem.title + j"
                              :level="level + 1"
                              :i="j"
                              :small="small"
                              :sub-group="true"/>
      </v-list>
    </v-menu>
    <component :is="subGroup ? 'v-divider' : 'v-spacer'"
               v-else-if="item.divider"
               :key="'div' + i"/>
    <v-list-tile v-else-if="level > 0"
                 v-bind="attrs"
                 :prepend-icon="item.action">
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <template v-else>
      <v-btn flat
             :class="item.linkClass"
             :small="small"
             v-bind="attrs"
             :key="'tile' + i"
             :icon="$vuetify.breakpoint[item.iconBreakpoint]"
             v-on="item.isVuexAction ? {click:onVuexAction} : {}"
             :prepend-icon="item.action">
        <v-icon v-if="item.action">{{ item.action }}</v-icon>
        <span v-show="!$vuetify.breakpoint[item.iconBreakpoint]">
          {{ item.title || item.subheader }}
        </span>
      </v-btn>
    </template>
  </component>
</template>
<script>
  export default {
    name: 'LcToolbarMenuItem',
    props: {
      small: Boolean,
      item: Object,
      i: { type: Number, 'default': 0 },
      level: { type: Number, 'default': 0 },
      subGroup: { type: Boolean }
    },
    computed: {
      attrs () {
        if (this.item.isVuexAction) {
          return {}
        }
        let link = this.item['subheader-link'] || this.item.to
        if (!this.item.linkOpenExternal) {
          link = (link && link.startsWith('/', link)) ? link : '/' + link
        }
        const attrs = {
          [this.item.linkOpenExternal ? 'href' : 'to']: link
        }
        if (this.item.linkOpenExternal) {
          attrs.target = '_blank'
          attrs.rel = 'noopener'
        }
        return attrs
      }
    },
    methods: {
      onVuexAction () {
        const vuexAction = this.item.vuexAction
        vuexAction && this.$store.dispatch(vuexAction)
      }
    }
  }
</script>
