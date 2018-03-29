<template>
  <v-app>
    <h3>fancy layout</h3>
    {{$options.test}}
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
