// import htmlRenderer from '../../HtmlRenderer'
import {classNameHandler, layoutPanelHandler} from './helpers/layoutHeaderHelper'
import layoutHeader from './partials/layoutHeader'
import imagePartial from './partials/imagePartial'
import imageLightboxItem from './partials/imageLightboxItem'
import imageGallery from './partials/imageGallery'
import parallax from './partials/parallax.vue'
import jumbotron from './partials/jumbotron'
import {getImageSrc} from '../../util/imageSrcHelper'
import unshiftBgContainer from './helpers/unshiftBgContainer'
import getImageSourceSet from '../../util/getImageSourceSet'

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

const wrapLayoutRow = (h, element, staticClass) => h('v-layout', {staticClass: staticClass || 'row wrap'}, element)
const wrapFlex = (h, element, staticClass) => h('v-flex', {staticClass: staticClass || 'xs12 sm6'}, element)

const getElementDescription = (h, {styles, description, properties}, props, staticClass) => {
  if (description) {
    const isParallaxOrJumbo = ['Parallax', 'Jumbotron'].includes(properties && properties.layoutPanel)
    const contentClassNames = styles.contentClassNames || []
    const classNames = isParallaxOrJumbo ? contentClassNames.concat(styles.rootClassNames) : contentClassNames

    return h('lc-html-renderer', {
      staticClass,
      props: {
        'class': classNames && classNames.join(' '),
        content: description,
        languageKey: props.languageKey
      }
    })
  } else {
    return null
  }
}

const getElementFigure = (h, component, content) => h(component, {props: {content}})

const getLightboxDialog = (h, content, fileReferences) => {
  if (!fileReferences.length) return {}
  const hasSingleFileRef = fileReferences.length === 1
  let figure, carousel

  if (hasSingleFileRef) {
    figure = getElementFigure(h, imageLightboxItem, {fileRef: fileReferences[0], isLightbox: true})
  } else {
    const figures = []

    fileReferences.forEach((ref, i) => {
      const img = getImageSrc(ref.file)
      const {srcset, sizes} = getImageSourceSet(ref)
      figures.push(h('v-carousel-item', {
        attrs: {
          src: img.src,
          srcset,
          sizes
        },
        style: {
          'max-width': ref.file.width,
          'max-height': ref.file.height
        },
        props: {
          transition: 'fade'
        },
        key: i
      }))
    })
    carousel = h('v-carousel', {
      attrs: {
        'hide-delimiters': true,
        cycle: false,
        dark: true
      }
    }, figures)
  }

  const dialogTitle = h('div', {
    staticClass: 'text-xs-right',
    on: {
      click () {
        lightboxDialog.componentInstance.isActive = false
      }
    }
  }, [
    h('v-spacer'),
    h('v-btn', {attrs: {flat: true, icon: true, dark: true, large: true, round: true}}, [
      h('v-icon', {}, 'close')
    ])
  ])
  const dialogChilds = [
    dialogTitle,
    h('v-card', {}, [
      h('v-card-text', {}, figure ? [figure] : [carousel])
    ])
  ]
  const lightboxDialog = h('v-dialog', {
    props: {},
    attrs: {
      'content-class': 'lightbox-dialog',
      'max-width': '100vw'
    }
  }, dialogChilds)

  return {lightboxDialog, carousel}
}

