<template>
  <v-toolbar dense
             extended
             class="ma-0 edit-toolbar"
             :class="{'controls-visible': pinned}"
             @mouseover.stop="active=true"
             @mouseleave.stop="active=false">

    <v-toolbar-title class="body-2 grey--text pr-2 ml-0">
      <v-btn icon flat
             @click="pinned = !pinned">
        <v-icon :class="{'blue--text': pinned,'warning--text': !published}">pin_drop</v-icon>
      </v-btn>
      {{ displayname }}
    </v-toolbar-title>
    <v-spacer/>

    <template slot="extension">
      <v-btn icon @click="onContentSort(renderIndex - 1)"
             v-if="pageContents && (pageContents.length > 1) && renderIndex > 0"
             :disabled="$store.state.lc.cmsLoading">
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
      <v-btn icon @click="onContentSort(renderIndex + 1)"
             :disabled="$store.state.lc.cmsLoading"
             v-if="pageContents && (pageContents.length > 1) && pageContents.length - 1 > renderIndex">
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>

      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             @click.prevent="togglePageContentElementVisibility">
        <v-icon :class="{'orange--text':!published}"
                v-text="`visibility${published ? '_off' : ''}`"/>
      </v-btn>

      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             v-if="canEdit && content"
             @click.native="$store.dispatch('setContentEditDialogData', {content, pageProps, dialogType: 'edit'})">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             @click.native="onPaste"
             v-if="canPaste">
        <v-badge overlay overlap right color="green">
          <v-icon slot="badge">subdirectory_arrow_left</v-icon>
          <v-icon>content_paste</v-icon>
        </v-badge>
      </v-btn>
      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             v-if="canCopy"
             @click.native="toggleContentCopy">
        <v-icon>
          {{ $store.state.lc.contentCopyData.id ? 'cancel' : 'content_copy' }}
        </v-icon>
      </v-btn>
      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             v-if="canCut"
             @click.native="toggleContentCut">
        <v-icon>
          {{ $store.state.lc.contentCutData.id ? 'cancel' : 'content_cut' }}
        </v-icon>
      </v-btn>

      <v-btn icon
             :disabled="$store.state.lc.cmsLoading"
             v-if="canDelete"
             @click.stop="$store.dispatch('setContentEditDialogData', {id, dialogType: 'delete'})">
        <v-icon class="red--text">delete</v-icon>
      </v-btn>
      <v-progress-circular v-if="!!$store.state.lc.cmsLoading" indeterminate size="24"/>
    </template>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'LcContentEditToolbar',
    props: {
      canEdit: {
        type: Boolean,
        'default': true
      },
      id: String,
      content: {
        type: Object,
        'default': () => {
        }
      },
      sorting: Number,
      layoutIndex: Number || null,
      published: Boolean,
      pageProps: Object,
      pageContents: Array,
      contentLayoutElementId: String,
      renderIndex: Number
    },
    data () {
      return {
        show: false,
        isDirty: false,
        pinned: false,
        active: false
      }
    },
    watch: {
      content () {
        const editDialogData = this.$store.getters.getDialogData
        if (editDialogData && editDialogData.content && (editDialogData.content.id === this.content.id)) {
          this.$store.dispatch('setContentEditDialogData', {
            content: this.content,
            pageProps: this.pageProps,
            dialogType: editDialogData.dialogType
          })
        }
      }
    },
    computed: {
      canDelete () {
        return this.id && !this.$store.state.lc.contentCopyData.id && !this.$store.state.lc.contentCutData.id
      },
      displayname () {
        return this.content.type
      },
      canCut () {
        return !this.$store.state.lc.contentCopyData.id
      },
      canCopy () {
        return !this.$store.state.lc.contentCutData.id
      },
      canPaste () {
        const id = this.id
        const contentCutData = this.$store.state.lc.contentCutData
        const contentCopyData = this.$store.state.lc.contentCopyData
        const typename = (contentCutData && contentCutData.type) || (contentCopyData && contentCopyData.type)
        if (!!this.layoutIndex && typename === 'Layout') {
          // layout don't allow to copy/paste into layout
          return false
        } else if (contentCutData.id && id !== contentCutData.id) {
          return true
        } else {
          if (contentCopyData.id) {
            return true
          }
        }
        return false
      }
    },
    methods: {
      onContentSort (swopIndex) {
        const moveObj = {
          id: this.id,
          currentIndex: this.renderIndex,
          swopIndex,
          pageContents: this.pageContents
        }
        this.$store.dispatch('setContentMoveData', moveObj)
      },
      onPaste () {
        this.$store.state.lc.contentCutData.id && this.onContentPaste()
        this.$store.state.lc.contentCopyData.id && this.onContentCopy()
      },
      onContentCopy () {
        const copyData = this.$store.state.lc.contentCopyData
        const data = Object.assign({}, {contentElement: copyData}, {
          id: this.id,
          sorting: this.sorting,
          articleId: this.pageProps.articleId,
          contentLayoutElementId: this.contentLayoutElementId,
          pageContents: this.pageContents,
          layoutIndex: this.layoutIndex
        })
        // todo need to adjust copy data and then trigger function in ContentEditMain
        this.$store.dispatch('setContentCopyPasteData', data)
      },
      onContentPaste () {
        const contentCutData = this.$store.state.lc.contentCutData
        const currentCutId = contentCutData.id
        const pasteObj = {
          id: currentCutId,
          pasteOnContentId: this.id,
          sorting: this.sorting,
          articleId: this.pageProps.articleId,
          contentLayoutElementId: this.contentLayoutElementId,
          pageContents: this.pageContents,
          layoutIndex: this.layoutIndex
        }
        if (this.pageProps.articleId !== contentCutData.articleIdOrigin) {
          pasteObj.articleIdOrigin = contentCutData.articleIdOrigin // set origin article id where content is cut out
        }
        this.$store.dispatch('setContentPasteData', pasteObj)
      },
      toggleContentCut () {
        const contentCutData = this.$store.state.lc.contentCutData.id ? {id: null} : {
          id: this.id,
          articleIdOrigin: this.pageProps.articleId,
          type: this.content && this.content.type
        }
        this.$store.dispatch('setContentCutData', contentCutData)
      },
      toggleContentCopy () {
        const currentCopyId = this.$store.state.lc.contentCopyData.id
        const data = this.content
        const state = currentCopyId ? {id: null} : data
        this.$store.dispatch('setContentCopyData', state)
      },

      /**
       * setting the contentPublish state
       */
      togglePageContentElementVisibility () {
        this.$store.dispatch('setContentPublish', {id: this.id, published: !this.published})
      }
    }
  }
</script>

<style lang="stylus">
  .edit-toolbar {
    position absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: auto;
    background-color: rgba(255, 255, 255, 0.75) !important;

    &:hover {
      background-color: rgba(255, 255, 255, 1) !important
      z-index: 2;
    }
    &:not(.controls-visible) {
      .toolbar__extension {
        display: none;
      }
      &:hover {
        .toolbar__extension {
          display: flex;
          width: auto;
        }
      }
    }
    &.toolbar--dense .toolbar__content {
      height: 35px;
    }
  }
</style>
