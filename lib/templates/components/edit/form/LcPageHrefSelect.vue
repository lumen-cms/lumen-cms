<template>
  <v-select :loading="loading"
            :items="options"
            v-model="url"
            :search-input.sync="searchInput"
            label="Link"
            name="page-selector"
            combobox
            :hint="(link && link.value) ? JSON.stringify(link) : null"
            persistent-hint
            :required="required"
            clearable
            class="page-selection"/>
</template>
<script>
  import allArticlesGql from '../../../gql/article/allArticlesSelect.gql'
  import {firstCharToUpper} from '../../../util/string'
  import debounce from 'lodash.debounce'

  export default {
    name: 'LcPageHrefSelect',
    components: {},
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      required: Boolean
    },
    data () {
      return {
        url: null,
        link: {},
        items: [],
        searchText: '',
        loading: false
      }
    },
    mounted () {
      this.setLinkValue()
    },
    watch: {
      url (value) {
        let found
        if (value) {
          found = this.items.find(e => e.value === value)
          found && found.id ? this.emitValue(found) : this.emitValue({value})
        } else {
          this.emitValue({})
        }
      },
      'value.linkSlug' () {
        this.setLinkValue()
      }
    },
    computed: {
      options () {
        return this.items.map(e => e.value)
      },
      searchInput: {
        get () {
          return (this.link && this.link.value) || this.link
        },
        set: debounce(function (v) {
          if (v) {
            this.searchText = (v && v.value) || v
          } else {
            this.searchText = ''
          }
        }, 500)
      }
    },
    methods: {
      setLinkValue () {
        const v = this.value
        if (!v || !v.linkSlug) {
          this.url = null
          return
        }
        const model = {
          id: v.linkId,
          value: v.linkSlug,
          type: firstCharToUpper(v.linkType)
        }
        this.link = model
        this.url = model.value
      },
      emitValue (value) {
        this.$emit('updated', value)
      }
    },
    apollo: {
      allArticles: {
        query: allArticlesGql,
        manual: true,
        variables () {
          const variables = {
            filter: {
              languageKey: this.$store.state.lc.locale.toUpperCase(),
              OR: [{deleted: null}, {deleted: false}]
            }
          }
          const searchText = (typeof this.searchText === 'object') ? this.searchText.value : this.searchText
          if (searchText) {
            const filterArray = [
              {title_contains: searchText},
              {slug_contains: searchText}
            ]
            variables.filter.AND = [
              {OR: variables.filter.OR},
              {OR: filterArray}
            ]
            delete variables.filter.OR
          }
          return variables
        },
        watchLoading (isLoading) {
          this.loading = isLoading
        },
        result ({data}) {
          const allItems = data.allArticles
          // todo here we can extend
          this.items = allItems.map(e => ({
            value: e.slug,
            text: e.title + ' (/' + e.slug + ')',
            id: e.id,
            type: 'article'
          }))
        }
      }
    }
  }
</script>
<style>
  /* fixes problem with [Object Object] in the selection field */
  .page-selection.input-group--select.input-group--focused .input-group--select__autocomplete {
    /*opacity: 0;*/
  }
</style>
