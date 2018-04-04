<template>
  <div class="article-detail-page">
    <lc-content-renderer v-if="pageContent.length"
                         :elements="pageContent"/>
  </div>
</template>
<script>
  import ArticleGql from '../gql/article/ArticleBySlug.gql'
  import getHeadMeta from '../util/getHeadMeta'
  import articleSubGql from '../gql/article/articleSubscription.gql'
  import {initialRenderFunc} from '../util/initialRender'
  import setPageTemplates from '../util/setPageTemplates'

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
    // components: {
    //   'ContentEditMain': () => import(/* webpackChunkName:'content-edit-chunk' */ '../components/content/edit/ContentEditMain.vue'), // todo
    //   ContentRenderer
    // },
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
      // console.log(app.$cms)

      const {locale, host, slug} = initialRenderFunc({req, store, params, CONFIG: app.$cms})
      try {
        const apollo = app.apolloProvider.defaultClient
        const {data} = await apollo.query({query: ArticleGql, variables: {slug}})
        await setPageTemplates(apollo, store)
        const article = data.Article
        const urlAlias = data.UrlAlias
        const articleLang = article && article.languageKey.toLowerCase()
        await store.dispatch('setLanguageKey', {locale: articleLang || locale, $cms: app.$cms})
        if (article) {
          if (!store.getters.canEdit && (article.deleted || !article.published)) {
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
            const {slug} = initialRenderFunc({store: this.$store, params: this.$route.params})
            return {slug}
          },
          result ({data}) {
            const article = data.Article.node
            this.pageProps = {
              articleId: article.id,
              languageKey: article.languageKey
            }
            this.Article = article
            this.pageContent = article.contents
          }
        }
      }
    }
  }
</script>
