export default {
  name: 'expansion-panel-item',
  functional: true,
  render (createElement, {props, children}) {
    const header = props.header
    const elements = [
      createElement('div', {slot: 'header'}, header),
      createElement('v-card', {}, [
        createElement('v-card-text', {class: 'grey lighten-3'}, children)
      ])
    ]
    return createElement('v-expansion-panel-content', {}, elements)
  }
}
