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
        'default': () => ['html-field', 'page-select'] // add all custom form elements
      }
    },
    data () {
      return {
        modified: {},
        initial: {}
      }
    },
    watch: {
      '$store.state.lc.triggerSave' () {
        this.submitForm()
      },
      modified (v) {
        this.$emit('onFormDirty', !!Object.keys(v).length)
      }
    },
    mounted () {
      // IMPORTANT: set name or fieldName attribute on all form input fields
      this.getAllInputs().forEach((child) => {
        const name = (child.$attrs && child.$attrs.name) || child.fieldName
        this.appendRules(child)
        const watcher = child.$props.hasOwnProperty('inputValue') ? 'inputValue' : 'value'
        this.$nextTick(() => {
          child.$watch(watcher, (v, oldV) => {
            this.changeDetection(name, v, oldV)
          })
        })
      })
    },
    beforeDestroy () {
      this.resetForm()
    },
    methods: {
      getCustomInputs () {
        let items = []
        this.$refs.form && this.$refs.form.$children.forEach(child => {
          if (this.customElements.includes(child.$options._componentTag)) {
            // check if child of custom element is vuetify form element and take this
            const temp = child.$children.filter(c => {
              return typeof c.errorBucket !== 'undefined'
            })
            if (temp && temp.length) {
              items = items.concat(temp)
            } else {
              items.push(child)
            }
          }
        })
        return items
      },
      getAllInputs () {
        if (!this.$refs.form) return []
        const allVuetifyInput = this.$refs.form.getInputs()
        const customElements = this.getCustomInputs()
        return (allVuetifyInput && allVuetifyInput.concat(customElements)) || []
      },
      validate () {
        const form = this.$refs.form
        const valid = form.validate()

        const errors = this.getCustomInputs().reduce((errors, child) => {
          const error = typeof child.errorBucket !== 'undefined' && !child.validate(true)
          return errors || error
        }, false)
        return !(!valid || errors)
      },
      resetDetection () {
        this.modified = {}
        this.initial = {}
      },

      /**
       *
       * public function to reset all form input fields
       */
      resetForm () {
        this.$refs.form.reset()
        this.resetDetection()
      },
      /**
       * appends all rules to the form input elements
       *
       * @param element
       *
       */
      appendRules (element) {
        const props = element.$props
        const oldRules = props.rules
        const rules = []
        const onRequiredRule = (v) => (Array.isArray(v) ? !!v.length : !!v) || 'This field is required'
        const onEmailRule = (v) => !v || /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/i.test(v) || 'Email must be valid'

        if (props.required) {
          rules.push(onRequiredRule)
        }
        if (props.type === 'email') {
          rules.push(onEmailRule)
        }
        if (rules.length && oldRules && oldRules.constructor === Array) {
          for (const rule of rules) {
            element.$props.rules.push(rule)
          }
        }
      },
      /**
       *
       * @param name
       * @param changedValue
       * @param oldValue
       */
      changeDetection (name, changedValue, oldValue) {
        if (!changedValue && changedValue !== '') return

        if (!this.initial.hasOwnProperty(name)) {
          if (oldValue === undefined) {
            if (changedValue.constructor === Boolean) {
              oldValue = false
            } else if (changedValue.constructor === String) {
              oldValue = ''
            } else if (changedValue.constructor === Array) {
              oldValue = []
            }
          }
          this.$set(this.initial, name, oldValue)
          this.$set(this.modified, name, changedValue)
        } else {
          this.$set(this.modified, name, changedValue)
          if (this.modified[name] === this.initial[name]) {
            this.$delete(this.modified, name)
          }
        }
      },
      /**
       * emit form if valid
       */
      submitForm () {
        const customValid = this.validate()
        if (customValid) {
          // don't forget to call resetForm after mutation on component side like => this.$refs.form.resetForm()
          const modified = Object.assign({}, this.modified)
          this.$emit('onSubmit', modified)
        }
      }
    }
  }
</script>
