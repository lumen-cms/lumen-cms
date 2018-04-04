<template>
  <v-dialog :value="isShown"
            :lazy="true"
            max-width="660px"
            :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <v-card-title>Delete Content</v-card-title>
      <v-card-text>
        <v-card-title><h4 class="center--text">Are you sure?</h4></v-card-title>
        <v-card-actions>
          <v-btn flat="flat" @click.native="hideDialog">Cancel</v-btn>
          <v-spacer/>
          <v-btn class="red--text darken-1" flat @click.native="onDelete" :loading="loading">Yes, delete</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import deleteContentGql from '../../../gql/content/deleteContent.gql'
  import updateArticleGql from '../../../gql/article/updateArticleModif.gql'

  export default {
    name: 'LcContentDeleteDialog',
    props: {
      id: String | null,
      pageProps: Object
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      isShown () {
        return this.$store.getters.getDialogType === 'delete'
      }
    },
    methods: {
      hideDialog () {
        this.$store.dispatch('setContentEditDialogData', {})
      },
      async onDelete () {
        const dialogData = this.$store.getters.getDialogData
        const id = dialogData.id
        this.$store.commit('SET_CMS_LOADING', true)
        this.loading = true
        const mutationPromises = [
          this.mutateGql({
            mutation: deleteContentGql,
            variables: {id: id}
          }),
          this.mutateGql({
            mutation: updateArticleGql,
            variables: {id: this.pageProps.articleId, modified: new Date()}
          })
        ]
        await Promise.all(mutationPromises)
        this.loading = true
        this.$store.commit('SET_CMS_LOADING', false)
        this.hideDialog()
      }
    }
  }
</script>
