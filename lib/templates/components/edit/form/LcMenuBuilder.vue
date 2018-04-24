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
            <div class="pl-3">
              <a href="#" @click="$store.dispatch('setMenuEdit', {isNew:true})">[ &#x2b; ] Create New...</a>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="show = false">
            CANCEL
          </v-btn>
          <v-btn flat
                 color="primary"
                 :loading="loading"
                 @click="saveMenu">
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
          <lc-form-container ref="editFormModel">

            <v-select :items="['link','directory','subheader','divider']"
                      v-model="editModel.type"
                      required
                      label="Type"/>
            <v-text-field required v-model="editModel.subheader" label="Title" v-if="editModel.type === 'subheader'"/>
            <v-text-field required v-model="editModel.title" label="Title" v-else/>
            <template v-if="editModel.type !== 'directory' && editModel.type !== 'divider'">
              <lc-page-href-select required
                                   @updated="onPageSelection"
                                   :value="editModel.link"/>
              <v-switch v-model="editModel.linkOpenExternal" label="Open external"/>
            </template>
          </lc-form-container>
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
  import LcMenuBuilderItem from './LcMenuBuilderItem'
  import createTemplateGql from '../../../gql/pageTemplate/createPageTemplate.gql'
  import updateTemplateGql from '../../../gql/pageTemplate/updatePageTemplate.gql'
  import deleteTemplateGql from '../../../gql/pageTemplate/deletePageTemplate.gql'

  export default {
    name: 'LcMenuBuilder',
    props: {
      content: Array | Object
    },
    components: {LcMenuBuilderItem},
    data () {
      return {
        show: false,
        editShow: false,
        model: {
          id: null,
          title: null,
          key: null
        },
        navigation: [],
        editModel: null,
        loading: false
      }
    },
    watch: {
      '$store.state.lc.menuEdit' (value) {
        const model = JSON.parse(JSON.stringify(value))
        this.editShow = !this.editShow
        if (!model.isNew) {
          // update a menu entry
          const currentModel = model.item
          this.editModel = Object.assign({}, currentModel, {
              link: currentModel.to ? this.getHrefValue(currentModel) : null,
              type: currentModel.type || this.getItemType(currentModel)
            }
          )
        } else {
          let originId = model.item && model.item.id
          if (!originId) {
            // click on create new button
            originId = this.navigation[this.navigation.length - 1] && this.navigation[this.navigation.length - 1].id
          }
          this.editModel = Object.assign({}, {originId: originId, firstChild: model.firstChild})
        }
      },
      content (value) {
        // main model
        this.model = Object.assign({}, {
          title: value.title,
          key: value.key,
          id: value.id
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
        const v = this.$refs.editFormModel.validate()
        if (!v) return
        const form = JSON.parse(JSON.stringify(this.editModel))
        console.log(form)
        if (form.type === 'directory' && !form.items) {
          form.items = []
        }
        const currentNavigation = JSON.parse(JSON.stringify(this.navigation.slice(0)))
        this.navigation = []
        if (form.originId) {
          // create element inside
          if (form.firstChild) {
            const tempNavigation = insertFirstChild(currentNavigation)
            this.navigation = this.addIdToNavigation(tempNavigation)
            this.$forceUpdate()
          } else {
            this.$nextTick(() => {
              const tempNavigation = insertItem(currentNavigation)
              this.navigation = this.addIdToNavigation(tempNavigation)
            })
          }
        } else {
          // update element
          this.navigation = updateItems(currentNavigation)
        }
        // this.editModel = null
        this.editShow = false

        function insertFirstChild (array) {
          return array.map(item => {
            if (item.id === form.originId) {
              // add first child into current item.items
              const newValue = Object.assign({}, form)
              delete newValue.originId
              delete newValue.firstChild
              item.items = [newValue]
              return item
            }
            if (item.items) {
              item.items = insertItem(item.items)
            }
            return item
          })
        }

        function insertItem (array) {
          let findIndex = array.findIndex(i => i.id === form.originId)
          if (findIndex !== -1) {
            const newValue = Object.assign({}, form)
            delete newValue.originId
            array.splice(findIndex + 1, 0, newValue)
          }
          return array.map(item => {
            if (item.items) {
              item.items = insertItem(item.items)
            }
            return item
          })
        }

        function updateItems (array) {
          return array.map(item => {
            if (item.id === form.id) {
              item = form
            }
            if (item.items) {
              item.items = updateItems(item.items)
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
        return element.link || {
          linkSlug: element.to,
          linkType: null,
          linkId: null
        }
      },
      toggleVisibility () {
        this.show = !this.show
      },
      onPageSelection (value) {
        const link = {
          linkSlug: value.value,
          linkType: value.type,
          linkId: value.id
        }
        this.$set(this.editModel, 'link', link)
        this.$set(this.editModel, 'to', value.value)
      },
      async saveMenu () {
        this.loading = true
        const navigation = JSON.parse(JSON.stringify(this.navigation))
        const variables = Object.assign({}, this.model, {
          bodyJson: {
            NAV: navigation
          },
          languageKey: this.$store.state.lc.locale.toUpperCase()
        })
        if (variables.id) {
          // update template
          await this.mutateGql({
            mutation: updateTemplateGql,
            variables
          }, 'updateTemplate')
        } else {
          // create template
        }
        this.loading = false
        this.model = {}
        this.navigation = []
        this.show = false
      }
    }
  }
</script>
