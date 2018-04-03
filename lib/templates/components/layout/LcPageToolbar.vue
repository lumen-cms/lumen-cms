<template>
  <lc-main-toolbar :extended="$options.hasExtension"
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
      <lc-vue-renderer :content="$store.getters['lc/getPageTemplate']('HEAD_TOP')"/>
      <v-layout v-if="hasExtension"
                row
                slot="extension"
                align-center
                pa-3>
        <lc-main-search v-if="!!showSearch"/>
        <v-spacer v-if="!showSearch"/>
        <lc-vue-renderer v-if="!hideExtensionTemplate"
                         :content="$store.getters['lc/getPageTemplate']('HEAD_EXTENSION')"/>
      </v-layout>
    </template>
  </lc-main-toolbar>
</template>

<script>
  // import CONFIG from '../../../src/config'

  export default {
    name: 'LcPageToolbar',
    props: {
      showSearch: {
        type: Boolean,
        'default': false
      },
      clippedRight: {
        type: Boolean,
        'default': false
      },
      hideExtensionTemplate: {
        type: Boolean,
        'default': false
      }
    },
    data () {
      return {
        hasExtension: this.$cms.PAGE_TOOLBAR_EXTENSION, // CONFIG
        searchActive: false
      }
    },
    computed: {
      mobileSearchActive () {
        return this.searchActive && this.$vuetify.breakpoint.smAndDown
      },
      darkToolbar () {
        return this.$cms.PAGE_TOOLBAR_DARK // CONFIG
      }
    },
    mounted () {
      console.log(this.$cms)
      if (process.browser) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.hasExtension = this.$cms.PAGE_TOOLBAR_EXTENSION && this.$vuetify.breakpoint.mdAndUp // need to do this for SSR
          }, 0)
        })
      }
    },
    watch: {
      '$vuetify.breakpoint.mdAndUp' (val) {
        this.hasExtension = !!(this.$cms.PAGE_TOOLBAR_EXTENSION && val)
        val && (this.searchActive = false)
      }
    }
  }
</script>

<style lang="stylus">
  .main-search.no-extension {
    flex-grow: 1;
    opacity: 1;
    transition: flex-grow 0.15s ease-in-out
  }

  .main-search.no-extension.search-field-hidden {
    flex-grow: 0.0001;
    overflow: hidden;
    opacity: 0;
    min-width: 0;
  }
</style>
