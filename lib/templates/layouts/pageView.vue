<template>
  <v-app :class="{'jumbo-first': $store.state.hasJumbotron}">
    <lc-side-nav v-if="hasHelpSideNav"/>
    <lc-main-sidebar/>
    <lc-page-toolbar/>
    <h3>fancy layout</h3>

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
    data () {
      return {
        hasHelpSideNav: false
      }
    },
    mounted () {
      this.hasHelpSideNav = this.$store.getters.isHelpGuide
      console.log(this.$cms) // eslint-disable-line
    }
  }
</script>
