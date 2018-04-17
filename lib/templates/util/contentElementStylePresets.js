const alert = {
  header: ['secondary', 'py-3'],
  root: ['white--text'],
  content: ['pa-5']
}
const panel = {
  header: ['white--text', 'py-3'],
  content: ['pa-5']
}

export default [
  {
    value: `header-dark`,
    text: 'Header dark',
    styles: {
      headerClassNames: ['grey', 'darken-4', 'white--text', 'display-4'],
      rootClassNames: ['mb-0', 'pb-0'],
      contentClassNames: []
    }
  },
  {
    value: 'teaser',
    text: 'Teaser',
    styles: {
      rootClassNames: ['headline', 'mb-0', 'max-width-auto', 'pa-5', 'grey', 'lighten-4'],
      headerClassNames: [],
      contentClassNames: []
    }
  },
  {
    value: 'alert-primary',
    text: 'Alert Primary',
    styles: {
      headerClassNames: alert.header,
      contentClassNames: alert.content,
      rootClassNames: alert.root.concat(['primary'])
    }
  },
  {
    value: 'alert-success',
    text: 'Alert Success',
    styles: {
      headerClassNames: alert.header,
      contentClassNames: alert.content,
      rootClassNames: alert.root.concat(['success'])
    }
  },
  {
    value: 'alert-error',
    text: 'Alert Error',
    styles: {
      headerClassNames: alert.header,
      contentClassNames: alert.content,
      rootClassNames: alert.root.concat(['error'])
    }
  },
  {
    value: 'alert-info',
    text: 'Alert Info',
    styles: {
      headerClassNames: alert.header,
      contentClassNames: alert.content,
      rootClassNames: alert.root.concat(['info'])
    }
  },
  {
    value: 'alert-warning',
    text: 'Alert Warning',
    styles: {
      headerClassNames: alert.header,
      contentClassNames: alert.content,
      rootClassNames: alert.root.concat(['warning'])
    }
  },
  {
    value: 'panel-primary',
    text: 'Panel Primary',
    styles: {
      headerClassNames: panel.header.concat(['primary']),
      contentClassNames: panel.content,
      rootClassNames: []
    }
  },
  {
    value: 'panel-info',
    text: 'Panel Info',
    styles: {
      headerClassNames: panel.header.concat(['info']),
      contentClassNames: panel.content,
      rootClassNames: []
    }
  },
  {
    value: 'panel-success',
    text: 'Panel Success',
    styles: {
      headerClassNames: panel.header.concat(['success']),
      contentClassNames: panel.content,
      rootClassNames: []
    }
  },
  {
    value: 'panel-error',
    text: 'Panel Error',
    styles: {
      headerClassNames: panel.header.concat(['error']),
      contentClassNames: panel.content,
      rootClassNames: []
    }
  },
  {
    value: 'panel-warning',
    text: 'Panel Warning',
    styles: {
      headerClassNames: panel.header.concat(['warning']),
      contentClassNames: panel.content,
      rootClassNames: []
    }
  }
]
