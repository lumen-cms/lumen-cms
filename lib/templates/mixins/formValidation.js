export default {
  methods: {
    onRequiredRule (v) {
      let isValid = true
      if (v && Array.isArray(v)) {
        isValid = !!v.length
      } else {
        isValid = !!v
      }
      return isValid || this.$t('validations.required')
    },
    onEmailRule (v) {
      return !v || /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/i.test(v) || this.$t('validations.email')
    },
    onPhoneRule (v) {
      return !v || /^[-+]?[0-9]+$/.test(v) || this.$t('validations.phone')
    },
    onEqualsTo (val) {
      return this.equalsTo === val || this.$t('validations.non_equal')
    },
    onMaxRule (v) {
      return !v || (Array.isArray(v) && v.length <= Number(this.max)) || this.$t('validations.max', {max: this.max})
    },
    onMinRule (v) {
      return !v || (Array.isArray(v) && v.length >= Number(this.min)) || this.$t('validations.min', {min: this.min})
    }
  }
}
