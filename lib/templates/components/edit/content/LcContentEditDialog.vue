<template>
  <v-dialog :value="isShown"
            :lazy="true"
            :persistent="true"
            :scrollable="true"
            :hide-overlay="false"
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
        minimizeContent: false,
        model: Object.assign({}, {classNames: []}, this.$store.state.lc.contentEditDialogData.content)
      }
    },
    computed: {
      typename () {
        const data = this.$store.state.lc.contentEditDialogData
        // return data && data.content && data.content.__typename
        return data && data.content && data.content.type
      },
      componentName () {
        const contentElements = this.$cms.componentMapping.contentElements
        console.log('inside computed', contentElements)
        const mapping = contentElements.edit // todo need to verify that this works
        return mapping[this.typename]
      },
      isShown () {
        return this.$store.getters.getDialogType === 'edit'
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
