const fonts = <%= serialize(options) %>
;

export default () => {
  (function(d) {
    window.WebFontConfig = window.WebFontConfig || {
      google: {
        families: Object.keys(fonts).map(i => fonts[i])
      },
      fontactive: function(familyName, fvd) {
        if( familyName === 'Material Icons' ) {
          const vut = d.createElement('link')
          vut.rel = 'stylesheet'
          vut.type = 'text/css'
          vut.href = 'https://unpkg.com/vuetify@1.0.15/dist/vuetify.min.css'
          d.head.appendChild(vut)
        }
      }
    }

    const wf = d.createElement('script'), s = d.scripts[0]
    wf.src = 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js'
    wf.async = true
    s.parentNode.insertBefore(wf, s)
  })(document)
}


