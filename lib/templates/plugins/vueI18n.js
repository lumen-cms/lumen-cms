import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cmsTranslations from '~cms/translations/translation'
import translations from '~/translations'
// import deepmerge from 'deepmerge'
const _mergeWith = require('lodash.mergewith')

Vue.use(VueI18n)

export default ({app, store, isHMR}) => {
  if (isHMR) return
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.lc.locale,
    fallbackLocale: 'en',
    // messages: deepmerge(cmsTranslations, translations),
    // messages: Object.assign(cmsTranslations, translations),
    messages: _mergeWith(cmsTranslations, translations),
    silentTranslationWarn: true
  })

  return app.i18n
}
