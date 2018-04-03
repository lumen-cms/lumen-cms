export default {
  name: 'div-wrap',
  functional: true,
  render (createElement, {children}) {
    return createElement('div', children)
  }
}
