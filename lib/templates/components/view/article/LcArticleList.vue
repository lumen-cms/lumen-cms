<template>
  <v-layout row wrap class="justify-center">
    <v-flex xs12 v-show="!!loadingApollo">
      <div style="text-align: center; padding: 20px;">
        <v-progress-circular indeterminate class="primary--text"/>
      </div>
    </v-flex>

    <template v-if="showCount">
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
        <lc-article-list-item :item="item"
                              :properties="properties"
                              style-type="Cards"/>
      </v-flex>
    </template>

    <template v-else-if="styleType === 'Slider' && list.length">
      <lc-carousel :hide-bottom-bar="content.properties.bottomBarHidden"
                   :content="content">
        <lc-article-list-item v-for="(item, i) in list"
                              :key="`slider${i}`"
                              :height="content.properties.sliderHeight"
                              :item="item"
                              style-type="Slider"/>
      </lc-carousel>
    </template>

    <v-flex xs12 v-else>
      <v-list subheader>
        <lc-article-list-item v-for="(item, i) in list" :key="`key${i}`"
                              :item="item"
                              :style-type="styleType"/>
      </v-list>
    </v-flex>

    <v-flex v-if="count > list.length && showPagination" xs12
            class="text-xs-center">
      <v-btn color="primary" :block="$vuetify.breakpoint.smAndDown" outline
             :loading="!!loadingApollo"
             @click.native="loadMore">{{ $t('show_more') }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  import allArticleGql from '../../../gql/article/allArticles.gql'
  import LcCarousel from '../partials/LcCarousel'

  const pagination = {
    rowsPerPage: 20,
    page: 1
  }
  const getSkipFirst = function (pagination) {
    const {page, rowsPerPage} = pagination
    const first = rowsPerPage
    const skip = (page - 1) * first
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
    components: {LcCarousel},
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
      }
    },
    data () {
      return {
        list: [],
        count: 0,
        loadingApollo: 0,
        pagination: Object.assign({}, pagination)
      }
    },
    methods: {
      loadMore () {
        this.pagination.page += 1
        const {skip, first} = getSkipFirst(this.pagination)
        this.fetchMoreGql('articleQueries', {first, skip})
      }
    },
    computed: {
      styleType () {
        return this.content.properties.styleType || 'Cards'
      },
      properties () {
        return this.content.properties || {}
      }
    },
    apollo: {
      articleQueries: {
        query: allArticleGql,
        prefetch ({store}) {
          const {skip, first} = getSkipFirst(pagination)
          const properties = this.content.properties || {}
          const filter = {
            OR: [{deleted: null}, {deleted: false}],
            languageKey: store.state.lc.locale.toUpperCase(),
            contents_some: {id_not: null},
            published: true
          }
          this.onlyBlogPosts && (filter.isBlogEntry = true)

          return {
            first: properties.listItemsLimit || first,
            skip,
            filter
          }
        },
        variables () {
          const {skip, first} = getSkipFirst(pagination)
          const properties = this.content.properties || {}
          const variables = {
            first: properties.listItemsLimit || first,
            skip,
            filter: {
              languageKey: this.$store.state.lc.locale.toUpperCase(),
              // contents_some: {id_not: null}, // testing purpose
              OR: [{deleted: null}, {deleted: false}],
              published: true
            }
          }
          this.onlyBlogPosts && (variables.filter.isBlogEntry = true)
          // search text is present
          const searchText = this.$store.state.lc.mainSearch
          if (searchText) {
            const filterArray = [
              {title_contains: searchText},
              {slug_contains: searchText},
              {keywords_contains: searchText}
            ]
            variables.filter.AND = [
              {OR: variables.filter.OR},
              {OR: filterArray}
            ]
            delete variables.filter.OR
          }
          if (properties.categoriesIds && properties.categoriesIds.length) {
            if (!variables.filter.AND) variables.filter.AND = [{OR: variables.filter.OR}]
            delete variables.filter.OR

            if (properties.allCategoriesMustMatch) {
              variables.filter.AND.push({
                AND: this.content.properties.categoriesIds.map(id => ({categories_some: {id: id}}))
              })
            } else {
              variables.filter.AND.push({
                categories_some: {
                  id_in: this.content.properties.categoriesIds
                }
              })
            }
          }
          if (properties.listItemsType && properties.listItemsType !== 'All') {
            variables.filter.isBlogEntry = (properties.listItemsType === 'Articles')
          }
          return variables
        },
        manual: true,
        update: data => data,
        result ({data}) {
          const {allArticles, _allArticlesMeta} = data // eslint-disable-line camelcase
          this.list = allArticles
          this.count = _allArticlesMeta && _allArticlesMeta.count
        },
        loadingKey: 'loadingApollo'
      }
    }
  }
</script>
