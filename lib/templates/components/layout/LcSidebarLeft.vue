<template>
  <v-navigation-drawer app
                       fixed
                       clipped
                       mobile-break-point="960"
                       v-if="$store.getters.isPageTemplateVisible($cms, 'SIDEBAR_LEFT')"
                       v-model="drawer">
    <v-divider/>
    <lc-vue-renderer :template-region="$cms.pageTemplate.SIDEBAR_LEFT"/>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LcSidebarLeft',
    computed: {
      drawer: {
        get () {
          return this.$store.state.lc.activeSidebarLeft
        },
        set (v) {
          this.$store.commit('SET_SIDEBAR_LEFT', v)
        }
      }
    },
    mounted () {
      if (this.$store.getters.isPageTemplateVisible(this.$cms, 'SIDEBAR_LEFT') && this.$vuetify.breakpoint.mdAndUp) {
        this.$store.commit('SET_SIDEBAR_LEFT', true)
      }
    }
  }
</script>
