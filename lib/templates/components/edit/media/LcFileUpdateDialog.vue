<template>
  <div>
    <v-dialog v-model="showEdit" persistent max-width="550">
      <v-card>
        <v-card-text>
          <v-text-field label="Name"
                        v-model="name"
                        :disabled="isEditorImage"/>
          <v-select
            label="Tags"
            prepend-icon="list"
            :prepend-icon-cb="() => $refs.fileTagDialog.toggleShow()"
            multiple chips
            :items="tagItems"
            v-model="tags"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click.stop="showEdit=false;$emit('input',null)">
            Cancel
          </v-btn>
          <v-btn flat class="blue--text" @click.stop="onItemSubmit" :loading="loading">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <lc-file-tag-dialog :content="allFileTags" ref="fileTagDialog"/>
  </div>
</template>
<script>
  import updateFileGql from '../../../gql/file/fileUpdate.gql'
  import slugify from 'slugify'
  import allFileTagGql from '../../../gql/file/allFileTags.gql'

  export default {
    name: 'LcFileUpdateDialog',
    props: {
      value: Object || null
    },
    data () {
      return {
        allFileTags: [],
        loading: false,
        showEdit: false,
        name: '',
        tags: ''
      }
    },
    watch: {
      value () {
        this.setFields()
      }
    },
    methods: {
      toggleDialog () {
        this.showEdit = !this.showEdit
      },
      setFields () {
        if (!this.value) return
        this.name = this.value.name
        this.tags = this.value.fileTags.map(e => e.id)
      },
      slugifyName (name, contentType) {
        return slugify(name, {
          replacement: '_', // replace spaces with replacement
          // remove: /[$*_+~.()'"!\-:@]/g, // regex to remove characters
          remove: /[^0-9a-zA-Z_\s]/gi, // regex to remove characters
          lower: true // result in lower case
        })
      },
      onItemSubmit () {
        const file = Object.assign({}, this.value, {
          name: this.name
        })
        this.loading = true
        const variables = {
          id: file.id,
          // editor image names can't be changed
          name: this.isEditorImage ? file.name : this.slugifyName(file.name),
          fileTagsIds: this.tags
        }
        // due to graphcool bug: https://github.com/graphcool/graphcool/issues/434
        return this.$apollo.mutate({
          mutation: updateFileGql,
          variables,
          refetchQueries: ['allFiles']
        }).then(() => {
          this.loading = false
          this.$emit('refetch', true)
        }, () => {
          this.loading = false
          this.$emit('refetch', true)
        })
      }
    },
    computed: {
      tagItems () {
        return (this.allFileTags && this.allFileTags.map(e => ({value: e.id, text: e.title}))) || []
      },
      isEditorImage () {
        if (!this.value) return
        const name = this.value.name
        const nameParts = name.split('.')
        return nameParts.length === 3 && nameParts[0] === 'ed-editable-image'
      }
    },
    apollo: {
      allFileTags: {
        query: allFileTagGql
      }
    }
  }
</script>
