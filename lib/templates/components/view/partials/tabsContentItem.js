export default {
  name: 'tabs-content-item',
  functional: true,
  render (createElement, {props, children}) {
    const identifier = props.identifier
    return createElement('v-tab-item', {props: {id: identifier}}, [
      createElement('v-card', {props: {flat: true}}, [
        createElement('v-card-text', {}, children)
      ])
    ])
  }
}
