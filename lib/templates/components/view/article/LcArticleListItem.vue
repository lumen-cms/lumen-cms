<template>

  <v-card v-if="styleType === 'Cards'" hover class="mb-3">
    <nuxt-link :to="'/' + item.slug">
      <v-card-media class="card-media"
                    :src="previewImageCard"
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

        <template v-if="item.categories && item.categories.length">
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

  <v-container v-else-if="styleType === 'Slider'" fill-height class="scroll-y">
    <v-layout row wrap align-center>
      <v-flex sm4>
        <figure class="">
          <img class="img-rounded"
               :src="previewImageRound"
               width="80%" height="auto" style="max-height: 80%; max-width: 300px;">
        </figure>
      </v-flex>
      <v-flex xs12 sm8 class="text-xs-left">
        <h2>{{ item.title }}</h2>
        <lc-html-renderer v-if="item.teaser"
                          :content="item.teaser"/>
      </v-flex>
    </v-layout>
  </v-container>

  <v-list-tile v-else
               :avatar="styleType === 'AvatarList'"
               :to="`/${item.slug}`">
    <v-list-tile-avatar v-if="styleType === 'AvatarList'">
      <img class="img-rounded"
           :src="previewImageAvatar"
           :style="previewImgStyle">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-text="item.title"/>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  import {getImageSrc} from '../../../util/imageSrcHelper'

  export default {
    name: 'LcArticleListItem',
    props: {
      item: {
        type: Object,
        required: true
      },
      styleType: {
        type: String | null,
        'default': 'Cards'
      },
      height: {
        type: Number | null | false,
        'default': null
      }
    },
    computed: {
      previewImage () {
        const mediaImg = this.item.media && this.item.media.find(mediaItem => mediaItem.previewImage)
        const previewImage = mediaImg && mediaImg.previewImage
        return previewImage || 'https://placeholdit.co//i/500x500?bg=000&text=No Image found'
      },
      previewImageAvatar () {
        return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, '60').src
      },
      previewImageRound () {
        return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, `${this.height || 600}`).src
      },
      previewImageCard () {
        return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, null, 'x300').src
      },
      previewImgStyle () {
        if (typeof this.previewImage === 'string' || !this.previewImage) {
          return ''
        } else {
          const w = this.previewImage.width
          const h = this.previewImage.height
          return `${w ? 'max-width:' + w : ''}${h ? 'max-height:' + h : ''}`
        }
      },
      localPublishedDate () {
        if (!this.item.publishedDate) return
        const d = new Date(this.item.publishedDate)
        return d.toLocaleDateString()
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
