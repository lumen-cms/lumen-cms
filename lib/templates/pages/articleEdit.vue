<template>
  <div class="has-toolbar-wrap">
    <lc-edit-toolbar>
      <v-toolbar-title class="hidden-xl-only"
                       v-if="model.id">
        <router-link :to="`/${model.slug}`"
                     style="text-decoration: none">{{ model.title }}
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title class="hidden-xl-only" v-else>Create Blog Article</v-toolbar-title>
      <v-spacer/>
      <lc-trigger-save-btn text="SAVE"/>
      <v-menu bottom left v-if="model && model.id">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile :to="'/' + model.slug">
            <v-list-tile-title>
              View article
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$router.push({name:'edit-article'})">
            <v-list-tile-title>
              Add new article
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showClone = !showClone">
            <v-list-tile-title>
              Clone this article
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showDelete = true">
            <v-list-tile-title>
              Delete Article
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </lc-edit-toolbar>
    <v-snackbar v-model="showDelete" dark top>
      Are you sure you want to delete?
      <v-btn @click="onDelete"
             color="primary"
             :loading="$store.state.lc.updating">Yes!
      </v-btn>
    </v-snackbar>

    <lc-form-container @onSubmit="onSubmit"
                       @onFormDirty="$store.dispatch('setCanSave',$event)"
                       ref="form"
                       class="white elevation-1">

      <v-container fluid grid-list-xl>
        <v-layout row wrap>
          <v-flex md6 sm12 xs12>

            <v-text-field name="title"
                          v-model="model.title"
                          required
                          label="Title"/>
            <v-text-field name="metaTitle"
                          v-model="model.metaTitle"
                          label="Meta Title"/>
            <v-layout align-center>
              <v-tooltip bottom>
                <v-btn icon slot="activator" :loading="loadingSlugUpdate" @click="updateSlugs">
                  <v-icon>update</v-icon>
                </v-btn>
                <span>Update all slugs</span>
              </v-tooltip>
              <v-text-field name="slug"
                            v-model="model.slug"
                            required
                            label="Slug"/>
            </v-layout>
            <v-menu lazy
                    :close-on-content-click="false"
                    v-model="dateMenu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    max-width="290px"
                    min-width="290px">
              <v-text-field slot="activator"
                            label="Published date"
                            :value="publishedDateString"
                            prepend-icon="event"
                            readonly/>

              <v-date-picker :value="datePickerInputParsed"
                             @input="setDate" no-title scrollable actions/>
            </v-menu>

          </v-flex>
          <v-flex md6 sm12 xs12>

            <v-switch name="published"
                      v-model="model.published"
                      label="Published"/>
            <v-switch name="isBlogEntry"
                      v-model="model.isBlogEntry"
                      label="Is Blog Entry"/>
            <v-select name="languageKey"
                      v-model="model.languageKey"
                      label="Language" :items="languageItems"
                      required/>
            <v-select multiple
                      clearable
                      deletable-chips
                      prepend-icon="list"
                      :prepend-icon-cb="onArticleList"
                      label="Categories"
                      v-model="model.categoriesIds"
                      name="categoriesIds"
                      :items="allArticleCategories || []"
                      chips
                      item-value="id"
                      item-text="title"/>

            <v-select label="Authors"
                      clearable
                      multiple
                      :items="allAuthors || []"
                      :prepend-icon-cb="onAddAuthor"
                      prepend-icon="person_add"
                      item-text="name"
                      item-value="id"
                      v-model="model.authorsIds">
              <template slot="selection" slot-scope="data">
                <v-chip close
                        @input="data.parent.selectItem(data.item)"
                        :selected="data.selected"
                        class="chip--select-multi"
                        :key="JSON.stringify(data.item)">
                  <v-avatar @click="() => onEditAuthor(data.item)" class="accent">
                    <v-icon>edit</v-icon>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex md6 sm12 xs12>
            <v-text-field name="teaser"
                          v-model="model.teaser"
                          label="Teaser"
                          multi-line/>
          </v-flex>
          <v-flex md6 sm12 xs12>
            <v-text-field name="description"
                          v-model="model.description"
                          label="Meta Description"
                          multi-line/>
          </v-flex>
        </v-layout>
      </v-container>
      <slot/>
      <lc-upload-select-container class="mt-4"
                                  v-if="model.id"
                                  label="Preview Image"
                                  @uploaded="onUploaded"
                                  @deleted="onPreviewImageDeleted"
                                  :only-one="true"
                                  :processing="processingMedia"
                                  :media="previewImage"/>

      <i>ID: {{ model.id }}</i>
      <v-alert :value="model.deleted" icon="delete">Page is Deleted</v-alert>
    </lc-form-container>
    <lc-edit-footer/>
    <v-snackbar v-model="showClone" dark top>
      Create a clone inclusive content elements?
      <v-btn @click="cloneWithContent"
             color="success"
             :loading="clonePageProcess">Yes!
      </v-btn>
    </v-snackbar>
    <lc-article-list-dialog ref="articleListDialog"
                            :content="allArticleCategories"/>
    <lc-author-dialog ref="authorDialog"
                      :author="selectedAuthor"/>
    <v-snackbar v-model="showUpdatedSlugs"
                bottom>
      <div>Updated&nbsp;<strong>[ {{ updatedSlugs }} ]</strong>&nbsp;slugs in all content elements</div>
    </v-snackbar>
  </div>
