<template>
  <img :src="path || ($vuetify.breakpoint.lgAndUp ? logoPath : logoMobilePath)"
       height="100%"
       width="auto"
       alt="logo"
       @click="$router.push('/')"
       class="toolbar-logo">
</template>

<script>
  // import CONFIG from '../../../src/config'

  export default {
    name: 'LcMainLogo',
    props: {
      path: {
        type: String | null
      }
    },
    computed: {
      logoPath () {
        return this.path || this.$cms.logoPath
      },
      logoMobilePath () {
        // fallback is logoPath
        return this.$cms.logoPathMobile || this.$cms.logoPath
      }
    }
  }
</script>

<style scoped>
  .toolbar-logo {
    height: 40px;
    cursor: pointer;
  }
</style>
