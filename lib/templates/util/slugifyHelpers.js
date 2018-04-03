import slugify from 'slugify'

export function slugifyTemplateKey (string, locale) {
  if (!string || !locale) {
    throw Error('required param missing')
  }
  return slugify(string + ' ' + locale, {lower: true})
}
