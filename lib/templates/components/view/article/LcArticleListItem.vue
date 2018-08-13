<template>
  <v-list-tile :avatar="styleType === 'AvatarList'"
               :to="`/${item.slug}`">
    <v-list-tile-avatar v-if="styleType === 'AvatarList'">
      <img class="img-rounded lazyload"
           alt="avatar"
           :data-src="previewImageAvatar"
           :style="previewImgStyle">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-text="item.title"/>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import {getImageSrc} from '../../../util/imageSrcHelper'
  import articleListItemMixin from '../../../mixins/articleListItemMixin'

  export default {
    name: 'LcArticleListItem',
    mixins: [articleListItemMixin],
    computed: {
      previewImageAvatar () {
        return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, '60').src
      },
      previewImgStyle () {
        if (typeof this.previewImage === 'string' || !this.previewImage) {
          return ''
        } else {
          const w = this.previewImage.width
          const h = this.previewImage.height
          return `${w ? 'max-width:' + w : ''}${h ? 'max-height:' + h : ''}`
        }
      }
    }
  }
</script>
