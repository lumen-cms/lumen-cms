<template>
  <div>
    <no-ssr>
      <v-app :class="{'extended-toolbar': hasExtension}">
        <lc-page-toolbar :has-extension="hasExtension" />
        <lc-sidebar-right />
        <v-content :class="{'is-loading':$store.state.lc.cmsLoading, 'content-edit-mode': false}">
          <v-container fluid
                       class="pa-0">
            <v-card class="ma-5 pa-5">
              <v-card-text>
                <div v-html="message" />
                <v-btn @click="reload"
                       color="primary"
                       flat>
                  <v-icon>home</v-icon>&nbsp;&nbsp;Home
                </v-btn>
              </v-card-text>
            </v-card>
          </v-container>
        </v-content>
        <lc-main-footer />
        <lc-admin-bar v-if="$store.getters.canEdit" />
      </v-app>
    </no-ssr>
  </div>
</template>

<script>
  export default {
    name: 'LcError',
    props: {
      error: {
        type: Object | String,
        'default': {
          message: 'error',
          statusCode: 500
        }
      }
    },
    // middleware: ['setPageTemplates'], // todo how to set page templates
    head () {
      return {
        title: this.title || '',
        meta: [
          { name: 'robots', content: 'noindex,nofollow' }
        ]
      }
    },
    data () {
      return {
        mounted: false,
        hasExtension: false
      }
    },
    mounted () {
      this.hasExtension = this.$cms.pageToolbarExtension && this.$vuetify.breakpoint.mdAndUp
      this.mounted = true
    },
    methods: {
      reload () {
        this.$router.replace('/')
        // process.browser && window.location.reload()
      }
    },
    computed: {
      statusCode () {
        return this.error.statusCode || 500
      },
      title () {
        if (this.statusCode === 404) {
          return this.$t('error.404.title')
        } else if (this.error.title) {
          return this.error.title
        } else {
          return 'Error'
        }
      },
      message () {
        if (this.statusCode === 404) {
          return this.$t('error.404.message')
        } else if (this.error.message) {
          return this.error.message
        } else {
          return 'Something went wrong'
        }
      }
    }
  }
</script>
