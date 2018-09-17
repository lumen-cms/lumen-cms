import layoutHeader from './partials/LcLayoutHeader'
import LcImageCard from './partials/LcImageCard'
import LcImageGallery from './partials/LcImageGallery'
import contentElementMixin from '../../mixins/contentElementMixin'
import unshiftBgMixin from '../../mixins/unshiftBgMixin'
import layoutPanelMixin from '../../mixins/layoutPanelMixin'
import LcLightboxDialog from './partials/lightbox/LcLightboxDialog'
import LcDescription from './partials/LcDescription'
import classNamesMixin from '../../mixins/classNamesMixin'

import _fixedBg from './partials/LcFixedBackgroundImage'
import _jumbotron from './partials/LcJumbotron'
import _parallax from './partials/LcParallax'

const parallaxContainer = {
  Parallax: _parallax,
  Jumbotron: _jumbotron,
  FixedBackground: _fixedBg
}

/**
 *
 * @typedef {Object} TextImageProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 * @property {string} imageOrient
 * @property {string} imageColumnSize
 * @property {string} isLightbox
 * @property {string} styleAttributes
 */
/**
 *
 * @typedef {Object} TextImageStyles
 * @property {string} classNames
 * @property {string} classNamesBg
 */

export default {
  name: 'LcTextImage',
  mixins: [contentElementMixin, unshiftBgMixin, layoutPanelMixin, classNamesMixin],
  data () {
    return {
      isTextImageVisible: false
    }
  },
  watch: {
    'isContentElementVisible' (v) {
      this.isTextImageVisible = v
    }
  },
  render (h) {
    const props = this.$props
    const {content, languageKey, arrayIndex} = props
    /**
     *
     * @type RootStyles
     */
    const styles = content.styles ? Object.assign({}, content.styles) : {}
    /**
     *
     * @type TextImageProperties
     */
    const properties = content.properties ? Object.assign({}, content.properties) : {}
    const {fileReferences, description} = content
    const {rootClassNames, backgroundClassNames} = styles

    // todo temporäry change const to let and make sure parallax is not in use due to vuetify bug
    let {layoutPanel, imageOrient, isLightbox} = properties
    // todo temporäry disable parallax due to vuetify bug
    if (layoutPanel === 'Parallax') {
      layoutPanel = 'FixedBackground'
    }

    const isBesideRightOrLeft = ['BesideTextRight', 'BesideTextLeft'].includes(imageOrient)
    const isInText = ['InTextLeft', 'InTextRight'].includes(imageOrient)
    const isParallaxOrJumbo = ['Parallax', 'Jumbotron', 'FixedBackground'].includes(layoutPanel)

    const fileRefLen = fileReferences && fileReferences.length
    const hasSingleFileRef = fileRefLen === 1

    const activateLazy = !!(this.contentLayoutElementId === content.id && fileRefLen)
    const directives = (activateLazy) ? [{
      name: 'observe-visibility',
      value: {
        callback: (v) => v && (this.isTextImageVisible = true),
        throttle: 300,
        intersection: {
          rootMargin: '200px'
        }
      }
    }] : null

    const currentClass = {
      'content-text-image': true,
      // 'content-element': !(fileRefLen && imageOrient && description), // todo need to verify why we had this
      'content-element': true,
      'text-image': true,
      'image-floating': !!(!isBesideRightOrLeft && fileRefLen && description),
      'text-image__has-image': !!(hasSingleFileRef && description),
      'text-image__has-only-image': (hasSingleFileRef && !description),
      'image-floating-inside': !!(fileRefLen && imageOrient && description && isInText),
      'text-image__has-description': !!description
    }
    currentClass[imageOrient] = fileRefLen && imageOrient && description && imageOrient

    const currentAttrs = {
      'data-id': props.id
    }
    // const childs = children ? [children, h(layoutHeader, {props: {content}})] : [h(layoutHeader, {props: {content}})]
    const childs = [h(layoutHeader, {
      props: {
        content
      }
    })]
    let elementDescription = null
    if (content.description) {
      elementDescription = isBesideRightOrLeft
        ? h('v-flex', {staticClass: 'xs12 sm6'}, [h(LcDescription, {
          props: {content, languageKey: props.languageKey},
          staticClass: 'pa-3'
        })])
        : h(LcDescription, {props: {content, languageKey: props.languageKey}})
    }
    this.layoutPanelHandler(properties, currentClass)
    this.classNameHandler(currentClass, rootClassNames, !!(backgroundClassNames && backgroundClassNames.length))
    if (isParallaxOrJumbo) {
      const isFirstOfPage = arrayIndex === 0
      elementDescription && childs.push(elementDescription)
      // don't apply width options to the root element. this is handled in the child of jumbotron/parallax
      const ignoreClasses = ['content-boxed', 'content-fluid', 'max-width-900', 'max-width-700', 'max-width-auto']
      ignoreClasses.forEach(e => (currentClass[e] = false))
      let panelChilds = childs
      if (layoutPanel === 'FixedBackground') {
        this.unshiftBgContainer(panelChilds, backgroundClassNames)
      }
      const parallaxOptions = {
        props: {
          content,
          languageKey,
          isFirstOfPage,
          currentClass,
          isFixedBackground: layoutPanel === 'FixedBackground',
          currentAttrs,
          zoomEnabled: !!properties.enableBackgroundZoom,
          fileReference: content.fileReferences && content.fileReferences[0],
          isContentElementVisible: this.isTextImageVisible
        }
      }
      if (directives) {
        parallaxOptions.directives = directives
      }
      return h(parallaxContainer[layoutPanel], parallaxOptions, panelChilds)
    }

    // initialize lightbox
    let activateLightBox = null
    let lightboxDialog = null

    if (isLightbox && fileReferences.length) {
      lightboxDialog = h(LcLightboxDialog, {
        ref: 'lightbox_' + this._uid,
        props: {fileReferences}
      })
      activateLightBox = (itemNr) => {
        const hasItemNr = typeof itemNr === 'number'
        const lightboxComponent = this.$refs['lightbox_' + this._uid]
        hasItemNr && lightboxComponent.setActiveItem(itemNr)
        setTimeout(() => {
          lightboxComponent.toggleVisibility()
        }, (hasItemNr && itemNr) > 0 ? 350 : 0) // prevent visible transition between first element and selected element
      }
    }

    const figureProps = hasSingleFileRef ? Object.assign({}, content, {
      fileRef: fileReferences[0],
      activateLightBox,
      isLightbox
    }) : Object.assign({}, content, {
      activateLightBox
    })

    const figure = (fileRefLen) && h(hasSingleFileRef ? LcImageCard : LcImageGallery, {
      props: {
        content: figureProps,
        isContentElementVisible: this.isTextImageVisible
      }
    })
    const elementFigure = figure && isBesideRightOrLeft
      ? h('v-flex', {staticClass: 'xs12 sm6'}, [figure])
      : figure

    if (elementFigure && imageOrient === 'AboveHeader') {
      childs.unshift(elementFigure)
      elementDescription && childs.push(elementDescription)
    } else if (fileRefLen && description) {
      const renderFigureFirst = ['InTextLeft', 'BesideTextLeft', 'InTextRight', 'AboveCenter'].includes(imageOrient)
      const elementTextImg = renderFigureFirst ? [elementFigure, elementDescription] : [elementDescription, elementFigure]
      childs.push(
        isBesideRightOrLeft
          ? h('v-layout', {staticClass: 'row wrap'}, elementTextImg)
          : elementTextImg
      )
    } else {
      elementDescription && childs.push(elementDescription)
      elementFigure && childs.push(elementFigure)
    }
    this.unshiftBgContainer(childs, backgroundClassNames)

    isLightbox && childs.push(lightboxDialog)

    const opts = {
      class: currentClass,
      attrs: currentAttrs
    }
    if (properties.styleAttributes) {
      const styl = {}
      const splitted = properties.styleAttributes.split(';')
      splitted.forEach(i => {
        const tmp = i.split(':')
        styl[tmp[0]] = tmp[1]
      })
      opts.style = styl
    }
    if (directives) {
      opts.directives = directives
    }
    return h('div', opts, childs)
  }
}
