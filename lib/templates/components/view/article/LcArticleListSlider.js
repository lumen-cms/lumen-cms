import {getImageSrc} from '../../../util/imageSrcHelper'

export default {
  name: 'LcArticleListSlider',
  props: {
    list: Array,
    properties: Object
  },
  methods: {
    getPreviewImage (item) {
      const mediaImg = item.media && item.media.find(mediaItem => mediaItem.previewImage)
      const previewImage = mediaImg && mediaImg.previewImage
      return previewImage || 'https://placeholdit.co//i/500x500?bg=000&text=No Image found'
    }
  },
  render (h) {
    let items = this.list
    let childs = []
    let {height, sliderShowDelimiters, sliderAutoRotation, sliderLightDesign, sliderStyle, sliderImageCover, sliderHeaderSize, sliderItemsRow} = this.properties
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
    /**
     * render each carousel item. takes item and childs as arguments
     * @param item
     * @param childs
     * @returns {*}
     */
    const carouselItemWrap = (item, childs) => {
      const itemAttrs = (sliderItemsRow && sliderItemsRow > 1) ? {} : {
        to: '/' + item.slug,
        nuxt: true
      }
      return h('v-carousel-item', {
        attrs: itemAttrs
      }, [
        h('v-container', {
          attrs: {
            'fill-height': true,
            fluid: sliderStyle === 'slideshow',
            'pa-0': sliderStyle === 'slideshow'
          }
        }, [
          h('v-layout', {atts: {row: true, wrap: true, 'align-center': true, 'fill-height': true}}, [childs])
        ])
      ])
    }

    if (sliderStyle === 'slideshow') {
      /**
       * render each slide element
       * @param item
       * @returns {*}
       */
      const renderSingleItem = (item) => {
        return h('v-flex', {
          attrs: {
            'pa-0': !(sliderItemsRow > 1),
            'sm6': sliderItemsRow === 2,
            'sm4': sliderItemsRow === 3,
            'sm3': sliderItemsRow === 4
          }
        }, [
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
            h('router-link', {
              attrs: {
                to: '/' + item.slug
              }
            }, [
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
        ])
      }

      if (sliderItemsRow > 1 && !this.$device.isMobile) {
        // split into chunks if more than one slide
        const chunked = chunkArray(items.slice(), sliderItemsRow)
        childs = chunked.map(items => {
          return carouselItemWrap(
            {},
            items.map(item => renderSingleItem(item))
          )
        })
      } else {
        // default slider render
        childs = items.map(item => {
          return carouselItemWrap(
            item,
            renderSingleItem(item)
          )
        })
      }
    } else {
      childs = items.map(item => {
        return carouselItemWrap(
          item, [
            h('v-flex', {}, [
              h('figure', {style: {height: '100%'}}, [
                h('img', {
                  staticClass: 'img-rounded lazyload',
                  alt: item.title,
                  style: {
                    maxHeight: '100%'
                  },
                  attrs: {
                    // width: height,
                    // height: height,
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
    return h('v-carousel', options, childs)
  }
}

// https://ourcodeworld.com/articles/read/278/how-to-split-an-array-into-chunks-of-the-same-size-easily-in-javascript
function chunkArray (myArray, chunkSize) {
  const results = []
  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }
  return results
}
