import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('~cms/components/edit/LcEditToolbar.vue'),
  LcEditFooter: () => import('~cms/components/edit/LcEditFooter.vue'),
  LcArticleListDialog: () => import('~cms/components/edit/LcArticleListDialog.vue'),
  LcAuthorDialog: () => import('~cms/components/edit/LcAuthorDialog.vue'),
  LcMediaLibrary: () => import('~cms/components/edit/LcMediaLibrary.vue'),
  // form
  LcHtmlField: () => import(/* webpackChunkName: 'quill-chunk' */ '~cms/components/edit/form/LcHtmlField.vue'),
  LcFormContainer: () => import('~cms/components/edit/form/LcFormContainer.js'),
  LcFormDialogContainer: () => import('~cms/components/edit/form/LcFormDialogContainer.vue'),
  LcTriggerSaveBtn: () => import('~cms/components/edit/form/LcTriggerSaveBtn.vue'),
  LcUploadSelectContainer: () => import('~cms/components/edit/form/LcUploadSelectContainer.vue'),
  LcUploadContainer: () => import('~cms/components/edit/form/LcUploadContainer.vue'),
  LcConfirmBtn: () => import('~cms/components/edit/form/LcConfirmBtn.vue'),
  LcPageHrefSelect: () => import('~cms/components/edit/form/LcPageHrefSelect.vue'),
  // code mirror
  LcCodeMirror: () => import(/* webpackChunkName: 'codemirror-chunk' */ '~cms/components/edit/form/LcCodeMirror.vue'),
  // LcMenuBuilder: () => import('~cms/components/edit/form/LcMenuBuilder.vue'),
  // LcMenuBuilderItem: () => import('~cms/components/edit/form/LcMenuBuilderItem.vue'),
  // media
  LcFileReferenceEdit: () => import('~cms/components/edit/media/LcFileReferenceEdit.vue'),
  LcFileTagDialog: () => import('~cms/components/edit/media/LcFileTagDialog.vue'),
  LcFileUpdateDialog: () => import('~cms/components/edit/media/LcFileUpdateDialog.vue'),
  LcMediaLibraryItem: () => import('~cms/components/edit/media/LcMediaLibraryItem.vue'),
  LcMediaLibraryPreviewItem: () => import('~cms/components/edit/media/LcMediaLibraryPreviewItem.js'),
  LcUploadField: () => import('~cms/components/edit/media/LcUploadField.vue'),
  // page template
  LcEditPageTemplateDialog: () => import('~cms/components/edit/LcEditPageTemplateDialog.vue'),
  // content edit
  LcAdminBar: () => import('~cms/components/layout/LcAdminBar.vue'),
  LcContentEditMain: () => import('~cms/components/edit/content/LcContentEditMain.vue'),
  LcContentImageDialog: () => import('~cms/components/edit/content/LcContentImageDialog.vue'),
  LcContentEditHelp: () => import('~cms/components/edit/content/LcContentEditHelp.vue'),
  LcContentEditDialog: () => import('~cms/components/edit/content/LcContentEditDialog.vue'),
  LcContentDeleteDialog: () => import('~cms/components/edit/content/LcContentDeleteDialog.vue'),
  LcContentCreateNewButton: () => import('~cms/components/edit/content/LcContentCreateNewButton.vue'),
  LcContentCreate: () => import('~cms/components/edit/content/LcContentCreate.vue'),
  LcContentEditToolbar: () => import('~cms/components/edit/content/toolbar/LcContentEditToolbar.vue'),
  LcContentEditRenderer: () => import('~cms/components/edit/content/renderer/LcContentEditRenderer.js'),
  LcContentEditLayoutRenderer: () => import('~cms/components/edit/content/renderer/LcContentEditLayoutRenderer.js'),
  // content elements
  LcDividerEdit: () => import('~cms/components/edit/content/elements/LcDividerEdit.vue'),
  LcLayoutEdit: () => import('~cms/components/edit/content/elements/LcLayoutEdit.vue'),
  LcListWidgetEdit: () => import('~cms/components/edit/content/elements/LcListWidgetEdit.vue'),
  LcTextMixedEdit: () => import('~cms/components/edit/content/elements/LcTextMixedEdit.vue')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import('<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
