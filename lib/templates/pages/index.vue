<template>
  <div class="article-detail-page">
    <lc-content-edit-main v-if="$store.state.lc.isContentEditMode"
                          :page-props="$store.state.lc.pageProps"
                          :content="pageContent"/>
    <lc-content-renderer v-else-if="pageContent.length"
                         :device="$device"
                         :elements="pageContent"/>
    <div class="content-boxed white elevation-1 pa-3 max-width-700"
         v-if="!pageContent.length && Article && Article.description">
      <h1 v-text="Article.title" class="display-1"/>
      <blockquote v-text="Article.teaser"
                  v-if="Article.teaser"
                  class="my-5"/>
      <div v-html="Article.description"/>
    </div>
  </div>
</template>
<script>
  import initialAsyncData from '~initialAsyncData'
  import headMetaMixin from '../mixins/headMetaMixin'
  import {GlobalEventBus} from '../util/globalEventBus'

  export default {
    name: 'PageIndex',
    layout: 'pageView',
    mixins: [headMetaMixin],
    middleware: ['auth'],
    head () {
      if (this.Article && this.Article.id) {
        const lang = this.Article.languageKey.toLowerCase()
        return this.getHeadMeta({
          article: this.Article,
          languageKey: lang
        })
      }
      return {}
    },
    data () {
      return {
        Article: null,
        pageProps: this.$store.state.lc.pageProps,
        pageContent: []
      }
    },
    mounted () {
      this.scrollToAnchor()
      GlobalEventBus.$on('lc-on-article-content-change', this.onContentChange)
      this.$on('routeChanged', this.onRouteChange)
    },
    beforeDestroy () {
      GlobalEventBus.$off('lc-on-article-content-change', this.onContentChange)
      this.$off('routeChanged', this.onRouteChange)
    },
    methods: {
      async onContentChange () {
        if (!this.$store.getters.canEdit) return
        const server = (['production', 'staging'].includes(process.env.NODE_ENV) || process.env.ENFORCE_GQL_PROXY_PROD === '1')
          ? process.env.GQL_PROXY_PROD : process.env.GQL_PROXY_DEV
        const {slug} = initialAsyncData({store: this.$store, params: this.$route.params, $cms: this.$cms})
        const url = `${server}article/${process.env.GRAPHQL_PROJECT_ID}`
        const data = await this.$axios.$get(url, {
          params: {slug, nocache: true},
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept-Encoding': process.browser ? 'gzip, deflate, br' : 'gzip, deflate' // https://github.com/nuxt-community/axios-module/pull/176
          }
        })
        const article = data && data.Article

        this.Article = article
        this.pageContent = article.contents
      },
      scrollToAnchor () {
        let hash = this.$route.hash
        if (hash) {
          hash = hash.startsWith('#') ? hash.substr(1) : hash
          const el = document.getElementsByClassName('data-id-' + hash)[0]
          el && this.$vuetify.goTo(el) // el.scrollIntoView()
        }
      },
      onRouteChange () {
        this.$store.dispatch('setPageProps', {})
        this.$store.dispatch('setCurrentArticleCategories', [])
      }
    },
    async asyncData ({req, app, store, params, error, redirect, isHMR}) {
      const {locale, host, slug} = initialAsyncData({req, store, params, $cms: app.$cms})
      try {
        const server = (['production', 'staging'].includes(process.env.NODE_ENV) || process.env.ENFORCE_GQL_PROXY_PROD === '1')
          ? process.env.GQL_PROXY_PROD : process.env.GQL_PROXY_DEV
        const url = `${server}article/${process.env.GRAPHQL_PROJECT_ID}`
        const data = await app.$axios.$get(url, {
          params: {slug},
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept-Encoding': process.browser ? 'gzip, deflate, br' : 'gzip, deflate' // https://github.com/nuxt-community/axios-module/pull/176
          }
        })
        const article = data.Article
        const urlAlias = data.UrlAlias
        const articleLang = article && article.languageKey.toLowerCase()
        console.log(articleLang, 'async article lang', slug, isHMR)
        if (article) {
          if (!store.getters.canEdit && (article.deleted || !article.published)) {
            error({
              statusCode: 404,
              message: 'This page could not be found'
            })
          }
          if (app.$cms.languageMustMatch && locale.toUpperCase() !== article.languageKey) {
            error({
              statusCode: 404,
              message: 'This page could not be found'
            })
          }
          await store.dispatch('setPageProps', {
            articleId: article.id,
            languageKey: article.languageKey
          })
          await store.dispatch('setCurrentArticleCategories', article.categories.slice(0))
          return {
            host,
            Article: article,
            pageContent: article.contents
          }
        } else if (urlAlias && urlAlias.article && urlAlias.article.slug) {
          redirect(301, '/' + urlAlias.article.slug)
        } else {
          error({
            statusCode: 404,
            message: 'This page could not be found'
          })
        }
      } catch (e) {
        console.log('Error', e)
        error({
          statusCode: 500,
          message: 'An error occurred on query the content'
        })
      }
    }
  }
</script>
