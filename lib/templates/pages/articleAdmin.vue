<template>
  <div class="has-toolbar-wrap">
    <lc-edit-toolbar>
      <v-spacer/>
      <v-btn icon
             @click="refetch"
             :loading="!!loadingApollo">
        <v-icon>cached</v-icon>
      </v-btn>
      <lc-main-search/>
      <v-menu bottom left>
        <v-btn icon slot="activator">
          <v-icon :class="{'info--text':filter.onlyBlog || filter.onlyNonBlog || showDeleted}">filter_list</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="filter.onlyBlog=!filter.onlyBlog;filter.onlyNonBlog=false">
            <v-list-tile-title :class="{'info--text':filter.onlyBlog}">Only Blog Entries</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="filter.onlyBlog=false;filter.onlyNonBlog=!filter.onlyNonBlog">
            <v-list-tile-title :class="{'info--text':filter.onlyNonBlog}">Only Pages</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showDeleted=!showDeleted">
            <v-list-tile-title :class="{'info--text':showDeleted}">Show Deleted Articles</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </lc-edit-toolbar>
    <v-data-table :headers="tableHeaders"
                  :items="list && list"
                  :loading="!!loadingApollo"
                  :total-items="count"
                  :pagination.sync="pagination"
                  :rows-per-page-items="[20,50,100,200,500]">

      <template slot="items"
                slot-scope="props">
        <td>
          <v-layout row>
            <v-btn icon
                   :to="`/${props.item.slug}`"
                   color="info"
                   class="white--text">
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon
                   :to="{name:'articleEdit',params:{id:props.item.id}}"
                   color="warning"
                   class="white--text">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-layout>
        </td>
        <td>
          {{ props.item.title }}
        </td>
        <td class="text-xs-right">
          <strong>{{ props.item.slug }}</strong>
        </td>
        <td class="text-xs-right">
          {{ new Date(props.item.updatedAt).toLocaleDateString($store.state.lc.locale, {hour: 'numeric', minute:
          'numeric'}) }}
        </td>
        <td class="text-xs-right">
          <v-icon v-show="props.item.published">check</v-icon>
        </td>
      </template>
    </v-data-table>

    <v-btn fixed
           dark
           fab
           bottom
           right
           color="primary"
           :to="{name:'articleEdit'}">
      <v-icon>add</v-icon>
    </v-btn>

    <lc-edit-footer/>

  </div>
</template>
<script>
  import allArticlesGql from '../gql/article/allArticlesAdmin.gql'
  import {pagination, getSkipFirst} from '../util/pagination'

  export default {
    middleware: ['isAuth'],
    layout: 'admin',
    data () {
      return {
        pagination: Object.assign({}, pagination),
        list: [],
        count: 0,
        loadingApollo: 0,
        filter: {
          onlyBlog: false,
          onlyNonBlog: false
        },
        showDeleted: false
      }
    },
    computed: {
      tableHeaders () {
        return [{value: 'id', sortable: false}, {
          value: 'title',
          text: 'Title',
          sortable: true,
          align: 'left'
        }, {
          value: 'slug',
          text: 'Slug',
          sortable: true
        }, {
          value: 'updatedAt',
          text: 'Last Updated',
          sortable: true
        }, {
          text: 'Active',
          sortable: false
        }]
      }
    },
    methods: {
      refetch () {
        this.refetchGql('articleQueries')
      }
    },
    apollo: {
      articleQueries: {
        query: allArticlesGql,
        variables () {
          const {skip, first} = getSkipFirst(this.pagination)
          const variables = {
            first,
            skip,
            filter: {
              languageKey: this.$store.state.lc.locale.toUpperCase(),
              // contents_some: {id_not: null}, // testing purpose
              OR: [{deleted: null}, {deleted: false}]
            }
          }
          if (this.showDeleted) {
            delete variables.filter.OR
          }
          const sortBy = this.pagination.sortBy
          if (sortBy) {
            variables.orderBy = sortBy + '_' + (this.pagination.descending ? 'DESC' : 'ASC')
          }
          // search text is present
          const searchText = this.$store.state.lc.mainSearch
          if (searchText) {
            const filterArray = [
              {title_contains: searchText},
              {slug_contains: searchText},
              {keywords_contains: searchText},
              {categories_some: {title_contains: searchText}}
            ]
            variables.filter.AND = [
              {OR: filterArray}
            ]
            if (!this.showDelete) {
              variables.filter.AND.push({OR: variables.filter.OR})
            }
          }
          if (this.filter.onlyBlog) {
            variables.filter.isBlogEntry = true
          }
          if (this.filter.onlyNonBlog) {
            variables.filter.isBlogEntry = false
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
