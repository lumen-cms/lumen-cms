/**
 *
 * @param content
 * @param currentClass
 */
export function layoutPanelHandler (content, currentClass) {
  if (content.layoutPanel) {
    currentClass[content.layoutPanel] = true
    if (content.layoutPanel.includes('Alert')) {
      currentClass['st-alert'] = true
    }
    if (content.layoutPanel.includes('Panel')) {
      currentClass['st-panel'] = true
    }
    delete currentClass['content-element']
    delete currentClass['content-text-image']
  }
}

/**
 *
 * @param originClass
 * @param classNames
 * @param hasBackground
 */
export function classNameHandler (originClass, classNames, hasBackground) {
  if (hasBackground) {
    originClass['background-transparent'] = true
  }
  if (classNames && Array.isArray(classNames)) {
    classNames.forEach(c => {
      originClass[c] = true
    })
  }
}
