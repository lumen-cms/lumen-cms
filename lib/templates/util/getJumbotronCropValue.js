import getViewportDimensions from './getViewportDimensions'

/**
 *
 * @param jumboHeight
 * @param {number} fileHeight
 * @param {number} fileWidth
 */
export default (jumboHeight, fileHeight, fileWidth) => {
  const {vw, vh} = getViewportDimensions()
  if (typeof jumboHeight === 'string') {
    jumboHeight = parseInt(jumboHeight)
  }
  const valid =
    typeof jumboHeight === 'number' &&
    typeof fileHeight === 'number' &&
    typeof fileWidth === 'number' &&
    typeof vh === 'number' &&
    typeof vw === 'number'

  let xCropPos = 0
  let yCropPos = 0
  let xCropAmount = fileWidth
  let yCropAmount = fileHeight

  if (!valid) return false

  // crop left and right if the image is wider than the screen
  if (fileWidth > vw) {
    xCropPos = Math.round((fileWidth - vw) / 2)
    xCropAmount = vw
  }

  if (fileHeight > jumboHeight) {
    yCropPos = Math.round((fileHeight - jumboHeight) / 2)
    yCropAmount = jumboHeight
  }
  return {xCropPos, yCropPos, xCropAmount, yCropAmount}
}
