import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('<%= options.pluginRoot %>/components/edit/LcEditToolbar.vue'),
  LcEditFooter: () => import('<%= options.pluginRoot %>/components/edit/LcEditFooter.vue'),
  LcArticleListDialog: () => import('<%= options.pluginRoot %>/components/edit/LcArticleListDialog.vue'),
  LcAuthorDialog: () => import('<%= options.pluginRoot %>/components/edit/LcAuthorDialog.vue'),
  LcMediaLibrary: () => import('<%= options.pluginRoot %>/components/edit/LcMediaLibrary.vue'),
  // form
  LcHtmlField: () => import('<%= options.pluginRoot %>/components/edit/form/LcHtmlField.vue'),
  LcFormContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcFormContainer.vue'),
  LcFormDialogContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcFormDialogContainer.vue'),
  LcTriggerSaveBtn: () => import('<%= options.pluginRoot %>/components/edit/form/LcTriggerSaveBtn.vue'),
  LcUploadSelectContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcUploadSelectContainer.vue'),
  LcUploadContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcUploadContainer.vue'),
  LcConfirmBtn: () => import('<%= options.pluginRoot %>/components/edit/form/LcConfirmBtn.vue'),
  LcPageHrefSelect: () => import('<%= options.pluginRoot %>/components/edit/form/LcPageHrefSelect.vue'),
  // code mirror
  LcCodeMirror: () => import('<%= options.pluginRoot %>/components/edit/form/LcCodeMirror.vue'),
  // media
  LcFileReferenceEdit: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileReferenceEdit.vue'),
  LcFileTagDialog: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileTagDialog.vue'),
  LcFileUpdateDialog: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileUpdateDialog.vue'),
  LcMediaLibraryItem: () => import('<%= options.pluginRoot %>/components/edit/media/LcMediaLibraryItem.vue'),
  LcMediaLibraryPreviewItem: () => import('<%= options.pluginRoot %>/components/edit/media/LcMediaLibraryPreviewItem.js'),
  LcUploadField: () => import('<%= options.pluginRoot %>/components/edit/media/LcUploadField.vue'),
  // page template
  LcEditPageTemplateDialog: () => import('<%= options.pluginRoot %>/components/edit/LcEditPageTemplateDialog.vue'),
  // content edit
  LcContentEditMain: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditMain.vue'),
  LcContentImageDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentImageDialog.vue'),
  LcContentEditHelp: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditHelp.vue'),
  LcContentEditDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditDialog.vue'),
  LcContentDeleteDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentDeleteDialog.vue'),
  LcContentCreateNewButton: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentCreateNewButton.vue'),
  LcContentCreate: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentCreate.vue'),
  LcContentEditToolbar: () => import('<%= options.pluginRoot %>/components/edit/content/toolbar/LcContentEditToolbar.vue'),
  LcContentEditRenderer: () => import('<%= options.pluginRoot %>/components/edit/content/renderer/LcContentEditRenderer.vue'),
  LcContentEditLayoutRenderer: () => import('<%= options.pluginRoot %>/components/edit/content/renderer/LcContentEditLayoutRenderer.js'),
  LcDividerEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcDividerEdit.vue'),
  LcLayoutEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcLayoutEdit.vue'),
  LcListWidgetEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcListWidgetEdit.vue'),
  LcTextMixedEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcTextMixedEdit.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
