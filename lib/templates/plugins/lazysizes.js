import 'lazysizes'

document.addEventListener('lazybeforeunveil', (e) => {
  const bg = e.target.getAttribute('data-bg')
  const parallax = e.target.getAttribute('data-prx')

  if (bg) {
    e.target.style.backgroundImage = bg
  }

  if (parallax) {
    e.target.querySelector('img').setAttribute('src', parallax)
  }
})
