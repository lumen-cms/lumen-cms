// import {getImageSrc} from '../../../util/imageSrcHelper'
import imageSrcHelperMixin from '../../../mixins/imageSrcHelperMixin'

export default {
  name: 'LcArticleListSlider',
  mixins: [imageSrcHelperMixin],
  props: {
    list: Array,
    properties: Object,
    isVisible: Boolean
  },
  methods: {
    // https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
    chunkArray (myArray, chunkSize) {
      const results = []
      while (myArray.length) {
        results.push(myArray.splice(0, chunkSize))
      }
      return results
    },
    getPreviewImage (item) {
      const mediaImg = item.media && item.media.find(mediaItem => mediaItem.previewImage)
      const previewImage = mediaImg && mediaImg.previewImage
      return previewImage || 'https://placeholdit.co//i/500x500?bg=000&text=No Image found'
    },
    carouselItemWrap (item, childs) {
      let {sliderStyle, sliderItemsRow} = this.properties

      const itemAttrs = (sliderItemsRow && sliderItemsRow > 1) ? {} : {
        to: '/' + item.slug,
        nuxt: true
      }
      return this.$createElement('v-carousel-item', {
        attrs: itemAttrs
      }, [
        this.$createElement('v-container', {
          attrs: {
            'fill-height': true,
            fluid: sliderStyle === 'slideshow',
            'pa-0': sliderStyle === 'slideshow'
          }
        }, [
          this.$createElement('v-layout', {
            atts: {
              row: true,
              wrap: true,
              'align-center': true,
              'fill-height': true
            }
          }, [childs])
        ])
      ])
    },
    renderFigure (item) {
      let {sliderImageCover, sliderHeaderSize, sliderLightDesign} = this.properties
      const isLight = !!sliderLightDesign

      return this.$createElement('figure', {style: {height: '100%', position: 'relative'}}, [
        this.$createElement('img', {
          alt: item.title,
          style: {
            height: '100%',
            width: '100%',
            objectFit: sliderImageCover ? 'cover' : 'contain'
          },
          attrs: {
            [this.isVisible ? 'src' : 'data-src']: this.getImageSrc(this.getPreviewImage(item)).src
          }
        }),
        this.$createElement('router-link', {
          attrs: {
            to: '/' + item.slug
          }
        }, [
          this.$createElement('h3', {
            staticClass: 'slider-title-centered',
            'class': {
              [sliderHeaderSize || 'display-1']: true,
              'theme--light': isLight,
              'theme--dark': !isLight
            }
          }, item.title)
        ])
      ])
    },
    renderSingleItem (item) {
      let {sliderItemsRow} = this.properties
      return this.$createElement('v-flex', {
        attrs: {
          'pa-0': !(sliderItemsRow > 1),
          'sm6': sliderItemsRow === 2,
          'sm4': sliderItemsRow === 3,
          'sm3': sliderItemsRow === 4
        }
      }, [this.renderFigure(item)])
    }
  },
  render (h) {
    let items = this.list
    let childs = []
    let {height, sliderShowDelimiters, sliderAutoRotation, sliderLightDesign, sliderStyle, sliderItemsRow} = this.properties
    height = height || 400
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
    if (sliderStyle === 'slideshow') {
      if (sliderItemsRow > 1 && !this.$device.isMobile) {
        // split into chunks if more than one slide
        const chunked = this.chunkArray(items.slice(), sliderItemsRow)
        childs = chunked.map(items => {
          return this.carouselItemWrap(
            {},
            items.map(item => this.renderSingleItem(item))
          )
        })
      } else {
        // default slider render
        childs = items.map(item => {
          return this.carouselItemWrap(
            item,
            this.renderSingleItem(item)
          )
        })
      }
    } else {
      childs = items.map(item => {
        return this.carouselItemWrap(
          item, [
            h('v-flex', {}, [
              h('figure', {style: {height: '100%'}}, [
                h('img', {
                  staticClass: 'img-rounded',
                  alt: item.title,
                  style: {
                    maxHeight: '100%'
                  },
                  attrs: {
                    // width: height,
                    // height: height,
                    [this.isVisible ? 'src' : 'data-src']: this.getImageSrc(this.getPreviewImage(item), height + ':round').src
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
    return h('v-carousel', options, childs)
  }
}
