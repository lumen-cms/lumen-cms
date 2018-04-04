<template>
  <v-app toolbar
         :class="{'extended-toolbar': hasExtension}">
    <lc-page-toolbar show-search/>
    <lc-main-sidebar/>
    <v-content class="main page-view-layout" :class="{'is-loading':$store.state.cmsLoading}">
      <v-container fluid class="pa-0">
        <v-slide-y-transition mode="out-in">
          <nuxt/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <lc-main-footer/>
    <lc-admin-bar v-if="$store.getters.canEdit"
                  :hide-edit-property="true"/>
  </v-app>
</template>

<script>

  export default {
    name: 'LcListLayout',
    data () {
      return {
        hasExtension: false
      }
    }
  }
</script>
