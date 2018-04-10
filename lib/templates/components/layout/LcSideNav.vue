<template>
  <v-navigation-drawer app
                       fixed
                       clipped
                       mobile-break-point="960"
                       @input="onInput"
                       v-model="active">
    <v-divider/>
    <lc-vue-renderer template-region="SIDENAV"/>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'LcSideNav',
    data() {
      return {
        active: this.$store.state.lc.activeSecondaryNav
      }
    },
    methods: {
      onInput(v) {
        if (v === this.$store.state.lc.activeSecondaryNav) return
        this.$store.dispatch('setSecondaryNav', v)
      }
    },
    watch: {
      '$store.state.lc.activeSecondaryNav'(val, oldVal) {
        this.active = val
      }
    }
  }
</script>
