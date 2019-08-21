<template>
  <div class="quill-wrap mt-1">
    <div class="subheading" v-text="label" v-if="label"/>
    <v-dialog persistent
              :position-absolutely="true"
              v-model="showPageUrlSelect"
              max-width="600">
      <v-card v-show="showPageUrlSelect">
        <v-card-text v-if="showPageUrlSelect">
          <div class="body-2">Selected Link:</div>
          <lc-page-href-select :value="href" @updated="onHrefSelect"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn flat="flat" @click.native="onRemoveLink">Remove</v-btn>
          <v-btn flat="flat" @click.native="showPageUrlSelect = false">Cancel</v-btn>
          <v-btn class="green--text darken-1" flat="flat"
                 @click.native.prevent.stop="onSetSelection">OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar id="toolbar" slot="toolbar" dense>
      <v-tooltip top>
        <v-menu slot="activator" bottom right>
          <v-btn icon slot="activator" tabindex="-1">
            <v-icon :class="{'info--text':format.header}">text_format</v-icon>
          </v-btn>
          <v-list class="list-max-height">
            <v-list-tile v-for="item in headerItems" :key="item.value"
                         @click="onSetAction('header',item.value)">
              <v-list-tile-title :class="{'info--text':format.header === item.value}">{{ item.text }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <span>Header</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('bold',true)"
               :class="{'info--text':format.bold}"
               tabindex="-1">
          <v-icon>format_bold</v-icon>
        </v-btn>
        <span>bold</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('italic',true)"
               :class="{'info--text':format.italic}"
               tabindex="-1">
          <v-icon>format_italic</v-icon>
        </v-btn>
        <span>italic</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('underline',true)"
               :class="{'info--text':format.underline}"
               tabindex="-1">
          <v-icon>format_underline</v-icon>
        </v-btn>
        <span>underline</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('blockquote',true)"
               :class="{'info--text':format.blockquote}"
               tabindex="-1">
          <v-icon>format_quote</v-icon>
        </v-btn>
        <span>blockquote</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('list','ordered')" :class="{'info--text':format.list === 'ordered'}"
               tabindex="-1">
          <v-icon>format_list_numbered</v-icon>
        </v-btn>
        <span>ordered list</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn flat icon slot="activator"
               @click="onSetAction('list','bullet')" :class="{'info--text':format.list === 'bullet'}"
               tabindex="-1">
          <v-icon>format_list_bulleted</v-icon>
        </v-btn>
        <span>bullet list</span>
      </v-tooltip>

      <v-tooltip top>
        <v-menu slot="activator"
                bottom right>
          <v-btn icon slot="activator"
                 tabindex="-1">
            <v-icon :class="{'info--text':format.size}">stay_current_landscape</v-icon>
          </v-btn>
          <v-list class="list-max-height">
            <v-list-tile v-for="item in buttonItems" :key="item.value" @click="onSetAction('size',item.value)">
              <v-list-tile-title :class="{'info--text':format.size === item.value}">{{ item.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <span>Button type</span>
      </v-tooltip>

      <v-tooltip top>
        <v-menu slot="activator"
                bottom
                left
                :max-width="300"
                :min-wdth="300"
                width="300"
                lazy
                v-model="showIconSelect"
                :close-on-content-click="false">
          <v-btn icon
                 tabindex="-1"
                 @click="beforeMaterialIconSelection()"
                 slot="activator">
            <v-icon :class="{'info--text':format.icon}">photo_size_select_large</v-icon>
          </v-btn>
          <v-card>
            <v-card-text>
              <lc-material-icon-picker v-model="materialIcon.icon"/>
              <v-select label="size" :items="iconItems" v-model="materialIcon.size"/>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn flat color="primary"
                     :disabled="!(materialIcon.icon && materialIcon.size)"
                     @click="onInsertMaterialIcon">select
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <span>Insert Icon</span>
      </v-tooltip>

      <v-tooltip top>
        <v-menu slot="activator" bottom left>
          <v-btn icon
                 tabindex="-1"
                 slot="activator">
            <v-icon :class="{'info--text':format.align}">format_align_center</v-icon>
          </v-btn>
          <v-list class="list-max-height">
            <v-list-tile v-for="item in alignItems" :key="item.value" @click="onSetAction('align',item.value)">
              <v-list-tile-title>
                <v-icon :class="{'info--text':format.icon === item.value}">{{ item.text }}</v-icon>
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <span>Align items</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn slot="activator"
               flat icon
               @click="onSetLink"
               tabindex="-1"
               :class="{'info--text':!!format.link}">
          <v-icon>link</v-icon>
        </v-btn>
        <span>Link</span>
      </v-tooltip>

      <v-tooltip top>
        <v-btn slot="activator"
               flat icon
               tabindex="-1"
               @click="onCleanSelection">
          <v-icon>format_clear</v-icon>
        </v-btn>
        <span>Clean Selection</span>
      </v-tooltip>
    </v-toolbar>

    <div class="quill-ql-editor elevation-1"
         @keydown.stop="() => {}"
         ref="editor"/>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce'

  let Quill, Parchment
  if (process.browser) {
    Quill = require('quill/dist/quill.min.js')
    const Link = Quill.import('formats/link')
    Parchment = Quill.import('parchment')

    const SizeClass = new Parchment.Attributor.Class('size', 'ql-size', {
      scope: Parchment.Scope.INLINE,
      // important, don't use - for classnames (normal-button won't work)
      whitelist: [
        'normal_button',
        'large_button',
        'normal_button_primary',
        'large_button_primary',
        'normal_button_secondary',
        'large_button_secondary',
        'normal_button_success',
        'large_button_success',
        'normal_button_info',
        'large_button_info',
        'normal_button_warning',
        'large_button_warning',
        'normal_button_error',
        'large_button_error'
      ]
    })
    const IconClass = new Parchment.Attributor.Class('icon', 'ql-icon', {
      scope: Parchment.Scope.INLINE,
      whitelist: ['standard', 'medium', 'large', 'x_large', 'x_x_large', 'x_x_x_large']
    })

    class MyLink extends Link {
      static create (args) {
        let value, linkid, type
        if (args && typeof args === 'object') {
          value = args.value
          linkid = args.linkid
          type = args.type
        } else {
          value = args
        }
        const node = super.create(value)
        if (!value.startsWith('http')) node.removeAttribute('target')
        if (linkid) node.setAttribute('data-link-id', linkid)
        if (type) node.setAttribute('data-link-type', type)
        return node
      }

      static formats (domNode) {
        return {
          value: domNode.getAttribute('href'),
          linkid: domNode.getAttribute('data-link-id'),
          type: domNode.getAttribute('data-link-type')
        }
      }

      format (name, args) {
        let value, linkid, type
        if (args && typeof args === 'object') {
          value = args.value
          linkid = args.linkid
          type = args.type
        } else {
          value = args
        }
        if (name !== this.statics.blotName || !value) {
          return super.format(name, value)
        }
        value = this.constructor.sanitize(value)
        if (!value.startsWith('http')) this.domNode.removeAttribute('target')
        this.domNode.setAttribute('href', value)
        if (linkid) this.domNode.setAttribute('data-link-id', linkid)
        else if (this.domNode.getAttribute('data-link-id')) {
          this.domNode.removeAttribute('data-link-id')
        }

        if (type) this.domNode.setAttribute('data-link-type', type)
        else if (this.domNode.getAttribute('data-link-type')) {
          this.domNode.removeAttribute('data-link-type')
        }
      }
    }

    Quill.debug(false)
    Quill.register(MyLink)
    Quill.register(SizeClass, true)
    Quill.register(IconClass, true)
  }

  export default {
    name: 'LcHtmlField',
    props: {
      label: {
        type: String
      },
      fieldName: {
        type: String,
        required: true
      },
      value: {
        type: String | null,
        default: null
      },
      materialIconSelect: {
        type: Boolean
      }
    },
    data () {
      return {
        quill: null,
        // selectedLinkText: {},
        format: {
          bold: false,
          italic: false,
          underline: false,
          list: false,
          align: false,
          blockquote: false,
          size: false,
          icon: false,
          header: false
        },
        range: {},
        content: null,
        showPageUrlSelect: false,
        href: {
          linkSlug: null,
          linkType: null,
          linkOpenExternal: false,
          linkId: null
        },
        materialIcon: {
          icon: null,
          size: null
        },
        showIconSelect: false,
        model: this.value
      }
    },
    mounted () {
      this.initialize()
    },
    beforeDestroy () {
      this.quill && this.quill.off('text-change', this.onTextChange)
      this.quill && this.quill.off('selection-change', this.onTextChange)
      this.quill = null
    },
    computed: {
      alignItems () {
        return [
          {value: 'left', text: 'format_align_left'},
          {value: 'center', text: 'format_align_center'},
          {value: 'right', text: 'format_align_right'},
          {value: 'justify', text: 'format_align_justify'}
        ]
      },
      iconItems () {
        return [
          {value: 'standard', text: 'Standard'},
          {value: 'medium', text: 'Medium'},
          {value: 'large', text: 'Large'},
          {value: 'x_large', text: 'X-Large'},
          {value: 'x_x_large', text: 'X-X-Large'},
          {value: 'x_x_x_large', text: 'X-X-X-Large'},
          {value: false, text: 'None'}
        ]
      },
      headerItems () {
        return [
          {value: 1, text: 'Header 1'},
          {value: 2, text: 'Header 2'},
          {value: 3, text: 'Header 3'},
          {value: 4, text: 'Header 4'},
          {value: 5, text: 'Header 5'},
          {value: 6, text: 'Header 6'},
          {value: false, text: 'Paragraph'}
        ]
      },
      buttonItems () {
        return [
          {value: 'normal_button', text: 'Normal Button'},
          {value: 'large_button', text: 'Large Button'},
          {value: 'normal_button_primary', text: 'Primary Button'},
          {value: 'large_button_primary', text: 'Large Primary'},
          {value: 'normal_button_success', text: 'Button Success'},
          {value: 'large_button_success', text: 'Large Success'},
          {value: 'normal_button_info', text: 'Button Info'},
          {value: 'large_button_info', text: 'Large Info'},
          {value: 'normal_button_warning', text: 'Button Warning'},
          {value: 'large_button_warning', text: 'Large Warning'},
          {value: 'normal_button_error', text: 'Button Error'},
          {value: 'large_button_error', text: 'Large Error'},
          {value: 'normal_button_secondary', text: 'Button Secondary'},
          {value: 'large_button_secondary', text: 'Large Secondary'},
          {value: false, text: 'None'}
        ]
      }
    },
    methods: {
      beforeMaterialIconSelection () {
        const quill = this.quill
        const selection = quill.getSelection()
        this.range = {
          index: selection.index,
          length: selection.length
        }
      },
      onHrefSelect (v) {
        this.href = {
          linkSlug: v.value,
          linkType: v.type,
          linkId: v.id
        }
      },
      onSetSelection () {
        this.showPageUrlSelect = false
        setTimeout(() => {
          if (!this.quill.hasFocus()) {
            this.quill.focus()
          }
          const hrefSelection = this.href
          const slug = hrefSelection.linkSlug && hrefSelection.linkSlug.trim()
          // this.quill.setSelection(this.selectedLinkText.index, this.selectedLinkText.length)
          this.quill.format(
            'link',
            slug
              ? {
                value: slug,
                linkid: hrefSelection.linkId,
                type: hrefSelection.linkType
              }
              : false
          )
        }, 500)
      },
      onRemoveLink () {
        this.href = {}
        this.quill.format('link', false)
      },
      /**
       *
       */
      onCleanSelection () {
        const range = this.quill.getSelection()
        if (range === null) return
        if (range.length === 0) {
          const formats = this.quill.getFormat()
          Object.keys(formats).forEach(name => {
            // Clean functionality in existing apps only clean inline formats
            if (Parchment.query(name, Parchment.Scope.INLINE) != null) {
              this.quill.format(name, false)
            }
          })
        } else {
          this.quill.removeFormat(range, Quill.sources.USER)
        }
      },
      /**
       *
       */
      onSetLink () {
        const format = this.quill.getFormat()
        // this.selectedLinkText = this.quill.getSelection()
        const link = (format && format.link) || {}
        this.href = {
          linkSlug: link.value,
          linkType: link.type,
          linkId: link.linkid
        }
        this.showPageUrlSelect = true
      },
      /**
       *
       * @param format
       * @param value
       */
      onSetAction (format, value) {
        const quill = this.quill
        if (this.format[format] && this.format[format] === value) {
          quill.format(format, false, Quill.sources.USER)
          this.format = Object.assign({}, this.format, {[format]: false})
        } else {
          quill.format(format, value, Quill.sources.USER)
          this.format = Object.assign({}, this.format, {[format]: value})
        }
      },
      onInsertMaterialIcon () {
        const quill = this.quill
        const currentIcon = this.materialIcon
        quill.insertText(this.range.index, currentIcon.icon, {
          'icon': currentIcon.size
        })
        this.materialIcon = {}
        this.showIconSelect = false
      },
      /**
       *
       */
      initialize () {
        const options = {
          modules: {
            toolbar: {
              container: '#toolbar'
            },
            clipboard: {
              matchVisual: false
            },
            history: {
              delay: 1000,
              maxStack: 500,
              userOnly: true
            }
          },
          placeholder: 'Enter html'
        }
        this.quill = new Quill(this.$refs.editor, options)
        // set editor content
        if (this.value) {
          this.quill.clipboard.dangerouslyPasteHTML(this.value)
          this.setHtml()
        }
        // update model if text changes
        this.quill.on('text-change', this.onTextChange)
        this.quill.on('selection-change', this.onSelectionChange)
      },
      setHtml () {
        let html = this.$refs.editor.children[0].innerHTML
        if (html === '<p><br></p>') html = ''
        this.content = html
      },
      /**
       *
       */
      onTextChange: debounce(function () {
        // delta, oldDelta, source
        this.setHtml()
        this.$emit('input', this.content)
      }, 500),

      /**
       *
       * @param range
       * @param oldRange
       * @param source
       */
      onSelectionChange: debounce(function (range, oldRange, source) {
        if (range) {
          this.format = this.quill.getFormat(range.index, range.length)
          this.range = {
            index: range.index,
            length: range.length
          }
        }
      }, 150)
    },
    watch: {
      showPageUrlSelect (val) {
        this.$store.commit('SET_CONTENT_LINK_DIALOG_ACTIVE', val)
      },
      value (v) {
        if (v && this.quill && this.content === null) {
          this.quill.clipboard.dangerouslyPasteHTML(v)
          this.setHtml()
        }
      }
    }
  }
</script>

<style>
  .quill-ql-editor {
    display: block;
  }

  .ql-clipboard {
    display: none;
  }

  .ql-editor {
    padding: 16px;
    min-height: 100px;
    width: 100%;
    overflow-y: auto;
    /*font-family: inherit;*/
    line-height: inherit;
    /*font-size: inherit;*/
    /*white-space: pre-wrap;*/
    user-select: text;
    display: inline-block;
    pointer-events: auto;
  }

  .ql-editor:focus {
    outline: none;
  }

  .list-max-height {
    max-height: 250px;
    overflow-y: auto;
  }
</style>
