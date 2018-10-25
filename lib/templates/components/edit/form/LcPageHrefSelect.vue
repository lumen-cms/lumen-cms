<template>
  <v-combobox :loading="loading"
              :items="options"
              v-model="url"
              :search-input.sync="searchInput"
              label="Link"
              name="page-selector"
              :hint="(link && link.value) ? JSON.stringify(link) : null"
              persistent-hint
              :rules="rules"
              :required="required"
              clearable
              class="page-selection"/>
</template>
<script>
  import allArticlesGql from '../../../gql/article/allArticlesSelect.gql'
  import { firstCharToUpper } from '../../../util/string'
  import debounce from 'lodash.debounce'
  import formValidation from '../../../mixins/formValidation'

  export default {
    name: 'LcPageHrefSelect',
    mixins: [formValidation],
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
          found && found.id ? this.emitValue(found) : this.emitValue({ value })
        } else {
          this.emitValue({})
        }
      },
      'value.linkSlug' () {
        this.setLinkValue()
      }
    },
    computed: {
      rules () {
        if (this.required) {
          return [this.onRequiredRule]
        }
        return []
      },
      options () {
        return this.items.map(e => e.value)
      },
      searchInput: {
        get () {
          return (this.link && this.link.value) || this.link
        },
        set: debounce(function (v) {
          console.log('set lc-page', v)
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
          this.link = {}
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
              OR: [{ deleted: null }, { deleted: false }]
            }
          }
          const searchText = (typeof this.searchText === 'object') ? this.searchText.value : this.searchText
          if (searchText) {
            const filterArray = [
              { title_contains: searchText },
              { slug_contains: searchText }
            ]
            variables.filter.AND = [
              { OR: variables.filter.OR },
              { OR: filterArray }
            ]
            delete variables.filter.OR
          }
          return variables
        },
        watchLoading (isLoading) {
          this.loading = isLoading
        },
        result ({ data }) {
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
