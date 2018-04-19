const options = <%= serialize(options) %>

export default () => {
  (function(d) {
    window.WebFontConfig = window.WebFontConfig || {
      google: {
        families: Object.keys(options.fonts).map(i => options.fonts[i])
      },
      // fontactive: (familyName) => {
      //
      //   if( familyName === 'Material Icons' ) {
      //     const vut = d.createElement('link')
      //     vut.rel = 'stylesheet'
      //     vut.type = 'text/css'
      //     vut.href = 'https://unpkg.com/vuetify@<%= options.vuetifyVersion %>/dist/vuetify.min.css'
      //     d.head.appendChild(vut)
      //   }
      // }
    }

    const wf = d.createElement('script'), s = d.scripts[0]
    wf.src = 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js'
    wf.async = true
    s.parentNode.insertBefore(wf, s)
  })(document)
}


