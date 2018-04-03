import cmsTranslations from '~~/lib/templates/translations/translation'
import translations from '~/translations'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import deepmerge from 'deepmerge'

Vue.use(VueI18n)

export default ({app, store, isHMR}) => {
  if (isHMR) return
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    // messages: deepmerge(cmsTranslations, translations),
    messages: Object.assign(cmsTranslations, translations),
    silentTranslationWarn: true
  })

  return app.i18n
}
