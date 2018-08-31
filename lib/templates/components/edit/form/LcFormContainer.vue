<template>
  <v-form ref="form">
    <slot/>
  </v-form>
</template>
<script>
  export default {
    name: 'LcFormContainer',
    props: {
      customElements: {
        type: Array,
        'default': () => ['html-field', 'page-select', 'lc-page-href-select'] // add all custom form elements
      }
    },
    watch: {
      '$store.state.lc.triggerSave' () {
        this.submitForm()
      }
    },
    methods: {
      resetForm () {
        this.$refs.form.reset()
      },
      reset () {
        this.$refs.form.reset()
      },
      validate () {
        return this.$refs.form.validate()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      submitForm () {
        const customValid = this.$refs.form.validate()
        if (customValid) {
          // don't forget to call resetForm after mutation on component side like => this.$refs.form.resetForm()
          // const modified = Object.assign({}, this.modified)
          this.$emit('onSubmit', true)
          this.$refs.form.reset()
        }
      }
    }
  }
</script>
