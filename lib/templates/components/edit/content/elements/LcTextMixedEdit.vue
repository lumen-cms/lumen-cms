<template>
  <div>
    <v-toolbar flat>
      <v-spacer/>
      <v-btn icon @click.stop="triggerHide">
        <v-icon>{{ !hideContent ? 'remove' : 'add' }}</v-icon>
      </v-btn>
      <v-btn icon @click="$store.dispatch('setContentEditDialogData', {})">
        <v-icon>clear</v-icon>
      </v-btn>
      <v-layout slot="extension" align-center v-show="!hideContent">
        <v-btn @click="active = 'tab-content'" flat :class="{'info--text':active==='tab-content'}">
          Content
        </v-btn>
        <v-btn @click="active = 'tab-media'" flat :class="{'info--text':active==='tab-media'}"
               v-if="typename==='TextImage'">
          Images
        </v-btn>
        <v-btn @click="active = 'tab-styles'" flat :class="{'info--text':active==='tab-styles'}">
          Design / Styles
        </v-btn>
      </v-layout>
    </v-toolbar>
    <v-card-text style="height: 50vh; overflow: auto;" v-show="!hideContent">
      <div id="tab-content" v-if="active === 'tab-content'">
        <v-select name="headerLayout"
                  v-model="model.properties.headerLayout"
                  :items="options.headerLayoutOptions"
                  label="Header"/>
        <v-text-field name="header"
                      v-model="model.properties.header"
                      label="Header Content"/>

        <template v-if="typename==='Html'">
          <v-text-field name="body" v-model="model.description" label="Code" multi-line/>
          <v-switch v-model="iframeResponsiveValue"
                    label="Enable Youtube Iframe Responsive"/>
        </template>
        <template v-else>
          <lc-html-field field-name="teaser"
                         label="Teaser" v-model="model.teaser"
                         v-if="typename==='ReadMore'"/>
          <lc-html-field field-name="description"
                         label="Description" v-model="model.description"/>
        </template>
      </div>

      <div id="tab-styles" v-if="active === 'tab-styles'">

        <v-select v-model="predefinedLayoutValue"
                  :items="$options.inputFields.predifinedLayouts"
                  label="Component Pre-sets"
                  return-object
                  clearable/>

        <v-expansion-panel focusable>
          <v-expansion-panel-content lazy>
            <div slot="header">Header Styles</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <component v-for="style in $options.inputFields.headerStyles"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections.header[style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           :autocomplete="style.autocomplete"
                           @input="onSelectionsChange('header')"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Content</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <component v-for="style in $options.inputFields.contentStyles"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections.content[style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           :autocomplete="style.autocomplete"
                           @input="onSelectionsChange('content')"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy>
            <div slot="header">General</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <component v-for="style in $options.inputFields.generalStyles"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections.root[style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           :autocomplete="style.autocomplete"
                           @input="onSelectionsChange('root')"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy>
            <div slot="header">Background</div>
            <v-card-text class="grey lighten-4">
              <component v-for="style in $options.inputFields.backgroundStyles"
                         :is="style.tag"
                         :items="style.items"
                         v-model="selections.background[style.modelName]"
                         :multiple="!!style.multiple"
                         :key="style.modelName"
                         :label="'General '+style.label"
                         clearable
                         :autocomplete="style.autocomplete"
                         @input="onSelectionsChange('background')"/>
              <component v-for="style in $options.inputFields.backgroundHeaderStyles"
                         :is="style.tag"
                         :items="style.items"
                         v-model="selections.backgroundHeader[style.modelName]"
                         :multiple="!!style.multiple"
                         :key="'header'+style.modelName"
                         :label="'Header '+style.label"
                         clearable
                         :autocomplete="style.autocomplete"
                         @input="onSelectionsChange('backgroundHeader')"/>
            </v-card-text>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy>
            <div slot="header">Advanced</div>
            <v-card-text class="grey lighten-4">
              <v-text-field v-model="model.properties.styleAttributes"
                            label="CSS Custom Styles"/>
              <v-select :value="model.styles.headerClassNames"
                        @change="onClassNamesChange($event,'header')"
                        label="Header Class Names"
                        :items="$options.selectOptions.headerClassNames"
                        autocomplete
                        chips
                        multiple
                        deletable-chips
                        clearable/>
              <v-select :value="model.styles.contentClassNames"
                        @change="onClassNamesChange($event,'content')"
                        label="Content Class Names"
                        :items="$options.selectOptions.contentClassNames"
                        autocomplete
                        chips
                        multiple
                        deletable-chips
                        clearable/>
              <v-select :value="model.styles.rootClassNames"
                        @change="onClassNamesChange($event,'root')"
                        label="General Class Names"
                        :items="$options.selectOptions.rootClassNames"
                        autocomplete
                        chips
                        multiple
                        deletable-chips
                        clearable/>
              <v-btn icon @click="classTooltip=!classTooltip">
                <v-icon>help</v-icon>
              </v-btn>
              <v-alert v-model="classTooltip" color="info" dismissible>
                <lc-content-edit-help/>
              </v-alert>
            </v-card-text>
          </v-expansion-panel-content>

        </v-expansion-panel>

      </div>
      <div id="tab-media" v-if="active === 'tab-media' && ['TextImage'].includes(typename)">
        <v-alert color="info"
                 icon="info"
                 :value="['Parallax', 'Jumbotron', 'FixedBackground'].includes(model.properties.layoutPanel)">
          Parallax and Jumbotron Elements need a fixed height to work properly.
          Set one (image -> resize, e.g. x300 for 300px height)! Most of the additional image options will be disabled.
        </v-alert>
        <v-select name="layoutPanel"
                  v-model="model.properties.layoutPanel"
                  label="Layout Panel"
                  clearable
                  :items="['Parallax', 'Jumbotron', 'FixedBackground']"
                  @change="delete model.properties.imageOrient; delete model.properties.isLightbox; delete model.properties.imageColumnSize"/>

        <v-select name="imageOrient"
                  v-model="model.properties.imageOrient"
                  label="Image Position"
                  :disabled="!!model.properties.layoutPanel"
                  :items="options.imageOrientOptions"
                  @change="delete model.properties.layoutPanel"
                  clearable/>

        <v-expansion-panel focusable>
          <v-expansion-panel-content lazy>
            <div slot="header">Image Options</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <v-select name="imageColumnSize"
                          :disabled="!!model.properties.layoutPanel"
                          v-model="model.properties.imageColumnSize"
                          label="Image Grid Size"
                          :items="$options.selectOptions.imageColumnSizeOptions"
                          clearable/>

                <component v-for="style in $options.inputFields.multiImageOptions"
                           :disabled="!!model.properties.layoutPanel"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections.root[style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           :autocomplete="style.autocomplete"
                           @input="onSelectionsChange('root')"/>
                <v-switch v-model="model.properties.isLightbox"
                          :disabled="!!model.properties.layoutPanel"
                          label="Enable Lightbox"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-alert v-model="showImageAlert"
                 color="warning"
                 icon="warning"
                 v-if="!model.id">
          <span>You need to save the content first, before you are able to insert images! Basically just hit "SAVE" one time.</span>
        </v-alert>

        <lc-content-image-dialog v-if="model.id"
                                 :content="model"
                                 ref="contentImageDialog"/>

      </div>
    </v-card-text>
  </div>
</template>
<script>
  import contentEditMixin from '../../../../mixins/contentEditMixin'
  import styles from '../../../../util/contentEditStyleDefinitions'
  import ENUMS from '../../../../gql/ENUMS'
  import contentElementStylePreSets from '../../../../util/contentElementStylePreset'

  const imageSizeOptions = {
    'Size_1': '8% (12 each row)',
    'Size_2': '16% {6 each row}',
    'Size_3': '25 % (4 each row)',
    'Size_4': '33% (3 each row)',
    'Size_5': '41% (2.5 each row)',
    'Size_6': '50% (2 each row)',
    'Size_12': '100% (1 each row)'
  }
  const rootStyles = [styles.fontSize, styles.textColor, styles.padding, styles.margin, styles.elevations, styles.contentWidth, styles.visibilityBreakpoint, styles.multiImageGrid, styles.multiImageOptions, styles.multiImageTitleStyle, styles.multiImageTitlePosition]
  const inputFields = {
    backgroundStyles: [styles.backgroundColor, styles.backgroundOpacity],
    backgroundHeaderStyles: [styles.backgroundColor, styles.backgroundOpacity],
    contentStyles: [styles.fontSize, styles.textAlignment, styles.textColor, styles.contentWidth, styles.padding],
    headerStyles: [styles.fontSize, styles.textColor, styles.textAlignment, styles.contentWidth, styles.margin, styles.padding, styles.visibilityBreakpoint],
    rootStyles: rootStyles,
    get generalStyles () {
      return rootStyles.filter(e => ['fontSize', 'textColor', 'padding', 'margin', 'elevations', 'contentWidth', 'visibilityBreakpoint'].includes(e.modelName))
    },
    get multiImageOptions () {
      return rootStyles.filter(e => ['multiImageGrid', 'multiImageOptions', 'multiImageTitleStyle', 'multiImageTitlePosition'].includes(e.modelName))
    }
  }
  export default {
    name: 'LcTextMixtedEdit',
    mixins: [contentEditMixin],
    inputFields: inputFields,
    selectOptions: {
      get contentClassNames () {
        let array = []
        inputFields.contentStyles.forEach(e => {
          array = array.concat(e.items.map(i => i.value || i))
        })
        return array
      },
      get rootClassNames () {
        let array = []
        inputFields.rootStyles.forEach(e => {
          array = array.concat(e.items.map(i => i.value || i))
        })
        return array
      },
      get headerClassNames () {
        let array = []
        inputFields.headerStyles.forEach(e => {
          array = array.concat(e.items.map(i => i.value || i))
        })
        return array
      },
      get imageColumnSizeOptions () {
        return ENUMS.IMAGE_COLUMNS
          .map(e => ({text: imageSizeOptions[e], value: e}))
          .concat([{
            value: 'variable',
            text: 'Image columns without breakpoint'
          }, {
            value: '',
            text: 'Slideshow'
          }])
      },
      predifinedLayouts: contentElementStylePreSets
    },
    computed: {
      predefinedLayoutValue: {
        get () {
          const currentStyles = this.model.styles
          const currentRoot = currentStyles.rootClassNames || []
          const currentHeader = currentStyles.headerClassNames || []
          const currentContent = currentStyles.contentClassNames || []
          const find = contentElementStylePreSets.find(item => {
            const exist = item.styles.headerClassNames.every(e => currentHeader.includes(e)) && currentHeader.length === item.styles.headerClassNames.length
            const exist2 = item.styles.rootClassNames.every(e => currentRoot.includes(e)) && currentRoot.length === item.styles.rootClassNames.length
            const exist3 = item.styles.contentClassNames.every(e => currentContent.includes(e)) && currentContent.length === item.styles.contentClassNames.length
            return exist3 && exist2 && exist
          })
          return find
        },
        set (v) {
          if (v) {
            this.$set(this.model, 'styles', Object.assign({}, v.styles))
          } else {
            this.$set(this.model, 'styles', {})
          }
        }
      },
      iframeResponsiveValue: {
        get () {
          // needs to be v-model because its v-switch
          return !!(this.model.styles.rootClassNames || []).find(e => e === 'responsive-frame')
        },
        set (v) {
          const item = 'responsive-frame'
          let rootClassNames = this.model.styles.rootClassNames.slice(0)
          if (v) {
            rootClassNames.push(item)
          } else {
            rootClassNames = rootClassNames.filter(e => e !== item)
          }
          this.$set(this.model, 'styles', Object.assign({}, this.model.styles, {
            rootClassNames
          }))
        }
      }
    }
  }
</script>
