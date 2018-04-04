<template>
  <v-bottom-sheet v-model="isShown"
                  :lazy="true"
                  :full-width="true">
    <v-card>
      <v-progress-linear :indeterminate="true" :active="$store.state.lc.updating"/>
      <v-card-title
        v-text="`Create ${$store.state.lc.contentEditDialogData.isNewLayoutCol ? 'in new column' : 'new'} ...`"/>
      <v-card-text class="text-xs-center">
        <v-list>
          <v-list-tile v-for="(item, i) in createItems"
                       :key="i" @click="item.clickHandler"
                       v-show="!item.hide">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="item.text"/>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
  export default {
    name: 'LcContentCreate',
    computed: {
      createItems () {
        // todo need to render items based on componentMapping
        const dialogData = this.$store.state.lc.contentEditDialogData
        return [
          {
            text: 'Divider',
            icon: 'remove',
            clickHandler: () => this.setSelectedType('Divider')
          },
          {
            text: 'Layout Element',
            icon: 'view_column',
            clickHandler: () => this.setSelectedType('Layout'),
            hide: !!dialogData.contentLayoutElementId || dialogData.isNewLayoutCol
          },
          {
            text: 'Text + Image',
            icon: 'photo_size_select_large',
            clickHandler: () => this.setSelectedType('TextImage')
          },
          //  {text: 'Media', icon: 'perm_media', clickHandler: () => (this.selectedType = 'Media')}, //=> deprecated
          {
            text: 'Read More Accordion',
            icon: 'dns',
            clickHandler: () => this.setSelectedType('ReadMore'),
            hide: !!dialogData.contentLayoutElementId || dialogData.isNewLayoutCol
          },
          {
            text: 'HTML',
            icon: 'code',
            clickHandler: () => this.setSelectedType('Html')
          },
          {
            text: 'ContentListWidget',
            icon: 'view_list',
            clickHandler: () => this.setSelectedType('ListWidget')
          }
        ]
      },
      isShown: {
        get () {
          return this.$store.getters.getDialogType === 'create'
        },
        set (v) {
          if (!v) {
            this.$store.dispatch('setContentEditDialogData', {})
          }
        }
      }
    },
    methods: {
      setSelectedType (val) {
        const dialogData = this.$store.getters.getDialogData
        this.$store.dispatch('setContentEditDialogData', Object.assign(dialogData, {
          dialogType: 'edit',
          content: {
            id: null,
            type: val
          }
        }))
      }
    }
  }
</script>
