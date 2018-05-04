<template>
  <v-toolbar app
             :fixed="fixed"
             :extended="extended"
             :prominent="prominent"
             :clipped-left="$vuetify.breakpoint.mdAndUp"
             :clipped-right="clippedRight"
             v-scroll="onScroll"
             :class="{'search-active': $store.state.lc.searchActive, 'has-jumbo': jumbo, 'transparent': transparentToolbar}"
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
    <slot/>
    <template slot="extension">
      <slot name="extension"/>
    </template>
    <v-toolbar-side-icon :class="$cms.toolbarSidebarRightIconClass"
                         @click.native.stop="$store.dispatch('toggleSidebarRight')"/>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'LcMainToolbar',
    props: {
      fixed: {
        type: Boolean,
        default: true
      },
      prominent: {
        type: Boolean,
        default: true
      },
      extended: {
        type: Boolean,
        default: false
      },
      darkToolbar: {
        type: Boolean,
        default: false
      },
      clippedRight: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
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
      jumbo () {
        return this.$store.state.lc.hasJumbotron
      },
      transparentToolbar () {
        return this.jumbo && !this.scrolledDown
      },
      isDark () {
        return this.darkToolbar || this.dark || this.transparentToolbar
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
  .toolbar:not(.transparent) {
    &:not(.theme--dark) {
      background-color: white !important;
    }

    transition: background-color 0.3s ease-in-out;
  }

  .toolbar.transparent.has-jumbo .toolbar__extension {
    border-top-color: transparent !important;
  }

  .toolbar.transparent.has-jumbo {
    .btn.btn--flat, .toolbar__side-icon, .dialog__activator .btn--outline {
      background-color: rgba(0, 0, 0, 0.4) !important;
    }
  }
</style>
