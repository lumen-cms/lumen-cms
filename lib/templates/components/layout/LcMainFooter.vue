<template>
  <v-footer height="auto"
            clipped
            absolute
            inset
            app>
    <v-layout row wrap align-center class="grey darken-3 text-xs-center ma-0">
      <v-flex xs12>
        <v-spacer/>
        <lc-language-switch/>
        <v-spacer/>
      </v-flex>
      <v-flex xs12>
        <slot name="links"/>
        <slot/>
        <lc-vue-renderer :template-region="$cms.pageTemplate.FOOTER_TOP" navigation="columns"/>
        <lc-vue-renderer :template-region="$cms.pageTemplate.FOOTER_MIDDLE" navigation="columns" :dark="true"/>
        <lc-vue-renderer :template-region="$cms.pageTemplate.FOOTER_BOTTOM" navigation="columns"/>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
  export default {
    name: 'LcMainFooter'
  }
</script>
