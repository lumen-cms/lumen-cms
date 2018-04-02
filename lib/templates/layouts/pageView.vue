<template>
  <v-app>
    <h3>fancy layout</h3>

    <cms-test></cms-test>
    <nuxt/>
  </v-app>
</template>
<script>
  // import {resolve} from 'path'
  // const _cmsTest = () => import('@@/lib/templates/components/CmsTest').then(m => m.default || m)
  // import _cmsTest from '@@/lib/templates/components/CmsTest.vue'

  export default {
    // component: {
    //   CmsTest: () => import('@@/lib/templates/components/CmsTest').then(m => m.default || m)
    // },
    mounted () {
      console.log(this.$cms) // eslint-disable-line
    }
  }
</script>
