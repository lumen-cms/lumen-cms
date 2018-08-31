import getImageSourceSet from '../../../util/getImageSourceSet'
import {getFileAttrs} from '../helpers/imageHelper'
import LcImage from './LcImage'

export default {
  name: 'LcImageCarouselItem',
  props: {
    fileRef: Object,
    styleType: Object,
    activateLightBox: Function,
    index: Number,
    slideshowHeight: Number | String,
  },
  render (h) {
    const mediaAttrs = {cover: true}
    // const height = this.calculatedHeight
    const height = this.slideshowHeight
    const resize = height ? 'x' + height : false
    const {isCoverImg} = this.styleType

    let {srcset, sizes} = getImageSourceSet(this.fileRef, height)
    // srcset = this.isVariableSize ? false : srcset
    // sizes = srcset ? sizes : false

    const fileAttrs = getFileAttrs(this.fileRef, resize)
    mediaAttrs.src = fileAttrs && fileAttrs.src
    return h('v-card', {
      staticClass: 'media-column',
      style: {height: (isCoverImg && height) ? height + 'px' : 'auto'}
    }, [
      h(LcImage, {
        props: {
          src: mediaAttrs.src,
          srcset: srcset || '',
          sizes: sizes || '',
          contain: !isCoverImg,
          height
        }
      }, [
        h('div', {
          staticClass: 'title-wrap' + (this.activateLightBox ? ' lightbox' : ''),
          on: {
            click: (ev) => {
              this.activateLightBox && this.activateLightBox(this.index)
            }
          }
        }, this.genMediaTitle)
      ])
    ])
  },
  computed: {
    genMediaTitle () {
      if (!this.fileRef.title) return []
      const {isTitleCentered, titleStyle, isRoundedBackground, isTitleBottom} = this.styleType
      return [this.$createElement('v-container', {attrs: {'fill-height': true, 'fluid': true}}, [
        this.$createElement('v-layout', {
          attrs: {
            'fill-height': true,
            'align-end': isTitleBottom
          }
        }, [
          this.$createElement('v-flex', {style: {display: 'flex'}}, [
            this.$createElement('p', {style: {'margin': isTitleCentered ? 'auto' : '0'}}, [
              this.$createElement('span', {
                staticClass: `headline white--text ${titleStyle}`,
                'class': {
                  'py-2': isTitleCentered || titleStyle,
                  'px-3': isTitleCentered || titleStyle,
                  'element-rounded': isRoundedBackground
                }
              }, this.fileRef.title)
            ])
          ])
        ])
      ])]
    }
  }
}
