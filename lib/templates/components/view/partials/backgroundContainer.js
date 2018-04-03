import {getFileAttrs} from '../helpers/imageHelper'

export default {
  name: 'background-container',
  functional: true,
  render (createElement, {props}) {
    const backgroundImages = props.backgroundImages
    const classNames = props.backgroundClassNames || []
    const images = []
    const sizes = []
    const repeats = []
    const positions = []
    if (backgroundImages && backgroundImages.length) {
      backgroundImages.forEach(fileRef => {
        const attrs = getFileAttrs(fileRef)
        images.push(`url("${attrs.src}")`)
        const backgroundStyles = fileRef.backgroundStyles
        if (!backgroundStyles) return
        const size = backgroundStyles.find(e => ['cover', 'contain', 'auto'].includes(e))
        const repeat = backgroundStyles.find(e => ['repeat-x', 'repeat-y'].includes(e))
        const position = backgroundStyles.find(e => ['center', 'left', 'right'].includes(e))
        size && sizes.push(size)
        repeat && repeats.push(repeat)
        position && positions.push(position)
      })
    }
    // create single image
    const staticClass = 'content-bg' + ' ' + classNames.join(' ')
    let style = {}
    if (images && images.length) {
      style = {
        'background-image': images.join(','),
        'background-size': sizes.join(','),
        'background-repeat': repeats.join(','),
        'background-position': positions.join(',')
      }
    }
    return createElement('div', {
      staticClass: staticClass,
      style: style
    })
  }
}
