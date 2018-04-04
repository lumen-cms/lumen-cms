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
        <v-select multiple
                  clearable
                  deletable-chips
                  label="Categories"
                  v-model="model.properties.categoriesIds"
                  name="categoriesIds"
                  :items="allArticleCategories || []"
                  chips
                  item-value="id"
                  item-text="title"/>
        <slot/>
        <v-select label="Limit list items"
                  v-model="model.properties.listItemsLimit"
                  name="listItemsLimit"
                  clearable
                  :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"/>

        <v-select label="List item type"
                  v-model="model.properties.listItemsType"
                  name="listItemsType"
                  :items="options.itemTypes"/>
        <v-select label="List style type"
                  v-model="model.properties.styleType"
                  name="styleType"
                  clearable
                  :items="options.styleTypes"/>

        <template v-if="(model.properties.styleType === 'Slider')">

          <v-select label="Slider height in px"
                    v-model="model.properties.sliderHeight"
                    name="sliderHeight"
                    clearable
                    :items="[300,400,500,600,700,800]"/>

          <v-checkbox label="Hide bottom bar?"
                      name="bottomBarHidden"
                      v-model="model.properties.bottomBarHidden"/>
        </template>

      </div>
      <div id="tab-styles" v-if="active === 'tab-styles'">
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
                           :autocomplete="style.autocomplete"
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
                           :autocomplete="style.autocomplete"
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
                           :autocomplete="style.autocomplete"
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
  import AllArticleCategoriesGql from '../../../../gql/articleCategory/allArticleCategories.gql'
  import styles from '../../../../util/contentEditStyleDefinitions'
  import contentEditMixin from '../../../../mixins/contentEditMixin'

  export default {
    name: 'LcListWidgetEdit',
    mixins: [contentEditMixin],
    data () {
      return {
        // domains: this.$cms.DOMAINS, // todo seems unused?
        allArticleCategories: []
      }
    },
    inputFields: {
      backgroundStyles: [styles.backgroundColor, styles.backgroundOpacity],
      rootStyles: [styles.padding, styles.margin, styles.elevations, styles.contentWidth, styles.visibilityBreakpoint]
    },
    apollo: {
      allArticleCategories: {
        query: AllArticleCategoriesGql,
        variables () {
          const key = this.$store.state.lc.locale || 'en'
          return {filter: {languageKey: key.toUpperCase()}}
        }
      }
    }
  }
</script>
