<template>
  <v-container fluid
               grid-list-md class="content-boxed blog-page">
    <lc-article-list :only-blog-posts="true"/>
  </v-container>
</template>
<script>
  import getHeadMeta from '../util/getHeadMeta'
  import initialAsyncData from '~initialAsyncData'

  export default {
    layout: 'list',
    head () {
      return getHeadMeta({
        article: {},
        languagekey: this.$store.state.lc.locale,
        path: this.$route.path,
        host: this.host,
        CONFIG: this.$cms,
        overwrites: {
          // overwrites
          description: this.$t('head.meta.articleListDescription'),
          title: this.$t('head.meta.articleListTitle')
        }
      })
    },
    async asyncData ({route, store, req, params, app}) {
      let {host, locale} = initialAsyncData({req, store, params, CONFIG: app.$cms})
      locale = (app.$cms.routes.listMapLocale && app.$cms.routes.listMapLocale[route.name]) || locale
      await store.dispatch('setLanguageKey', {locale, $cms: app.$cms})
      return {host}
    }
  }
</script>
