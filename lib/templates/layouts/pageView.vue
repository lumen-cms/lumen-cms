<template>
  <v-app>
    <h3>fancy layout</h3>

    <cms-test></cms-test>
    <nuxt/>
  </v-app>
</template>
<script>
  export default {
    mounted(){
      console.log(this.$cms)
    }
  }
</script>
