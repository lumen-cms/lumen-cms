import Middleware from '../middleware'
import setPageTemplates from '~cms/util/setPageTemplates'

Middleware.getPageTemplates = async function ({ store, isHMR }) {
  if (isHMR) return
  await setPageTemplates(store)
}
