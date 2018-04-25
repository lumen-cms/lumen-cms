<template>
  <div>
    <lc-content-edit-renderer
      :page-props="pageProps"
      :elements="content || []"/>
    <lc-media-library/>
    {{ $store.getters.getDialogType }}
    <template v-if="!!$store.getters.getDialogType">
      <lc-content-create/>
      <lc-content-delete-dialog :page-props="pageProps"
                                v-if="$store.getters.getDialogType === 'delete'"/>
      <lc-content-edit-dialog v-if="$store.getters.getDialogType === 'edit'"/>
    </template>
  </div>
</template>

<script>
  import createContent from '../../../gql/content/createContent.gql'
  import updateContent from '../../../gql/content/updateContent.gql'
  import updateArticleGql from '../../../gql/article/updateArticleModif.gql'
  import storageWatcher from '../../../mixins/storageWatcher'

  export default {
    name: 'LcContentEditMain',
    mixins: [storageWatcher],
    props: {
      pageProps: Object,
      page: Object,
      content: Array
    },
    watch: {
      '$store.state.lc.contentPublishData.id' (id) {
        id && this.togglePageContentElementVisibility()
      },
      '$store.state.lc.contentPasteData.id' (id) {
        id && this.onContentPaste()
      },
      '$store.state.lc.contentMoveData.id' (id) {
        id && this.onContentMove()
      },
      '$store.state.lc.contentCopyPasteData.id' (id) {
        id && this.onContentCopy()
      },
      '$store.state.lc.crossDomainContent': async (v) => {

      }
    },
    methods: {
      onContentUpdate ({variables}) {
        // const dialogData = this.$store.getters.getDialogData
        variables = JSON.parse(JSON.stringify(variables))
        delete variables.__typename
        return this.mutateGql({
          mutation: updateContent,
          variables
        }, 'updateContent')
          .catch(e => {
            console.debug('failed variables:', variables)
            console.error('update content fails', e)
          })
      },

      /**
       * @returns {Promise.<*[]>}
       */
      async onContentCreate ({variables}) {
        const vars = Object.assign({}, variables)
        const dialogData = this.$store.getters.getDialogData
        vars.sorting = dialogData.previousElementSorting + 1
        vars.languageKey = dialogData.pageProps.languageKey
        if (dialogData.layoutColumn || dialogData.layoutIndex) {
          vars.layoutColumn = dialogData.layoutColumn
          vars.layoutIndex = dialogData.layoutIndex
          vars.contentLayoutElementId = dialogData.contentLayoutElementId
        } else {
          if (dialogData.pageProps.articleId) {
            vars.articleId = dialogData.pageProps.articleId
          } else {
            console.warn('content must be part of page or article')
            return
          }
        }
        //        this.$store.commit('SET_UPDATING', true)
        await this.createSortingSpace(dialogData.pageContents, dialogData.previousElementSorting)
        const createdContent = await this.mutateGql({
          mutation: createContent,
          variables: vars
        }, 'createContent')
        const state = Object.assign({}, dialogData, {
          id: createdContent.id,
          // content: createdContent[firstCharToLower(typename)]
          content: createdContent
        })
        this.$store.dispatch('setContentEditDialogData', state)
        return createdContent
      },

      /**
       *
       * @returns {Promise.<void>}
       */
      async onContentCopy () {
        const {cleanSchemaForClone} = require('../../../util/contentClone')
        const content = this.$store.state.lc.contentCopyPasteData
        const element = content.contentElement
        const cloned = cleanSchemaForClone(element, this.$cms)
        // const typename = element.__typename
        // variables[firstCharToLower(typename)] = cloned
        const variables = Object.assign({}, cloned)
        variables.sorting = content.sorting + 1
        variables.languageKey = this.pageProps.languageKey
        if (content.layoutIndex) {
          variables.layoutIndex = content.layoutIndex
          variables.contentLayoutElementId = content.contentLayoutElementId
        } else {
          if (content.articleId) {
            variables.articleId = content.articleId
          } else {
            console.warn('content must be part of page or article')
            return
          }
        }
        this.$store.dispatch('toggleCmsLoading')
        await this.createSortingSpace(content.pageContents, content.sorting, true)
        await this.mutateGql({
          mutation: createContent,
          variables
        }, 'createContent')
        this.$store.dispatch('toggleCmsLoading')
        this.$store.dispatch('setContentCopyData', {id: null})
      },

      /**
       *
       * @var data
       *
       * returns {Promise.<*[]>}
       */
      async createSortingSpace (data, sortingFrom, contentPasteBefore) {
        const needUpdatePageContents = data
          .filter(content => content.sorting > sortingFrom)
        const promises = []
        let newSorting = contentPasteBefore ? sortingFrom + 2 : sortingFrom + 1
        needUpdatePageContents.forEach(content => {
          newSorting++
          promises.push(
            this.mutateGql({
              mutation: updateContent,
              variables: {
                id: content.id,
                sorting: newSorting
              }
            })
          )
        })
        return Promise.all(promises)
      },

      /**
       *
       * @returns {Promise.<void>}
       */
      async togglePageContentElementVisibility () {
        const {id, published} = this.$store.state.lc.contentPublishData
        this.$store.commit('SET_CMS_LOADING', true)
        await this.mutateGql({
          mutation: updateContent,
          variables: {id, published}
        })
        this.$store.commit('SET_CMS_LOADING', false)
        this.$store.dispatch('setContentPublish', {})
      },

      /**
       * @description If user simply moves content from one position to another position (cut / paste)
       * @returns {Promise.<void>}
       */
      async onContentPaste () {
        const {id, layoutIndex, sorting, articleId, contentLayoutElementId, pageContents, articleIdOrigin} = this.$store.state.lc.contentPasteData

        const contentVariables = {
          id,
          sorting: sorting + 1,
          contentLayoutElementId: (layoutIndex && contentLayoutElementId) || null,
          articleId: articleId || null,
          layoutIndex
        }
        // make sure to unset all parent fields in case of nested layout element
        if (contentVariables.contentLayoutElementId) {
          contentVariables.articleId = null
        }
        this.$store.commit('SET_CMS_LOADING', true)

        // do sorting first
        await this.createSortingSpace(pageContents, sorting, true)

        // update content element
        const mutatePromises = [this.mutateGql({
          mutation: updateContent,
          variables: contentVariables
        })]
        if (articleIdOrigin) {
          mutatePromises.push(this.mutateGql({
            mutation: updateArticleGql,
            variables: {
              id: articleIdOrigin,
              modified: new Date()
            }
          }))
        }
        await Promise.all(mutatePromises)

        this.$store.commit('SET_CMS_LOADING', false)
        // unset all cut/paste vuex states
        this.$store.dispatch('setContentCutData', {})
        this.$store.dispatch('setContentPasteData', {})
      },
      /**
       *
       * @returns {Promise.<void>}
       */
      async onContentMove () {
        const {id, currentIndex, swopIndex, pageContents} = this.$store.state.lc.contentMoveData
        const currentElement = pageContents.find((e, i) => i === currentIndex)
        const swopElement = pageContents.find((e, i) => i === swopIndex)
        if (!(currentElement && swopElement)) {
          // do nothing
          this.$store.dispatch('setContentMoveData', {})
          return
        }
        // simple swop elements
        this.$store.commit('SET_CMS_LOADING', true)
        const mutations = [this.mutateGql({
          mutation: updateContent,
          variables: {id, sorting: swopElement.sorting}
        }), this.mutateGql({
          mutation: updateContent,
          variables: {id: swopElement.id, sorting: currentElement.sorting}
        })]
        await Promise.all(mutations)
        this.$store.dispatch('setContentMoveData', {})
        this.$store.commit('SET_CMS_LOADING', false)
      }
    }
  }
</script>
