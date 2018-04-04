<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <lc-error-widget/>
    <lc-admin-bar v-if="$store.getters.canEdit"
                  hide-edit-property/>
  </v-app>
</template>
<script>
  export default {
    name: 'LcDefaultLayout'
  }
</script>