</template>

<script>
  import slugify from 'slugify'

  import mutationUpdateArticle from '~updateArticle' // todo needs to be overwritable
  import mutationCreateArticle from '~createArticle' // todo needs to be overwritable
  import updateSlugsGql from '../gql/functions/updateSlugs.gql'
  import ArticleGql from '../gql/article/Article.gql'
  import ArticleWithContent from '../gql/article/ArticleById.gql'
  import mutationUpdateDeleteArticle from '../gql/article/updateDeleteArticle.gql'
  import AllArticleCategoriesGql from '../gql/articleCategory/allArticleCategories.gql'
  import allAuthors from '../gql/author/allAuthors.gql'
  import {cleanSchemaForClone} from '../util/contentClone'

  import mediaFileMixin from '../mixins/mediaFileMixin'

  const model = {
    title: null,
    slug: null,
    languageKey: null,
    published: false,
    keywords: null,
    teaser: null,
    isBlogEntry: false,
    metaTitle: null,
    description: null,
    publishedDate: null,
    categoriesIds: [],
    authorsIds: [],
    authors: []
  }

  export default {
    mixins: [mediaFileMixin],
    middleware: ['isAuth'],
    layout: 'admin',
    data () {
      return {
        showDelete: false,
        model: Object.assign({}, model),
        isDirty: false,
        showClone: false,
        clonePageProcess: false,
        deletingFile: false,
        processingMedia: false,
        dateMenu: false,
        selectedAuthor: null,
        allArticleCategories: [],
        allAuthors: [],
        Article: null,
        loadingSlugUpdate: false,
        updatedSlugs: 0,
        showUpdatedSlugs: false,
        slugOnInit: null
      }
    },
    watch: {
      'model.languageKey' (v) {
        v && this.$store.dispatch('setLanguageKey', v.toLowerCase())
      },
      'model.authorsIds' (v) {
        this.onAutorsIdsChange(v)
      }
    },
    apollo: {
      allAuthors: {
        query: allAuthors,
        result () {
          this.model && this.onAutorsIdsChange(this.model.authorsIds)
        }
      },
      allArticleCategories: {
        query: AllArticleCategoriesGql,
        prefetch ({store}) {
          const key = store.state.lc.locale || 'en'
          return {filter: {languageKey: key.toUpperCase()}}
        },
        variables () {
          const key = this.$store.state.lc.locale || 'en'
          return {filter: {languageKey: key.toUpperCase()}}
        }
      },
      Article: {
        query: ArticleGql,
        prefetch ({route}) {
          const id = route.params.id || ''
          return {id}
        },
        variables () {
          const id = this.$route.params.id || ''
          return {id}
        },
        skip () {
          const hasId = !!this.$route.params.id
          return !hasId
        },
        watchLoading (isLoading) {
          this.$store.commit('SET_CMS_LOADING', isLoading)
        },
        result ({data}) {
          const article = data.Article
          if (article) {
            this.model = Object.assign({}, this.model, article, {
              categoriesIds: (article.categories && article.categories.map(e => e.id)) || [],
              authorsIds: (article.authors && article.authors.map(e => e.id)) || []
            }) // important for reactivity
            this.$emit('modelInit', this.model)
            this.allAuthors && this.onAutorsIdsChange(this.model.authorsIds)
            this.slugOnInit = article.slug
          }
        }
      }
    },
    computed: {
      languageItems () {
        return this.$cms.languages.map(e => ({value: e.toUpperCase(), text: this.$t(e)}))
      },
      previewImage () {
        return this.model && this.model.media && this.model.media.map(e => e.previewImage)
      },
      datePickerInputParsed () {
        if (!this.model.publishedDate) return
        return new Date(this.model.publishedDate).toISOString().substring(0, 10)
      },
      publishedDateString () {
        if (!this.model.publishedDate) return
        return new Intl.DateTimeFormat(this.$store.state.lc.locale || 'de-DE', {})
          .format(Date.parse(this.model.publishedDate))
      }
    },
    methods: {
      async updateSlugs () {
        this.loadingSlugUpdate = true
        const updatedSlugs = await this.mutateGql({
          mutation: updateSlugsGql,
          variables: {id: this.model.id, slug: this.model.slug}
        }).then(r => r.updateSlugs)
        this.loadingSlugUpdate = false
        this.showUpdatedSlugs = true
        this.updatedSlugs = updatedSlugs.count
      },
      onAddAuthor () {
        this.selectedAuthor = null
        this.$refs.authorDialog.toggleShow()
      },
      onEditAuthor (author) {
        this.selectedAuthor = author
        this.$refs.authorDialog.toggleShow()
      },
      onAutorsIdsChange (v) {
        this.model.authors = []
        this.allAuthors && this.allAuthors.forEach(a => {
          if (v.includes(a.id)) {
            this.model.authors.push(a)
          }
        })
      },
      /**
       * @param e
       */
      setDate (e) {
        this.model.publishedDate = new Date(e)
      },
      remove (item) {
        this.model.authorsIds.splice(this.model.authorsIds.indexOf(item), 1)
        this.model.authorsIds = [...this.model.authorsIds]
        // this.model.authors.splice(this.)
      },
      async cloneWithContent () {
        this.clonePageProcess = true
        const page = await this.queryGql({query: ArticleWithContent, variables: {id: this.model.id}})
        const cloned = cleanSchemaForClone(page.Article, this.$cms)
        cloned.slug += slugify('-' + this.model.id + '-' + new Date().toISOString())
        cloned.title += ' -  copy'
        await this.createNewArticle(cloned)
      },
      onArticleList () {
        this.$refs.articleListDialog.toggleShow()
      },
      async onPreviewImageDeleted (imageId) {
        await this.mediaImageDelete(this.model.media, imageId, 'previewImage', 'Article')
        this.model.media = null
      },
      async onUploaded (fileId) {
        const variables = {
          previewImageId: fileId,
          articlesIds: [this.model.id]
        }
        this.processingMedia = true
        await this.createMedia(variables, 'Article')
        this.processingMedia = false
      },
      async onDelete () {
        const id = this.model.id
        const slug = this.model.slug + '_' + id
        await this.mutateGql({mutation: mutationUpdateDeleteArticle, variables: {id, slug}}, 'updateArticle')
        this.$router.push('/articles/admin')
      },
      async createNewArticle (variables) {
        const article = await this.mutateGql({mutation: mutationCreateArticle, variables}, 'createArticle')
        this.$router.push(`/edit-article/${article.id}`)
      },
      slugifySlug (string) {
        return string.indexOf('/') !== -1
          ? string.split('/').map(e => slugify(e, {lower: true})).filter(e => e).join('/')
          : slugify(string, {lower: true})
      },
      async onSubmit () {
        const variables = this.model
        variables.slug = this.slugifySlug(variables.slug) || this.slugifySlug(this.model.title)
        if (variables.id) {
          // update current article
          const needSlugUpdate = this.slugOnInit !== this.model.slug
          await this.mutateGql({mutation: mutationUpdateArticle, variables}, 'updateArticle')
          // check if slug changed and update slugs of all content elements
          if (needSlugUpdate) {
            await this.updateSlugs()
          }
        } else {
          // create new
          variables.languageKey = variables.languageKey || this.$store.state.lc.locale.toUpperCase()
          await this.createNewArticle(variables)
        }
      }
    }
  }
</script>
