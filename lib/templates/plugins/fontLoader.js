import WebFont from 'webfontloader'
const fonts = <%= serialize(options) %>
WebFont.load({
  google: {
    families: Object.keys(fonts).map(i => fonts[i])
  }
})