export default {
  // name: 'content-text-image',
  name: 'LcTextImage',
  functional: true,
  render (h, {props, children}) {
    const {content, languageKey, arrayIndex} = props
    /**
     *
     * @type RootStyles
     */
    const styles = content.styles || {}
    /**
     *
     * @type TextImageProperties
     */
    const properties = content.properties || {}
    const {fileReferences, description} = content
    const {rootClassNames, backgroundClassNames} = styles
    const {layoutPanel, imageOrient, isLightbox} = properties

    const isBesideRightOrLeft = ['BesideTextRight', 'BesideTextLeft'].includes(imageOrient)
    const isInText = ['InTextLeft', 'InTextRight'].includes(imageOrient)
    const isParallaxOrJumbo = ['Parallax', 'Jumbotron', 'FixedBackground'].includes(layoutPanel)

    const fileRefLen = fileReferences && fileReferences.length
    const hasSingleFileRef = fileRefLen === 1

    const currentClass = {
      'content-text-image': true,
      'content-element': !(fileRefLen && imageOrient && description),
      'text-image': true,
      'image-floating': !!(!isBesideRightOrLeft && fileRefLen && description),
      'text-image__has-image': !!(hasSingleFileRef && description),
      'text-image__has-only-image': (hasSingleFileRef && !description),
      'image-floating-inside': !!(fileRefLen && imageOrient && description && isInText),
      'text-image__has-description': !!description
    }
    currentClass[imageOrient] = fileRefLen && imageOrient && description && imageOrient

    const currentAttrs = {'data-id': props.id}
    const childs = children ? [children, h(layoutHeader, {props: {content}})] : [h(layoutHeader, {props: {content}})]
    const elementDescription = isBesideRightOrLeft
      ? wrapFlex(h, [getElementDescription(h, content, props, 'pa-3')])
      : getElementDescription(h, content, props, '')

    layoutPanelHandler(properties, currentClass)
    classNameHandler(currentClass, rootClassNames, !!(backgroundClassNames && backgroundClassNames.length))
    if (isParallaxOrJumbo) {
      const isFirstOfPage = arrayIndex === 0
      elementDescription && childs.push(elementDescription)
      // don't apply width options to the root element. this is handled in the child of jumbotron/parallax
      const ignoreClasses = ['content-boxed', 'content-fluid', 'max-width-900', 'max-width-700', 'max-width-auto']
      ignoreClasses.forEach(e => (currentClass[e] = false))
      let panelChilds = childs
      if (layoutPanel === 'FixedBackground') {
        unshiftBgContainer(h, panelChilds, backgroundClassNames)
        panelChilds = [h('v-container', {attrs: {'fill-height': true}}, [
          h('v-layout', {
            attrs: {column: true, 'align-center': true, 'justify-center': true},
            style: {position: 'relative'}
          }, childs)
        ])]
      }

      return h(layoutPanel === 'Jumbotron' ? jumbotron : parallax, {
        props: {
          content,
          languageKey,
          isFirstOfPage,
          currentClass,
          isFixedBackground: layoutPanel === 'FixedBackground',
          currentAttrs
        }
      }, panelChilds)
    }

    const {lightboxDialog, carousel} = isLightbox ? getLightboxDialog(h, content, fileReferences) : {}
    const activateLightBox = isLightbox ? (itemNr) => {
      const hasItemNr = typeof itemNr === 'number'
      hasItemNr && (carousel.componentInstance.inputValue = itemNr)

      setTimeout(() => {
        lightboxDialog.componentInstance.isActive = true
      }, (hasItemNr && itemNr) > 0 ? 300 : 0) // prevent visible transition between first element and selected element

      const keydownHandler = (ev) => {
        ev.keyCode === 27 && (lightboxDialog.componentInstance.isActive = false)
        ev.key === 'ArrowRight' && carousel.componentInstance.next()
        ev.key === 'ArrowLeft' && carousel.componentInstance.prev()
      }

      document.addEventListener('keydown', keydownHandler)
      // first time open
      lightboxDialog.componentInstance.$once('input', (v1) => {
        // second time close - use once to prevent memory leak
        lightboxDialog.componentInstance.$once('input', (v2) => {
          v2 === false && document.removeEventListener('keydown', keydownHandler)
        })
      })
    } : null

    const figureProps = hasSingleFileRef ? Object.assign({}, content, {
      fileRef: fileReferences[0],
      activateLightBox,
      isLightbox,
      isLightboxThumb: isLightbox
    }) : Object.assign({}, content, {
      activateLightBox,
      isLightboxThumb: isLightbox
    })

    const figure = (fileRefLen) && getElementFigure(h, hasSingleFileRef ? imagePartial : imageGallery, figureProps)
    const elementFigure = figure && isBesideRightOrLeft ? wrapFlex(h, [figure]) : figure

    if (elementFigure && imageOrient === 'AboveHeader') {
      childs.unshift(elementFigure)
      elementDescription && childs.push(elementDescription)
    } else if (fileRefLen && description) {
      const renderFigureFirst = ['InTextLeft', 'BesideTextLeft', 'InTextRight', 'AboveCenter'].includes(imageOrient)
      const elementTextImg = renderFigureFirst ? [elementFigure, elementDescription] : [elementDescription, elementFigure]
      childs.push(isBesideRightOrLeft ? wrapLayoutRow(h, elementTextImg) : elementTextImg)
    } else {
      elementDescription && childs.push(elementDescription)
      elementFigure && childs.push(elementFigure)
    }
    unshiftBgContainer(h, childs, backgroundClassNames)

    isLightbox && childs.push(lightboxDialog)

    const opts = {class: currentClass, attrs: currentAttrs}
    if (properties.styleAttributes) {
      const styl = {}
      const splitted = properties.styleAttributes.split(';')
      splitted.forEach(i => {
        const tmp = i.split(':')
        styl[tmp[0]] = tmp[1]
      })
      opts.style = styl
    }
    return h('div', opts, childs)
  }
}
