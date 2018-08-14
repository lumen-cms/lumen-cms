<template>
  <div :class="{'lc-toolbar-boxed':$cms.toolbarBoxed,'lc-system-bar-boxed':$cms.systemBar.boxed}">
    <lc-system-bar v-if="$cms.systemBar.enable && !$device.isMobile"
                   :lights-out="transparentToolbar"/>
    <v-toolbar app
               fixed
               :extended="hasExtension"
               prominent
               :clipped-left="$vuetify.breakpoint.mdAndUp"
               :clipped-right="clippedRight"
               v-scroll="onScroll"
               class="lc-page-toolbar"
               :class="{'mobile-search-active': mobileSearchActive, 'has-jumbo': jumbo, 'transparent': transparentToolbar}"
               ref="toolbar"
               :flat="transparentToolbar"
               :dark="isDark"
               :light="!isDark">

      <v-btn v-show="$store.getters.isPageTemplateVisible($cms,'SIDEBAR_LEFT')"
             :class="$cms.toolbarSidebarLeftIconClass"
             icon
             flat
             @click.native.stop="$store.dispatch('toggleSidebarLeft')">
        <v-icon>apps</v-icon>
      </v-btn>

      <v-toolbar-title>
        <lc-main-logo/>
      </v-toolbar-title>

      <v-spacer/>
      <lc-main-search class="lc-main-search no-extension mx-3"
                      v-if="!!showSearch"
                      @mobileSearchActive="mobileSearchActive = $event"/>

      <template v-show="!mobileSearchActive">
        <slot/>
        <lc-vue-renderer :template-region="$cms.pageTemplate.HEAD_TOP"
                         navigation="menu"
                         v-if="!hideToolbarRenderer"
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
      <v-toolbar-side-icon :class="$cms.toolbarSidebarRightIconClass"
                           @click.native.stop="$store.dispatch('toggleSidebarRight')"/>
    </v-toolbar>
  </div>

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
      },
      hideToolbarRenderer: {
        type: Boolean
      }
    },
    data () {
      return {
        mobileSearchActive: false,
        flat: false,
        dark: this.darkToolbar,
        scrolledDown: false
      }
    },
    mounted () {
      this.onScroll()
    },
    watch: {
      '$store.state.lc.hasJumbotron' () {
        if (!process.browser) return
        this.onScroll()
      },
      $route () {
        if (!process.browser) return
        this.onScroll()
      }
    },
    computed: {
      hasExtension () {
        return this.$cms.pageToolbarExtension
      },
      jumbo () {
        return this.$store.state.lc.hasJumbotron
      },
      transparentToolbar () {
        return this.jumbo && !this.scrolledDown
      },
      isDark () {
        return this.$cms.pageToolbarDark || this.dark || this.transparentToolbar
      }
    },
    methods: {
      onScroll () {
        if (!process.browser) return
        this.scrolledDown = window && window.pageYOffset >= 128
      }
    }
  }
</script>

<style lang="stylus">
  .lc-page-toolbar {
    .v-toolbar__content {
      > .layout {
        flex: inherit // need to align space correctly
      }
    }
  }

  .lc-page-toolbar.mobile-search-active {
    .v-toolbar__content {
      > div:not(.lc-main-search), > button {
        display none
      }
    }
  }

  .v-toolbar:not(.transparent) {
    &:not(.theme--dark) {
      background-color: white !important;
    }

    transition: background-color 0.3s ease-in-out;
  }

  .v-toolbar.transparent.has-jumbo .v-toolbar__extension {
    border-top-color: transparent !important;
  }

  .v-toolbar.transparent.has-jumbo {
    .v-btn.v-btn--flat, .v-toolbar__side-icon, .v-dialog__activator .v-btn--outline {
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
  }
</style>
