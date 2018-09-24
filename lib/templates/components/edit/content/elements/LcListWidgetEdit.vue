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
        <v-btn @click="active = 'tab-content'" flat :class="{'info--text':active==='tab-content'}">
          Content
        </v-btn>
        <v-btn @click="active = 'tab-styles'" flat :class="{'info--text':active==='tab-styles'}">
          Design / Styles
        </v-btn>
      </v-layout>
    </v-toolbar>
    <v-card-text style="height: 50vh; overflow: auto;" v-show="!hideContent">
      <div id="tab-content" v-if="active === 'tab-content'">
        <lc-category-select v-model="model.properties.categoriesIds"/>

        <v-switch v-model="model.properties.allCategoriesMustMatch"
                  color="info"
                  :disabled="!(model.properties.categoriesIds && model.properties.categoriesIds.length)"
                  label="All categories must match"/>
        <slot/>
        <v-select label="Limit list items"
                  v-model="model.properties.listItemsLimit"
                  name="listItemsLimit"
                  clearable
                  :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"/>
        <v-select label="Sort items"
                  v-model="model.properties.orderBy"
                  :items="[{value:'createdAt_DESC',text:'Created'},{value:'updatedAt_DESC',text: 'Updated'},{value:'publishedDate_DESC',text:'Published'},{value:'title_ASC',text:'Title'}]"/>

        <v-switch label="Hide show more"
                  v-model="model.properties.hideShowMore"/>

        <v-select label="List item type"
                  v-model="model.properties.listItemsType"
                  name="listItemsType"
                  :items="options.itemTypes"/>
        <v-select label="List style type"
                  v-model="model.properties.styleType"
                  name="styleType"
                  clearable
                  :items="options.styleTypes"/>

        <template v-if="model.properties.styleType === 'Cards'">
          <v-switch v-model="model.properties.hideTagNames"
                    label="Hide tag categories"/>
        </template>

        <template v-if="(model.properties.styleType === 'Slider')">
          <v-select label="Slider Style"
                    :items="$options.inputFields.sliderStyles"
                    v-model="model.properties.sliderStyle"/>

          <template v-if="model.properties.sliderStyle === 'slideshow'">
            <v-select label="Items on each slide"
                      v-model="model.properties.sliderItemsRow"
                      :items="[1,2,3,4]"/>

            <v-switch v-model="model.properties.sliderImageCover"
                      label="Image cover"/>
            <v-select v-model="model.properties.sliderHeaderSize"
                      label="Header Size"
                      :items="['display-4','display-3','display-2','display-1','headline','title']"/>
          </template>

          <v-text-field label="Height"
                        v-model="model.properties.height"
                        type="number"/>

          <v-switch label="Show delimiters"
                    v-model="model.properties.sliderShowDelimiters"/>
          <v-switch label="Light design"
                    v-model="model.properties.sliderLightDesign"/>

          <v-text-field label="Auto rotation (ms)"
                        v-model="model.properties.sliderAutoRotation"
                        type="number"/>
        </template>

      </div>
      <div id="tab-styles" v-if="active === 'tab-styles'">
        <v-select v-model="model.properties.hideOnDivice"
                  :items="[{value:'mobile',text:'Hide on mobile'},{value:'mobileTablet',text:'Hide on tablet/mobile'},{value:'tabletDesktop',text:'Hide on tablet/desktop'},{value:'desktop',text:'Hide on desktop'}]"
                  label="Hide on device"
                  clearable/>
        <v-expansion-panel focusable>
          <v-expansion-panel-content lazy v-if="false">
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
                           @input="onSelectionsChange('content')"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy>
            <div slot="header">General</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <component v-for="style in $options.inputFields.rootStyles"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections[style.region][style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           @input="onSelectionsChange(style.region)"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy>
            <div slot="header">Background</div>
            <v-card>
              <v-card-text class="grey lighten-3">
                <component v-for="style in $options.inputFields.backgroundStyles"
                           :is="style.tag"
                           :items="style.items"
                           v-model="selections[style.region][style.modelName]"
                           :multiple="!!style.multiple"
                           :key="style.modelName"
                           :label="style.label"
                           clearable
                           @input="onSelectionsChange(style.region)"/>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </div>
    </v-card-text>
  </div>
</template>

<script>
  import styles from '../../../../util/contentEditStyleDefinitions'
  import contentEditMixin from '../../../../mixins/contentEditMixin'
  import LcCategorySelect from '../../form/LcCategorySelect'

  export default {
    name: 'LcListWidgetEdit',
    components: {LcCategorySelect},
    mixins: [contentEditMixin],
    inputFields: {
      backgroundStyles: [styles.backgroundColor, styles.backgroundOpacity],
      rootStyles: [styles.padding, styles.margin, styles.elevations, styles.contentWidth, styles.visibilityBreakpoint],
      sliderStyles: [{value: 'round', text: 'Rounded image'}, {value: 'slideshow', text: 'Slideshow'}]
    }
  }
</script>
