<template>
  <div>

    <v-bottom-sheet v-model="isShown"
                    :lazy="true"
                    hide-overlay
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
    <v-dialog v-model="showPaste"
              max-width="500">
      <v-card>
        <v-card-text>
          <v-textarea name="inputTextArea"
                      label="Please paste (CMD + V) your copied content here"
                      ref="inputTextArea"
                      style="width: 100%;height: 250px"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary"
                 flat
                 @click="onInsertPaste"
                 :loading="$store.state.lc.updating">
            Insert
          </v-btn>
        </v-card-actions>
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
      closeWindows () {
        this.showPaste = false
        this.$store.dispatch('setContentEditDialogData', {})
      },
      onInsertPaste () {
        if (!this.$refs.inputTextArea.internalValue) {
          console.error('Internal value of textarea not available')
        } else {
          this.$store.dispatch('setCrossDomainContent', this.$refs.inputTextArea.internalValue)
        }
      },
      onPaste () {
        this.showPaste = true
        this.$nextTick(() => {
          const area = this.$refs.inputTextArea
          area.focus()
          // following not working (paste)
          // https://stackoverflow.com/questions/37204498/copy-pasting-on-chrome-using-javascript-document-execcommandpaste-doesnt-w
          // const el = document.createElement('textarea')
          // el.contentEditable = true
          // el.style.position = 'absolute'
          // el.style.left = '-9999px'
          // document.body.appendChild(el)
          // el.focus()
          // // el.select()
          // document.execCommand('paste')
          // const v = el.innerText
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
