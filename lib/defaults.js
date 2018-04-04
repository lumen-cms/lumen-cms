module.exports = {
  host: '',
  componentMapping: {
    contentElements: {
      edit: {
        'Divider': 'lc-divider-edit',
        'Layout': 'lc-layout-edit',
        'ListWidget': 'lc-list-widget-edit',
        'TextImage': 'lc-text-mixed-edit',
        'Html': 'lc-text-mixed-edit',
        'ReadMore': 'lc-text-mixed-edit'
      }
    }
  },
  localeMustMatch: false,
  logoPath: '/logo.png',
  fonts: {
    roboto: 'Roboto:300,400,500,700'
  },
  logoPathMobile: null, // optional
  languages: ['en', 'de'],
  routesAlias: {
    list: [
      {en: 'articles'},
      {de: 'blog'}
    ]
  },
  DOMAINS: [],
  TEMPLATE_TYPE: {
    CODE: 'CODE',
    JSON: 'JSON'
  },
  SIDEBAR_TOP_IS_JSON: true,
  TEMPLATE: {
    HEAD_TOP: 'HEAD_TOP',
    HEAD_EXTENSION: 'HEAD_EXTENSION',
    SIDEBAR_TOP: 'SIDEBAR_TOP',
    FOOTER_TOP: 'FOOTER_TOP',
    FOOTER_MIDDLE: 'FOOTER_MIDDLE',
    FOOTER_BOTTOM: 'FOOTER_BOTTOM',
    SIDENAV: 'SIDENAV'
  },
  toolbarSideIconClass: 'hidden-md-and-up',
  MEDIA_LIBRARY: {
    ADDONS: []
  },
  PAGE_TOOLBAR_EXTENSION: true,
  PAGE_TOOLBAR_DARK: false,
  SIDEBAR_RIGHT: false,
  propertyToIdConversion: [
    {key: 'categories', plural: true}, {key: 'file'}
  ],
  Head: {
    // @TODO -> those should be in translations / project based
    site_name: 'planet.training',
    publisher: {
      de: 'https://www.facebook.com/planet.training',
      en: 'https://www.facebook.com/planet.trainingEN'
    },
    description: {
      de: 'Der Online Assistent für dein Fußballtraining. Erstelle und finde tausende kostenlose Fußballübungen - werde ein besserer Trainer im Fußball.',
      en: 'The coaching website for soccer training. Best training tool that offers ✓Free soccer exercises ✓Team Manager ✓Soccer Session plans'
    },
    twitterSite: '@planettraining',
    domain: 'https://planet.training',
    images: [] // set preview images for social media
  }
}
