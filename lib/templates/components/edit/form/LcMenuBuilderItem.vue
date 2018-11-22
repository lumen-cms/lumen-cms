<template>
  <div>
    <v-list-group v-if="item.items || item.type === 'directory'"
                  :value="item.active"
                  :sub-group="subGroup"
                  :prepend-icon="subGroup ? 'arrow_drop_down' : item.action"
                  no-action>
      <v-list-tile slot="activator" @click="() => {}">
        <v-list-tile-content>
          <v-list-tile-title>
            <a href="#" @click.stop="editItem(item,true)">[
              <v-icon small>add</v-icon>
              ]</a>
            {{ item.title }}
            <a href="#" @click.stop="editItem(item)">[
              <v-icon small>edit</v-icon>
              ]</a>
            <a @click.stop="cutItem(item)" v-show="!cutIsActive">[
              <v-icon small>content_cut</v-icon>
              ]</a>
            <template v-if="cutIsActive">
              <a @click.stop="cutItem(item,true)">[
                <v-icon small>content_copy</v-icon>
                ]</a>
              <a @click.stop="$store.dispatch('setMenuCutPaste', null)">[
                <v-icon small>clear</v-icon>
                ]</a>
            </template>
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
    <template v-else-if="item.divider">
      <div class="pl-3 divider-wrap" style="margin-top:-11px">
        <v-divider class="mt-3"/>
        <a href="#" @click.stop="editItem(item,true)">[ &#x2b; ]</a>
        <a @click.stop="editItem(item)">[
          <v-icon small>edit</v-icon>
          ]</a>
        <a @click.stop="cutItem(item)" v-show="!cutIsActive">[
          <v-icon small>content_cut</v-icon>
          ]</a>
        <template v-if="cutIsActive">
          <a @click.stop="cutItem(item,true)">[
            <v-icon small>content_copy</v-icon>
            ]</a>
          <a @click.stop="$store.dispatch('setMenuCutPaste', null)">[
            <v-icon small>clear</v-icon>
            ]</a>
        </template>
      </div>
    </template>
    <v-list-tile v-else
                 :prepend-icon="item.action">
      <v-list-tile-content>
        <v-list-tile-title>
          <a href="#" @click.stop="editItem(item,true)">[
            <v-icon small>add</v-icon>
            ]</a>
          <v-icon v-if="item.action" small>{{ item.action }}</v-icon>
          <i v-show="item.subheader">SH</i>
          {{ item.title || item.subheader }}
          (
          <router-link v-if="item.to" :to="item.to" target="_blank" rel="noreferrer">
            {{ item.to || item.subheader }}
          </router-link>
          )
          <a @click.stop="editItem(item)">[
            <v-icon small>edit</v-icon>
            ]</a>
          <a @click.stop="cutItem(item)" v-show="!cutIsActive">[
            <v-icon small>content_cut</v-icon>
            ]</a>
          <template v-if="cutIsActive">
            <a @click.stop="cutItem(item,true)">[
              <v-icon small>content_copy</v-icon>
              ]</a>
            <a @click.stop="$store.dispatch('setMenuCutPaste', null)">[
              <v-icon small>clear</v-icon>
              ]</a>
          </template>
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>
<script>
  export default {
    name: 'LcMenuBuilderItem',
    props: {
      item: Object,
      i: { type: Number, 'default': 0 },
      level: { type: Number, 'default': 0 },
      subGroup: { type: Boolean },
      parentIndex: { type: Number }
    },
    computed: {
      cutIsActive () {
        return this.$store.state.lc.menuCutPaste && this.$store.state.lc.menuCutPaste.isCut
      }
    },
    methods: {
      /**
       * On cut paste
       * @param item
       * @param isNew
       * @param firstChild
       */
      editItem (item, isNew, firstChild) {
        let editObject = Object.assign({}, { item, isNew, firstChild })
        this.$store.dispatch('setMenuEdit', editObject)
      },
      /**
       * On cut paste
       * @param item
       * @param isPaste
       */
      cutItem (item, isPaste) {
        if (!isPaste) {
          this.$store.dispatch('setMenuCutPaste', { item, isCut: true })
        } else {
          const currentState = Object.assign({}, this.$store.state.lc.menuCutPaste, {
            toItem: item,
            isPaste: true
          })
          delete currentState.isCut
          if (currentState.item.id === currentState.toItem.id) {
            // cut paste is same element
            this.$store.dispatch('setMenuCutPaste', null)
          } else {
            // paste is active
            this.$store.dispatch('setMenuCutPaste', currentState)
          }
        }
      }
    }
  }
</script>
<style scoped>
  .list__tile__title a, .subheader a, .pl-3 a {
    text-decoration: none;
  }

  .list__group__items .divider-wrap {
    margin-left: 60px
  }
</style>
