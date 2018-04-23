<template>
  <div>

    <v-dialog v-model="show"
              persistent
              scrollable
              v-if="model">
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title>Menu Builder</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="show = false">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="max-height: 500px">
          <v-container grid-list-md>
            <v-layout>
              <v-flex>
                <v-text-field name="title"
                              label="Title"
                              v-model="model.title"
                              validate-on-blur
                              required/>
              </v-flex>
              <v-flex>
                <v-select name="key"
                          :items="keyItems"
                          label="Key"
                          combobox
                          v-model="model.key"
                          required/>
              </v-flex>
            </v-layout>
          </v-container>
          <div>
            <v-list>
              <lc-menu-builder-item v-for="(item,i) in navigation"
                                    :item="item"
                                    :i="i"
                                    :key="i"
                                    :level="0"/>
            </v-list>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="show = false">
            CANCEL
          </v-btn>
          <v-btn flat
                 color="primary">
            SAVE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editShow"
              max-width="500"
              persistent
              v-if="editModel">
      <v-card>
        <v-toolbar dense flat>
          <v-toolbar-title>Edit</v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="editShow=false;editModel = null;">
            <v-icon>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-select :items="['link','directory','subheader','divider']"
                    v-model="editModel.type"
                    label="Type"/>
          <v-text-field v-model="editModel.subheader" label="Title" v-if="editModel.type === 'subheader'"/>
          <v-text-field v-model="editModel.title" label="Title" v-else/>
          <lc-page-href-select :value="editModel.link" v-if="!editModel.items"/>
          {{editModel}}
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click.stop="saveEditDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import {slugifyTemplateKey} from '../../../util/slugifyHelpers'

  export default {
    name: 'LcMenuBuilder',
    props: {
      content: Array | Object
    },
    data () {
      return {
        show: false,
        editShow: false,
        model: {
          title: null,
          key: null
        },
        navigation: [],
        editModel: null
      }
    },
    watch: {
      '$store.state.lc.menuEdit' (value) {
        this.editShow = !this.editShow
        const storeVal = Object.assign({}, value.item)
        this.editModel = Object.assign({}, storeVal, {
            link: storeVal.to ? this.getHrefValue(storeVal) : null,
            type: storeVal.type || this.getItemType(storeVal)
          }
        )
      },
      content (value) {
        // main model
        this.model = Object.assign({}, {
          title: value.title,
          key: value.key
        })

        // navigation
        let bodyJson = value && value.bodyJson
        if (!bodyJson) return []
        let navigation = []
        Object.keys(bodyJson).forEach(item => {
          const root = bodyJson[item]
          if (Array.isArray(root)) {
            navigation = root
          } else {
            console.warn('no array navigation element found')
          }
        })
        this.navigation = this.addIdToNavigation(navigation)
      }
    },
    computed: {
      keyItems () {
        return Object.keys(this.$cms.TEMPLATE).map(e => ({
          value: slugifyTemplateKey(e, this.$store.state.lc.locale),
          text: e
        }))
      }
    },
    methods: {
      addIdToNavigation (navigation) {
        let id = 0
        return mapItems(navigation)

        function mapItems (array) {
          return array.map(item => {
            item = Object.assign({}, item, {id})
            id++
            if (item.items) {
              item.items = mapItems(item.items)
            }
            return item
          })
        }
      },
      saveEditDialog () {
        const form = Object.assign({}, this.editModel)
        console.log(form)

        this.navigation = findItems(this.navigation.slice(0))

        function findItems (array) {
          return array.map(item => {
            if (item.id === form.id) {
              // todo apply all form values
              item = Object.assign({}, form, {
                title: form.title
              })
            }
            if (item.items) {
              item.items = findItems(item.items)
            }
            return item
          })
        }
      },
      getItemType (element) {
        if (element.items) {
          return 'directory'
        } else if (element.subheader) {
          return 'subheader'
        } else if (element.divider) {
          return 'divider'
        } else {
          return 'link'
        }
      },
      getHrefValue (element) {
        console.log(element)
        return {
          linkSlug: null,
          linkType: null,
          linkOpenExternal: false,
          linkId: null
        }
      },
      onHrefSelect (value) {
        return {
          linkSlug: null,
          linkType: null,
          linkOpenExternal: false,
          linkId: null
        }
      },
      toggleVisibility () {
        this.show = !this.show
      }
    }
  }
</script>
