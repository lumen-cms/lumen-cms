import {classNameHandler} from '../helpers/layoutHeaderHelper'
import unshiftBgContainer from '../helpers/unshiftBgContainer'
import _parallax from './LcParallax'
import _fixedBackground from './LcFixedBackgroundParallax'

export default {
  name: 'column-container',
  props: {
    content: {
      type: Object
    },
    id: {
      type: String
    },
    arrayIndex: {
      type: Number
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
    classNameHandler(classNames, contentClassNames)
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
      unshiftBgContainer(h, containerChilds, content.styles.backgroundClassNames)
      const container = [
        h('v-container', containerOpts, containerChilds)
      ]

      return h(properties.isFixedBackground ? _fixedBackground : _parallax, {
        props: {
          isFirstOfPage: props.arrayIndex === 0,
          isFixedBackground: !!properties.isFixedBackground,
          content: {
            fileReferences: backgroundImages
          },
          fileReference: backgroundImages && backgroundImages[0],
          parallaxHeight: properties.parallaxHeight
        }
      }, container)
    } else {
      unshiftBgContainer(h, containerChilds, content.styles.backgroundClassNames, {backgroundImages})
    }

    return h('v-container', containerOpts, containerChilds)
  }
}
