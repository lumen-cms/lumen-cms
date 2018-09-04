import ENUMS from '../gql/ENUMS'

export default {
  props: {
    value: Object
  },
  data () {
    return {
      active: 'tab-content',
      showImageAlert: true,
      hideContent: false,
      classTooltip: false,
      selections: {
        root: {},
        content: {},
        header: {},
        background: {},
        backgroundHeader: {}
      },
      model: {
        properties: {},
        styles: {
          rootClassNames: [],
          contentClassNames: [],
          headerClassNames: [],
          backgroundClassNames: [],
          backgroundHeaderClassNames: []
        }
      }
    }
  },
  watch: {
    model: {
      handler (v) {
        this.$emit('input', v)
        console.log(v)
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    const properties = Object.assign({}, this.value.properties)
    const styles = Object.assign({}, this.model.styles, this.value.styles)
    this.model = Object.assign({}, this.value)
    this.$set(this.model, 'properties', properties)
    this.$set(this.model, 'styles', styles)
    this.onInit()
  },
  computed: {
    typename () {
      return this.$store.state.lc.contentEditDialogData &&
        this.$store.state.lc.contentEditDialogData.content &&
        this.$store.state.lc.contentEditDialogData.content.type
    },
    options () {
      return {
        styleTypes: ENUMS.LIST_WIDGET_STYLE_TYPE,
        itemTypes: ENUMS.LIST_WIDGET_ITEMS_TYPE,
        headerLayoutOptions: ENUMS.HEADER_LAYOUT,
        typeOptions: ENUMS.CONTENT_LAYOUT_TYPE,
        imageOrientOptions: ENUMS.IMAGE_ORIENT,
        iconSizeOptions: ENUMS.ICON_SIZE
      }
    }
  },
  methods: {
    /**
     * @description minimize the dialog
     */
    triggerHide () {
      this.hideContent = !this.hideContent
      const el = document.getElementsByClassName('minimized-dialog-element')[0]
      el.classList[this.hideContent ? 'add' : 'remove']('should-minimize')
      this.$emit('onMinimize', this.hideContent)
    },
    /**
     * @description on initial load fill all convenient selection with styles of component regions
     */
    onInit () {
      ENUMS.STYLE_REGIONS.forEach(region => {
        this.onClassNamesChange(this.model.styles[region + 'ClassNames'], region)
      })
    },
    /**
     * @description on select fields adds the values to the wrapping class names
     * @param region
     */
    onSelectionsChange (region) {
      let mapped = []
      const values = this.selections[region]
      Object.keys(values).forEach(item => {
        const currentValues = values[item]
        if (!currentValues) return
        const isArray = Array.isArray(currentValues)
        if (isArray) {
          mapped = mapped.concat(currentValues)
        } else {
          mapped.push(currentValues)
        }
      })
      this.updateStyles(region, mapped)
    },
    /**
     * @description convenient adds all values of class names to more granular fields
     * Important: all styles need to exist as [region]Styles values as computed property
     * @param values
     * @param region
     */
    onClassNamesChange (values, region) {
      const elements = this.$options.inputFields[region + 'Styles'] ? this.$options.inputFields[region + 'Styles'] : this.$options.inputFields.styles
      if (!Array.isArray(values) || !elements) return
      elements.forEach(item => {
        let filtered
        const modelName = item.modelName
        const replacementItems = item.items.map(e => e.value || e)
        if (item.multiple) {
          filtered = replacementItems.filter(e => values.includes(e)).filter(e => e)
        } else {
          filtered = replacementItems.find(e => values.includes(e))
        }
        this.selections[region][modelName] = filtered
      })
      this.updateStyles(region, values)
    },
    /**
     * @description updates the styles and emits to parent
     * @param region
     * @param values
     */
    updateStyles (region, values) {
      this.model.styles[region + 'ClassNames'] = values
    }
  }
}
