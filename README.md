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
This project aims to combine very popular open-source projects and a solid managed backend service of graph.cool. It is API-Driven and extendable with graphql schema definition. Due to the nature of NuxtJs and the powerful modularization concept it extends your NuxtJs project with a fully-featured CMS. As a component framework Vuetify is included and brings Google Material Design specification out of the box.

#### Features
* Content management system
* Google Analytics integration
* Sitemap generator
* SEO optimized 
* SPA feel of static website
* Imageproxy (CDN + scale/crop)
* Image source maps
* fontloader
* In-Page-Editing
* SSR rendered
* Configurable
* 95%+ on GooglePageSpeed

#### Technology stack
* NodeJS (https://nodejs.org)
* Vue 2.x (https://vuejs.org/)
* NuxtJs (https://nuxtjs.org/)
* Vuetify (https://vuetifyjs.com)
* GraphQL managed backend by graph.cool (https://graph.cool/)
* Fast deplyoment with zeit.co/now (https://zeit.co/now)

## Requirement
* NodeJS v >=8 (check out https://nuxtjs.org dependencies)
* NPM/Yarn
* GraphQL endpoint (https://graph.cool)
You need a graph.cool endpoint and backend. Head over to [lumen-graphcool](https://github.com/lumen-cms/lumen-graphcool) to install and deploy your backend.

## Installation
- Add `nuxtjs/lumen-cms` dependency using yarn or npm to your project
- Add `lumen-cms` to `modules` section of `nuxt.config.js`
```
npm i lumen-cms --save
```

```js
// nuxt.config.js
export default = {
  // check out https://github.com/lumen-cms/lumen-graphcool to set it up
  env:{
    GRAPHQL_ALIAS: '[Project ID]', // alternative Project Alias
    GRAPH_FILE_API: '[Project ID]', // alternative Project Alias
    GRAPHQL_SUBSRIPTION: '[SUBSCRIPTION]'
  },
  modules: [
    // Simple usage
    ['lumen-cms']
  ],
  // some settings
  'lumen-cms':{
    // here comes your configuration
  }
```

## Configuration

#### Options

##### [disableCSS] - Boolean (default: false)
disable the CSS import and manualy add it with import
```js
'lumen-cms':{ disableCSS:true } 
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

###### [fonts] - Object (default: roboto)
add as many google fonts to get loading with fontloader API (included in this module)
```js
fonts:{montserrat: 'Montserrat:thin,extra-light,light,100,200,300,400,500,600,700,800'}
```

##### [components] - Object (default: {})

Overwrite build-in components with overwriting the component path. All components are prefixed with `Lc`ComponentName. Compoents are loaded asynchronous and are devided in three sections: `core|layout|view|edit`. Find all available components in the [source code](/lib/templates/plugins/components) 

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

##### [cms] - Object 

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

## Website built with Lumen CMS
* https://planet.training
* https://www.studentsgoabroad.com | https://www.studentsgoabroad.org

## Contribute

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Dominic Garms <djgarms@gmail.com>
