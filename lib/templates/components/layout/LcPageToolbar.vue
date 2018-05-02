<template>
  <lc-main-toolbar :extended="hasExtension"
                   :mobile-search-active="mobileSearchActive"
                   :class="{'search-active' : searchActive}"
                   :dark-toolbar="darkToolbar"
                   :clipped-right="clippedRight"
                   prominent>
    <v-spacer v-show="$vuetify.breakpoint.smAndDown ? !mobileSearchActive : !(showSearch && !hasExtension)"/>
    <lc-main-search class="main-search no-extension mx-3"
                    :class="{'search-field-hidden': (!searchActive && $vuetify.breakpoint.smAndDown)}"
                    v-show="!!showSearch && !hasExtension"/>
    <v-spacer v-show="hasExtension"/>
    <template v-show="!mobileSearchActive">
      <v-btn icon
             v-show="!!showSearch && $vuetify.breakpoint.smAndDown"
             @click.native.stop="searchActive = !searchActive">
        <v-icon>search</v-icon>
      </v-btn>
      <slot/>
      <lc-vue-renderer :template-region="$cms.TEMPLATE.HEAD_TOP" navigation="menu" :class="$cms.toolbarTopVisibility"/>
      <v-layout v-if="hasExtension"
                row
                slot="extension"
                align-center
                pa-3>
        <lc-main-search v-if="!!showSearch"/>
        <v-spacer v-if="!showSearch"/>
        <lc-vue-renderer v-if="!hideExtensionTemplate"
                         navigation="menu"
                         :template-region="$cms.TEMPLATE.HEAD_EXTENSION"/>
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
        searchActive: false
      }
    },
    computed: {
      mobileSearchActive () {
        return this.searchActive && this.$vuetify.breakpoint.smAndDown
      },
      darkToolbar () {
        return this.$cms.pageToolbarDark // CONFIG
      },
      hasExtension () {
        return this.$cms.pageToolbarExtension
      }
    },
    watch: {
      '$vuetify.breakpoint.mdAndUp' (val) {
        val && (this.searchActive = false)
      }
    }
  }
</script>

<style lang="stylus">
  .main-search.no-extension {
    flex-grow: 1;
    opacity: 1;
    transition: flex-grow 0.15s ease-in-out;
  }

  .main-search.no-extension.search-field-hidden {
    flex-grow: 0.0001;
    overflow: hidden;
    opacity: 0;
    min-width: 0;
  }
</style>
