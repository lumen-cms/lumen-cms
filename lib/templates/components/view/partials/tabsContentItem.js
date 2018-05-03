export default {
  name: 'tabs-content-item',
  functional: true,
  render (h, {props, children}) {
    const identifier = props.identifier
    return h('v-tab-item', {props: {id: identifier}}, [
      h('v-card', {props: {flat: true}}, [
        h('v-card-text', {}, children)
      ])
    ])
  }
}
