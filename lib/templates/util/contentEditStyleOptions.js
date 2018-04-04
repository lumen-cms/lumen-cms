const colors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green',
  'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey', 'white'
]

const backgroundColors = (() => {
  const items = []
  colors.forEach(color => {
    for (let v = 1; v <= 4; v++) {
      items.push(color)
      items.push(color + ' darken-' + v)
      items.push(color + ' accent-' + v)
      items.push(color + ' lighten-' + v)
    }
  })
  return items.concat(['primary', 'accent', 'secondary', 'info', 'warning', 'error', 'success', 'background-transparent'])
})()

const textColors = (() => {
  const items = []
  colors.forEach(color => {
    for (let v = 1; v <= 4; v++) {
      const itemColor = color + '--text'
      items.push(itemColor)
      items.push(itemColor + ' text--darken-' + v)
      items.push(itemColor + ' text--lighten-' + v)
      items.push(itemColor + ' text--accent-' + v)
    }
  })
  return items.concat(['primary--text', 'accent--text', 'secondary--text', 'info--text', 'warning--text', 'error--text', 'success--text'])
})()

const backgroundOpacities = [
  {value: 'opacity-15', text: '15% Opacity'},
  {value: 'opacity-20', text: '20% Opacity'},
  {value: 'opacity-30', text: '30% Opacity'},
  {value: 'opacity-40', text: '40% Opacity'},
  {value: 'opacity-50', text: '50% Opacity'},
  {value: 'opacity-60', text: '60% Opacity'},
  {value: 'opacity-75', text: '75% Opacity'}
]
const margins = (() => {
  const values = [{value: 'mt', text: 'Top'}, {value: 'mb', text: 'Bottom'}, {
    value: 'mr',
    text: 'Right'
  }, {value: 'ml', text: 'Left'}, {value: 'mx', text: 'X-Axis'}, {value: 'my', text: 'Y-Axis'}, {
    value: 'ma',
    text: 'All'
  }]
  const items = []
  for (let v = 0; v <= 5; v++) {
    values.forEach(e => items.push({value: e.value + '-' + v, text: 'Margins-' + e.text + ' - ' + v}))
  }
  return items
})()

const paddings = (() => {
  return margins.map(e => ({value: e.value.replace('m', 'p'), text: e.text.replace('Margins-', 'Padding-')}))
})()

const textAlignment = ['text-xs-left', 'text-xs-right', 'text-xs-center']

const elevations = (() => {
  const items = []
  for (let i = 0; i <= 24; i++) {
    items[i] = 'elevation-' + i
  }
  return items
})()

const dividerWidths = ['divider-width-30', 'divider-width-40', 'divider-width-50', 'divider-width-60', 'divider-width-70']

const fontSizes = ['display-xl', 'display-4', 'display-3', 'display-2', 'display-1', 'headline', 'title', 'subheading', 'body-2', 'body-1', 'caption']

const visibilityBreakpoints = ['hidden-xs-only', 'hidden-sm-and-down', 'hidden-sm-and-up', 'hidden-md-only', 'hidden-md-and-down', 'hidden-md-and-up', 'hidden-lg-only', 'hidden-lg-and-down', 'hidden-lg-and-up', 'hidden-xl-only']

const contentWidths = ['content-boxed', 'content-fluid', 'max-width-900', 'max-width-700', 'max-width-auto']

const multiImageGrid = [
  {value: 'grid-cards-no-gap', text: 'No Gap'},
  {value: 'grid-list-xs', text: 'Gap x-small'},
  {value: 'grid-list-sm', text: 'Gap small'},
  {value: 'grid-list-md', text: 'Gap medium'},
  {value: 'grid-list-lg', text: 'Gap large'},
  {value: 'grid-list-xl', text: 'Gap x-large'}
]
const multiImageOptions = [
  {value: 'grid-cards-style-flat', text: 'No Card design'},
  {value: 'grid-cards-style-card', text: 'Card design'},
  {value: 'grid-cards-centered', text: 'Cards centered'},
  {value: 'grid-cards-transparent', text: 'Background transparent'},
  {value: 'grid-cards-theme-light', text: 'Light'},
  {value: 'grid-cards-theme-dark', text: 'Dark'},
  {value: 'grid-cards-img-cover', text: 'Image cover'},
  {value: 'grid-cards-title-rounded', text: 'Title round background'}
]

const multiImageTitlePosition = [
  {value: 'grid-cards-title-centered', text: 'Title centered'},
  {value: 'grid-cards-title-bottom', text: 'Title bottom'}
]
const multiImageTitleStyle = [
  {value: 'grid-cards-title-styl-primary', text: 'Title Style Primary'},
  {value: 'grid-cards-title-styl-success', text: 'Title Style Success'},
  {value: 'grid-cards-title-styl-secondary', text: 'Title Style Secondary'},
  {value: 'grid-cards-title-styl-warning', text: 'Title Style Warning'},
  {value: 'grid-cards-title-styl-error', text: 'Title Style Error'},
  {value: 'grid-cards-title-styl-info', text: 'Title Style Info'}
]

export default {
  backgroundColors,
  textColors,
  backgroundOpacities,
  margins,
  paddings,
  textAlignment,
  elevations,
  dividerWidths,
  fontSizes,
  visibilityBreakpoints,
  contentWidths,
  multiImageGrid,
  multiImageOptions,
  multiImageTitlePosition,
  multiImageTitleStyle
}
