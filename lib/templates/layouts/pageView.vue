<template>
  <v-app :class="{'jumbo-first': $store.state.lc.hasJumbotron}">
    <lc-side-nav v-if="hasHelpSideNav"/>
    <lc-main-sidebar/>
    <lc-page-toolbar/>
    <v-content class="page-view-layout"
               :class="{'is-loading':$store.state.lc.cmsLoading, 'content-edit-mode': $store.state.lc.isContentEditMode}">
      <v-container fluid
                   class="pa-0">
        <v-slide-y-transition mode="out-in">
          <nuxt/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <lc-main-footer/>
    <lc-error-widget/>
    <lc-admin-bar v-if="$store.getters.canEdit"/>
  </v-app>
</template>
<script>
  export default {
    name: 'LcPageViewLayout',
    data () {
      return {
        hasHelpSideNav: false
      }
    },
    // todo missing middleware setPageTemplates
    mounted () {
      this.hasHelpSideNav = this.$store.getters.isHelpGuide
    },
    watch: {
      '$store.state.lc.currentArticleCategories' (val) {
        this.setHelpSideNav((val.includes('Help Guide') || val.includes('Help Guide EN')))
      },
      '$vuetify.breakpoint.mdAndUp' () {
        const cats = this.$store.state.lc.currentArticleCategories
        this.setHelpSideNav((cats.includes('Help Guide') || cats.includes('Help Guide EN')))
      }
    },
    methods: {
      setHelpSideNav (v) {
        this.$store.commit('SET_HELP_NAV', v)
        this.hasHelpSideNav = v
      }
    }
  }
</script>
