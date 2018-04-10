# nuxtjs/lumen-cms
[![npm (scoped with tag)](https://img.shields.io/npm/v/lumen-cms/latest.svg?style=flat-square)](https://npmjs.com/package/lumen-cms)
[![npm](https://img.shields.io/npm/dt/lumen-cms.svg?style=flat-square)](https://npmjs.com/package/lumen-cms)
[![Codecov](https://img.shields.io/codecov/c/github/lumen-cms/lumen-cms.svg?style=flat-square)](https://codecov.io/gh/lumen-cms/lumen-cms)
[![Dependencies](https://david-dm.org/lumen-cms/lumen-cms.svg?style=flat-square)](https://david-dm.org/lumen-cms/lumen-cms)
[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)

> Module for a cms based on Nuxt and GraphQl

[📖 **Release Notes**](./CHANGELOG.md)

# Lumen CMS 
#### GraphQl | Vue 2.x | NuxtJs | Vuetify | graph.cool backend

# WIP [very early preview work in progress]

## Features

#### The module features
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
* Vue 2.x (https://vuejs.org/)
* NuxtJs (https://nuxtjs.org/)
* Vuetify (https://vuetifyjs.com)
* GraphQL managed backend by graph.cool (https://graph.cool/)
* Fast deplyoment with zeit.co/now (https://zeit.co/now)


## Setup
- Add `nuxtjs/lumen-cms` dependency using yarn or npm to your project
- Add `lumen-cms` to `modules` section of `nuxt.config.js`

```js
{
  modules: [
    // Simple usage
    'lumen-cms',

    // With options
    ['lumen-cms', { modules }]   
 ]
}
```

## Usage

Lumen CMS is the right choice for you if you are a Vue 2 developer and familiar with graph-ql.

#### Requirement
* NodeJS v >=8 (check out https://nuxtjs.org dependencies)
* Account at graph.cool to deploy your own graphql endpoint (coming soon...)

### Configuration

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

Modify components to exchange them with customized. Keep the same naming and then the component will be replaced.

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

Injected customization into this.$cms or this.app.$cms through NuxtJs inject. Check the defaults


## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Dominic Garms <djgarms@gmail.com>
