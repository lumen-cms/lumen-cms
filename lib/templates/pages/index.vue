<template>
  <div class="article-detail-page">
    <lc-content-edit-main v-if="$store.state.lc.isContentEditMode"
                          :page-props="pageProps"
                          :content="pageContent"/>
    <lc-content-renderer v-else-if="pageContent.length"
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
  import ArticleGql from '../gql/article/ArticleBySlug.gql'
  import getHeadMeta from '../util/getHeadMeta'
  import articleSubGql from '../gql/article/articleSubscription.gql'
  import setPageTemplates from '../util/setPageTemplates'
  import initialAsyncData from '~initialAsyncData'

  export default {
    name: 'PageIndex',
    layout: 'pageView',
    head () {
      if (this.Article && this.Article.id) {
        const lang = this.Article.languageKey.toLowerCase()
        return getHeadMeta({
          article: this.Article,
          languageKey: lang,
          path: this.$route.path,
          host: this.host,
          CONFIG: this.$cms
        })
      }
      return {}
    },
    data () {
      return {
        Article: null,
        pageProps: null,
        pageContent: []
      }
    },
    mounted () {
      this.$on('routeChanged', this.onRouteChange)
    },
    beforeDestroy () {
      this.$off('routeChanged', this.onRouteChange)
    },
    destroyed () {
      this.$store.dispatch('setPageProps', {})
    },
    methods: {
      onRouteChange () {
        this.$store.dispatch('setCurrentArticleCategories', [])
      }
    },
    async asyncData ({req, app, store, params, error, redirect}) {
      const {locale, host, slug} = initialAsyncData({req, store, params, $cms: app.$cms})
      try {
        const apollo = app.apolloProvider.defaultClient
        const res = await Promise.all([
          apollo.query({query: ArticleGql, variables: {slug}}),
          setPageTemplates(apollo, store)
        ])
        const data = res[0].data
        const article = data.Article
        const urlAlias = data.UrlAlias
        const articleLang = article && article.languageKey.toLowerCase()
        await store.dispatch('setLanguageKey', articleLang || locale)
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
          await store.dispatch('setCurrentArticleCategories', article.categories.map(c => c.title).slice(0))
          return {
            host,
            Article: article,
            pageProps: {
              articleId: article.id,
              languageKey: article.languageKey
            },
            pageContent: article.contents
          }
        } else if (urlAlias) {
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
    },
    apollo: {
      $subscribe: {
        changedArticle: {
          query: articleSubGql,
          variables () {
            const {slug} = initialAsyncData({store: this.$store, params: this.$route.params, $cms: this.$cms})
            return {slug}
          },
          result ({data}) {
            const article = JSON.parse(JSON.stringify(data.Article.node)) // important to clean due to reactivity
            this.pageProps = {
              articleId: article.id,
              languageKey: article.languageKey
            }
            this.pageContent = article.contents.slice(0)
          }
        }
      }
    }
  }
</script>
