import lazysizes from 'lazysizes'

export default () => {
  window.lazySizesConfig = window.lazySizesConfig || {}
  window.lazySizesConfig.loadMode = 1
  window.lazySizesConfig.expand = 300

  // add simple support for background images:
  document.addEventListener('lazybeforeunveil', (e) => {
    const bg = e.target.getAttribute('data-bg')
    if (bg) {
      e.target.style.backgroundImage = bg
    }
  })
}
