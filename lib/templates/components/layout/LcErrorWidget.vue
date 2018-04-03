<template>
  <v-snackbar dark color="red"
              v-model="alert" bottom :timeout="0"
              multi-line>
    {{ errorMessage }}
    <v-btn dark flat
           @click.native="alert = false">Close
    </v-btn>
  </v-snackbar>
</template>
<script>
  export default {
    name: 'LcErrorWidget',
    data () {
      return {
        alert: false
      }
    },
    watch: {
      '$store.state.lc.error' (v) {
        if (v) {
          this.alert = true
        }
      }
    },
    computed: {
      errorMessage () {
        if (!this.$store.state.lc.error) return
        let message = this.$store.state.lc.error
        try {
          const parsed = JSON.parse(message)
          message = parsed.message || message
        } catch (e) {
          console.log(e)
        }
        return message
      }
    }
  }
</script>
