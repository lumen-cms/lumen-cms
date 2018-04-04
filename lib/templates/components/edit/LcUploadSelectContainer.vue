<template>
  <div>
    <h3 class="subheading" v-if="!hideLabel">{{ label }}</h3>
    <v-list v-if="mediaList">
      <v-list-tile v-for="(item,i) in mediaList" :key="i">
        <v-list-tile-avatar @click="onItemClick(item.url)">
          <img :src="item.src" :alt="item.name" :title="item.name">
        </v-list-tile-avatar>
        <v-list-tile-content @click="onItemClick(item.url)">
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ item.contentType }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon @click.native="deleteFile(item.id)" :disabled="$store.state.lc.mediaDeleting">
            <v-icon class="red--text text--lighten-1">delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-progress-linear :active="isActive" :indeterminate="true"/>
    <lc-media-library @selected="onItemSelect" v-model="showGallery" :only-one="onlyOne"/>
    <v-btn v-if="showSelectBtn"
           block
           outline
           color="primary"
           :loading="processing"
           @click.stop="showGallery = !showGallery">
      Select Image...
    </v-btn>
  </div>
</template>

<script>
  import {getImageSrc} from '../../util/imageSrcHelper'

  export default {
    name: 'LcUploadSelectContainer',
    props: {
      label: {
        type: String,
        'default': () => 'File'
      },
      disabled: Boolean,
      multiple: Boolean,
      media: Array | Object,
      hideLabel: Boolean,
      input: Boolean,
      processing: Boolean,
      onlyOne: Boolean
    },
    data () {
      return {
        filename: '',
        forms: [],
        uploading: false,
        showGallery: false
      }
    },
    computed: {
      showSelectBtn () {
        return (!this.multiple && !this.mediaList) || this.multiple
      },
      isActive () {
        return this.$store.state.lc.mediaDeleting || this.uploading
      },
      mediaList () {
        if (!this.media) return null
        const getFileSrc = (media) => {
          return Object.assign({}, media, {
            src: getImageSrc(media).src
          })
        }

        if (this.media.constructor === Object) {
          return [getFileSrc(this.media)]
        }
        const filter = this.media && this.media.filter(e => e).map(e => getFileSrc(e))
        return filter.length ? filter : null
      }
    },
    methods: {
      onItemSelect (v) {
        this.$emit('uploaded', v)
        this.$store.dispatch('setMediaLibrary', false)
        this.$store.dispatch('setMediaLibraryData', {})
      },
      onItemClick (url) {
        window.open(url, '_blank')
      },
      async deleteFile (fileId) {
        this.$emit('deleted', fileId)
      }
    }
  }
</script>
