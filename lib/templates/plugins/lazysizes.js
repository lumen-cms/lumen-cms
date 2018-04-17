import lazysizes from 'lazysizes'

// add simple support for background images:
document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  console.log('------------------', bg)
  if (bg) {
    console.log(e.target.style)
    e.target.style.backgroundImage = bg
  }
})
