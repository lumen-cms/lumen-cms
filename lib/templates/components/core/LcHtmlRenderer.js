import prepareHtml from '../../util/prepareHtmlContent'
import linkHelpers from '../../util/linkHelpers'
// import CONFIG from '../../src/config' // todo
// import internalLinkTransform from '../../src/internalLinkTransform' // todo
const {isExternal, hasATag} = linkHelpers

export default {
  name: 'LcHtmlRenderer',
  render: function (h) {
    const props = this.$props
    const content = props.content
    const classNames = 'rte-content' + (props.classNames ? ` ${props.classNames}` : '')
    const tmpl = {
      template: `<div class="${classNames}">${transformer(content, props.languageKey)}</div>`
    }
    return h(tmpl, {})
  },
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
  }
}

/**
 *
 * @param htmlString
 * @param languageKey
 * @returns {string|*}
 */
function transformer (htmlString, languageKey) {
  if (!htmlString) return ''
  let content = prepareHtml(htmlString)
  if (hasATag(content)) {
    const regex = new RegExp('<a.*?>(.*?)</a>', 'g')
    const matched = content.match(regex)
    matched && matched.forEach(tag => {
      let tempLink = tag.replace('<a', '<nuxt-link').replace('a>', 'nuxt-link>')
      if (tag.indexOf('mailto:') !== -1) {
        return
      }
      // todo not in use any longer?
      // CONFIG.DOMAINS.forEach(domain => {
      //   tempLink = tempLink
      //     .replace('href="http://' + domain + '/', 'to="/')
      //     .replace('href=\'http://' + domain + '/', 'to="/')
      //
      //     .replace('href="http://www.' + domain + '/', 'to="/')
      //     .replace('href=\'http://www.' + domain + '/', 'to="/')
      // })

      if (isExternal(tempLink)) {
        return
      } // quit if external link

      // todo is not in use any longer?
      // if (tempLink.includes('data-link-type="article"')) {
      //   tempLink = tempLink.replace('href="/', languageKey === 'DE' ? 'to="/blog/' : 'to="/articles/')
      // }

      // todo
      // tempLink = internalLinkTransform(tempLink, languageKey)

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
    const tmpStyle = allowedStyleAttrs(style)
    const str = tmpStyle.length ? `style="${tmpStyle.join(';')}"` : ''

    content = content.replace(style, str)
  })

  return content
}

/**
 *
 * @param style
 */
function allowedStyleAttrs (style) {
  if (!style) return
  style = style.replace('style="', '').replace('"', '')
  let splitted = style.split(';')
  splitted = splitted.filter(e => e)
  return splitted
    .filter(e => e.indexOf('font-weight') !== -1 || e.indexOf('fonts-size') !== -1)
    .map(e => e.trim())
}
