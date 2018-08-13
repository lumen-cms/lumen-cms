import VTextField from 'vuetify/es5/components/VTextField/VTextField'
import validationMixin from '../../../mixins/formValidation'

export default {
  name: 'LcTextField',
  extends: VTextField,
  mixins: [validationMixin],
  mounted () {
    this.addValidation()
    this.addRequiredAsterix() // removed automatic in 1.1
  },
  props: {
    required: Boolean,
    enableEqualsTo: Boolean,
    equalsTo: String
  },
  computed: {
    // keep in sync with original VTextField
    internalValue: {
      get: function get () {
        return this.type === 'number' ? Number(this.lazyValue) : this.lazyValue
      },
      set: function set (val) {
        if (this.type === 'number') {
          val = Number(val)
        }
        if (this.mask) {
          this.lazyValue = this.unmaskText(this.maskText(this.unmaskText(val)))
          this.setSelectionRange()
        } else {
          this.lazyValue = val
          this.$emit('input', this.lazyValue)
        }
      }
    }
  },
  methods: {
    addRequiredAsterix () {
      if (this.required) {
        this.$el.classList.add('admin-required')
      }
    },
    addValidation () {
      if (this.required) {
        this.$props.rules.push(this.onRequiredRule)
      }
      if (this.type === 'email') {
        this.$props.rules.push(this.onEmailRule)
      }
      if (this.type === 'tel') {
        this.$props.rules.push(this.onPhoneRule)
      }
      if (this.enableEqualsTo) {
        this.$props.rules.push(this.onEqualsTo)
      }
    }
  }
}
