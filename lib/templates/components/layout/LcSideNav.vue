<template>
  <v-navigation-drawer app
                       fixed
                       clipped
                       mobile-break-point="960"
                       v-model="$store.state.lc.activeHelpNav">
    <v-divider/>
    <lc-vue-renderer :content="$store.getters.getPageTemplate('SIDENAV')"/>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LcSideNav'
  }
</script>
