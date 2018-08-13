export default {
  name: 'div-wrap',
  render (h) {
    const children = this.$slots.default
    return h('div', {}, children)
  }
}
