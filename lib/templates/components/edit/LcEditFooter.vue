<template>
  <v-footer app fixed>
    <v-layout align-center>

      <v-spacer/>
      <v-btn flat @click="changeLanguage(lang)" v-for="(lang,i) in languages"
             :key="i"
             :color="$store.state.lc.locale === lang ? 'primary' : ''">
        {{ lang }}
      </v-btn>
      <div>
        <span>&COPY; {{ copyright }}</span>
      </div>
      <v-spacer/>
    </v-layout>
  </v-footer>
</template>
<script>
  export default {
    name: 'LcEditFooter',
    computed: {
      copyright () {
        return `${new Date().getFullYear()} ${process.env.COPYRIGHT}`
      },
      languages () {
        return this.$cms.languages
      }
    },
    methods: {
      async changeLanguage (lang) {
        if (this.$store.state.lc.locale === lang) {
          return
        }
        await this.$store.dispatch('setLanguageKey', lang)
        return Promise.resolve(true)
      }
    }
  }
</script>
