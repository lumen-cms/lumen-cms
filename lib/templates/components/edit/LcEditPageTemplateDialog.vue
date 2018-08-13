<template>
  <div> <!-- important div wrapper because form-dialog-container has v-if -->
    <lc-form-dialog-container v-model="showDialog"
                              @onSubmit="onSubmit"
                              @onDelete="onDelete"
                              v-if="showDialog"
                              :show-delete="!!model.id"
                              text="SAVE"
                              ref="dialogContainer">
      <v-text-field name="title"
                    label="Title"
                    v-model="model.title"
                    validate-on-blur
                    :rules="[onRequiredRule]"
                    :required="true"/>
      <v-select name="key"
                :items="keyItems"
                label="Key"
                combobox
                :rules="[onRequiredRule]"
                v-model="model.key"
                required/>
      <div style="max-height: 500px;" v-if="model.type==='CODE'">
        <v-btn @click.stop="$refs.codeMirror.selectAll()" flat>Select All</v-btn>
        <v-btn @click.stop="$refs.codeMirror.autoFormatSelection()" flat>Format Selection</v-btn>
        <lc-code-mirror v-model="model.body" :mode="mode" ref="codeMirror"/>
      </div>
      <div style="max-height: 500px;" v-if="model.type==='JSON'">
        <v-alert color="error" :value="!isValidJson">
          JSON is not valid
        </v-alert>
        <lc-code-mirror :value="JSON.stringify(model.bodyJson, null, 2)"
                        mode="application/ld+json"
                        @input="onJsonChanged"
                        ref="codeMirrorJson"/>

      </div>
    </lc-form-dialog-container>
  </div>
</template>

<script>
  import createTemplateGql from '../../gql/pageTemplate/createPageTemplate.gql'
  import updateTemplateGql from '../../gql/pageTemplate/updatePageTemplate.gql'
  import deleteTemplateGql from '../../gql/pageTemplate/deletePageTemplate.gql'
  import {slugifyTemplateKey} from '../../util/slugifyHelpers'
  import validationRules from '../../mixins/formValidation'

  const model = {
    title: null,
    body: null,
    type: null,
    key: null,
    bodyJson: {}
  }
  export default {
    name: 'LcEditPageTemplateDialog',
    mixins: [validationRules],
    props: {
      value: Object,
      default: model
    },
    data () {
      return {
        showDialog: false,
        isValidJson: true,
        model: Object.assign({}, model)
      }
    },
    watch: {
      showDialog (v) {
        if (!v && this.$refs.dialogContainer) {
          this.$refs.dialogContainer.resetForm()
          this.model = model
          this.$emit('input', null)
        }
      },
      value (value) {
        this.model = Object.assign({}, model, value)
      },
      'model.body' () {
        this.$store.dispatch('setCanSave', true)
      }
    },
    computed: {
      mode () {
        return this.model.type === 'JSON' ? {name: 'javascript', json: true} : 'vue'
      },
      keyItems () {
        return Object.keys(this.$cms.TEMPLATE).map(e => ({
          value: slugifyTemplateKey(e, this.$store.state.lc.locale),
          text: e
        }))
      }
    },
    methods: {
      onJsonChanged (v) {
        try {
          this.model = Object.assign({}, this.model, {bodyJson: JSON.parse(v)})
          this.isValidJson = true
          this.$store.dispatch('setCanSave', true)
        } catch (e) {
          // throw new Error(e)
          this.isValidJson = false
          this.$store.dispatch('setCanSave', false)
        }
      },
      openDialog () {
        this.showDialog = !this.showDialog
      },
      submitTemplate (variables) {
        // call this outside of this template
        this.model = variables
        return this.onSubmit()
      },
      async onSubmit () {
        const model = Object.assign({}, this.model, {
          languageKey: this.$store.state.lc.locale.toUpperCase()
        })
        if (model.id) {
          await this.mutateGql({
            mutation: updateTemplateGql,
            variables: model,
            refetchQueries: ['allPageTemplates']
          }, 'updatePageTemplate')
        } else {
          await this.mutateGql({
            mutation: createTemplateGql, variables: model, refetchQueries: ['allPageTemplates']
          }, 'createPageTemplate')
        }
        this.$emit('refetchTemplates', true)
      },
      async onDelete () {
        await this.mutateGql({
          mutation: deleteTemplateGql,
          variables: {id: this.model.id},
          refetchQueries: ['allPageTemplates']
        }, 'deletePagetemplate')
        this.$emit('refetchTemplates', true)
        this.$emit('input', null)
        this.openDialog()
      }
    }
  }
</script>
