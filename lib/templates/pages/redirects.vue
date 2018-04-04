<template>
  <div>
    <lc-edit-toolbar>
      <v-spacer/>
      <v-btn icon @click="refetch" :loading="!!loadingApollo">
        <v-icon>cached</v-icon>
      </v-btn>
      <lc-main-search/>
    </lc-edit-toolbar>
    <v-data-table :headers="$options.tableHeaders"
                  :items="list && list"
                  :loading="!!loadingApollo"
                  :total-items="count"
                  :pagination.sync="pagination"
                  :rows-per-page-items="[20,50,100,200,500]">

      <template slot="items"
                slot-scope="props">
        <td>
          <v-btn icon color="warning"
                 class="white--text"
                 @click="onEdit(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn icon color="error"
                 class="white--text"
                 @click="onDelete(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
        <td>
          {{ props.item.id }}
        </td>
        <td>
          {{ props.item.path }}
        </td>
        <td class="text-xs-right">
          <strong v-if="props.item.article">
            {{ props.item.article.slug }} ({{ props.item.article.id }})</strong>
        </td>
      </template>
    </v-data-table>
    <v-btn fab
           fixed
           bottom
           right
           color="primary"
           @click="showFormDialog=true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="showFormDialog"
              max-width="500"
              persistent>
      <v-card>
        <v-card-title class="title">
          {{ model.id ? 'Update Redirect' : 'Create Redirect' }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="model.path"
                          label="Path"/>
            <lc-page-href-select :value="href" @updated="onHrefSelect"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat @click="model={};href={};showFormDialog=false;">Cancel</v-btn>
          <v-btn flat
                 color="primary"
                 :disabled="!canSubmit"
                 @click="onSubmit"
                 :loading="updating">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="showDelete">
      Are you sure to delete this redirect?
      <v-btn color="error"
             flat
             :loading="deleting"
             @click="deleteUrlAlias">
        Delete
      </v-btn>
    </v-snackbar>
    <lc-edit-footer/>
  </div>
</template>
<script>
  import allUrlAliasesGql from '../gql/urlAlias/allUrlAliases.gql'
  import updateUrlAliasGql from '../gql/urlAlias/updateUrlAlias.gql'
  import createUrlAliasGql from '../gql/urlAlias/createUrlAlias.gql'
  import deleteUrlAlias from '../gql/urlAlias/deleteUrlAlias.gql'
  import {pagination, getSkipFirst} from '../util/pagination'

  const model = {
    id: null,
    path: null,
    article: null,
    articleId: null
  }

  export default {
    middleware: ['isAuth'],
    layout: 'admin',
    data () {
      return {
        list: [],
        count: 0,
        loadingApollo: 0,
        showFormDialog: false,
        pagination: Object.assign({}, pagination),
        model: Object.assign({}, model),
        href: {},
        updating: false,
        showDelete: false,
        currentDeleteId: null,
        deleting: false
      }
    },
    tableHeaders: [{
      value: false,
      sortable: false
    }, {
      value: 'id',
      text: 'ID',
      sortable: false
    }, {
      value: 'path',
      text: 'Path',
      sortable: true
    }, {
      value: 'article',
      text: 'Article',
      sortable: false
    }],
    computed: {
      canSubmit () {
        return this.model.path && this.model.articleId
      }
    },
    methods: {
      async deleteUrlAlias () {
        this.deleting = true
        await this.mutateGql({
          mutation: deleteUrlAlias,
          variables: {
            id: this.currentDeleteId
          }
        })
        this.deleting = false
        this.showDelete = false
        this.refetch()
      },
      onDelete (id) {
        this.currentDeleteId = id
        this.showDelete = true
      },
      refetch () {
        this.refetchGql('allUrlAliases')
      },
      onHrefSelect (v) {
        this.href = {
          linkSlug: v.value,
          linkType: v.type,
          linkId: v.id
        }
        this.$set(this.model, 'articleId', v.id)
      },
      onEdit (item) {
        this.showFormDialog = true
        this.model = {
          id: item.id,
          path: item.path
        }
        if (item.article) {
          this.$set(this.model, 'articleId', item.article.id)
          this.href = {
            linkSlug: item.article.slug,
            linkType: 'Article',
            linkId: item.article.id
          }
        } else {
          this.href = null
        }
      },
      async onSubmit () {
        const variables = Object.assign({}, this.model)
        this.updating = true
        let mutation = createUrlAliasGql
        if (variables.id) {
          // update
          mutation = updateUrlAliasGql
        }
        await this.mutateGql({
          mutation,
          variables
        })
        this.refetch()
        this.updating = false
        this.showFormDialog = false
        this.model = {}
        this.href = null
      }
    },
    apollo: {
      allUrlAliases: {
        query: allUrlAliasesGql,
        manual: true,
        loadingKey: 'loadingApollo',
        variables () {
          const {skip, first} = getSkipFirst(this.pagination)
          const variables = {
            first,
            skip,
            filter: {}
          }
          const sortBy = this.pagination.sortBy
          if (sortBy) {
            variables.orderBy = sortBy + '_' + (this.pagination.descending ? 'DESC' : 'ASC')
          }
          const searchText = this.$store.state.lc.mainSearch
          if (searchText) {
            variables.filter.OR = [
              {path_contains: searchText},
              {
                article: {
                  slug_contains: searchText
                }
              }
            ]
          }
          return variables
        },
        result ({data}) {
          this.list = data.allUrlAliases
          this.count = data._allUrlAliasesMeta.count
        }
      }
    }
  }
</script>
