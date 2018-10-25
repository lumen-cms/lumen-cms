<template>
  <div class="text-xs-center">
    <div style="max-width: 500px;margin: 0 auto" class="mt-5">
      <v-btn block
             large
             color="primary"
             @click="install"
             :loading="progress"
             outline>Start basic installation
      </v-btn>
      <v-alert color="info" :value="true" class="my-5" icon="info">
        Create pages with following locales: {{ $cms.languages }}<br>Modify:<br>
        'lumen-cms':{ cms: { languages: [array-of-locales] } }
      </v-alert>
      <div class="my-5" v-if="progress">
        <h2 class="pl-3">Installation is running...</h2>
        <v-progress-linear indeterminate/>
      </div>
    </div>
  </div>
</template>
<script>
  import mutationCreateArticle from '~createArticle'

  export default {
    layout: 'admin',
    data () {
      return {
        progress: false
      }
    },
    methods: {
      async install () {
        const languages = this.$cms.languages
        this.progress = true
        for (const lang of languages) {
          const variables = {
            languageKey: lang.toUpperCase(),
            slug: lang,
            published: true,
            title: 'Title of ' + lang + ' locale',
            contents: [this.getContent(lang.toUpperCase())]
          }
          await this.createPage(variables)
        }
        this.progress = false
        this.$store.dispatch('toggleContentEditMode')
        this.$router.push('/')
      },
      async createPage (variables) {
        return this.mutateGql({
          mutation: mutationCreateArticle,
          variables
        })
      },
      getContent (lang) {
        const data = {
          'languageKey': lang,
          'sorting': 0,
          'published': true,
          'description': '<p class="ql-align-center">Now you can start building up your new website. Enable content editing to start modify the content.</p>',
          'teaser': null,
          'type': 'TextImage',
          'properties': { 'headerLayout': 'H1', 'header': `Welcome to ${lang} page` },
          'styles': {
            'rootClassNames': [],
            'headerClassNames': [],
            'backgroundHeaderClassNames': [],
            'backgroundClassNames': [],
            'contentClassNames': []
          },
          'fileReferences': [],
          'backgroundFileReferences': [],
          'childs': []
        }
        return data
      }
    }
  }
</script>
