import 'lazysizes'

document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  const bgCardMedia = e.target.getAttribute('data-bg-card-media')
  const parallax = e.target.getAttribute('data-prx')

  if (bg) {
    e.target.style.backgroundImage = bg
  }
  if (bgCardMedia) {
    console.log(bgCardMedia, e.target.querySelector('.v-image__image'))
    // e.target.querySelector('.v-image__image').style.backgroundImage = 'url(' + bgCardMedia + ')'
    // e.target.querySelector('.v-card__media__background').style.backgroundImage = 'url(' + bgCardMedia + ')'
  }
  if (parallax) {
    e.target.querySelector('img').setAttribute('src', parallax)
  }
})
