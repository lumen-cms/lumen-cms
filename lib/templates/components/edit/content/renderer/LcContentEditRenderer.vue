<template>
  <div class="page-content edit-mode">
    <template v-for="(mappedEl, i) in mappedElements">

      <div class="content-edit-of-various"
           :key="'mapped' + i"
           v-if="mappedEl.componentName !== 'Layout'">
        <lc-content-edit-toolbar :page-contents="elements"
                                 :page-props="pageProps"
                                 :content-layout-element-id="mappedEl.contentLayoutElementId"
                                 :id="mappedEl.id"
                                 :content="mappedEl.content"
                                 :published="mappedEl.published"
                                 :sorting="mappedEl.sorting"
                                 :layout-index="mappedEl.layoutIndex"
                                 :render-index="i"/>
        <component :is="mappedEl.renderComponent"
                   :page-contents.sync="elements"
                   :page-props="pageProps"
                   :content-layout-element-id="mappedEl.contentLayoutElementId"
                   :id="mappedEl.id"
                   :content="mappedEl.content"
                   :published="mappedEl.published"
                   :sorting="mappedEl.sorting"/>
      </div>

      <div class="content-edit-of-layout"
           :key="'edit-layout' + i"
           v-else>
        <lc-content-edit-toolbar :page-contents="elements"
                                 :page-props="pageProps"
                                 :content-layout-element-id="mappedEl.contentLayoutElementId"
                                 :id="mappedEl.id"
                                 :content="mappedEl.content"
                                 :published="mappedEl.published"
                                 :sorting="mappedEl.sorting"
                                 :layout-index="mappedEl.layoutIndex"
                                 :render-index="i"/>
        <lc-content-edit-layout-renderer :page-contents="elements"
                                         :page-props="pageProps"
                                         :content-layout-element-id="mappedEl.contentLayoutElementId"
                                         :id="mappedEl.id"
                                         :content="mappedEl.content"
                                         :published="mappedEl.published"
                                         :sorting="mappedEl.sorting"/>
      </div>

      <v-alert v-if="!mappedEl.renderComponent"
               :key="'alert' + i"
               color="error"
               value="true">
        Invalid content element - probably can be deleted {{ mappedEl }}
      </v-alert>
      <div class="new-btn-wrap" :key="'newbtn' + i"
           :style="(i === mappedElements.length - 1 ? 'margin-bottom: 100px' : '')">
        <lc-content-create-new-button :page-contents="elements"
                                      :page-props="pageProps"
                                      :previous-element-sorting="mappedEl.sorting"
        />
      </div>
    </template>

    <div style="position: relative"
         v-if="!mappedElements.length && !$store.state.lc.cmsLoading">
      <span class="subheader"
            v-text="$t('addNewContent')"/>
      <lc-content-create-new-button :page-contents="[]"
                                    :page-props="pageProps"
                                    :previous-element-sorting="-1"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LcContentEditRenderer',
    props: {
      elements: {
        type: Array,
        'default': () => []
      },
      pageProps: Object
    },
    computed: {
      sortedElements () {
        return this.elements.slice(0)
          .sort((a, b) => a.sorting - b.sorting)
      },
      mappedElements () {
        return this.sortedElements.map(content => {
          const type = content.type
          return {
            componentName: type,
            // renderComponent: contentElements[type],
            renderComponent: `Lc${type}`,
            contentLayoutElementId: content.id,
            id: content.id,
            content: content,
            languageKey: content.languageKey,
            published: content.published,
            sorting: content.sorting,
            layoutIndex: content.layoutIndex
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .page-content.edit-mode {
    > * {
      // min-height: 24px;
      position: relative;
      .edit-toolbar {
        margin-left: 20px !important
      }
      .edit-toolbar:not(.controls-visible) {
        transform: scale(.5) translate(-50%, -50%) !important;
        &:hover {
          //display: block;
          transform: scale(1, 1) translate(0, 0) !important;
        }
      }
    }

    .new-btn-wrap {
      min-height: 0
      overflow visible
    }
    .content-edit-of-layout {
      > .edit-toolbar {
        margin-top: -30px !important;
      }
    }
    .content-edit-of-layout:first-of-type {
      > .edit-toolbar {
        margin-top: 0px !important;
        margin-left: 120px !important;
      }
    }
    .content-edit-of-various {
      min-height 64px
    }

    > .h-separator {
      //  min-height 24px
      overflow: visible !important
    }
  }

  /*
.page-view-layout .page-content.edit-mode > {
  div:first-child {
    .edit-toolbar {
      margin-top: 128px !important;
    }
  }
}*/
</style>
