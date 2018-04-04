import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('<%= options.pluginRoot %>/components/edit/LcEditToolbar.vue').then(m => m.default || m),
  LcEditFooter: () => import('<%= options.pluginRoot %>/components/edit/LcEditFooter.vue').then(m => m.default || m),
  LcArticleListDialog: () => import('<%= options.pluginRoot %>/components/edit/LcArticleListDialog.vue').then(m => m.default || m),
  LcAuthorDialog: () => import('<%= options.pluginRoot %>/components/edit/LcAuthorDialog.vue').then(m => m.default || m),
  LcMediaLibrary: () => import('<%= options.pluginRoot %>/components/edit/LcMediaLibrary.vue').then(m => m.default || m),
  // form
  LcHtmlField: () => import('<%= options.pluginRoot %>/components/edit/form/LcHtmlField.vue').then(m => m.default || m),
  LcFormContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcFormContainer.vue').then(m => m.default || m),
  LcFormDialogContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcFormDialogContainer.vue').then(m => m.default || m),
  LcTriggerSaveBtn: () => import('<%= options.pluginRoot %>/components/edit/form/LcTriggerSaveBtn.vue').then(m => m.default || m),
  LcUploadSelectContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcUploadSelectContainer.vue').then(m => m.default || m),
  LcUploadContainer: () => import('<%= options.pluginRoot %>/components/edit/form/LcUploadContainer.vue').then(m => m.default || m),
  LcConfirmBtn: () => import('<%= options.pluginRoot %>/components/edit/form/LcConfirmBtn.vue').then(m => m.default || m),
  LcPageHrefSelect: () => import('<%= options.pluginRoot %>/components/edit/form/LcPageHrefSelect.vue').then(m => m.default || m),
  // code mirror
  LcCodeMirror: () => import('<%= options.pluginRoot %>/components/edit/form/LcCodeMirror.vue').then(m => m.default || m),
  // media
  LcFileReferenceEdit: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileReferenceEdit.vue').then(m => m.default || m),
  LcFileTagDialog: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileTagDialog.vue').then(m => m.default || m),
  LcFileUpdateDialog: () => import('<%= options.pluginRoot %>/components/edit/media/LcFileUpdateDialog.vue').then(m => m.default || m),
  LcMediaLibraryItem: () => import('<%= options.pluginRoot %>/components/edit/media/LcMediaLibraryItem.vue').then(m => m.default || m),
  LcMediaLibraryPreviewItem: () => import('<%= options.pluginRoot %>/components/edit/media/LcMediaLibraryPreviewItem.js').then(m => m.default || m),
  LcUploadField: () => import('<%= options.pluginRoot %>/components/edit/media/LcUploadField.vue').then(m => m.default || m),
  // page template
  LcEditPageTemplateDialog: () => import('<%= options.pluginRoot %>/components/edit/LcEditPageTemplateDialog.vue').then(m => m.default || m),
  // content edit
  LcContentEditMain: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditMain.vue').then(m => m.default || m),
  LcContentImageDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentImageDialog.vue').then(m => m.default || m),
  LcContentEditHelp: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditHelp.vue').then(m => m.default || m),
  LcContentEditDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentEditDialog.vue').then(m => m.default || m),
  LcContentDeleteDialog: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentDeleteDialog.vue').then(m => m.default || m),
  LcContentCreateNewButton: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentCreateNewButton.vue').then(m => m.default || m),
  LcContentCreate: () => import('<%= options.pluginRoot %>/components/edit/content/LcContentCreate.vue').then(m => m.default || m),
  LcContentEditToolbar: () => import('<%= options.pluginRoot %>/components/edit/content/toolbar/LcContentEditToolbar.vue').then(m => m.default || m),
  LcContentEditRenderer: () => import('<%= options.pluginRoot %>/components/edit/content/renderer/LcContentEditRenderer.vue').then(m => m.default || m),
  LcContentEditLayoutRenderer: () => import('<%= options.pluginRoot %>/components/edit/content/renderer/LcContentEditLayoutRenderer.js').then(m => m.default || m),
  LcDividerEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcDividerEdit.vue').then(m => m.default || m),
  LcLayoutEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcLayoutEdit.vue').then(m => m.default || m),
  LcListWidgetEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcListWidgetEdit.vue').then(m => m.default || m),
  LcTextMixedEdit: () => import('<%= options.pluginRoot %>/components/edit/content/elements/LcTextMixedEdit.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
