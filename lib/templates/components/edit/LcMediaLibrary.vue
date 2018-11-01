<template>
  <div>
    <v-dialog v-model="showDialog"
              :lazy="true"
              scrollable
              persistent
              content-class="media-library-wrap">
      <v-card class="media-library">
        <v-system-bar dark status style="height: 36px">
          Files: {{ itemsShown }}/{{ totalCount }}
          <v-spacer/>
          <v-btn icon small @click="showDialog=false">
            <v-icon style="font-size:28px">clear</v-icon>
          </v-btn>
        </v-system-bar>
        <v-toolbar>
          <lc-main-search/>
          <v-menu right>
            <v-btn slot="activator" icon>
              <v-icon>sort_by_alpha</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="sort in sortOptions" :key="sort.value"
                           @click="$store.dispatch('setMediaOrderBy',sort.value)">
                <v-list-tile-title :class="{'info--text':$store.state.lc.mediaOrderBy === sort.value}">
                  {{ sort.title }}
                </v-list-tile-title>
                @
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu>
            <v-btn slot="activator" icon>
              <v-icon>list</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile v-for="size in sizeOptions" :key="size.value"
                           @click="gridSize = size.value">
                <v-list-tile-title :class="{'info--text':gridSize === size.value}">{{ size.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-layout row slot="extension"
                    v-if="selectedItemList.length">
            <v-flex xs11>
              <v-container fluid grid-list-sm>
                <v-layout row wrap>
                  <v-flex xs1 v-for="img in selectedItemList" :key="img.id">
                    <lc-media-library-preview-item :content="img"/>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-flex>
            <v-flex xs1 class="text-xs-right">
              <v-btn icon
                     color="info"
                     outline
                     @click="onConfirmSelection">
                <v-icon>done_all</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-toolbar>
        <v-card-text style="height:700px">
          <lc-upload-container multiple hide-label
                               @uploaded="onUploaded"/>
          <template v-if="$cms.MEDIA_LIBRARY.length">
            <!-- todo need to verfy that this works.. -->
            <component :is="$cms.MEDIA_LIBRARY.ADDONS[0]"
                       @edReady="editorLoadData = null"
                       :load-data="editorLoadData"
                       @uploaded="onUploaded"/>
                       <!--<addon0 @uploaded="onUploaded"-->
                       <!--@edReady="editorLoadData = null"-->
                       <!--:load-data="editorLoadData"/>-->
          </template>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex v-for="file in allFiles" :key="file.id"
                      v-bind="{ [`xs6 sm4 lg${gridSize}`]: true }">
                <lc-media-library-item @selected="onSelect"
                                       @onEditSelect="selected = $event"
                                       @loadEditorImage="onLoadEditorImage"
                                       @remove="onRemove"
                                       :active="!!selectedItemList.find(e => file.id === e.id)"
                                       :is-fixed-active="!!$store.state.lc.mediaAlreadySelected.find(e => file.id === e.id)"
                                       :item="file"
                                       :size="gridSize"
                                       :ref="'media-item-'+file.id"/>
              </v-flex>
            </v-layout>
          </v-container>
          <v-btn block outline color="primary"
                 @click="loadMore"
                 :loading="!!loadingApollo"
                 v-show="totalCount > pagination.rowsPerPage">
            Load more...
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <lc-file-update-dialog v-model="selected"
                           ref="updateDialog"
                           @refetch="onRefetch"/>
  </div>
</template>
<script>
  // todo find smarter way to extend media library
  import deleteFileGql from '../../gql/fileReference/deleteFile.gql'
  import allFilesGql from '../../gql/file/allFiles.gql'
  import fileGql from '../../gql/file/File.gql'
  // import CONFIG from '../../../src/config'
  import { pagination, getSkipFirst } from '../../util/pagination'

  export default {
    name: 'LcMediaLibray',
    components: {
      VSystemBar: () => import('vuetify/lib/components/VSystemBar')
    },
    props: {
      value: Boolean,
      onlyOne: Boolean
    },
    data () {
      return {
        allFiles: [],
        // mediaLibraryAddons: CONFIG.MEDIA_LIBRARY.ADDONS,
        editorLoadData: null,
        showDialog: false,
        searchText: '',
        selected: null, // for editing
        pagination: Object.assign({}, pagination),
        loadingApollo: 0,
        totalCount: 0,
        gridSize: 4,
        selectedItemList: [] // for selecting
      }
    },
    beforeDestroy () {
      this.$store.dispatch('setMainSearch', '')
    },
    computed: {
      itemsShown () {
        return this.pagination.rowsPerPage * parseInt(this.pagination.page)
      },
      sortOptions () {
        return [
          { title: 'Created ASC', value: 'createdAt_ASC' },
          { title: 'Created DESC', value: 'createdAt_DESC' },
          { title: 'Name ASC', value: 'name_ASC' },
          { title: 'Name DESC', value: 'name_DESC' }
        ]
      },
      sizeOptions () {
        return [
          { title: 'X-Small', value: 2 },
          { title: 'Small', value: 3 },
          { title: 'Medium', value: 4 },
          { title: 'Large', value: 6 }
        ]
      }
    },
    watch: {
      selected (v) {
        if (v) {
          this.$refs.updateDialog.toggleDialog()
        }
      },
      value (v) {
        this.showDialog = v
      },
      '$store.state.lc.showMediaLibrary' (v) {
        this.showDialog = v
      },
      showDialog (v) {
        this.$emit('input', v)
        if (!v && !!this.$store.state.lc.showMediaLibrary) {
          this.$store.dispatch('setMediaLibrary', false)
          this.$store.dispatch('setMediaExistingFiles', [])
        }
      },
      '$store.state.lc.mediaAlreadySelected' () {
        this.selectedItemList = []
          .concat(this.$store.state.lc.mediaAlreadySelected)
          .sort((a, b) => a.sorting - b.sorting)
      }
    },
    methods: {
      /**
       * @param {string} fileId
       * @returns {*|Promise.<*>}
       */
      async deleteFileOnId (fileId) {
        const mutationOptions = { mutation: deleteFileGql, variables: { id: fileId } }
        await this.mutateGql(mutationOptions, 'deleteFile')
      },
      async onRemove (item) {
        await this.deleteFileOnId(item.id)
        this.refetchGql('allFiles')
      },
      /**
       *
       */
      async onLoadEditorImage (item) {
        const { File } = await this.queryGql({
          query: fileGql,
          variables: {
            id: item.name.split('.')[1]
          }
        })
        const data = await fetch(File.url)
          .then(res => res.json())
          .catch(e => console.log(e))

        this.editorLoadData = data
        return data
      },
      onRefetch () {
        this.refetchGql('allFiles')
      },
      loadMore () {
        this.pagination.page += 1
        const { skip, first } = getSkipFirst(this.pagination)
        this.fetchMoreGql('allFiles', { first, skip })
      },
      onUploaded () {
        this.refetchGql('allFiles')
      },
      onSelect (file) {
        if (this.onlyOne) {
          // in case only one should be selected
          this.$emit('selected', file.id)
          this.afterSelectConfirmation()
          return
        }
        // add id to selected items
        const alreadySelected = this.$store.state.lc.mediaAlreadySelected
        if (alreadySelected.find(e => file.id === e.id)) return // do nothing if its an already selected item
        if (this.selectedItemList.findIndex(e => e.id === file.id) !== -1) {
          this.selectedItemList = this.selectedItemList.filter(e => e.id !== file.id)
        } else {
          this.selectedItemList.push(file)
        }
      },
      afterSelectConfirmation () {
        this.$store.dispatch('setMediaLibrary', false)
        this.$store.dispatch('setMediaExistingFiles', [])
        this.showDialog = false
      },
      /**
       * @description user confirms selection of library images
       */
      onConfirmSelection () {
        const alreadySelected = this.$store.state.lc.mediaAlreadySelected
        const newItems = this.selectedItemList.filter(e => !alreadySelected.find(a => a.id === e.id))
        this.$store.dispatch('setMediaLibraryData', newItems)
        this.afterSelectConfirmation()
      }
    },
    apollo: {
      allFiles: {
        query: allFilesGql,
        variables () {
          const { skip, first } = getSkipFirst(pagination)
          const variables = {
            skip,
            first,
            orderBy: this.$store.state.lc.mediaOrderBy,
            filter: {
              contentType_in: ['image/jpeg', 'image/png']
            }
          }
          const mainSearch = this.$store.state.lc.mainSearch
          if (mainSearch) {
            variables.filter = Object.assign({}, variables.filter, {
              OR: [
                { name_contains: mainSearch },
                {
                  fileTags_some: {
                    title_contains: mainSearch
                  }
                }
              ]
            })
          }
          return variables
        },
        result ({ data }) {
          this.totalCount = data._allFilesMeta && data._allFilesMeta.count
        },
        skip () {
          return !this.showDialog
        },
        loadingKey: 'loadingApollo'
      }
    }
  }
</script>
<style lang="stylus">
  .media-library-wrap {
    min-width 80%
    .media-library {

    }
  }
</style>
