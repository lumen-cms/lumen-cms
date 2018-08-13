<template>
  <v-dialog v-model="showDialog" scrollable>
    <v-card>
      <v-card-title>
        <div class="headline grey--text">{{ mutationType.toUpperCase() + ' AUTHOR' }}</div>
        <v-spacer/>
        <v-btn icon @click="showDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text style="height: 300px;">
        <v-text-field v-model="model.name"
                      type="text"
                      label="Name"
                      required
                      :rules="[onRequiredRule]"
                      name="name"/>
      </v-card-text>
      <v-card-actions>
        <lc-confirm-btn label="Delete"
                        btn-class="red--text"
                        v-if="mutationType === 'update'"
                        @onConfirm="onDelete"/>
        <v-spacer/>
        <v-btn @click="onSave"
               color="primary"
               :disabled="!model.name"
               :loading="$store.state.lc.updating">
          <v-icon>save</v-icon>
          &nbsp;SAVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import deleteGql from '../../gql/author/deleteAuthor.gql'
  import createGql from '../../gql/author/createAuthor.gql'
  import updateGql from '../../gql/author/updateAuthor.gql'
  import validationMixin from '../../mixins/formValidation'

  export default {
    name: 'LcAuthorDialog',
    mixins: [validationMixin],
    props: {
      author: {
        type: Object,
        default: () => {
        }
      }
    },
    data () {
      return {
        showDialog: false,
        inputField: null,
        model: {},
        mutationType: 'create'
      }
    },
    watch: {
      showDialog (v) {
        if (!v) {
          this.$set(this.model, {})
        } else {
          const hasAuthor = (this.author && this.author.id)
          this.mutationType = hasAuthor ? 'update' : 'create'
          hasAuthor && (this.model = Object.assign({}, this.author))
        }
      }
    },
    methods: {
      async onDelete () {
        if (!(this.model && this.model.id)) {
          console.error('Delete Author error, id not found', this.model)
        }
        await this.mutateGql({
          mutation: deleteGql,
          variables: {id: this.model.id},
          refetchQueries: ['allAuthors']
        })
        this.showDialog = false
      },
      async onSave () {
        const res = await this.mutateGql({
          mutation: this.mutationType === 'create' ? createGql : updateGql,
          refetchQueries: ['allAuthors'],
          variables: this.model
        })

        res && (res.updateAuthor || res.createAuthor) && this.$emit('authorInput')
        this.showDialog = false
      },
      toggleShow () {
        this.showDialog = !this.showDialog
      }
    }

  }
</script>
