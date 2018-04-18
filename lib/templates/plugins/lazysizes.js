import 'lazysizes'

document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  const bgCardMedia = e.target.getAttribute('data-bg-card-media')
  const parallax = e.target.getAttribute('data-prx')

  if (bg) {
    e.target.style.backgroundImage = bg
  }
  if (bgCardMedia) {
    e.target.querySelector('.card__media__background').style.backgroundImage = 'url(' + bgCardMedia + ')'
  }
  if (parallax) {
    e.target.querySelector('img').setAttribute('src', parallax)
  }
})
