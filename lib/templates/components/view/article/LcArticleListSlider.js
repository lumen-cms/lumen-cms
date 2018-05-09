import {getImageSrc} from '../../../util/imageSrcHelper'

export default {
  name: 'LcArticleListSlider',
  props: {
    list: Array,
    properties: Object
  },
  computed: {
    // previewImageRound () {
    //   const properties = this.properties
    //   console.log(properties)
    //
    //   return typeof this.previewImage === 'string' ? this.previewImage : getImageSrc(this.previewImage, `${this.height || 600}`).src
    // }
  },
  methods: {
    getPreviewImage (item) {
      const mediaImg = item.media && item.media.find(mediaItem => mediaItem.previewImage)
      const previewImage = mediaImg && mediaImg.previewImage
      return previewImage || 'https://placeholdit.co//i/500x500?bg=000&text=No Image found'
    }
  },
  render (h) {

    const items = this.list
    let childs = []
    const {height, sliderShowDelimiters, sliderAutoRotation, sliderLightDesign, sliderStyle, sliderImageCover, sliderHeaderSize} = this.properties

    const interval = sliderAutoRotation ? Number(sliderAutoRotation) : 0
    const isLight = !!sliderLightDesign
    const options = {
      props: {
        'hide-delimiters': !sliderShowDelimiters,
        cycle: !!interval,
        dark: !isLight,
        light: isLight
      },
      staticClass: this.wrapClassNames,
      style: {
        height: height ? height + 'px' : '500px'
      }
    }
    if (interval > 0) {
      options.props.interval = interval
    }
    // render child elements
    const carouselItemWrap = (item, childs) => {
      return h('v-carousel-item', {
        attrs: {
          to: '/' + item.slug,
          nuxt: true
        }
      }, [
        h('v-container', {attrs: {'fill-height': true, fluid: true, 'pa-0': true}}, [
          h('v-layout', {atts: {row: true, wrap: true, 'align-center': true, 'fill-height': true}}, [childs])
        ])
      ])
    }

    if (sliderStyle === 'slideshow') {
      childs = items.map(item => {
        return carouselItemWrap(
          item,
          h('v-flex', {attrs: {'pa-0': true}}, [
            h('figure', {style: {height: '100%', position: 'relative'}}, [
              h('img', {
                staticClass: 'lazyload',
                alt: item.title,
                style: {
                  height: '100%',
                  width: '100%',
                  objectFit: sliderImageCover ? 'cover' : 'contain'
                },
                attrs: {
                  'data-src': getImageSrc(this.getPreviewImage(item)).src
                }
              }),
              h('h3', {
                staticClass: 'slider-title-centered',
                'class': {
                  [sliderHeaderSize || 'display-1']: true,
                  'theme--light': isLight,
                  'theme--dark': !isLight
                }
              }, item.title)
            ])
          ])
        )
      })
    } else {
      childs = items.map(item => {
        return carouselItemWrap(
          item, [
            h('v-flex', {attrs: {sm4: true}}, [
              h('figure', {style: {height: '100%'}}, [
                h('img', {
                  staticClass: 'img-rounded lazyload',
                  alt: item.title,
                  style: {
                    height: '100%'
                  },
                  attrs: {
                    'data-src': getImageSrc(this.getPreviewImage(item), height + ':round').src
                  }
                })
              ])
            ]),
            h('v-flex', {attrs: {sm8: true, xs12: true, 'pl-1': true}}, [
              h('h3', {}, item.title),
              item.teaser ? h('lc-html-renderer', {props: {content: item.teaser}}) : ''
            ])
          ]
        )
      })
    }
    console.log(options)
    return h('v-carousel', options, childs)
  }
  // <lc-carousel :hide-bottom-bar="properties.bottomBarHidden"
  // :content="content">
  //   <lc-article-list-item-slider v-for="(item, i) in list"
  //   :key="`slider${i}`"
  // :height="properties.sliderHeight"
  // :item="item"
  // :properties="properties"/>
}


// <v-container fill-height class="scroll-y">
//   <v-layout row wrap align-center>
//     <v-flex sm4>
//       <nuxt-link :to="'/' + item.slug">
//         <figure>
//           <img class="img-rounded lazyload"
//                :data-src="previewImageRound"
//                alt="preview-image"
//                width="80%" height="auto" style="max-height: 80%; max-width: 300px;">
//         </figure>
//       </nuxt-link>
//     </v-flex>
//     <v-flex xs12 sm8 class="text-xs-left">
//       <h2>{{ item.title }}</h2>
//       <lc-html-renderer v-if="item.teaser"
//                         :content="item.teaser"/>
//     </v-flex>
//   </v-layout>
// </v-container>
