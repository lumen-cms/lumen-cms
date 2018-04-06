<template>
  <v-footer absolute
            clipped
            inset
            app
            class="d-inline-block">
    <v-layout row wrap align-center class="grey darken-3 text-xs-center ma-0">
      <v-flex xs12>
        <v-spacer/>
        <lc-language-switch/>
        <v-spacer/>
      </v-flex>
      <v-flex xs12>
        <slot name="links"/>
        <slot/>
        <lc-vue-renderer template-region="FOOTER_TOP"/>
        <lc-vue-renderer template-region="FOOTER_MIDDLE"/>
        <lc-vue-renderer template-region="FOOTER_BOTTOM"/>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
  export default {
    name: 'LcMainFooter'
  }
</script>
