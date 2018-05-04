<template>
  <v-layout row :style="{flex:mobileSearchActive ? '1':'inherit'}">
    <v-btn icon
           v-show="isMobile"
           @click="mobileSearchActive = !mobileSearchActive">
      <v-icon>{{ mobileSearchActive ? 'arrow_back' : 'search' }}</v-icon>
    </v-btn>
    <v-text-field prepend-icon="search"
                  :class="{'search-field-hidden':isMobile && !mobileSearchActive}"
                  v-show="!isMobile || mobileSearchActive"
                  v-model="searchText"
                  solo
                  :label="$t('search') + '...'"
                  append-icon="clear"
                  :append-icon-cb="() => searchText=''"
                  hide-details
                  single-line/>
  </v-layout>
</template>
<script>
  import debounce from 'lodash.debounce'

  export default {
    name: 'LcMainSearch',
    data () {
      return {
        mobileSearchActive: false
      }
    },
    watch: {
      mobileSearchActive (v) {
        this.$emit('mobileSearchActive', v)
      }
    },
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint[this.$cms.toolbarSearchMobileBreakpoint]
      },
      searchText: {
        get () {
          return this.$store.state.lc.mainSearch
        },
        set: debounce(function (value) {
          this.$store.dispatch('setMainSearch', value)
          this.$emit('input', value)
        }, 500)
      }
    }
  }
</script>
<style>

  /*.lc-main-search {*/
  /*flex-grow: 1;*/
  /*opacity: 1;*/
  /*transition: flex-grow 5s ease-in-out;*/
  /*}*/

  /*.lc-main-search .search-field-hidden {*/
  /*flex-grow: 0.0001;*/
  /*overflow: hidden;*/
  /*opacity: 0;*/
  /*min-width: 0;*/
  /*}*/
</style>
