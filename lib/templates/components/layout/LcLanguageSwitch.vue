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
        const route = this.$cms.defaultLanguage === this.$store.state.lc.locale ? '/' : '/' + this.$store.state.lc.locale
        this.$router.push(route)
        return Promise.resolve(true)
      }
    }
  }
</script>
