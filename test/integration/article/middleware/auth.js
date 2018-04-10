export default function ({store, redirect}) {
  console.log('this is auth only', process.client, store.getters.canEdit)
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
}
