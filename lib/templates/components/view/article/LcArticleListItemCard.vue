<template>
  <v-card hover class="mb-3">
    <nuxt-link :to="'/' + item.slug">
      <lc-image class="card-media"
                ref="cardMedia"
                :src="previewImageCard"
                :lazy-src="mediaSrc"
                height="200px"/>
    </nuxt-link>
    <v-card-text style="cursor: default; min-height: 100px;">
      <div class="title pb-1" style="min-height: 44px">{{ item.title }}</div>
      <div class="grey--text darken-2 subheading py-2">
        <template v-if="localPublishedDate">
          <v-icon class="grey--text darken-2 body-2 pr-1">access_time</v-icon>
          <span v-text="localPublishedDate" class="pr-3 body-1"/>
        </template>

        <template v-if="item.authors && item.authors.length">
          <v-icon class="grey--text darken-2 body-2 pr-1">person</v-icon>
          <span class="body-1"
                v-for="(author, i) in item.authors"
                :key="'author-' + (author.name || '') + i"
                v-text="author.name + (i < item.authors.length - 1 ? ', ' : '')"/>
          <br>
        </template>

        <template v-if="item.categories && item.categories.length && !properties.hideTagNames">
          <v-icon class="grey--text darken-2 body-2 pr-1">folder_open</v-icon>
          <span class="body-1"
                v-for="(cat, i) in item.categories"
                :key="'cat-' + (cat.title || '') + i"
                v-text="cat.title + (i < item.categories.length - 1 ? ', ' : '')"/>
        </template>
      </div>
      <div class="description-wrap" v-if="item.teaser">
        <lc-html-renderer :content="item.teaser"/>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
  import articleListItemMixin from '../../../mixins/articleListItemMixin'
  import {getImageSrc} from '../../../util/imageSrcHelper'

  const defaultImg = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
  export default {
    name: 'LcArticleListItemCard',
    mixins: [articleListItemMixin],
    data () {
      return {
        mediaSrc: defaultImg,
        previewImageCard: '',
        isInit: true
      }
    },
    watch: {
      previewImage: {
        handler (img) {
          const previewImageCard = img === 'string' ? img : getImageSrc(img, null, 'x300').src
          this.previewImageCard = previewImageCard
          if (!this.isInit) {
            // set mediaSrc if its not initial load for reactive search
            this.mediaSrc = previewImageCard
          }
          if (this.isInit) {
            this.isInit = false
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="stylus">
  .description-wrap .rte-content {
    position: relative;
    height: 4.7em;
    overflow: hidden;
  }

  .description-wrap .rte-content:after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 70%;
    height: 1.2em;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 100%);
  }

  .description-wrap .rte-content p {
    line-height: 1.2em;
  }

  .truncate {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card-media {
    &::before,
    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: scale3d(0, 0, 1);
      transition: transform .3s ease-out 0s;
      background: rgba(255, 255, 255, .1);
      content: '';
      pointer-events: none;
    }

    &::before {
      transform-origin: left top;
    }

    &::after {
      transform-origin: right bottom;
    }

    &:hover,
    &:focus {
      &::before,
      &::after {
        transform: scale3d(1, 1, 1);
      }
    }
  }
</style>
