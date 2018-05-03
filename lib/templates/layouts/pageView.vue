<template>
  <v-app :class="{'jumbo-first': $store.state.lc.hasJumbotron}">
    <lc-sidebar-left/>
    <lc-sidebar-right/>
    <lc-page-toolbar/>
    <lc-spinner/>
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
    <lc-admin-bar v-if="$store.getters.canEdit"
                  :edit-route="{name: 'articleEdit', params: {id: $store.state.lc.pageProps.articleId}}"
                  :add-route="{name:'articleEdit'}"
                  :content-edit-toggle="true"/>
  </v-app>
</template>
<script>
  export default {
    name: 'LcPageViewLayout'
  }
</script>
