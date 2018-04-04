<template>
  <v-container fluid
               grid-list-md class="content-boxed blog-page">
    <lc-article-list :only-blog-posts="true"/>
  </v-container>
</template>
<script>
  import getHeadMeta from '../util/getHeadMeta'
  import {initialRenderFunc} from '../util/initialRender' // todo need to customize

  const langByRouteName = {
    'blog': 'de',
    'articles': 'en'
  }

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
      const {host} = initialRenderFunc({req, store, params, CONFIG: app.$cms})
      let locale
      app.$cms.routesAlias.list.forEach(i => {
        Object.keys(i).find(k => {
          if (i[k] === route.name) {
            locale = k
          }
        })
      })
      console.log(locale)
      await store.dispatch('setLanguageKey', {locale, $cms: app.$cms})
      return {host}
    }
  }
</script>
