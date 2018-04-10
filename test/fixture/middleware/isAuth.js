export default function ({store, redirect}) {
  console.log(store.getters.canEdit, process.client)
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
}
