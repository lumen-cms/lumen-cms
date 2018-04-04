<template>
  <lc-form-container @onFormDirty="$emit('onFormDirty',$event)" ref="form">
    <v-text-field name="title" v-model="model.title" label="Title" v-if="!isBackground"/>
    <v-text-field name="alternative" v-model="model.alternative" label="Alt" v-if="!isBackground"/>
    <v-text-field name="caption" v-model="model.caption" label="Caption" v-if="!isBackground"/>

    <v-select name="styles" :value="bgSize" :items="bgSizeOptions"
              hint="[cover,contain,auto]" @change="onBackgroundChange($event,bgSizeOptions)"
              persistent-hint v-if="isBackground"/>

    <v-select name="styles" :value="bgRepeat" :items="bgRepeatOptions"
              hint="[no-repeat, repeat-x, repeat-y]" @change="onBackgroundChange($event,bgRepeatOptions)"
              persistent-hint v-if="isBackground"/>

    <v-select name="styles" :value="bgPosition" :items="bgPositionOptions"
              hint="[center, left, right]" @change="onBackgroundChange($event,bgPositionOptions)"
              persistent-hint v-if="isBackground"/>

    <v-text-field name="resize" v-model="model.resize" label="Resize"
                  hint="[500x300] | [500x / x300] | [500x300!]" persistent-hint/>
    <v-text-field name="crop" v-model="model.crop"
                  label="Crop" hint="[:round] | [0x0:400x400] | [0x0:400x400:round] - round only single image"
                  persistent-hint/>
    <v-text-field name="linkSlug" v-model="model.linkSlug" v-show="false" v-if="!isBackground"
                  label="this is just a recognize helper"/>
    <lc-page-href-select :value="model" @updated="onHref" v-if="!isBackground"/>
  </lc-form-container>
</template>
<script>
  import {firstCharToUpper} from '../../../util/string'

  export default {
    name: 'LcFileReferenceEdit',
    props: {
      content: Object,
      isBackground: Boolean
    },
    data () {
      return {
        model: {
          title: null,
          alternative: null,
          caption: null,
          file: {url: null},
          linkSlug: null,
          linkType: null,
          linkOpenExternal: false,
          linkId: null,
          backgroundStyles: []
        },
        disableLinkInput: false,
        showMenu: false
      }
    },
    computed: {
      bgSizeOptions () {
        return ['cover', 'contain', 'auto']
      },
      bgSize () {
        return this.findBgStyles(this.bgSizeOptions)
      },
      bgRepeatOptions () {
        return ['no-repeat', 'repeat-x', 'repeat-y']
      },
      bgRepeat () {
        return this.findBgStyles(this.bgRepeatOptions)
      },
      bgPositionOptions () {
        return ['center', 'left', 'right']
      },
      bgPosition () {
        return this.findBgStyles(this.bgPositionOptions)
      }
    },
    watch: {
      content () {
        this.setModel()
      }
    },
    mounted () {
      this.setModel()
    },
    methods: {
      findBgStyles (array) {
        return array.find(e => Array.isArray(this.model.backgroundStyles) && this.model.backgroundStyles.find(i => i === e))
      },
      setModel () {
        const model = Object.assign({}, this.model, this.content)
        model.backgroundStyles = model.backgroundStyles || []
        this.model = model
      },
      onBackgroundChange (item, options) {
        let bgElements = this.model.backgroundStyles || []
        bgElements = bgElements.filter(e => !options.includes(e))
        bgElements.push(item)
        this.$set(this.model, 'backgroundStyles', bgElements)
      },
      onHref (v) {
        if (!v) return
        v.type && (v.type = firstCharToUpper(v.type))
        this.model.linkSlug = v.value || null
        this.model.linkId = v.id || null
        this.model.linkOpenExternal = !!v.id
        this.model.linkType = v.type || null
      },
      resetDetection () {
        this.$refs.form.resetDetection()
      },
      async validate () {
        const v = this.$refs.form.validate()
        if (v) {
          this.$emit('fileReferenceUpdate', this.model)
        }
      }
    }
  }
</script>
