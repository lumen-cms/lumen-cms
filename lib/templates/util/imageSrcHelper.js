import slugify from 'slugify'
const fileProxy = process.env.IMAGE_PROXY || 'https://images.graph.cool/v1/'

/**
 * @param width
 * @param height
 * @param cropString
 * @returns {object}
 */
const getCenterCropValues = ({width, height}) => {
  if (!width || !height) return false

  /** @type Boolean */
  const doCropX = width > height
  /** @type Number */
  const cropAmount = doCropX ? height : width

  return {
    cropX: doCropX ? Math.round((width - height) / 2) : 0,
    cropY: doCropX ? 0 : Math.round((height - width) / 2),
    cropAmount
  }
}

/**
 *
 * @param file
 * @param [crop]
 * @param [resize]
 * @returns {string}
 */
export const getImageSrc = (file, crop, resize) => {
  if (!file || !(file.name && file.secret)) return ''
  const src = `${fileProxy}${process.env.GRAPH_FILE_API}/${file.secret}`
  let resizeString = ''

  if (resize !== false) {
    resizeString = resize || ((file.width || file.height) ? `${file.width || ''}x${file.height || ''}` : '')
  }

  let cropString = typeof crop === 'string' && crop
  const isSquare = cropString && (cropString.includes(':round') || cropString.includes(':square'))

  cropString = isSquare ? crop.replace(':round', '').replace(':square', '') : cropString
  if (isSquare || (!!cropString && !cropString.includes('x'))) {
    const vals = getCenterCropValues(file)
    if (vals) {
      const postCropResize = cropString.split('x')[0] || file.height
      cropString = `${vals.cropX}x${vals.cropY}:${vals.cropAmount}x${vals.cropAmount}`
      if (vals.cropAmount < file.width || vals.cropAmount < file.height) { // don't upscale
        resizeString = `${postCropResize}x`
      }
    } else {
      cropString = null
    }
  }
  const slugifiedName = slugify(file.name, {
    replacement: '_', // replace spaces with replacement
    remove: /[^0-9a-zA-Z_\s]/gi, // regex to remove characters
    lower: true // lower case
  })

  return {
    src: `${src}${cropString ? '/' + cropString : ''}${resizeString ? '/' + resizeString : ''}/${slugifiedName}`,
    isCropped: !!cropString
  }
}
