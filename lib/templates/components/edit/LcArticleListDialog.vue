<template>
  <v-dialog v-model="showDialog" scrollable>
    <v-card>
      <v-card-title>
        <v-layout row align-center align-content-center>
          <v-text-field v-model="inputField"
                        clearable
                        :label="selected ? 'Update' : 'Add new Category'"/>
          <v-btn icon @click="onSave" :disabled="!inputField" :loading="$store.state.lc.updating">
            <v-icon>save</v-icon>
          </v-btn>
        </v-layout>
      </v-card-title>
      <v-divider/>
      <v-card-text style="height: 300px;">
        <v-radio-group v-model="selected" column>
          <v-radio :label="item.title" :value="item.id" v-for="item in content" :key="item.id"/>
        </v-radio-group>
      </v-card-text>
      <v-card-actions>
        <lc-confirm-btn v-if="!!selected"
                        label="Delete"
                        btn-class="red--text"
                        @onConfirm="onDelete"/>
        <v-spacer/>
        <v-btn icon @click="selected=null" v-if="!!selected">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  import deleteGql from '../../gql/articleCategory/deleteArticleCategory.gql';
  import createGql from '../../gql/articleCategory/createArticleCategory.gql';
  import updateGql from '../../gql/articleCategory/updateArticleCategory.gql';
  import slugify from 'slugify';

  export default {
    name: 'LcArticleListDialog',
    props: {
      content: Array
    },
    data () {
      return {
        showDialog: false,
        selected: null,
        inputField: null
      };
    },
    watch: {
      selected (v) {
        this.inputField = v ? this.content.find(e => e.id === v).title : null;
      },
      showDialog (v) {
        if (!v) {
          this.selected = null;
        }
      }
    },
    methods: {
      async onDelete () {
        const selected = this.selected;
        await this.mutateGql(
          {
            mutation: deleteGql,
            variables: { id: selected },
            refetchQueries: ['allArticleCategories']
          },
          'deleteArticleCategory'
        );
      },
      async onSave () {
        let mutation = createGql;
        const variables = {
          title: this.inputField,
          languageKey: this.$store.state.lc.locale.toUpperCase(),
          slug: slugify(this.inputField, { lower: true })
        };
        if (this.selected) {
          variables.id = this.selected;
          mutation = updateGql;
        }
        await this.mutateGql(
          {
            mutation,
            variables,
            refetchQueries: ['allArticleCategories']
          },
          this.selected ? 'updateArticleCategory' : 'createArticleCategory'
        );
      },
      toggleShow () {
        this.showDialog = !this.showDialog;
      }
    }
  };
</script>
