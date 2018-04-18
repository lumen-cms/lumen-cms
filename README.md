# nuxtjs/lumen-cms
[![npm (scoped with tag)](https://img.shields.io/npm/v/lumen-cms/latest.svg?style=flat-square)](https://npmjs.com/package/lumen-cms)
[![npm](https://img.shields.io/npm/dt/lumen-cms.svg?style=flat-square)](https://npmjs.com/package/lumen-cms)
[![Codecov](https://img.shields.io/codecov/c/github/lumen-cms/lumen-cms.svg?style=flat-square)](https://codecov.io/gh/lumen-cms/lumen-cms)
[![Dependencies](https://david-dm.org/lumen-cms/lumen-cms.svg?style=flat-square)](https://david-dm.org/lumen-cms/lumen-cms)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Module for a cms based on Nuxt and GraphQl

[📖 **Release Notes**](./CHANGELOG.md)

# Lumen CMS 
#### NodeJS | Vue 2.x | NuxtJs | Vuetify | GraphQl - graph.cool

## Motivation
This project aims to combine very popular open-source projects and a solid managed backend service of graph.cool. It is API-Driven and extendable with graphql schema definition. Due to the nature of NuxtJs and the powerful modularization concept it extends your NuxtJs project with a fully-featured CMS. As a component framework Vuetify is included and brings Google Material Design specification out of the box. It offers best practices for SEO combined with a lot of performance optimization for the website render process.

#### Features
* Content management system
* Google Analytics integration
* Sitemap generator
* 301 Redirects
* SEO optimized 
* SSR-rendered SPA feel of static website
* Imageproxy (CDN + scale/crop)
* Lazy-loading
* Responsive images 
* Fontloader
* In-Page-Editing
* Multi-Language
* Multi-Domain
* Configurable
* 95%+ on GooglePageSpeed

#### Technology stack
* NodeJS (https://nodejs.org)
* Vue 2.x (https://vuejs.org/)
* NuxtJs (https://nuxtjs.org/)
* Vuetify (https://vuetifyjs.com)
* GraphQL managed backend by graph.cool (https://graph.cool/)
* Apollo (https://www.apollographql.com/client/, https://github.com/Akryum/vue-apollo)
* Vue-i18n (https://kazupon.github.io/vue-i18n/en/)
* Fast deplyoment with zeit.co/now (https://zeit.co/now)

## Requirement
* NodeJS v >=8 (check out https://nuxtjs.org dependencies)
* NPM/Yarn
* GraphQL endpoint (https://graph.cool)
You need a graph.cool endpoint and backend. Head over to [lumen-graphcool](https://github.com/lumen-cms/lumen-graphcool) to install and deploy your backend.

## Installation 
### New project
Make use of the vue-cli [starter-template](https://github.com/lumen-cms/starter-template)
```bash
$ vue init lumen-cms/starter-template my-project  
$ cd my-project                     
# install dependencies
$ npm install # Or yarn install
# open localhost:3000/admin to proceed with login
```

### Existing project
- Add `nuxtjs/lumen-cms` dependency using yarn or npm to your project
- Add `lumen-cms` to `modules` section of `nuxt.config.js`
```bash
npm i lumen-cms --save
```

```js
// nuxt.config.js
export default = {
  // check out https://github.com/lumen-cms/lumen-graphcool to set it up
  env:{
    GRAPHQL_PROJECT_ID: '[Project ID]',
    GRAPHQL_SUBSCRIPTION: '[SUBSCRIPTION]'
  },
  modules: [
    'lumen-cms' // add lumen-cms module
  ],
  // customize settings
  'lumen-cms':{
    // here comes your configuration
  }
```
## First Start
* Visit http://localhost:3000/admin and register a user
* Visit your graphcool backend and add `Moderator/Admin` role to the user
* Now you can log in and start a very basic installation (http://localhost:3000/installation)
  * your installation respects the `'lumen-cms':{cms:{languages:['en','de']}}` array and create for each locale one default root page
  * keep in mind: every language starts with the "/[locale]" slug
  * you can configure canonical tags or any custom behaviour for multi-language websites
=> After successful installation will be redirected to the root of your website and you can start adding content

## Pages
Lumen CMS provides admin interfaces and render entry points for your top-level article/page schema. Below is the list and routePath of all pre-configured routes. Make sure that these paths does not collide with any of your NuxtJs pages setup. All of the pages are accessible through the [Admin-Bar](README.md#admin-bar) 

### Root - Index.vue (routePath "/any/path")
Catches all requests and renders the schema [`Article`]() based on the slug. The slug can be any slug as
* /simple-slug
* /directory/slug/deep/nested
* On Error/Not found
  * try to find a 301 => redirect
  * render 404 if no article found
  * render 500 if any error occurs
Important: make sure you don't provide any index.vue file inside your `pages` folder otherwise the CMS won't be able to render the content.

### Admin (routePath: '/admin')
Login/Sign Up for the website administration. After successful login you get forwarded to the root of your website. In case of sign up a new user: you have to enable a permission role (Admin|Moderator) to the user in your graph.cool console interface. 

### Install (routePath: '/admin/install')
Creates the root page/entry point for each locale you provide in your configuration:
```js
'lumen-cms':{
  cms:{
    languages:['en','de','it','fr'] // => install would create all 4 articles with a basic content element as a starter 
  }
}
```

### Article-Admin (routePath: '/admin/article-admin'
Datatable lists all articles and you can view/edit it. The Footer shows a language switch to change the locale for your listing.

### Article-Edit (routePath: '/admin/article-edit/:id?')
Creates/updates the article schema. You can either click on the edit inside of the `Admin-Bar` or inside of the `Article Admin` to reach the edit page.

### Page-Templates (routePath: '/admin/page-templates')
Overview over all page templates. Page templates is `vue-rendered` content you can specify inside of footer/header/sidebars/toolbars. Basically it holds generic content which should be displayed in static parts of the layout.

### Redirects (routePath: '/admin/redirects')
Datatable lists all redirects in case you moved pages/paths to a different location

### Article/Blog list (routePath: '/blog|articles')
Configurable alias path to render an article list. 
```js
'lumen-cms':{
  cms:{
    routes: {
      // map locale to each routes.path
      listMapLocale: {
        articles: 'en',
        blog: 'de'
      },
      // all available path alias for the article list
      list: ['articles', 'blog']
    }
  }
}
```

## Admin-Bar
On logged in you will see on the bottom left corner a floating speed-dial button this action menu buttons:
* Logout
* Media Gallery (only visible if content edit mode is ON)
* Redirects
* Blog admin list
* Page templates
* Content-Edit-Mode toggle
* Add new article
* Edit article

## Configuration
You can customize your website bundle in several ways: 
* `lumen-cms` configuration options from the nuxt.config.js file
* `Webpack alias` to provide a custom file and replace the default

### Options

#### [disableCSS] - Boolean (default: false)
Disable the CSS import and manualy add it with stylus
```js
 'lumen-cms':{
    disableCSS: true 
 } 
 css: [
   {src: '~assets/style/app.styl', lang: 'styl'}
 ]
```
```stylus
@import '~lumen-cms/lib/templates/assets/style/vuetify-imports.styl'
$themeprimary = #ff6f00
$themeaccent = #ffc400
$themesecondary = $grey.darken-3
$themeinfo = $light-blue.darken-1
$themewarning = $orange.darken-1
$themeerror = $red.darken-1
$themesuccess = $light-green.darken-1
@import '~lumen-cms/lib/templates/assets/style/imports.styl'
```

#### [fonts] - Object (default: roboto)
Modify fonts of Google to get loading with fontloader API
```js
fonts:{montserrat: 'Montserrat:thin,extra-light,light,100,200,300,400,500,600,700,800'}
```
```css
h1, h2, h3 {
  font-family: 'Montserrat'
}
```

#### [components] - Object (default: empty)

Overwrite build-in components by provide a custom component path. All components are prefixed with `Lc`ComponentName. Components are loaded as asynchronous and are devided in four sections: `core|layout|view|edit`. 
* Find all available components [here](/lib/templates/plugins/components) 
* Further custumization options follow overwrite [section](README.md#overwrite)

#### [pages] - Object (default: empty)

Overwrite built-in pages by provide a custom page path. Following pages are provided. Provide a `pages` object with the exact name and custom path to overwrite the default:
```js
pages:{
  admin: resolve(__dirname, './templates/pages/admin.vue'),
  install: resolve(__dirname, './templates/pages/install.vue'),
  articleAdmin: resolve(__dirname, './templates/pages/articleAdmin.vue'),
  articleEdit: resolve(__dirname, './templates/pages/articleEdit.vue'),
  pageTemplates: resolve(__dirname, './templates/pages/pageTemplates.vue'),
  redirects: resolve(__dirname, './templates/pages/redirects.vue',
  articleList: resolve(__dirname, './templates/pages/articleList.vue'),
  index: resolve(__dirname, './templates/pages/index.vue')
}

// in case you want to overwrite articleList page
pages:{
  articleList: '~/pages/customArticleList.vue'
}
```

#### [cms] - Object 

The `cms` config object is getting injected into the context of your app (https://nuxtjs.org/guide/plugins#inject-in-root-amp-context). 
* `Vuex` - actions as `this.app.$cms`
* Vue Components as `this.$cms`
* Check out all [options](lib/defaults.js)
```js
cms:{
  pageToolbarExtension: false,
  Head:{
    site_name: 'Your domain',
  }
}
```

## Data Schema
The backend is configured to fit most website usecases. The main top-level schema is called Article, its the main schema for all pages/articles. The difference between a page and article is marginal - you can change it with a switch and its made to differenciate inside of the content list widget. 
### Article - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L1)
* holds the top level schema
* can hold many content elements
* Taxonomy with `ArticleCategory`
* Add a media image to show a picture in `ListWidget`-lists
* `languageKey` is important to represent the locale of the content
* `slug` has to be unique
  * locale is always the root of a landing page (`en` for english, `de` for german)
  * you can pass in directives `parent/my/subpage` 
  * every string will get slugified 
  * no leading slashes - no `.html` endings needed (they will get redirected automatically)
  * there is no locale directive as `/en/any-page` | `/de/german-page` needed due to uniqness of the slug

### ArticleCategory - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L26)
* categorization/taxonomy/tagging for each article

### Author - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L38)
* basic author schema


### Content - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L47)
* holds the content element schema for any content element
* extandable through 
  - properties JSON
  - styles JSON

### File - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L71)
* graph.cool internal file schema

### FileReference - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L89)
* holds the reference to each file via media browser

### FileTag - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L110)
* categorization/taxonomy/tagging for each file

### Media - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L116)
* media image for preview images of articles

### PageTemplate - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L132)
* holds generic content for different and global layout positions
  - toolbars
  - navigation drawer
  - footer 
  - configurable

### UrlAlias (301 redirects) - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L132)
* 301 in case of renamed paths/slugs

### User - [View](https://github.com/lumen-cms/lumen-graphcool/blob/master/types.graphql#L142)
* graph.cool internal user schema for authentication

## Content Elements
All content elments can be added/edited for each article. Lumen CMS ships 5 content elements while each of them is 
customizable through stylesheets and properties. The most common element is `LcTextImage` which has many configuration option and fit many usecases. You can overwrite either the content element with providing a custom path or create custom elements and add them to your project [read more](README.md#customize-content-elements).

### Text with image (`LcTextImage`)
* Header (h1 - h6)
* Text (enabled richt text editor from QuillJs)
* Image(s) as gallery or single
* Parallax/Jumbotron/Fixed-Background effect
* Flexible arrangement
* Highly customizable through styles
* "Component-Pre-Set" as a collection of class names can be defined or added to the [defaults](lib/templates/util/contentElementStylePresets.js)

### Divider (`LcDivider`)
* Recognizes google material icons
* Different sizing
* Colorization
* Border widths

### Layout (`LcLayout`)
* Tabs
* Columns
  - Parralax/Jumbotron/Fixed-Background images
* Slider
* Expansion-panel
 => holds as many content elmements inside each row/column

### List Widget (`LcListWidget`)
* List of articles
* Different list styles
* Filter based on taxonomy

### Read more accordion (`LcReadMore`)
* Teaser text (richt text)
* Body text (rich text)

### Customize content elements and layout
There are two ways of customizing your website render. Either you overwrite an existing component or you want to create a new custom content element or you extend the current content elements
#### Overwrite components
Overwrite existing components with keeping the exact name and pass a new path. Keep the same [group and componentName](/lib/templates/plugins/components) and webpack will bundle your customized file instead of the default file.
```
components: {
  layout: {
     LcLanguageSwitch: '~/components/overwrites/LanguageSwitch.vue',
     LcMainFooter: '~/components/overwrites/MainFooter.vue'
  },
  view: {
     LcArticleList: '~/components/overwrites/ArticleList.vue',
     LcListWidget: '~/components/overwrites/ListWidget.js'
  }
}
```
#### Extend content elements
Every content element needs a unique component name. It should be UpperCamelCase and inside the componentMapping it takes the prefix `LC`. Example: `LcCustomComponentName`. To extend the default elements two options needs to get passed: a new componentMapping declaration and the edit and view component files.
```js
'lumen-cms':{
  components:{
    view:{
      LcCustomComponent: '~/component/MyCustomComponent.vue' // must match componentMapping view
    },
    edit:{
      LcCustomComponentEdit: '~/component/MyCustomComponentEdit.vue' // must match componentMapping name
    }
  },
  cms:{
   componentMapping:{
    'CustomComponent':{
      name: 'lc-custom-component-edit', // component to render the edit dialog
      icon: 'material-icon', // shows the icon in the bottom bar
      text: 'My custom component', // readable component title
      view: 'lc-custom-component' // component to render the view
    }
   }
  }
}
```

## Custom Webpack Alias
To extend/overwrite the default behaviour there are following paths to overwrite the default functionality. Following is a complete example to extend your Webpack config with all available path alias. 
* Pass file with [predefinedStyles](lib/templates/util/contentElementStylePresets.js)
* Customize GQL main schema files to fits your needs
* [Three hooks](lib/templates/util/hooks) are available to customize the output of your render:
1. initialAsync Data
Returns `locale`, `host` and `slug` to process further website render
2. getCanonical
In case you want to render a canonical tag
3. getMeta
Default meta data as robots or google-site-verification in case you have multi-domain setup.

```js
// nuxt.config.js  
build:{
 extend(config){
   // extend pre-defined content element options
   config.resolve.alias['~predefinedStyles'] = '~/customPath/predefinedStyles.js' // array of pre-defined custom layout
   // gql schema and mutation files for top level schemas 
   config.resolve.alias['~updateArticle'] = '~/customPath/updateArticle.gql' // in case you customized article
   config.resolve.alias['~createArticle'] = '~/customPath/createArticle.gql' // in case you customized article
   config.resolve.alias['~extendedArticleFragment'] = '~/customPath/extendedArticleFragment.gql' // in case you customized article
   config.resolve.alias['~createMedia'] = '~/customPath/createMedia.gql' // in case you need to add media in some other schemas
   // hooks for initial data render
   config.resolve.alias['~initialAsyncData'] = '~/customPath/initialAsyncData.js' // initial render of asyncData
   config.resolve.alias['~getCanonical'] = '~/customPath/getCanonical.js' // receive canonical tag
   config.resolve.alias['~getMeta'] = '~/customPath/getMeta.js' // get default head meta
 }
}
```
 

## Deploy
With https://zeit.now the deploy of your Lumen CMS is as simple as typing:
```
$ npm i now -g
$ cd pathOfProject
$ now
```
To connect the now deployment with your custom domain head over to the [documentation](https://zeit.co/docs/features/aliases) 
Sidenote: you need at least a premium account due to the size of the website bundle.
## Websites built with Lumen CMS
* https://planet.training
* https://www.studentsgoabroad.com | https://www.studentsgoabroad.org

## Contribute

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Dominic Garms <djgarms@gmail.com>
