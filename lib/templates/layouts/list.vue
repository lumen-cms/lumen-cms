<template>
  <v-app>
    <lc-page-toolbar show-search/>
    <lc-sidebar-left/>
    <lc-sidebar-right/>
    <v-content class="main page-view-layout"
               :class="{'is-loading':$store.state.lc.cmsLoading}">
      <v-container fluid class="pa-0">
        <v-slide-y-transition mode="out-in">
          <nuxt/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <lc-main-footer/>
    <lc-admin-bar v-if="$store.getters.canEdit"/>
  </v-app>
</template>

<script>
  export default {
    name: 'LcListLayout'
  }
</script>
