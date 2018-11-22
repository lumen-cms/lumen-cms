import imageSourceSetMixin from '../../../mixins/getImageSourceSet'
import imageHelperMixin from '../../../mixins/imageHelperMixin'
import LcImage from '../partials/LcImage'
import LcFigure from '../partials/LcFigure'
import linkHelperMixin from '../../../mixins/linkHelperMixin'

export default {
  name: 'LcImageCardItem',
  mixins: [linkHelperMixin, imageSourceSetMixin, imageHelperMixin],
  props: {
    fileRef: Object,
    size: Number | Boolean,
    styleType: Object,
    activateLightBox: Function,
    index: Number,
    isVariableSize: Boolean,
    slideshowHeight: Number | String,
    isContentElementVisible: Boolean
  },
  render (h) {
    const { isFlatStyle, cardTheme, transparent } = this.styleType
    const cardTitle = []
    const cardChildren = []
    this.fileRef.alternative && cardTitle.push(h('div', { staticClass: 'headline' }, this.fileRef.alternative))
    this.fileRef.caption && cardTitle.push(h('span', { staticClass: 'grey--text' }, this.fileRef.caption))
    cardChildren.push(this.genMediaItem)
    if (cardTitle.length) {
      cardChildren.push(h('v-card-title', { attrs: { 'primary-title': true } }, [h('div', {}, cardTitle)]))
    }
    const cardAttrs = {}
    if (isFlatStyle) {
      cardAttrs.flat = true
      cardAttrs.tile = true
    }
    if (cardTheme) {
      cardAttrs[cardTheme] = true
    }
    const linkSlug = this.fileRef.linkSlug
    if (linkSlug && !this.activateLightBox) {
      cardAttrs.hover = true
      cardAttrs.nuxt = true
      if (this.isExternalUrl(linkSlug)) {
        cardAttrs.href = linkSlug
        cardAttrs.target = '_blank'
        cardAttrs.rel = 'noopener'
      } else {
        cardAttrs.to = linkSlug.charAt(0) === '/' ? linkSlug : '/' + linkSlug
      }
    }
    return h('v-card', {
      attrs: cardAttrs,
      'class': {
        transparent
      }
    }, cardChildren)
  },
  computed: {
    calculatedHeight () {
      if (this.size === 12 || this.size === false) return
      const HEIGHT_BY_SIZE = {
        1: 100,
        2: 200,
        3: 250,
        4: 300,
        5: 325,
        6: 350
      }
      return HEIGHT_BY_SIZE[this.size] || 400
    },
    genMediaTitle () {
      if (!this.fileRef.title) return []
      const { isTitleCentered, titleStyle, isRoundedBackground, isTitleBottom } = this.styleType
      return [this.$createElement('v-container', { attrs: { 'fill-height': true, 'fluid': true } }, [
        this.$createElement('v-layout', {
          attrs: {
            'fill-height': true,
            'align-end': isTitleBottom
          }
        }, [
          this.$createElement('v-flex', { style: { display: 'flex' } }, [
            this.$createElement('p', { style: { 'margin': isTitleCentered ? 'auto' : '0' } }, [
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
    },
    genMediaItem () {
      const mediaAttrs = { cover: true }
      const height = this.slideshowHeight ? this.slideshowHeight : this.calculatedHeight
      const resize = height ? 'x' + height : false
      const { isCoverImg } = this.styleType

      let { srcset, sizes } = this.getImageSourceSet(this.fileRef, height)
      srcset = this.isVariableSize ? false : srcset
      sizes = srcset ? sizes : false

      const fileAttrs = this.getFileAttrs(this.fileRef, resize)
      mediaAttrs.src = fileAttrs && fileAttrs.src
      const imageProp = {
        src: mediaAttrs.src,
        srcset: srcset || '',
        sizes: sizes || '',
        contain: !isCoverImg,
        height: 'auto',
        isRounded: this.fileRef.crop && this.fileRef.crop.includes('round'),
        isVisible: this.isContentElementVisible
      }
      return this.$createElement('div', {
        staticClass: 'media-column',
        style: { maxHeight: (isCoverImg && height) ? height + 'px' : 'auto' }
      }, [
        // if size === 12 then its an actual figure img and not VImg
        this.$createElement(this.size === 12 ? LcFigure : LcImage, {
          props: imageProp
        }),
        this.$createElement('div', {
          staticClass: 'title-wrap' + (this.activateLightBox ? ' lightbox' : ''),
          on: {
            click: (ev) => {
              this.activateLightBox && this.activateLightBox(this.index)
            }
          }
        }, this.genMediaTitle)
      ])
    }
  }
}
