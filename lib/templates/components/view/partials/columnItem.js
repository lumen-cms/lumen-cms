export default {
  name: 'column-item',
  props: {
    countOfColumns: Number,
    isEditMode: Boolean
  },
  render (createElement) {
    const children = this.$slots.default
    const props = this.$props
    const countOfColumns = props.countOfColumns

    return createElement('v-flex', {
      'class': {
        md6: countOfColumns === 2,
        md4: countOfColumns === 3,
        md3: countOfColumns === 4,
        'd-flex': !props.isEditMode
      },
      attrs: {
        'xs12': true
      }
    }, children)
  }
}
