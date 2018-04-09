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
                       :key="i" @click="setSelectedType(item.name)"
                       v-show="!item.hideInLayout">
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
        const dialogData = this.$store.state.lc.contentEditDialogData
        const components = this.$cms.componentMapping.edit
        return Object.keys(components).map(component => {
          return Object.assign({}, components[component], {
            name: component,
            hideInLayout: components[component].hideInLayout && (!!dialogData.contentLayoutElementId || dialogData.isNewLayoutCol)
          })
        })
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
        this.$store.dispatch('setContentEditDialogData', Object.assign({}, dialogData, {
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
