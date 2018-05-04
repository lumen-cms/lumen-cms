<template>
  <lc-main-toolbar :extended="hasExtension"
                   class="lc-page-toolbar"
                   :class="{'mobile-search-active' : mobileSearchActive}"
                   :dark-toolbar="$cms.pageToolbarDark"
                   :clipped-right="clippedRight"
                   prominent>
    <v-spacer/>
    <lc-main-search class="lc-main-search no-extension mx-3"
                    v-if="!!showSearch"
                    @mobileSearchActive="mobileSearchActive = $event"/>

    <template v-show="!mobileSearchActive">

      <slot/>
      <lc-vue-renderer :template-region="$cms.pageTemplate.HEAD_TOP" navigation="menu"
                       :class="$cms.toolbarTopVisibility"/>
      <v-layout v-if="hasExtension"
                row
                slot="extension"
                align-center
                pa-3>
        <lc-vue-renderer v-if="!hideExtensionTemplate"
                         navigation="menu"
                         :template-region="$cms.pageTemplate.HEAD_EXTENSION"/>
      </v-layout>
    </template>
  </lc-main-toolbar>
</template>

<script>
  export default {
    name: 'LcPageToolbar',
    props: {
      showSearch: {
        type: Boolean,
        default: false
      },
      clippedRight: {
        type: Boolean,
        default: false
      },
      hideExtensionTemplate: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        mobileSearchActive: false
      }
    },
    computed: {
      hasExtension () {
        return this.$cms.pageToolbarExtension
      }
    }
  }
</script>

<style lang="stylus">
  .lc-page-toolbar {
    .toolbar__content {
      > .layout {
        flex: inherit // need to align space correctly
      }
    }
  }

  .lc-page-toolbar.mobile-search-active {
    .toolbar__content {
      > div:not(.lc-main-search),>button{
        display none
      }
    }
  }
</style>
