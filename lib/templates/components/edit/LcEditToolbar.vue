<template>
  <v-toolbar app
             fixed
             prominent
             :clipped-right="clippedRight"
             class="white"
             :class="{'search-active': $store.state.lc.searchActive}"
             ref="toolbar">
    <slot name="drawer_icon"/>
    <v-toolbar-title>
      <lc-main-logo dark/>
    </v-toolbar-title>
    <slot/>
  </v-toolbar>
</template>

<script>

  export default {
    name: 'LcEditToolbar',
    props: {
      clippedRight: Boolean
    }
  }
</script>
