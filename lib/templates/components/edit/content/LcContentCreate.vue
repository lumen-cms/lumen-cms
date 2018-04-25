<template>
  <div>

    <v-bottom-sheet v-model="isShown"
                    :lazy="true"
                    :full-width="true">
      <v-card>
        <v-progress-linear :indeterminate="true" :active="$store.state.lc.updating"/>
        <v-card-title>
          {{ `Create ${$store.state.lc.contentEditDialogData.isNewLayoutCol ? 'in new column' : 'new'} ...` }}
          <v-spacer/>
          <v-btn icon @click="onPaste">
            <v-icon>content_paste</v-icon>
          </v-btn>
        </v-card-title>
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
    <v-dialog v-model="showPaste">
      <v-card>
        <v-card-text>
          <textarea name="inputTextArea" id="inputTextArea"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LcContentCreate',
    data () {
      return {
        showPaste: false
      }
    },
    computed: {
      createItems () {
        const dialogData = this.$store.state.lc.contentEditDialogData
        const components = this.$cms.componentMapping
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
      onPaste () {
        this.showPaste = true
        this.$nextTick(() => {
          const field = document.getElementById('inputTextArea')
          console.log('hier', field)
          field.select()
          field.focus()
          document.execCommand('Paste', null, null)
        })
      },
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
