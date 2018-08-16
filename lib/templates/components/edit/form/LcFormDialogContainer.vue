<template>
  <v-dialog max-width="70%"
            :value="value"
            @input="onDialogChange"
            :fullscreen="fullscreen"
            persistent>
    <v-card>
      <v-card-title v-if="title" v-text="title"/>
      <v-card-text v-if="value">
        <lc-form-container @onSubmit="onSubmit"
                           ref="form">
          <slot/>
        </lc-form-container>
      </v-card-text>
      <v-card-actions>
        <lc-confirm-btn v-if="showDelete"
                        label="Delete"
                        btn-class="red--text"
                        @onConfirm="$emit('onDelete',true)"/>
        <v-spacer/>
        <v-btn class="blue--text darken-1" flat @click="$emit('input',false)">Close</v-btn>
        <lc-trigger-save-btn text="SAVE"/>
        <!--<v-btn class="blue&#45;&#45;text darken-1" flat @click="onSaveClicked" :loading="saving">Save</v-btn>-->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'LcFormDialogContainer',
    props: {
      value: Boolean,
      title: String,
      showDelete: Boolean,
      fullscreen: {
        type: Boolean,
        'default': false
      }
    },
    methods: {
      resetForm () {
        this.$refs.form.resetForm()
      },
      onDialogChange (v) {
        this.$emit('input', v)
      },
      onSaveClicked () {

      },
      onSubmit (variables) {
        this.$emit('onSubmit', variables)
      }
    }
  }
</script>
