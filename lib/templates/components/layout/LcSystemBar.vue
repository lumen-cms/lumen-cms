<template>
  <v-system-bar app
                status
                :lights-out="lightsOut"
                :dark="$cms.systemBar.dark"
                :color="$cms.systemBar.color">
    <lc-vue-renderer navigation="menu"
                     :small="true"
                     :template-region="$cms.pageTemplate.SYSTEM_BAR"/>
  </v-system-bar>
</template>
<script>
  export default {
    name: 'LcSystemBar',
    props: {
      lightsOut: Boolean
    },
    components: {
      VSystemBar: () => import('vuetify/lib/components/VSystemBar')
    }
  }
</script>
