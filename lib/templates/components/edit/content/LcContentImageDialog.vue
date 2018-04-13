<template>
  <div>

    <v-expansion-panel focusable>
      <v-expansion-panel-content>
        <div slot="header">New/Update image selection...</div>
        <v-card-text class="grey lighten-3">
          <v-btn block outline class="primary--text" @click.stop="onSelectNewImages">
            <v-icon>photo_library</v-icon>&nbsp;
            Open Media Library
          </v-btn>
        </v-card-text>
      </v-expansion-panel-content>
      <v-expansion-panel-content hide-actions
                                 v-for="(item,i) in fileReferences" :key="item.id">
        <v-layout row align-center spacer
                  slot="header"
                  v-if="item.id">
          <v-flex xs1
                  v-if="fileReferences.length > 1">
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn icon small
                       v-if="i>0"
                       @click.stop="onSortFileRef(item, fileReferences[i-1], i-1, i)">
                  <v-icon>keyboard_arrow_up</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn icon small
                       v-if="i !== fileReferences.length - 1"
                       @click.stop="onSortFileRef(item, fileReferences[i+1], i+1, i)">
                  <v-icon>keyboard_arrow_down</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>

          </v-flex>
          <v-flex sm1 class="hidden-xs-only">
            <v-avatar slot="activator">
              <img :src="getFileUrl(item)"
                   v-if="item.file">
              <v-icon v-else>photo</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex>{{ item.file && item.file.name }}</v-flex>
          <v-flex xs3 class="text-xs-right">
            <v-btn icon @click.stop="removeFileReference(item)">
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn icon
                   @click.stop="submitFormItem('fileReference'+i)"
                   v-if="can_update[item.id]"
                   :loading="is_loading[item.id]"
                   ref="submitFileRefBtn"
                   class="submitFileRefBtn">
              <v-icon class="primary--text">save</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-card>
          <v-card-text class="grey lighten-3">
            <lc-file-reference-edit :content="item"
                                    :is-background="typename === 'Layout'"
                                    @onFormDirty="onDirty(item,$event)"
                                    @fileReferenceUpdate="onFileRefSubmit('fileReference'+i,item,$event)"
                                    :ref="'fileReference'+i"/>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-snackbar v-model="showFileRefDelete"
                dark
                absolute
                :timeout="0"
                color="secondary">
      Are you sure to delete the image?
      <v-btn icon
             @click="showFileRefDelete=false;currentRefToDelete=null">
        <v-icon color="white">clear</v-icon>
      </v-btn>
      <v-btn icon
             @click="onDeleteFileReference()"
             :loading="isDeleting">
        <v-icon color="error">delete</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import mediaFileMixin from '../../../mixins/mediaFileMixin'
  import {getImageSrc} from '../../../util/imageSrcHelper'

  export default {
    name: 'LcContentImageDialog',
    mixins: [mediaFileMixin],
    props: {
      canEdit: {
        type: Boolean,
        'default': true
      },
      canDelete: Boolean,
      id: String,
      content: {
        type: Object,
        'default': () => {
        }
      },
      languageKey: String,
      sorting: Number,
      published: Boolean
    },
    data () {
      return {
        fileReferences: [],
        is_loading: {},
        can_update: {},
        is_vert_open: {},
        showFileRefDelete: false,
        isDeleting: false,
        currentRefToDelete: null
      }
    },
    watch: {
      '$store.state.lc.mediaLibraryItems' (v) {
        v && v.length && this.onImagesSelected(v)
      },
      content () {
        this.updateFileReferences()
      }
    },
    computed: {
      typename () {
        const typename = this.content && this.content.type
        if (typename) return typename
        return 'N/A'
      }
    },
    mounted () {
      this.updateFileReferences()
    },
    destroyed () {
      // make sure media library is off
      this.$store.dispatch('setMediaLibrary', false)
    },
    methods: {
      removeFileReference (item) {
        this.currentRefToDelete = item
        this.showFileRefDelete = true
      },
      updateFileReferences () {
        const fileReferences = this.typename === 'Layout' ? this.content.backgroundFileReferences : this.content.fileReferences
        this.fileReferences = (fileReferences && fileReferences.slice(0).sort((a, b) => a.sorting - b.sorting)) || []
      },
      getFileUrl (item) {
        return (item && item.file) ? getImageSrc(item.file, '64').src : ''
      },
      onSelectNewImages () {
        this.$store.dispatch('setMediaExistingFiles', this.fileReferences
          .sort((a, b) => a.sorting - b.sorting)
          .map(e => e.file))
        this.$store.dispatch('setMediaLibrary', true)
      },
      onFileUpdate (item, value) {
        this.$set(this.is_loading, item.id, value)
        if (!value) {
          this.$set(this.can_update, item.id, false)
        }
      },
      submitFormItem (ref) {
        const $ref = this.$refs[ref][0]
        $ref.validate()
      },
      async onFileRefSubmit (ref, item, values) {
        this.onFileUpdate(item, true)
        await this.updateFileReference(values)
        this.onFileUpdate(item, false)
        const fileRef0 = this.$refs.fileReference0 && this.$refs.fileReference0.length && this.$refs.fileReference0[0]
        if (fileRef0 && !!fileRef0.resetDetection) {
          fileRef0.resetDetection()
        } else {
          console.log('fileRef0 not found')
          return Promise.reject(new Error('fileReference0 not found'))
        }
      },
      onImageItemDeleted () {
        const item = this.currentRefToDelete
        this.fileReferences = this.fileReferences
          .map(e => e.id === item.id ? Object.assign({}, e, {file: null}) : e)
      },
      onDirty (item, value) {
        this.$set(this.can_update, item.id, value)
      },
      getHighestSorting () {
        let highestFileRefSorting = 0
        this.fileReferences.forEach(ref => {
          ref.sorting && ref.sorting > highestFileRefSorting && (highestFileRefSorting = ref.sorting)
        })
        return highestFileRefSorting
      },
      /**
       * sorting up / down handler
       * @param {object} item
       * @param {object} swapWithItem
       * @param {number} [itemFallbackSorVal] - value to be used if item.sorting is not defined
       * @param {number} swapItemFallbackSortVal - - value to be used if swapWithItem.sorting is not defined
       */
      async onSortFileRef (item, swapWithItem, itemFallbackSorVal, swapItemFallbackSortVal) {
        const promises = []
        const newItemSortVal = swapWithItem.sorting || itemFallbackSorVal
        const newSwapWithItemSortVal = item.sorting || swapItemFallbackSortVal

        promises.push(
          this.updateFileReference({
            id: item.id,
            sorting: newItemSortVal
          }),
          this.updateFileReference({
            id: swapWithItem.id,
            sorting: newSwapWithItemSortVal
          })
        )
        await Promise.resolve(promises)
        const tempFileReferences = this.fileReferences.map(ref => {
          const obj = Object.assign({}, ref)
          if (ref.id === item.id) {
            obj.sorting = newItemSortVal
          }
          if (ref.id === swapWithItem.id) {
            obj.sorting = newSwapWithItemSortVal
          }
          return obj
        }).sort((a, b) => a.sorting - b.sorting)
        this.fileReferences = tempFileReferences
      },
      async onDeleteFileReference () {
        const item = this.currentRefToDelete
        this.isDeleting = true
        await this.deleteFileReference(item.id, 'Article')
        const idx = this.fileReferences.findIndex(e => e.id === item.id)
        if (idx !== -1) {
          this.$nextTick(() => {
            this.fileReferences.splice(idx, 1)
            this.isDeleting = false
            this.showFileRefDelete = false
          })
        }
      },
      async onImagesSelected (files) {
        const highestFileRefSorting = this.getHighestSorting()
        files.forEach(async (file, i) => {
          const fileId = file.id
          const variables = {
            contentBackgroundId: this.typename === 'Layout' ? this.content.id : null,
            contentId: this.typename === 'TextImage' ? this.content.id : null,
            // mediaId: this.typename === 'Media' ? this.content.id : null, // todo should not exist any more
            fileId: fileId,
            sorting: highestFileRefSorting + 1 + i
          }
          const data = await this.createFileReference(variables, 'Article')
          this.fileReferences.push(data)
        })
        this.$store.dispatch('setMediaLibraryData', [])
        this.$store.dispatch('setMediaLibrary', false)
      }
    }
  }
</script>
