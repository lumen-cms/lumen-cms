<template>
  <div>
    <v-subheader v-if="item.subheader"
                 :key="'subhead' + i">
      <nuxt-link
        v-if="item['subheader-link'] || item.to"
        :to="item['subheader-link'] || item.to"
        exact-active-class="primary--text"
        style="text-decoration: none; color: inherit;"
        nuxt>{{ item.subheader }}
      </nuxt-link>
      <template v-else>{{ item.subheader }}</template>
    </v-subheader>
    <v-list-group v-else-if="item.items"
                  :value="item.active"
                  :key="item.title + i"
                  :sub-group="subGroup"
                  :prepend-icon="item.action"
                  no-action>
      <v-list-tile slot="activator" @click="() => {}">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <lc-expansion-panel-menu-item v-for="(subItem, j) in item.items"
                                    :item="subItem"
                                    :i="j"
                                    :level="item.level + 1"
                                    :sub-group="true"
                                    :key="subItem.title + j"/>
    </v-list-group>
    <v-list-tile v-else-if="item.to"
                 :to="item.to"
                 :key="'tile' + i"
                 :prepend-icon="item.action"
                 ripple
                 nuxt>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider v-else-if="item.divider"
               :key="'div' + i"/>
  </div>
</template>
<script>
  export default {
    name: 'LcExpansionPanelMenuItem',
    props: {
      item: Object,
      i: {type: Number, 'default': 0},
      level: {type: Number, 'default': 0},
      subGroup: {type: Boolean}
    }
  }
</script>
