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
* SSR-rendered SPA feel of static website
* Imageproxy (CDN + scale/crop)
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

## Configuration

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

Overwrite build-in components by provide a custom component path. All components are prefixed with `Lc`ComponentName. Components are loaded as asynchronous and are devided in four sections: `core|layout|view|edit`. Find all available components in the [source code](/lib/templates/plugins/components) and check out further explanation in [customize the website](README.md#overwrite)



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
All content elments can be added/edited for each article. Lumen CMS ships 5 content elements while each of them is pretty customizable through stylesheets and properties. The most common element is `LcTextImage` which has many configuration option and can fit many usecases. You can overwrite either the content element with providing a custom path or create custom elements and add them to your project [read more](README.md#customize-content-elements).

### Text with image (`LcTextImage`)
* Header (h1 - h6)
* Text (enabled richt text editor from QuillJs)
* Image(s) as gallery or single
* Parallax/Jumbotron/Fixed-Background effect
* Flexible arrangement
* Highly customizable through styles

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
Every content element has a unique type as the component name - it is prefixed with `LC`. Example: `LcCustomComponentName`. To extend the default elements two options needs to get passed: a new componentMapping declaration and the edit and view component files. Check out the source code of default components to get an idea what is possible.
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
      name: 'lc-custom-component-edit', // important to use the prefix `lc-` | component to edit the content element
      icon: 'material-icon', // shows the icon in the bottom bar
      text: 'My custom component', // readable component title
      view: 'lc-custom-component' // important to use the prefix `lc-` | component to view the content element 
    }
   }
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
