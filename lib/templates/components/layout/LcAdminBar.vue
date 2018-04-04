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
        <v-tooltip right>
          <v-btn fab dark small
                 class="green"
                 slot="activator"
                 v-if="showEdit"
                 :to="editArticleLink">
            <v-icon>edit</v-icon>
          </v-btn>
          <span>Edit Properties</span>
        </v-tooltip>

        <v-tooltip right>
          <v-btn fab dark small
                 class="red"
                 slot="activator"
                 :to="addLinkComputed || addLink || {name:'articleEdit'}">
            <v-icon>add</v-icon>
          </v-btn>
          <span>Add New ... </span>
        </v-tooltip>

        <v-tooltip right v-if="!hideContentEditing">
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
  // import CONFIG from '../../../src/config'

  export default {
    name: 'LcAdminBar',
    props: {
      hideEditProperty: {
        type: Boolean,
        'default': false
      },
      addLink: {
        type: String
      }
    },
    data () {
      return {
        fab: false
      }
    },
    computed: {
      links () {
        let links = []
        const CONFIG = this.$cms
        if (CONFIG.adminBarLinks && Array.isArray(CONFIG.adminBarLinks)) {
          links = links.concat(CONFIG.adminBarLinks)
        }
        return links.concat([{
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
          to: {name: 'url-alias'},
          color: 'yellow darken-4',
          icon: 'forward'
        }])
      },
      isBlog () {
        return ['blog-slug', 'article', 'index'].includes(this.$route.name)
      },
      showEdit () {
        return this.isBlog
      },
      editArticleLink () {
        return this.isBlog
          ? {name: 'articleEdit', params: {id: this.$store.state.lc.pageProps.articleId}} : {}
      },
      hideContentEditing () {
        return this.hideEditProperty || ['articles-admin', 'url-alias', 'page-template'].includes(this.$route.name)
      },
      addLinkComputed () {
        // todo this needs to be a prop or configurable through this.$cms
        if (['travels', 'reisen'].includes(this.$route.name)) {
          return 'edit-travel'
        } else if (['articles', 'blog'].includes(this.$route.name)) {
          return 'edit-article'
        }
      }
    },
    methods: {
      async onLogout () {
        await this.$store.dispatch('LOGOUT')
        this.$nextTick(() => this.$router.push('/admin'))
      },
      onEdit () {
        if (this.isBlog) {
          this.$router.push({name: 'edit-article-id', params: {id: this.$store.state.lc.pageProps.articleId}})
        }
      }
    }
  }
</script>
