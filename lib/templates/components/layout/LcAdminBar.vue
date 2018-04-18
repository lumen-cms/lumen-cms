<template>
  <no-ssr>
    <div>
      <v-speed-dial v-model="fab"
                    direction="top"
                    bottom fixed left
                    v-if="$store.getters.canEdit"
                    style="z-index: 3">
        <v-btn slot="activator"
               class="blue darken-2"
               dark
               fab
               hover
               v-model="fab">
          <v-icon>account_circle</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-tooltip right v-if="articleId">
          <v-btn fab dark small
                 class="green"
                 slot="activator"
                 :to="{name: 'edit-article-id', params: {id: articleId}}">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Edit Properties</span>
        </v-tooltip>

        <v-tooltip right v-if="!!addRoute">
          <v-btn fab dark small
                 class="red"
                 slot="activator"
                 :to="addRoute">
            <v-icon>add</v-icon>
          </v-btn>
          <span>Add New ... </span>
        </v-tooltip>

        <v-tooltip right v-if="!hideEditProperty">
          <v-btn fab dark small
                 class="indigo"
                 slot="activator"
                 @click.native="$store.dispatch('toggleContentEditMode')">
            <v-icon>art_track</v-icon>
          </v-btn>
          <span>Enable Content Editing</span>
        </v-tooltip>
        <v-tooltip right
                   v-for="(item,i) in links"
                   :key="i">
          <v-btn fab
                 dark
                 small
                 :color="item.color"
                 slot="activator"
                 :to="item.to">
            <v-icon v-text="item.icon"/>
          </v-btn>
          <span v-text="item.title"/>
        </v-tooltip>
        <v-tooltip right
                   v-if="$store.state.lc.isContentEditMode">
          <v-btn fab dark small
                 class="deep-purple darken-3"
                 slot="activator"
                 @click.stop="$store.dispatch('setMediaLibrary', !$store.state.lc.showMediaLibrary)">
            <v-icon>photo_library</v-icon>
          </v-btn>
          <span>Media Library</span>
        </v-tooltip>
        <v-tooltip right>
          <v-btn fab dark small
                 class="purple"
                 slot="activator"
                 @click.native="onLogout">
            <v-icon>input</v-icon>
          </v-btn>
          <span>Logout</span>
        </v-tooltip>
      </v-speed-dial>
    </div>
  </no-ssr>
</template>
<script>
  export default {
    name: 'LcAdminBar',
    props: {
      addRoute: {
        type: String|Object
      },
      hideEditProperty: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        fab: false
      }
    },
    computed: {
      links () {
        const CONFIG = this.$cms
        let configAdminBarLinks = (CONFIG.adminBarLinks && Array.isArray(CONFIG.adminBarLinks) && CONFIG.adminBarLinks.slice(0)) || []
        return configAdminBarLinks.concat([{
          title: 'Page templates',
          to: {name: 'pageTemplates'},
          color: 'yellow darken-2',
          icon: 'code'
        }, {
          title: 'Blog admin',
          to: '/admin/article-admin',
          color: 'teal darken-4',
          icon: 'list'
        }, {
          title: 'URL 301 redirects',
          to: {name: 'redirects'},
          color: 'yellow darken-4',
          icon: 'forward'
        }])
      },
      articleId () {
        return this.$store.state.lc.pageProps.articleId
      }
    },
    methods: {
      async onLogout () {
        await this.$store.dispatch('LOGOUT')
        this.$nextTick(() => this.$router.push('/admin'))
      }
    }
  }
</script>
