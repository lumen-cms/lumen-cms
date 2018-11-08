<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-text-field type="file"
                    :accept="accept"
                    ref="fileInput"
                    @change.native="onFileChange"/>
    </v-flex>
    <v-flex xs4>
      <v-btn fab
             class="blue"
             :dark="!!file"
             :disabled="!file"
             :loading="uploading"
             @click.native="uploadFile">
        <v-icon v-text="'cloud_upload'"/>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'LcUploadField',
    props: {
      accept: {
        type: String,
        'default': '*'
      },
      disabled: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        file: null,
        fileName: '',
        uploading: false,
        model: {}
      }
    },
    methods: {
      onFileChange (ev) {
        if (!ev) return
        const fileInput = this.$refs.fileInput.$el.querySelector('input')
        this.file = fileInput.files.length ? fileInput.files[0] : null
      },
      async uploadFile () {
        const endpoint = `https://api.graph.cool/file/v1/${process.env.GRAPHQL_PROJECT_ID}`
        const data = new FormData()
        data.append('data', this.file)

        this.uploading = true
        const responseData = await this.$axios.$post(endpoint, data)
        this.uploading = false
        this.file = null
        this.model = responseData.id
        this.$emit('file-uploaded', { responseData })
      }
    }
  }
</script>
