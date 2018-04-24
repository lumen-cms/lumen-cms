<template>
  <div>
    <v-subheader v-if="item.subheader">
      <nuxt-link
        v-if="item['subheader-link']"
        :to="item['subheader-link']"
        exact-active-class="primary--text"
        style="text-decoration: none; color: inherit;"
        nuxt>

        <a href="#" @click.stop="editItem(item,true)">[ &#x2b; ]</a>
        {{ item.subheader }}
        (<a href="#" :to="item.to" router target="__blank">{{item.to}}</a>)
        <a href="#" @click.stop="editItem(item)">[edit]</a>
      </nuxt-link>
      <template v-else>{{ item.subheader }}</template>
    </v-subheader>
    <v-list-group v-else-if="item.items || item.type === 'directory'"
                  :value="item.active"
                  :sub-group="subGroup"
                  :prepend-icon="item.action"
                  no-action>
      <v-list-tile slot="activator" @click="() => {}">
        <v-list-tile-content>
          <v-list-tile-title>
            <a href="#" @click.stop="editItem(item,true)">[ &#x2b; ]</a>
            {{ item.title }}
            <a href="#" @click.stop="editItem(item)">[edit]</a>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <lc-menu-builder-item v-for="(subItem, j) in item.items"
                            :item="subItem"
                            :i="j"
                            :parent-index="i"
                            :level="item.level + 1"
                            :sub-group="true"
                            :key="subItem.title + j"/>
      <div class="ml-5 pa-1" v-if="!item.items.length">

        <a href="#" @click.stop="editItem(item,true,true)">[ &#x2b; ] Create new...</a>
      </div>
    </v-list-group>
    <v-list-tile v-else-if="item.to"
                 :prepend-icon="item.action">
      <v-list-tile-content>
        <v-list-tile-title>
          <a href="#" @click.stop="editItem(item,true)">[ &#x2b; ]</a>
          {{ item.title }}
          (<a href="#" :to="item.to" router target="__blank">{{item.to}}</a>)
          <a @click.stop="editItem(item)">[edit]</a>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider v-else-if="item.divider"/>
  </div>
</template>
<script>
  export default {
    name: 'LcMenuBuilderItem',
    props: {
      item: Object,
      i: {type: Number, 'default': 0},
      level: {type: Number, 'default': 0},
      subGroup: {type: Boolean},
      parentIndex: {type: Number}
    },
    methods: {
      editItem (item, isNew, firstChild) {
        let editObject = Object.assign({}, {item, isNew, firstChild})
        this.$store.dispatch('setMenuEdit', editObject)
      }
    }
  }
</script>
