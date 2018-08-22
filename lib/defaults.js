module.exports = {
  // this are all available content elements. Either modify existing or extend it for additional content elements
  componentMapping: {
    'Divider': {
      name: 'lc-divider-edit',
      icon: 'remove',
      text: 'Divider',
      view: 'lc-divider'
    },
    'Layout': {
      name: 'lc-layout-edit',
      icon: 'view_column',
      text: 'Layout Element',
      view: 'lc-layout',
      hideInLayout: true
    },
    'ListWidget': {
      name: 'lc-list-widget-edit',
      icon: 'view_list',
      view: 'lc-list-widget',
      text: 'Content list widget'
    },
    'TextImage': {
      name: 'lc-text-mixed-edit',
      icon: 'photo_size_select_large',
      view: 'lc-text-image',
      text: 'Text + Image'
    },
    'Html': {
      name: 'lc-text-mixed-edit',
      icon: 'code',
      view: 'lc-html',
      text: 'HTML code'
    },
    'ReadMore': {
      name: 'lc-text-mixed-edit',
      icon: 'dns',
      text: 'Read more accordion',
      view: 'lc-read-more',
      hideInLayout: true
    }
  },
  // page template section names - every name automatical ends with `NAME-[locale]`
  pageTemplate: {
    SYSTEM_BAR: 'SYSTEM_BAR',
    HEAD_TOP: 'HEAD_TOP', // main toolbar navigation
    HEAD_EXTENSION: 'HEAD_EXTENSION', // toolbar extension template (if enabled: `pageToolbarExtension:true`)
    SIDEBAR_RIGHT: 'HEAD_TOP', // right navigation-drawer to display navigation on mobile
    FOOTER_TOP: 'FOOTER_TOP',
    FOOTER_MIDDLE: 'FOOTER_MIDDLE',
    FOOTER_BOTTOM: 'FOOTER_BOTTOM',
    SIDEBAR_LEFT: 'SIDEBAR_LEFT', // permanent navigation drawer left
    MEGA_MENU: 'MEGA_MENU'
  },
  // submit visibility options
  pageTemplateVisibility: {
    // default visibilities
    SYSTEM_BAR: true,
    SIDEBAR_LEFT: false // either false, string or array of title|slug|id of article category
  },
  logoPath: '/logo-dark.png', // => default path to the logo
  logoPathMobile: '/logo.png', // => optional path for a mobile logo path
  languages: ['en', 'de'], // => available languages
  defaultLanguage: 'en',
  languageMustMatch: false, // => only activate this if every language published under own domain / tld / subdomain
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
  toolbarTopVisibility: 'hidden-sm-and-down', // => media breakpoint to show main navigation in toolbar
  toolbarSidebarLeftIconClass: 'hidden-md-and-up', // => media breakpoint for mobile sidebar right navigation on mobile
  toolbarSidebarRightIconClass: 'hidden-md-and-up', // => media breakpoint for mobile sidebar right navigation on mobile
  toolbarSearchMobileBreakpoint: 'smAndDown', // => media breakpoint for showing full search
  toolbarBoxed: false, // set toolbar max-width
  systemBar: {
    enable: false,
    color: '',
    dark: false,
    boxed: false // set system-bar max-width
  },
  disableCanonical: false,
  // option to extend media library TODO: needs to be documented
  MEDIA_LIBRARY: {
    ADDONS: []
  },
  pageToolbarExtension: false, // => enable toolbar extension
  pageToolbarDark: false, // => enable dark main/page toolbar
  // needed configuration for schema clone
  propertyToIdConversion: [{
    key: 'categories',
    plural: true
  }, {
    key: 'file'
  }],
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
  },
  secondarySidebar: {
    /**
     * @type {boolean|String}
     */
    activateByArticleCategory: false
  },
  extractCSS: false
}
