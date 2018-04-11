<template>
  <div class="mt-3">
    <v-btn flat dark @click="changeLanguage(lang)" v-for="(lang,i) in languages"
           :key="i"
           :color="$store.state.lc.locale === lang ? 'primary' : ''">
      {{ lang }}
    </v-btn>
  </div>
</template>

<script>
  // import CONFIG from '../../../src/config'

  export default {
    name: 'LcLanguageSwitch',
    props: {
      type: {
        type: String,
        'default': 'page'
      }
    },
    computed: {
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
        this.$router.push(`/${lang}`)
        return Promise.resolve(true)
      }
    }
  }
</script>
