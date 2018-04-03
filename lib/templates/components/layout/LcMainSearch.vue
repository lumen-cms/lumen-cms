<template>
  <v-text-field prepend-icon="search"
                v-model="searchText"
                solo
                :label="$t('search') + '...'"
                append-icon="cancel"
                :append-icon-cb="() => searchText=''"
                hide-details single-line/>
</template>
<script>
  import debounce from 'lodash.debounce'
  export default {
    name: 'LcMainSearch',
    computed: {
      searchText: {
        get () {
          return this.$store.state.mainSearch
        },
        set: debounce(function (value) {
          this.$store.dispatch('setMainSearch', value)
          this.$emit('input', value)
        }, 500)
      }
    }
  }
</script>
