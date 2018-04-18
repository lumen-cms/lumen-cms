import 'lazysizes'

// add simple support for background images:
document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  const bgNested = e.target.getAttribute('data-bg-card-media')
  const parallax = e.target.getAttribute('data-prx')

  if (bg) {
    e.target.style.backgroundImage = bg
  }
  if (bgNested) {
    e.target.querySelector('card__media__background').style.backgroundImage = bgNested
  }
  if (parallax) {
    e.target.querySelector('img').setAttribute('src', parallax)
  }
})
