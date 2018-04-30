<template>
  <v-navigation-drawer app
                       dark
                       temporary
                       fixed
                       right
                       v-if="$store.getters.getPageTemplate($cms.TEMPLATE.SIDEBAR_RIGHT)"
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
    <lc-vue-renderer :template-region="$cms.TEMPLATE.SIDEBAR_RIGHT"/>
    <slot/>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "LcMainSidebar",
  computed: {
    drawer: {
      get() {
        return this.$store.state.lc.drawer;
      },
      set(v) {
        this.$store.commit("SET_DRAWER", v);
      }
    },
    logoPath() {
      return this.$cms.logoPath; // always use the desktop-logo for the sidebar
    }
  }
};
</script>
