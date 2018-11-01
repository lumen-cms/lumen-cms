<template>
  <div>
    <v-toolbar flat>
      <v-spacer/>
      <v-btn icon @click="triggerHide">
        <v-icon>{{ !hideContent ? 'remove' : 'add' }}</v-icon>
      </v-btn>
      <v-btn icon @click="$store.dispatch('setContentEditDialogData', {})">
        <v-icon>clear</v-icon>
      </v-btn>
      <v-layout slot="extension" align-center v-show="!hideContent">
        <v-btn @click="active = 'tab-content'" flat
               :class="{'info--text':active==='tab-content'}">
          Settings
        </v-btn>
        <v-btn @click="active = 'tab-media'"
               v-if="model.properties.type !== 'Tabs'"
               flat
               :class="{'info--text':active==='tab-media'}">
          Background
        </v-btn>
        <v-btn @click="active = 'tab-styles'" flat
               :class="{'info--text':active==='tab-styles'}">
          Design / Styles
        </v-btn>
      </v-layout>
    </v-toolbar>
    <v-card-text style="height: 50vh; overflow: auto;" v-show="!hideContent">
      <div id="tab-content" v-show="active === 'tab-content'">
        <v-select v-model="model.properties.type" :items="options.typeOptions" label="Layout Type"/>

        <template v-if="model.properties.type === 'Tabs'">
          <component v-for="style in $options.inputFields.bgColors"
                     :is="style.tag"
                     :items="style.items"
                     v-model="selections[style.region][style.modelName]"
                     :multiple="!!style.multiple"
                     :key="style.modelName"
                     :label="style.label"
                     clearable
                     @input="onSelectionsChange(style.region)"/>
          <v-switch v-model="model.properties.dark"
                    color="info"
                    label="Dark design"/>
          <v-switch v-model="model.properties.grow"
                    color="info"
                    label="Grow"/>
        </template>

        <template v-if="model.properties.type === 'Slider'">
          <!-- this should match with properties of lc-list-widget -->
          <v-text-field label="Height"
                        v-model="model.properties.height"
                        type="number"/>
          <v-switch label="Enable transparent toolbar"
                    v-model="model.properties.transparentToolbar"/>
          <v-switch label="Show delimiters"
                    v-model="model.properties.sliderShowDelimiters"/>
          <v-switch label="Light design"
                    v-model="model.properties.sliderLightDesign"/>
          <v-text-field label="Auto rotation (ms)"
                        v-model="model.properties.sliderAutoRotation"
                        type="number"/>
        </template>

        <v-select :items="['inset', 'popout', 'expand', 'focusable']"
                  v-if="model.properties.type === 'ExpansionPanel'"
                  v-model="model.properties.properties"
                  label="Properties"
                  clearable/>
        <v-switch v-model="model.properties.isParallax"
                  color="info"
                  @change="model.properties.isFixedBackground=false"
                  v-if="model.properties.type === 'Columns'"
                  label="Parallax background"/>
        <v-switch v-model="model.properties.isFixedBackground"
                  @change="model.properties.isParallax=false"
                  color="info"
                  v-if="model.properties.type === 'Columns'"
                  label="Fixed background"/>
        <v-text-field v-model="model.properties.parallaxHeight"
                      v-if="model.properties.isParallax || model.properties.isFixedBackground"
                      label="Parallax / Background height"
                      hint="Default 300px"
                      persistent-hint/>
      </div>
      <div id="tab-styles" v-if="active === 'tab-styles'">
        <v-select v-model="model.properties.hideOnDivice"
                  :items="[{value:'mobile',text:'Hide on mobile'},{value:'mobileTablet',text:'Hide on tablet/mobile'},{value:'tabletDesktop',text:'Hide on tablet/desktop'},{value:'desktop',text:'Hide on desktop'}]"
                  label="Hide on device"
                  clearable/>
        <component v-for="style in $options.inputFields.styles"
                   :is="style.tag"
                   :items="style.items"
                   v-model="selections[style.region][style.modelName]"
                   :multiple="!!style.multiple"
                   :key="style.modelName"
                   :label="style.label"
                   clearable
                   @input="onSelectionsChange(style.region)"/>
        <v-btn icon @click="classTooltip=!classTooltip">
          <v-icon>help</v-icon>
        </v-btn>
        <v-alert v-model="classTooltip" color="info" dismissible>
          <lc-content-edit-help/>
        </v-alert>
      </div>

      <div id="tab-media" v-if="active === 'tab-media' && model.properties.type !== 'Tabs'">
        <component v-for="style in $options.inputFields.backgroundStyles"
                   :is="style.tag"
                   :items="style.items"
                   v-model="selections[style.region][style.modelName]"
                   :multiple="!!style.multiple"
                   :key="style.modelName"
                   :label="style.label"
                   clearable
                   @input="onSelectionsChange(style.region)"/>

        <lc-content-image-dialog v-if="model.id"
                                 :content="model"
                                 ref="contentImageDialog"/>
      </div>

    </v-card-text>
  </div>
</template>
<script>
  import mediaFileMixin from '../../../../mixins/mediaFileMixin'
  import contentEditMixin from '../../../../mixins/contentEditMixin'
  import styles from '../../../../util/contentEditStyleDefinitions'

  export default {
    name: 'LcLayoutEdit',
    mixins: [contentEditMixin, mediaFileMixin],
    inputFields: {
      styles: [styles.textColor, styles.margin, styles.padding, styles.elevations, styles.contentWidth, styles.visibilityBreakpoint],
      backgroundStyles: [styles.backgroundColor, styles.backgroundOpacity],
      bgColors: [styles.backgroundColor]
    },
    components: {
      VAutocomplete: () => import('vuetify/lib/components/VAutocomplete')
    }
  }
</script>
