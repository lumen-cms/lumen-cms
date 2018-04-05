module.exports = {
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
  logoPath: '/logo.png',
  logoPathMobile: null, // optional
  fonts: {
    roboto: 'Roboto:300,400,500,700'
  },
  languages: ['en', 'de'],
  routes: {
    listMapLocale: {
      articles: 'en',
      blog: 'de'
    },
    list: ['articles', 'blog']
  },
  toolbarSideIconClass: 'hidden-md-and-up',
  //DOMAINS: [], // todo not in use any longer
  MEDIA_LIBRARY: {
    ADDONS: []
  },
  pageToolbarExtension: true,
  pageToolbarDark: false,
  //SIDEBAR_RIGHT: false, // todo check if not used in sub-projects
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
