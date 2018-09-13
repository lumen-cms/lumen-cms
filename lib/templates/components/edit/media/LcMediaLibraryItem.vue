<template>
  <v-card hover :class="{'active':active,'fixed-active':isFixedActive}">
    <v-img class="grey lighten-2 white--text"
           :src="src"
           :contain="true"
           :height="height"
           @click.native="onItemSelect"/>
    <v-card-actions>
      <v-btn icon @click.stop="show = !show">
        <v-icon>{{ `keyboard_arrow_${(show ? 'down' : 'up')}` }}</v-icon>
      </v-btn>
      <v-spacer/>
      <template v-if="isEditorImage">
        <v-btn icon @click.stop="$emit('loadEditorImage', item)">
          <v-icon>open_in_browser</v-icon>
        </v-btn>
        <v-spacer/>
      </template>
      <small class="grey--text">{{ item.width + 'x' + item.height }}</small>
      <v-btn icon @click.stop="$emit('onEditSelect', item)">
        <v-icon>edit</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <div>
          <i>{{ item.id }}</i><br>
          <span>{{ item.name }}, used {{ used }} times</span>
        </div>
        <div>

          <lc-confirm-btn v-if="used === 0"
                          label="delete"
                          @onConfirm="$emit('remove',item)"/>
        </div>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>
<script>
  import imageHelperMixin from '../../../mixins/imageHelperMixin'
  import LcImage from '../../view/partials/LcImage'

  export default {
    name: 'LcMediaLibraryItem',
    components: {LcImage},
    mixins: [imageHelperMixin],
    props: {
      item: Object,
      size: Number,
      active: Boolean,
      isFixedActive: Boolean
    },
    data () {
      return {
        show: false,
        edit: false,
        loading: false,
        model: Object.assign({}, this.item)
      }
    },
    computed: {
      isEditorImage () {
        const name = this.item.name
        const nameParts = name.split('.')
        return nameParts.length === 3 && nameParts[0] === 'ed-editable-image'
      },
      used () {
        const item = this.item
        return item._mediaListImagesMeta.count + item._fileReferencesMeta.count + item._mediaFilesMeta.count
      },
      height () {
        const heights = {
          2: 100,
          3: 150,
          4: 200,
          6: 250
        }
        return heights[this.size]
      },
      src () {
        const file = this.getFileAttrs({file: this.item}, 'x' + this.height)
        return file.src
      }
    },
    methods: {
      hideMenu () {
        this.edit = false
      },
      toggleLoading () {
        this.loading = !this.loading
      },
      onItemSelect () {
        this.$emit('selected', this.item)
      }
    }
  }
</script>
<style>
  .media-library-wrap .card.active {
    border: 2px dashed rgb(124, 179, 66);
    box-shadow: 0 1px 5px rgba(124, 179, 66, .2), 0 2px 2px rgba(124, 179, 66, .14), 0 3px 1px -2px rgba(124, 179, 66, .12);
  }

  .media-library-wrap .card.fixed-active {
    border: 2px solid rgb(124, 179, 66);
    box-shadow: 0 1px 5px rgba(124, 179, 66, .2), 0 2px 2px rgba(124, 179, 66, .14), 0 3px 1px -2px rgba(124, 179, 66, .12);
  }
</style>
