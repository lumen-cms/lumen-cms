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
    </v-toolbar>
    <v-card-text style="height: 50vh; overflow: auto;" v-show="!hideContent">

      <lc-material-icon-picker v-model="model.properties.icon"/>

      <v-select name="iconSize"
                v-model="model.properties.iconSize"
                label="Icon Size"
                :items="options.iconSizeOptions"
                clearable/>
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
    </v-card-text>
  </div>
</template>
<script>
  import contentEditMixin from '../../../../mixins/contentEditMixin'
  import styles from '../../../../util/contentEditStyleDefinitions'
  import LcMaterialIconPicker from '../../LcMaterialIconPicker'

  export default {
    name: 'LcDividerEdit',
    components: {
      LcMaterialIconPicker,
      VAutocomplete: () => import('vuetify/lib/components/VAutocomplete')
    },
    mixins: [contentEditMixin],
    inputFields: {
      styles:
        [styles.dividerWidth, styles.textColor, styles.backgroundColor, styles.backgroundOpacity, styles.margin, styles.padding, styles.visibilityBreakpoint]
    },
    data () {
      return {
        materialIcons: []
      }
    }
  }
</script>
