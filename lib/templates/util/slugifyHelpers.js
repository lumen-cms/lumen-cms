import slugify from 'slugify'
import {endsWith} from './string'

/**
 *
 * @param string
 * @param locale
 * @returns {string | *}
 */
export function slugifyTemplateKey (string, locale) {
  if (!string || !locale) {
    throw Error('required param missing')
  }
  string = typeof string === 'string' ? string : string.value
  return slugify(endsWith(string, locale) ? string : string + ' ' + locale, {lower: true})
}
