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
