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
    components: {
      VFooter: () => import('vuetify/lib/components/VFooter')
    },
    computed: {
      copyright () {
        return `${new Date().getFullYear()} ${process.env.COPYRIGHT}`
      },
      languages () {
        return this.$cms.languages
      }
    },
    mounted () {
      this.checkCurrentLanguage()
    },
    methods: {
      /**
       * change language handler
       */
      async changeLanguage (lang) {
        if (this.$store.state.lc.locale === lang) {
          return
        }
        await this.$store.dispatch('setLanguageKey', lang)
        return Promise.resolve(true)
      },
      /**
       * on mounted check if the current language is correctly set
       */
      checkCurrentLanguage () {
        let locale = this.$cms.languages.length === 1 ? this.$cms.languages[0] : this.$store.state.lc.locale
        if (locale !== this.$store.state.lc.locale) {
          this.$store.dispatch('setLanguageKey', locale)
        }
      }
    }
  }
</script>
