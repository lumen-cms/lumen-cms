import Vue from 'vue'

const components = {
  LcEditToolbar: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcEditToolbar.vue'),
  LcEditFooter: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcEditFooter.vue'),
  LcArticleListDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcArticleListDialog.vue'),
  LcAuthorDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcAuthorDialog.vue'),
  LcMediaLibrary: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcMediaLibrary.vue'),
  // form
  LcFormContainer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcFormContainer.vue'),
  LcFormDialogContainer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcFormDialogContainer.vue'),
  LcTriggerSaveBtn: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcTriggerSaveBtn.vue'),
  LcUploadSelectContainer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcUploadSelectContainer.vue'),
  LcUploadContainer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcUploadContainer.vue'),
  LcConfirmBtn: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcConfirmBtn.vue'),
  LcPageHrefSelect: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcPageHrefSelect.vue'),
  LcMenuBuilder: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcMenuBuilder.vue'),
  LcMenuBuilderItem: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/form/LcMenuBuilderItem.vue'),
  // media
  LcFileReferenceEdit: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcFileReferenceEdit.vue'),
  LcFileTagDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcFileTagDialog.vue'),
  LcFileUpdateDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcFileUpdateDialog.vue'),
  LcMediaLibraryItem: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcMediaLibraryItem.vue'),
  LcMediaLibraryPreviewItem: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcMediaLibraryPreviewItem.js'),
  LcUploadField: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/media/LcUploadField.vue'),
  // page template
  LcEditPageTemplateDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcEditPageTemplateDialog.vue'),
  // content edit
  LcAdminBar: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcAdminBar.vue'),
  LcContentEditMain: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentEditMain.vue'),
  LcContentImageDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentImageDialog.vue'),
  LcContentEditHelp: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentEditHelp.vue'),
  LcContentEditDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentEditDialog.vue'),
  LcContentDeleteDialog: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentDeleteDialog.vue'),
  LcContentCreateNewButton: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentCreateNewButton.vue'),
  LcContentCreate: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/LcContentCreate.vue'),
  LcContentEditToolbar: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/toolbar/LcContentEditToolbar.vue'),
  LcContentEditRenderer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/renderer/LcContentEditRenderer.js'),
  LcContentEditLayoutRenderer: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/renderer/LcContentEditLayoutRenderer.js'),
  LcMaterialIconPicker: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/LcMaterialIconPicker'),
  // content elements
  LcDividerEdit: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/elements/LcDividerEdit.vue'),
  LcLayoutEdit: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/elements/LcLayoutEdit.vue'),
  LcListWidgetEdit: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/elements/LcListWidgetEdit.vue'),
  LcTextMixedEdit: () => import(/* webpackChunkName: 'edit-chunk' */ '~cms/components/edit/content/elements/LcTextMixedEdit.vue'),
  // code mirror
  LcCodeMirror: () => import(/* webpackChunkName: 'codemirror-chunk' */ '~cms/components/edit/form/LcCodeMirror.vue'),
  // quill
  LcHtmlField: () => import(/* webpackChunkName: 'quill-chunk' */ '~cms/components/edit/form/LcHtmlField.vue')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'edit-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
