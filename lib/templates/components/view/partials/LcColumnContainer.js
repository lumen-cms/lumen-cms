import classNamesMixin from '../../../mixins/classNamesMixin'
import unshiftBgMixin from '../../../mixins/unshiftBgMixin'
// import _parallax from './LcParallax'
import _fixedBackground from './LcFixedBackgroundImage'

export default {
  name: 'LcColumnContainer',
  mixins: [unshiftBgMixin, classNamesMixin],
  props: {
    content: {
      type: Object
    },
    id: {
      type: String
    },
    arrayIndex: {
      type: Number
    },
    isContentElementVisible: {
      type: Boolean
    }
  },
  render (h) {
    const children = this.$slots.default
    const props = this.$props
    // const backgroundImages = props.content.fileReferences || []
    const content = props.content
    const backgroundImages = content.backgroundFileReferences || []
    const contentClassNames = content.styles.rootClassNames
    const properties = content.properties
    const containerAttrs = {
      fluid: true
    }
    const classNames = {
      'pa-0': true,
      'content-layout': true,
      [`data-id-${props.id}`]: true
    }
    this.classNameHandler(classNames, contentClassNames)
    const containerOpts = {
      attrs: containerAttrs,
      'class': classNames
    }
    const containerChilds = [
      h('v-layout', {
        attrs: {
          row: true,
          wrap: true,
          'align-center': properties.isParallax || properties.isFixedBackground
        }
      }, children)
    ]
    if (properties.isParallax || properties.isFixedBackground) {
      containerOpts.class['content-layout'] = false
      containerOpts.attrs['fill-height'] = true
      this.unshiftBgContainer(containerChilds, content.styles.backgroundClassNames)
      const container = [
        h('v-container', containerOpts, containerChilds)
      ]

      // todo need to enable parallax as soon its available again. currently not possible due to bug in vuetify
      return h(_fixedBackground, {
      // return h(properties.isFixedBackground ? _fixedBackground : _parallax, {
        props: {
          isFirstOfPage: props.arrayIndex === 0,
          isFixedBackground: !!properties.isFixedBackground,
          content: {
            fileReferences: backgroundImages
          },
          fileReference: backgroundImages && backgroundImages[0],
          parallaxHeight: properties.parallaxHeight,
          isContentElementVisible: this.isContentElementVisible
        }
      }, container)
    } else {
      this.unshiftBgContainer(containerChilds, content.styles.backgroundClassNames, {
        backgroundImages,
        isContentElementVisible: this.isContentElementVisible
      })
    }

    return h('v-container', containerOpts, containerChilds)
  }
}
