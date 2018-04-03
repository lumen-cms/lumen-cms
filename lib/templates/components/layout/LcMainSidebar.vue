<template>
  <v-navigation-drawer app
                       dark
                       temporary
                       fixed
                       right
                       v-if="$store.getters.getPageTemplate('SIDEBAR_TOP')"
                       v-model="$store.state.lc.drawer">
    <v-toolbar
      class="transparent" flat>
      <v-list class="pa-0">
        <v-list-tile avatar tag="div" to="/" nuxt>
          <lc-main-logo :path="logoPath"/>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider/>
    <lc-vue-renderer :content="$store.getters.getPageTemplate('SIDEBAR_TOP')"/>
    <slot/>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LcMainSidebar',
    computed: {
      logoPath: () => this.$cms.logoPath // always use the desktop-logo for the sidebar
    }
  }
</script>
