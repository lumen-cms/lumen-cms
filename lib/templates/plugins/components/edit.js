import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('~~/lib/templates/components/edit/LcEditToolbar.vue').then(m => m.default || m),
  LcEditFooter: () => import('~~/lib/templates/components/edit/LcEditFooter.vue').then(m => m.default || m),
  LcArticleListDialog: () => import('~~/lib/templates/components/edit/LcArticleListDialog.vue').then(m => m.default || m),
  LcAuthorDialog: () => import('~~/lib/templates/components/edit/LcAuthorDialog.vue').then(m => m.default || m),
  LcTriggerSaveBtn: () => import('~~/lib/templates/components/edit/LcTriggerSaveBtn.vue').then(m => m.default || m),
  LcUploadSelectContainer: () => import('~~/lib/templates/components/edit/LcUploadSelectContainer.vue').then(m => m.default || m),
  LcMediaLibrary: () => import('~~/lib/templates/components/edit/LcMediaLibrary.vue').then(m => m.default || m),
  LcUploadContainer: () => import('~~/lib/templates/components/edit/LcUploadContainer.vue').then(m => m.default || m),
  LcPageHrefSelect: () => import('~~/lib/templates/components/edit/LcPageHrefSelect.vue').then(m => m.default || m),
  LcConfirmBtn: () => import('~~/lib/templates/components/edit/LcConfirmBtn.vue').then(m => m.default || m),
  // media
  LcFileReferenceEdit: () => import('~~/lib/templates/components/edit/media/LcFileReferenceEdit.vue').then(m => m.default || m),
  LcFileTagDialog: () => import('~~/lib/templates/components/edit/media/LcFileTagDialog.vue').then(m => m.default || m),
  LcFileUpdateDialog: () => import('~~/lib/templates/components/edit/media/LcFileUpdateDialog.vue').then(m => m.default || m),
  LcMediaLibraryItem: () => import('~~/lib/templates/components/edit/media/LcMediaLibraryItem.vue').then(m => m.default || m),
  LcMediaLibraryPreviewItem: () => import('~~/lib/templates/components/edit/media/LcMediaLibraryPreviewItem.js').then(m => m.default || m),
  LcUploadField: () => import('~~/lib/templates/components/edit/media/LcUploadField.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
