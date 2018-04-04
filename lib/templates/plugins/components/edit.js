import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('~~/lib/templates/components/edit/LcEditToolbar.vue').then(m => m.default || m),
  LcEditFooter: () => import('~~/lib/templates/components/edit/LcEditFooter.vue').then(m => m.default || m),
  LcArticleListDialog: () => import('~~/lib/templates/components/edit/LcArticleListDialog.vue').then(m => m.default || m),
  LcAuthorDialog: () => import('~~/lib/templates/components/edit/LcAuthorDialog.vue').then(m => m.default || m),
  LcMediaLibrary: () => import('~~/lib/templates/components/edit/LcMediaLibrary.vue').then(m => m.default || m),
  // form
  LcHtmlField: () => import('~~/lib/templates/components/edit/form/LcHtmlField.vue').then(m => m.default || m),
  LcFormContainer: () => import('~~/lib/templates/components/edit/form/LcFormContainer.vue').then(m => m.default || m),
  LcFormDialogContainer: () => import('~~/lib/templates/components/edit/form/LcFormDialogContainer.vue').then(m => m.default || m),
  LcTriggerSaveBtn: () => import('~~/lib/templates/components/edit/form/LcTriggerSaveBtn.vue').then(m => m.default || m),
  LcUploadSelectContainer: () => import('~~/lib/templates/components/edit/form/LcUploadSelectContainer.vue').then(m => m.default || m),
  LcUploadContainer: () => import('~~/lib/templates/components/edit/form/LcUploadContainer.vue').then(m => m.default || m),
  LcConfirmBtn: () => import('~~/lib/templates/components/edit/form/LcConfirmBtn.vue').then(m => m.default || m),
  LcPageHrefSelect: () => import('~~/lib/templates/components/edit/form/LcPageHrefSelect.vue').then(m => m.default || m),
  // code mirror
  LcCodeMirror: () => import('~~/lib/templates/components/edit/form/LcCodeMirror.vue').then(m => m.default || m),
  // media
  LcFileReferenceEdit: () => import('~~/lib/templates/components/edit/media/LcFileReferenceEdit.vue').then(m => m.default || m),
  LcFileTagDialog: () => import('~~/lib/templates/components/edit/media/LcFileTagDialog.vue').then(m => m.default || m),
  LcFileUpdateDialog: () => import('~~/lib/templates/components/edit/media/LcFileUpdateDialog.vue').then(m => m.default || m),
  LcMediaLibraryItem: () => import('~~/lib/templates/components/edit/media/LcMediaLibraryItem.vue').then(m => m.default || m),
  LcMediaLibraryPreviewItem: () => import('~~/lib/templates/components/edit/media/LcMediaLibraryPreviewItem.js').then(m => m.default || m),
  LcUploadField: () => import('~~/lib/templates/components/edit/media/LcUploadField.vue').then(m => m.default || m),
  // page template
  LcEditPageTemplateDialog: () => import('~~/lib/templates/components/edit/LcEditPageTemplateDialog.vue').then(m => m.default || m),
  // content edit
  LcContentEditMain: () => import('~~/lib/templates/components/edit/content/LcContentEditMain.vue').then(m => m.default || m),
  LcContentImageDialog: () => import('~~/lib/templates/components/edit/content/LcContentImageDialog.vue').then(m => m.default || m),
  LcContentEditHelp: () => import('~~/lib/templates/components/edit/content/LcContentEditHelp.vue').then(m => m.default || m),
  LcContentEditDialog: () => import('~~/lib/templates/components/edit/content/LcContentEditDialog.vue').then(m => m.default || m),
  LcContentDeleteDialog: () => import('~~/lib/templates/components/edit/content/LcContentDeleteDialog.vue').then(m => m.default || m),
  LcContentCreateNewButton: () => import('~~/lib/templates/components/edit/content/LcContentCreateNewButton.vue').then(m => m.default || m),
  LcContentCreate: () => import('~~/lib/templates/components/edit/content/LcContentCreate.vue').then(m => m.default || m),
  LcContentEditToolbar: () => import('~~/lib/templates/components/edit/content/toolbar/LcContentEditToolbar.vue').then(m => m.default || m),
  LcContentEditRenderer: () => import('~~/lib/templates/components/edit/content/renderer/LcContentEditRenderer.vue').then(m => m.default || m),
  LcContentEditLayoutRenderer: () => import('~~/lib/templates/components/edit/content/renderer/LcContentEditLayoutRenderer.js').then(m => m.default || m),
  LcDividerEdit: () => import('~~/lib/templates/components/edit/content/elements/LcDividerEdit.vue').then(m => m.default || m),
  LcLayoutEdit: () => import('~~/lib/templates/components/edit/content/elements/LcLayoutEdit.vue').then(m => m.default || m),
  LcListWidgetEdit: () => import('~~/lib/templates/components/edit/content/elements/LcListWidgetEdit.vue').then(m => m.default || m),
  LcTextMixedEdit: () => import('~~/lib/templates/components/edit/content/elements/LcTextMixedEdit.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
