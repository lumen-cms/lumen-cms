import {getImageSrc} from './imageSrcHelper'
import getCanonical from '~getCanonical'
import getMeta from '~getMeta'

/**
 *
 * @param article
 * @param languageKey
 * @param path
 * @param host
 * @param overwrites
 * @param disableCanonical
 * @returns {{htmlAttrs: {lang: *}, title: null|*, meta: *[]}}
 */
export default function ({article, languageKey, path, host, overwrites, disableCanonical, CONFIG}) {
  const title = (overwrites && overwrites.title) || article.metaTitle || article.title
  const description = (overwrites && overwrites.description) || article.description || article.teaser || CONFIG.Head.description[languageKey]
  const domain = typeof CONFIG.Head.domain === 'string' ? CONFIG.Head.domain : CONFIG.Head.domain[languageKey]

  let meta = getMeta({domain, host, path, languageKey})
  meta = meta.concat([
    // {hid: 'robots', name: 'robots', content: CONFIG.robotsRenderFunc({domain})}, // todo
    {hid: 'description', name: 'description', content: description},
    {hid: 'og:description', name: 'og:description', content: description},
    {hid: 'og:title', name: 'og:title', content: title},
    {hid: 'og:site_name', name: 'og:site_name', content: CONFIG.Head.site_name},
    {hid: 'og:locale', name: 'og:locale', content: languageKey},
    {hid: 'og:type', name: 'og:type', content: 'article'},
    {hid: 'og:url', name: 'og:url', content: domain + path},
    {
      hid: 'article:publisher',
      name: 'article:publisher',
      content: CONFIG.Head.publisher[languageKey]
    },
    {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
    {hid: 'twitter:title', name: 'twitter:title', content: title},
    {hid: 'twitter:site', name: 'twitter:site', content: CONFIG.Head.twitterSite},
    {hid: 'twitter:creator', name: 'twitter:creator', content: CONFIG.Head.twitterSite},
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: description
    }
  ])
  const images = CONFIG.Head.images.slice(0) || []
  const media = article.media && article.media.find(e => e.previewImage)
  const img = (media && media.previewImage && getImageSrc(media.previewImage))
  const image = img && img.src
  image && images.push(image)
  if (images.length) {
    const imagesTags = []
    images.forEach((item) => {
      imagesTags.push({name: 'og:image', content: item})
      imagesTags.push({name: 'twitter:image', content: item})
    })
    meta = meta.concat(imagesTags)
  }

  const metaOptions = {
    htmlAttrs: {
      lang: languageKey
    },
    title: title,
    meta: meta
  }

  if (!disableCanonical && !CONFIG.disableCanonical) {
    const defaultLanguage = CONFIG.defaultLanguage
    const canonical = getCanonical({defaultLanguage, path, domain})
    if (canonical && canonical.length) {
      metaOptions.link = canonical
    }
  }
  return metaOptions
}
