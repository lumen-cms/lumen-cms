export default async function ({app,store,req}, inject) {
  let supportWebp = false
  if (typeof req !== 'undefined') {
    supportWebp = req.headers.accept && req.headers.accept.includes('webp')
  }else{
    // found here: https://github.com/bfred-it/supports-webp
    supportWebp = function(){"use strict";var e="object"==typeof document?document.createElement("canvas"):{};return e.width=e.height=1,!!e.toDataURL&&5===e.toDataURL("image/webp").indexOf("image/webp")}();
  }
  inject('hasWebpSupport', supportWebp)
  // make config options available with this.$cms in templates
  inject('cms', <%= serialize(options) %>)
}

