import styles from './contentEditStyleOptions'

export default {
  backgroundColor: {
    tag: 'v-select',
    region: 'background',
    modelName: 'backgroundColor',
    items: styles.backgroundColors,
    label: 'Background Color',
    multiple: false,
    autocomplete: true
  },
  textColor: {
    tag: 'v-select',
    region: 'root',
    modelName: 'textColor',
    items: styles.textColors,
    label: 'Text Color',
    autocomplete: true
  },
  backgroundOpacity: {
    tag: 'v-select',
    region: 'background',
    modelName: 'backgroundOpacity',
    items: styles.backgroundOpacities,
    label: 'Background Opacity'
  },
  margin: {
    tag: 'v-select',
    region: 'root',
    modelName: 'margin',
    items: styles.margins,
    label: 'Margin',
    multiple: true,
    autocomplete: true
  },
  padding: {
    tag: 'v-select',
    region: 'root',
    modelName: 'padding',
    items: styles.paddings,
    label: 'Padding',
    multiple: true,
    autocomplete: true
  },
  textAlignment: {
    tag: 'v-select',
    region: 'root',
    modelName: 'textAlignment',
    items: styles.textAlignment,
    label: 'Text Alignment'
  },
  elevations: {
    tag: 'v-select',
    region: 'root',
    modelName: 'elevation',
    items: styles.elevations,
    label: 'Elevation'
  },
  dividerWidth: {
    tag: 'v-select',
    region: 'root',
    modelName: 'dividerWidth',
    items: styles.dividerWidths,
    label: 'Divider Width'
  },
  fontSize: {
    tag: 'v-select',
    region: 'root',
    modelName: 'fontSize',
    items: styles.fontSizes,
    label: 'Font Size'
  },
  visibilityBreakpoint: {
    tag: 'v-select',
    region: 'root',
    modelName: 'visibilityBreakpoint',
    items: styles.visibilityBreakpoints,
    label: 'Visibility Breakpoint'
  },
  contentWidth: {
    tag: 'v-select',
    region: 'root',
    modelName: 'contentWidth',
    items: styles.contentWidths,
    label: 'Max-Width'
  },
  multiImageGrid: {
    tag: 'v-select',
    region: 'root',
    modelName: 'multiImageGrid',
    items: styles.multiImageGrid,
    label: 'Image Grid Gap'
  },
  multiImageOptions: {
    tag: 'v-select',
    region: 'root',
    modelName: 'multiImageOptions',
    items: styles.multiImageOptions,
    label: 'Image Options',
    multiple: true
  },
  multiImageTitleStyle: {
    tag: 'v-select',
    region: 'root',
    modelName: 'multiImageTitleStyle',
    items: styles.multiImageTitleStyle,
    label: 'Image Title Style'
  },
  multiImageTitlePosition: {
    tag: 'v-select',
    region: 'root',
    modelName: 'multiImageTitlePosition',
    items: styles.multiImageTitlePosition,
    label: 'Image Title Position'
  }
}
