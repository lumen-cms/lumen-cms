import {getFileAttrs} from './imageHelper'
import linkHelpers from '../../../util/linkHelpers'
import getImageSourceSet from '../../../util/getImageSourceSet'

const {isExternalUrl} = linkHelpers

/**
 * resizes original image based on column count
 * @param size
 * @returns {*|number}
 */
const heightCalculation = (size) => {
  if (size === 12 || size === false) return
  const HEIGHT_BY_SIZE = {
    1: 100,
    2: 200,
    3: 250,
    4: 300,
    5: 325,
    6: 350
  }
  return HEIGHT_BY_SIZE[size] || 400
}

/**
 *
 * @param classNames
 * @param isVariableSize
 * @returns {{isFlatStyle: boolean, isTitleCentered: boolean, titleStyle, isRoundedBackground: boolean, isCoverImg: boolean, isTitleBottom: boolean}}
 */
export function getImageStyleOptions (classNames, isVariableSize) {
  if (!classNames || !classNames.length) {
    return {}
  }
  let isFlatStyle, isCardStyle, isTitleCentered, titleStyle, isRoundedBackground, isCoverImg, isTitleBottom, cardTheme,
    transparent
  classNames.forEach(e => {
    if (e === 'grid-cards-style-flat') {
      isFlatStyle = true
    } else if (e === 'grid-cards-style-card') {
      isCardStyle = true
    } else if (e === 'grid-cards-title-centered') {
      isTitleCentered = true
    } else if (e === 'grid-cards-title-bottom') {
      isTitleBottom = true
    } else if (e === 'grid-cards-title-rounded') {
      isRoundedBackground = true
    } else if (e === 'grid-cards-img-cover') {
      isCoverImg = true
    } else if (e.indexOf('grid-cards-title-styl-') === 0) {
      titleStyle = e.replace('grid-cards-title-styl-', '')
    } else if (e.indexOf('grid-cards-theme-') === 0) {
      cardTheme = e.replace('grid-cards-theme-', '')
    } else if (e === 'grid-cards-transparent') {
      transparent = true
    }
  })
  isFlatStyle = isFlatStyle && !isCardStyle

  return {
    isFlatStyle,
    isTitleCentered,
    titleStyle,
    isRoundedBackground,
    isCoverImg,
    isTitleBottom,
    cardTheme,
    transparent
  }
}

/**
 *
 * @param h
 * @param fileRef
 * @param size
 * @param styleType
 * @param activateLightBox
 * @param {number} [index]
 * @param isVariableSize
 */
export function createImageCardItem (h, fileRef, size, styleType, activateLightBox, index, isVariableSize) {
  const {isFlatStyle, isTitleCentered, titleStyle, isRoundedBackground, isCoverImg, isTitleBottom, cardTheme, transparent} = styleType
  const mediaTitle = []
  let cardTitle = []

  fileRef.alternative && cardTitle.push(h('div', {staticClass: 'headline'}, fileRef.alternative))
  fileRef.caption && cardTitle.push(h('span', {staticClass: 'grey--text'}, fileRef.caption))
  fileRef.title && mediaTitle.push(getMediaTitle())

  const cardChildren = getMediaItem(index, isVariableSize)
  if (cardTitle.length) {
    cardTitle = [h('v-card-title', {attrs: {'primary-title': true}}, [h('div', {}, cardTitle)])]
    cardChildren.push(cardTitle)
  }

  const cardAttrs = {}
  if (isFlatStyle) {
    cardAttrs.flat = true
    cardAttrs.tile = true
  }
  if (cardTheme) {
    cardAttrs[cardTheme] = true
  }
  const linkSlug = fileRef.linkSlug
  if (linkSlug) {
    cardAttrs.hover = true
    cardAttrs.nuxt = true
    if (isExternalUrl(linkSlug)) {
      cardAttrs.href = linkSlug
      cardAttrs.target = '_blank'
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

  /**
   *
   */
  function getMediaTitle () {
    mediaTitle.push(
      h('v-container', {attrs: {'fill-height': true, 'fluid': true}}, [
        h('v-layout', {
          attrs: {
            'fill-height': true,
            'align-end': isTitleBottom
          }
        }, [
          h('v-flex', {style: {display: 'flex'}}, [
            h('p', {style: {'margin': isTitleCentered ? 'auto' : '0'}}, [
              h('span', {
                staticClass: `headline white--text ${titleStyle}`,
                'class': {
                  'py-2': isTitleCentered || titleStyle,
                  'px-3': isTitleCentered || titleStyle,
                  'element-rounded': isRoundedBackground
                }
              }, fileRef.title)
            ])
          ])
        ])
      ]))
  }

  /**
   *
   * @param {number} idx - index - only set for lightbox gallery
   * @param isVariableSize
   * @returns {*[]}
   */
  function getMediaItem (idx, isVariableSize) {
    const mediaAttrs = {cover: true}
    const height = heightCalculation(size)
    const resize = height ? 'x' + height : false


    let {srcset, sizes} = getImageSourceSet(fileRef, height)
    srcset = isVariableSize ? false : srcset
    sizes = srcset ? sizes : false

    const fileAttrs = getFileAttrs(fileRef, resize)
    mediaAttrs.src = fileAttrs && fileAttrs.src
    return [
      h('div', {
        staticClass: 'media-column',
        style: {height: (isCoverImg && height) ? height + 'px' : 'auto'}
      }, [
        h('figure', {},
          [h('img', {
            attrs: {
              'data-src': mediaAttrs.src,
              'data-srcset': srcset,
              'data-sizes': sizes
            },
            staticClass: fileRef.crop && fileRef.crop.includes('round') ? 'img-rounded' : '',
            'class': {'img-cover': isCoverImg, lazyload: true}
          })]
        ),
        h('div', {
          staticClass: 'title-wrap' + (activateLightBox ? ' lightbox' : ''),
          on: {
            click: (ev) => {
              activateLightBox && activateLightBox(idx)
            }
          }
        }, mediaTitle)
      ])
    ]
  }
}
