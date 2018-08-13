<template>
  <v-dialog v-model="isShown"
            :lazy="true"
            :persistent="true"
            :scrollable="true"
            hide-overlay
            no-click-animation
            content-class="minimized-dialog-element"
            max-width="700px"
            :fullscreen="$vuetify.breakpoint.xsOnly">
    <v-card>
      <component :is="componentName"
                 v-model="model"
                 @onMinimize="minimizeContent = $event"/>
      <v-progress-linear :indeterminate="true"
                         :active="$store.state.lc.updating"/>
      <v-card-actions v-show="!minimizeContent">
        <v-spacer/>
        <v-btn flat="flat"
               @click.native="onHide">Cancel
        </v-btn>
        <v-btn class="blue--text darken-1" flat="flat"
               :disabled="$store.state.lc.updating"
               @click="onSave">Save
        </v-btn>
        <v-btn class="green--text darken-1" flat="flat"
               v-show="model && model.id"
               :disabled="$store.state.lc.updating"
               @click="onSaveClose">Save & Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  // import contentElements from '../../../../src/components/content/edit'

  export default {
    name: 'LcContentEditDialog',
    // components: contentElements,
    data () {
      return {
        isShown: false,
        minimizeContent: false,
        model: Object.assign({}, {classNames: []}, this.$store.state.lc.contentEditDialogData.content)
      }
    },
    watch: {
      '$store.state.lc.contentEditDialogData.dialogType': {
        handler (v) {
          this.isShown = v === 'edit'
        },
        immediate: true
      }
    },
    computed: {
      typename () {
        const data = this.$store.state.lc.contentEditDialogData
        // return data && data.content && data.content.__typename
        return data && data.content && data.content.type
      },
      componentName () {
        const components = this.$cms.componentMapping
        const componentName = components[this.typename] && components[this.typename].name
        if (componentName) {
          return componentName
        } else {
          console.warn('component is not recognized: ', this.typename)
          console.warn('Did you add the component into this.$cms.componentMapping?')
          return null
        }
      }
    },
    methods: {
      async onSaveClose () {
        try {
          this.triggerSaveOnImages()
          await this.onSubmit()
          this.onHide()
        } catch (e) {
          console.log('onSaveClose', e)
        }
      },
      triggerSaveOnImages () {
        const btns = window.document.body.querySelectorAll('.submitFileRefBtn')
        if (btns && btns.length) {
          // trigger save click on each content image
          btns.forEach(e => e.click())
        }
      },
      async onSave () {
        this.triggerSaveOnImages()
        await this.onSubmit()
      },
      async onSubmit () {
        const properties = this.model.properties || {}
        if (properties.imageColumnSize && properties.imageColumnSize === '') {
          properties.imageColumnSize = null
        }
        const variables = Object.assign({}, this.model, {properties})
        if (this.model.id) {
          await this.$parent.onContentUpdate({variables})
        } else {
          delete variables.id
          delete variables.__typename
          const res = await this.$parent.onContentCreate({variables})
          this.model.id = res.id
        }
      },
      onHide () {
        this.$store.dispatch('setContentEditDialogData', {})
      }
    }
  }
</script>
<style>
  .minimized-dialog-element.should-minimize {
    right: 16px;
    bottom: 16px;
    width: 115px;
    position: absolute;
  }
</style>
