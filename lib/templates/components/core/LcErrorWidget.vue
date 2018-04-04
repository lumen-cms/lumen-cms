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
      '$store.state.error' (v) {
        if (v) {
          this.alert = true
        }
      }
    },
    computed: {
      errorMessage () {
        const error = this.$store.state.lc.error
        if (!error) return
        let message = error
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
