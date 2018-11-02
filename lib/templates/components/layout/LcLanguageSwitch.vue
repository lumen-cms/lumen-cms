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
      changeLanguage (lang) {
        return new Promise(resolve => {
          if (this.$store.state.lc.locale !== lang) {
            this.$store.dispatch('setLanguageKey', lang)
              .then(() => {
                const newLangIsDefault = this.$cms.defaultLanguage === lang
                const route = newLangIsDefault ? '/' : '/' + this.$store.state.lc.locale
                this.$router.push(route)
              })
          }
        })
      }
    }
  }
</script>
