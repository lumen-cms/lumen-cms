<template>
  <v-list-tile :avatar="styleType === 'AvatarList'"
               :to="`/${item.slug}`">
    <v-list-tile-avatar v-if="styleType === 'AvatarList'">
      <lc-figure :src="previewImageAvatar" alt="avatar"/>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-text="item.title"/>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import {getImageSrc} from '../../../util/imageSrcHelper'
  import articleListItemMixin from '../../../mixins/articleListItemMixin'
  import LcFigure from '../partials/LcFigure'

  export default {
    name: 'LcArticleListItem',
    components: {LcFigure},
    mixins: [articleListItemMixin],
    computed: {
      previewImageAvatar () {
        return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, '60').src
      }
    }
  }
</script>
