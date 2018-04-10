import Vue from 'vue'

const components = {
  LcEditToolbar: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcEditToolbar.vue'),
  LcEditFooter: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcEditFooter.vue'),
  LcArticleListDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcArticleListDialog.vue'),
  LcAuthorDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcAuthorDialog.vue'),
  LcMediaLibrary: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcMediaLibrary.vue'),
  // form
  LcHtmlField: () => import(/* webpackChunkName: 'quill-chunk' */ '~cms/components/edit/form/LcHtmlField.vue'),
  LcFormContainer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcFormContainer.vue'),
  LcFormDialogContainer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcFormDialogContainer.vue'),
  LcTriggerSaveBtn: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcTriggerSaveBtn.vue'),
  LcUploadSelectContainer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcUploadSelectContainer.vue'),
  LcUploadContainer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcUploadContainer.vue'),
  LcConfirmBtn: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcConfirmBtn.vue'),
  LcPageHrefSelect: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/form/LcPageHrefSelect.vue'),
  // code mirror
  LcCodeMirror: () => import(/* webpackChunkName: 'codemirror-chunk' */ '~cms/components/edit/form/LcCodeMirror.vue'),
  // media
  LcFileReferenceEdit: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcFileReferenceEdit.vue'),
  LcFileTagDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcFileTagDialog.vue'),
  LcFileUpdateDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcFileUpdateDialog.vue'),
  LcMediaLibraryItem: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcMediaLibraryItem.vue'),
  LcMediaLibraryPreviewItem: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcMediaLibraryPreviewItem.js'),
  LcUploadField: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/media/LcUploadField.vue'),
  // page template
  LcEditPageTemplateDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/LcEditPageTemplateDialog.vue'),
  // content edit
  LcContentEditMain: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentEditMain.vue'),
  LcContentImageDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentImageDialog.vue'),
  LcContentEditHelp: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentEditHelp.vue'),
  LcContentEditDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentEditDialog.vue'),
  LcContentDeleteDialog: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentDeleteDialog.vue'),
  LcContentCreateNewButton: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentCreateNewButton.vue'),
  LcContentCreate: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/LcContentCreate.vue'),
  LcContentEditToolbar: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/toolbar/LcContentEditToolbar.vue'),
  LcContentEditRenderer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/renderer/LcContentEditRenderer.vue'),
  LcContentEditLayoutRenderer: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/renderer/LcContentEditLayoutRenderer.js'),
  LcDividerEdit: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/elements/LcDividerEdit.vue'),
  LcLayoutEdit: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/elements/LcLayoutEdit.vue'),
  LcListWidgetEdit: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/elements/LcListWidgetEdit.vue'),
  LcTextMixedEdit: () => import(/* webpackChunkName: 'content-edit-chunk' */ '~cms/components/edit/content/elements/LcTextMixedEdit.vue')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'content-edit-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
