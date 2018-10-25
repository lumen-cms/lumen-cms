export default {
  name: 'LcDescription',
  props: {
    languageKey: String,
    content: Object
  },
  render (h) {
    const { styles, description, properties } = this.content
    const isParallaxOrJumbo = ['Parallax', 'Jumbotron'].includes(properties && properties.layoutPanel)
    const contentClassNames = styles.contentClassNames || []
    const classNames = isParallaxOrJumbo ? contentClassNames.concat(styles.rootClassNames) : contentClassNames

    return h('lc-html-renderer', {
      props: {
        classNames: classNames && classNames.join(' '),
        content: description,
        languageKey: this.languageKey
      }
    })
  }
}
