<template>
  <v-layout row wrap class="justify-center">
    <v-flex xs12 v-show="!articlesLoaded">
      <div style="text-align: center; padding: 20px;">
        <v-progress-circular indeterminate class="primary--text"/>
      </div>
    </v-flex>

    <template v-if="articlesLoaded && showCount">
      <v-flex xs12 v-if="count">
        {{ count }} {{ $t('results') }}
      </v-flex>
      <v-flex xs12 v-else>
        {{ $t('resultsNotFound') }}
      </v-flex>
    </template>

    <template v-if="styleType === 'Cards'">
      <v-flex xs12 sm6 md4
              v-for="(item, i) in list"
              :key="`cards${i}`">
        <lc-article-list-item-card :item="item"
                                   :is-content-element-visible="isContentElementVisible"
                                   :properties="properties"/>
      </v-flex>
    </template>

    <template v-else-if="styleType === 'Slider' && list && list.length">
      <lc-article-list-slider :list="list"
                              :is-visible="isContentElementVisible"
                              :properties="properties"/>
    </template>

    <v-flex xs12 v-else>
      <v-list subheader>
        <lc-article-list-item v-for="(item, i) in list" :key="`key${i}`"
                              :item="item"
                              :is-content-element-visible="isContentElementVisible"
                              :style-type="styleType"/>
      </v-list>
    </v-flex>

    <v-flex v-if="list && count > list.length && hasLoadMore" xs12
            class="text-xs-center">
      <v-btn color="primary" :block="$vuetify.breakpoint.smAndDown"
             outline
             @click.native="onShowMoreClicked"
             :loading="!!loadingMore">{{ $t('show_more') }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  const pagination = {
    rowsPerPage: 5,
    page: 1
  }

  const getSkipFirst = function (pagination) {
    const {page, rowsPerPage} = pagination
    const first = rowsPerPage * page
    const skip = 0
    return {
      first, skip
    }
  }
  /**
   * Wrap this in a v-container, e.g.:
   *   <v-container fluid grid-list-md class="content-boxed"> </v-container>
   */
  export default {
    name: 'LcArticleList',
    scrollToTop: false,
    props: {
      showCount: {
        type: Boolean,
        'default': true
      },
      showPagination: {
        type: Boolean,
        'default': true
      },
      content: {
        type: Object,
        'default' () {
          return {
            properties: {}
          }
        }
      },
      onlyBlogPosts: {
        type: Boolean,
        default: false
      },
      isContentElementVisible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        articlesLoaded: false,
        list: [],
        count: 0,
        loadingMore: false,
        pagination: Object.assign({}, pagination, {page: Number(this.$route.query.page || pagination.page)})
      }
    },
    async created () {
      const langKey = this.$store.state.lc.locale.toUpperCase()
      const searchVal = this.$store.state.lc.mainSearch
      const queryObject = this.getVariablesFilter(langKey, searchVal)
      const articleQueryData = await this.getArticles(queryObject)
      this.list = articleQueryData.allArticles
      this.count = articleQueryData._allArticlesMeta && articleQueryData._allArticlesMeta.count
      this.articlesLoaded = true
    },
    methods: {
      async onShowMoreClicked () {
        this.loadingMore = true
        if (this.content.type === 'ListWidget') {
          await this.fetchArticles()
          this.loadingMore = false
        } else {
          this.$router.push({query: {page: this.pagination.page + 1}}, () => (this.loadingMore = false))
        }
      },
      async getArticles (queryObject) {
        const server = (['production', 'staging'].includes(process.env.NODE_ENV) || process.env.ENFORCE_GQL_PROXY_PROD === '1')
          ? process.env.GQL_PROXY_PROD : process.env.GQL_PROXY_DEV
        const url = server + 'allArticles/' + process.env.GRAPHQL_PROJECT_ID
        return this.$axios.$get(url, {
          params: queryObject,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept-Encoding': process.browser ? 'gzip, deflate, br' : 'gzip, deflate' // https://github.com/nuxt-community/axios-module/pull/176
          }
        })
      },
      async fetchArticles () {
        this.content.type === 'ListWidget' && (this.pagination.page += 1)
        const langKey = this.$store.state.lc.locale.toUpperCase()
        const searchVal = this.$store.state.lc.mainSearch
        const {skip, first} = getSkipFirst(this.pagination)
        const queryObject = Object.assign({}, this.getVariablesFilter(langKey, searchVal), {skip, first})
        const articleQueryData = await this.getArticles(queryObject)
        this.list = articleQueryData.allArticles
      },
      /**
       * overwrite if extend the component
       */
      getTitleFilter (searchText) {
        return [
          {title_contains: searchText},
          {slug_contains: searchText},
          {keywords_contains: searchText}
        ]
      },
      getVariablesFilter (languageKey, searchText) {
        const {skip, first} = getSkipFirst(this.pagination)
        const properties = this.content.properties || {}
        const filter = {
          OR: [],
          languageKey,
          // contents_some: {id_not: null}, // testing
          published: true,
          deleted_not: true
        }
        this.onlyBlogPosts && (filter.isBlogEntry = true)
        // search text is present
        if (searchText) {
          const filterArray = this.getTitleFilter(searchText)
          filter.AND = [
            {OR: filterArray}
          ]
          if (filter.OR.length) {
            filter.AND.push({OR: filter.OR})
          }
          delete filter.OR
        }
        if (properties.categoriesIds && properties.categoriesIds.length) {
          if (!filter.AND) filter.AND = [{OR: filter.OR}]
          delete filter.OR

          if (properties.allCategoriesMustMatch) {
            filter.AND.push({
              AND: properties.categoriesIds.map(id => ({'categories_some': {'id': id}}))
            })
          } else {
            filter.AND.push({
              'categories_some': {
                'id_in': properties.categoriesIds
              }
            })
          }
        }
        if (properties.listItemsType && properties.listItemsType !== 'All') {
          filter.isBlogEntry = (properties.listItemsType === 'Articles')
        }
        const finalFilter = this.extendFilter(filter)
        return {
          first: properties.listItemsLimit || first,
          skip,
          filter: finalFilter,
          orderBy: properties.orderBy || 'publishedDate_DESC'
        }
      },
      /**
       * mainly only provided to extend the current filter mechanism
       * @param filter
       * @return {*}
       */
      extendFilter (filter) {
        return filter
      }
    },
    computed: {
      styleType () {
        return this.content.properties.styleType || 'Cards'
      },
      properties () {
        return this.content.properties || {}
      },
      hasLoadMore () {
        const hideShowMore = this.properties && this.properties.hideShowMore
        return !hideShowMore && this.showPagination
      }
    },
    watch: {
      '$route' (to, from) {
        const queryParamPage = Number(this.$route.query.page)
        this.pagination.page = queryParamPage || 1
        this.fetchArticles()
      },
      '$store.state.lc.mainSearch' () {
        this.fetchArticles()
      }
    }
  }
</script>
