<template>
  <v-select multiple
            clearable
            deletable-chips
            :loading="$apollo.queries.allArticleCategories.loading"
            label="Categories"
            v-model="currentModel"
            :items="allArticleCategories || []"
            chips
            item-value="id"
            item-text="title"/>
</template>
<script>
  import AllArticleCategoriesGql from '../../../gql/articleCategory/allArticleCategories.gql'

  export default {
    name: 'LcCategorySelect',
    props: {
      value: Array | String
    },
    computed: {
      currentModel: {
        get () {
          return this.value
        },
        set (v) {
          this.$emit('input', v)
        }
      }
    },
    data () {
      return {
        allArticleCategories: []
      }
    },
    apollo: {
      allArticleCategories: {
        query: AllArticleCategoriesGql,
        variables () {
          const key = this.$store.state.lc.locale || 'en'
          return {filter: {languageKey: key.toUpperCase()}}
        }
      }
    }
  }
</script>
