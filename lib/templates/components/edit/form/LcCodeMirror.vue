<template>
  <textarea ref="textArea" :value="value"/>
</template>

<script>
  import 'codemirror/lib/codemirror.css'

  let CodeMirror
  if (typeof window !== 'undefined') {
    CodeMirror = require('codemirror')
    require('codemirror/mode/javascript/javascript')
    /* eslint-disable import/no-unassigned-import */
    require('codemirror/mode/vue/vue')
    /* eslint-disable import/no-unassigned-import */
    require('codemirror/mode/htmlmixed/htmlmixed')
    /* eslint-disable import/no-unassigned-import */
    require('codemirror/addon/edit/closetag')
    /* eslint-disable import/no-unassigned-import */
    require('codemirror/addon/edit/closebrackets')
    /* eslint-disable import/no-unassigned-import */
    require('codemirror/addon/fold/xml-fold')
    /* eslint-disable import/no-unassigned-import */
    require('../../../util/codeformatFormatting')
  }
  export default {
    name: 'LcCodeMirror',
    data () {
      return {
        cm: null
      }
    },
    mounted () {
      // set timeout to make sure the vuetify dialog (if inside) is done animating, style problems otherwise
      setTimeout(() => {
        this.cm = CodeMirror.fromTextArea(this.$refs.textArea, {
          mode: this.mode,
          theme: this.theme,
          tabMode: this.tabMode,
          lineWrapping: this.lineWrapping,
          lineNumbers: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          readOnly: this.readOnly
        })
        this.cm.setSize('100%', '400px')
        this.cm.on('change', this.emitModel)
      })
    },
    watch: {
      value (val, oldVal) {
        (!oldVal || oldVal === '') && this.cm.setValue(val)
      }
    },
    methods: {
      getSelectedRange () {
        return { from: this.cm.getCursor(true), to: this.cm.getCursor(false) }
      },
      autoFormatSelection () {
        const range = this.getSelectedRange()
        this.cm.autoFormatRange(range.from, range.to)
      },
      selectAll () {
        CodeMirror.commands['selectAll'](this.cm)
      },
      emitModel () {
        this.$emit('input', this.cm.getValue())
      }
    },
    beforeDestroy () {
      this.cm && this.cm.toTextArea() // todo steffen ist das hier correct? wirft immer nen fehler bei code change
      this.cm && this.cm.off('change', this.emitModel)
    },
    props: {
      value: {
        type: String,
        'default': ''
      },
      mode: {
        type: [String, Object],
        'default': ''
      },
      theme: {
        type: String,
        'default': 'default'
      },
      tabMode: {
        type: String,
        'default': 'indent'
      },
      lineWrapping: {
        type: Boolean,
        'default': true
      },
      readOnly: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>
