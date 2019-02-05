// https://github.com/nuxt/nuxt.js/issues/723
module.exports = function _scrollBehavior (to, from, savedPosition) {
  // if the returned position is false or an empty object,
  // will retain current scroll position.
  if (to.name === from.name && (to.name === 'articles' || to.name === 'blog')) {
    return
  }
  let position = false
  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => {
    console.log(r.components.default.options.scrollToTop)
    return r.components.default.options.scrollToTop
  })) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    // view https://github.com/nuxt/nuxt.js/issues/2738

    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash && document.querySelector(to.hash)) {
        // scroll to anchor by returning the selector
        position = { selector: to.hash }
      }
      resolve(position)
    })
    // resolve(position)
    setTimeout(() => {
      resolve(position)
    }, 300)
  })
}
