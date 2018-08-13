<template>
  <v-navigation-drawer app
                       dark
                       temporary
                       fixed
                       right
                       v-if="$store.getters.getPageTemplate($cms.pageTemplate.SIDEBAR_RIGHT)"
                       v-model="drawer">
    <v-toolbar
      class="transparent" flat>
      <v-list class="pa-0">
        <v-list-tile avatar
                     tag="div"
                     to="/"
                     nuxt>
          <lc-main-logo :path="logoPath"/>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider/>
    <lc-vue-renderer :template-region="$cms.pageTemplate.SIDEBAR_RIGHT"/>
    <slot/>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LcSidebarRight',
    computed: {
      drawer: {
        get () {
          return this.$store.state.lc.activeSidebarRight
        },
        set (v) {
          this.$store.commit('SET_SIDEBAR_RIGHT', v)
        }
      },
      logoPath () {
        return this.$cms.logoPath // always use the desktop-logo for the sidebar
      }
    }
  }
</script>
