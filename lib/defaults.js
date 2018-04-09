module.exports = {
  componentMapping: {
    edit: {
      'Divider': {
        name: 'lc-divider-edit',
        icon: 'remove',
        text: 'Divider'
      },
      'Layout': {
        name: 'lc-layout-edit',
        icon: 'view_column',
        text: 'Layout Element',
        hideInLayout: true
      },
      'ListWidget': {
        name: 'lc-list-widget-edit',
        icon: 'view_list',
        text: 'Content list widget'
      },
      'TextImage': {
        name: 'lc-text-mixed-edit',
        icon: 'photo_size_select_large',
        text: 'Text + Image'
      },
      'Html': {
        name: 'lc-text-mixed-edit',
        icon: 'code',
        text: 'HTML code'
      },
      'ReadMore': {
        name: 'lc-text-mixed-edit',
        icon: 'dns',
        text: 'Read more accordion',
        hideInLayout: true
      }
    }
  },
  logoPath: '/logo.png', // => default path to the logo
  logoPathMobile: null, // => optional path for a mobile logo path
  languages: ['en', 'de'], // => available languages
  // article list routes configuration
  routes: {
    // map locale to each routes.path
    listMapLocale: {
      articles: 'en',
      blog: 'de'
    },
    // all available path alias for the article list
    list: ['articles', 'blog']
  },
  toolbarSideIconClass: 'hidden-md-and-up', // => media breakpoint for sidebar navigation button
  disableCanonical: false,
  // option to extend media library TODO: needs to be documented
  MEDIA_LIBRARY: {
    ADDONS: []
  },
  pageToolbarExtension: false, // => enable toolbar extension
  pageToolbarDark: false, // => enable dark main/page toolbar
  // needed configuration for schema clone
  propertyToIdConversion: [
    {key: 'categories', plural: true}, {key: 'file'}
  ],
  // html.head default configuration for all head sections
  Head: {
    // @TODO -> those should be in translations / project based
    site_name: 'cms.demo',
    publisher: {
      de: '',
      en: ''
    },
    description: {
      de: 'description de',
      en: 'description en'
    },
    twitterSite: '',
    domain: '',
    images: [] // set preview images for social media
  }
}
