import {getImageStyleOptions, createImageCardItem} from '../helpers/imageCardHelper'

export default {
  name: 'image-gallery',
  functional: true,
  render (h, {props}) {
    const {content} = props
    const {activateLightBox, fileReferences} = content
    const {imageColumnSize, slideshowHeight, slideshowHideDelimiters, slideshowAutoRotation} = content.properties
    const isVariableSize = imageColumnSize === 'variable'
    const classNames = content.styles.rootClassNames || []
    let size = imageColumnSize && !isVariableSize && Number(imageColumnSize.match(/\d+/g)[0])
    const styleType = getImageStyleOptions(classNames)
    const hasImageColSize = imageColumnSize && (imageColumnSize.includes('Size_') || imageColumnSize === 'variable')
    const gridClass = classNames.find(e => e.includes('grid-list-')) || 'grid-list-lg'
    const galleryItems = []
    if (!hasImageColSize) {
      size = false
    }
    fileReferences.forEach((fileRef, i) => {
      if (fileRef.file) {
        const colItem = createImageCardItem(h, fileRef, size, styleType, activateLightBox, i, isVariableSize)
        galleryItems.push(
          hasImageColSize ? h('v-flex', {
            'class': {
              'xs12': !!size,
              ['sm' + size]: !!size
            }
          }, colItem) : colItem)
      }
    })

    if (hasImageColSize) {
      const attrs = {
        fluid: true
      }
      attrs[gridClass] = true

      return h('v-container', {
        attrs: attrs,
        staticClass: hasImageColSize ? 'content-gallery' : ''
      }, [
        h('v-layout', {
          attrs: {
            row: true,
            wrap: true
          }
        }, galleryItems)])
    }
    const interval = slideshowAutoRotation ? Number(slideshowAutoRotation) : 0
    const isLight = styleType.cardTheme && styleType.cardTheme === 'light'
    const carouselOpts = {
      props: {
        dark: !isLight,
        light: isLight,
        'hide-delimiters': !!slideshowHideDelimiters,
        cycle: !!interval
      },
      style: {
        height: slideshowHeight ? slideshowHeight + 'px' : '400px'
      }
    }
    if (interval > 0) {
      carouselOpts.props.interval = interval
    }
    return h('v-carousel', carouselOpts, galleryItems.map(item => {
      return h('v-carousel-item', {}, [
        h('v-container', {attrs: {'fill-height': true, fluid: true, 'pa-0': true}}, [
          h('v-layout', {attrs: {'align-center': true}}, [
            item
          ])
        ])
      ])
    }))
  }
}
