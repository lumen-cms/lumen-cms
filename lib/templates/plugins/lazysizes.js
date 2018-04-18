import lazisizes from 'lazysizes'

// add simple support for background images:
document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  if (bg) {
    e.target.style.backgroundImage = bg
  }

  const parallax = e.target.getAttribute('data-prx')
  if (parallax) {
    e.target.querySelector('img').setAttribute('src', parallax)
  }
})
