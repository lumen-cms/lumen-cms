import prepareHtml from '../../util/prepareHtmlContent'
import linkHelperMixin from '../../mixins/linkHelperMixin'

export default {
  name: 'LcHtmlRenderer',
  mixins: [linkHelperMixin],
  props: {
    classNames: {
      type: String
    },
    content: {
      type: String,
      'default': ''
    },
    languageKey: {
      type: String,
      default: 'DE'
    }
  },
  methods: {
    /**
     *
     * @param style
     */
    allowedStyleAttrs (style) {
      if (!style) return
      style = style.replace('style="', '').replace('"', '')
      let splitted = style.split(';')
      splitted = splitted.filter(e => e)
      return splitted
        .filter(e => e.indexOf('font-weight') !== -1 || e.indexOf('fonts-size') !== -1)
        .map(e => e.trim())
    },

    /**
     *
     * @param htmlString
     * @param languageKey
     * @returns {string|*}
     */
    transformer (htmlString, languageKey) {
      if (!htmlString) return ''
      let content = prepareHtml(htmlString)
      if (this.hasATag(content)) {
        const regex = new RegExp('<a.*?>(.*?)</a>', 'g')
        const matched = content.match(regex)
        matched && matched.forEach(tag => {
          let tempLink = tag.replace('<a', '<nuxt-link').replace('a>', 'nuxt-link>')
          if (tag.indexOf('mailto:') !== -1) {
            return
          }
          if (this.isExternal(tempLink)) {
            return
          } // quit if external link
          if (tempLink.indexOf('href') !== -1) {
            tempLink = tempLink.replace('href="', 'to="/')
          }
          if (tempLink.indexOf('to=') === -1) {
            tempLink = ''
          }
          content = content.replace(tag, tempLink)
        })
      }
      const regexLink = new RegExp('<link.*?>(.*?)</link>', 'g')
      const matchedLink = content.match(regexLink)
      matchedLink && matchedLink.forEach(tag => {
        content = content.replace(tag, '') // this removes all TypoLinks
      })

      const regexStyle = new RegExp('style=\\"[^\\"]*\\"', 'g')
      const matchedStyle = content.match(regexStyle)
      matchedStyle && matchedStyle.forEach(style => {
        const tmpStyle = this.allowedStyleAttrs(style)
        const str = tmpStyle.length ? `style="${tmpStyle.join(';')}"` : ''

        content = content.replace(style, str)
      })

      return content
    }
  },
  render: function (h) {
    const props = this.$props
    const content = props.content
    const classNames = 'rte-content' + (props.classNames ? ` ${props.classNames}` : '')
    const tmpl = {
      template: `<div class="${classNames}">${this.transformer(content, props.languageKey)}</div>`
    }
    return h(tmpl, {})
  }
}
