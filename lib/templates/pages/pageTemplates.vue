<template>
  <div class="has-toolbar-wrap">
    <lc-edit-toolbar>
      <v-spacer/>
      <lc-main-search/>
    </lc-edit-toolbar>

    <v-progress-linear indeterminate v-if="$apollo.queries.allPageTemplates.loading"/>
    <v-expansion-panel focusable>
      <v-expansion-panel-content v-for="(item,i) in allPageTemplates" :key="i" hide-actions>
        <v-layout slot="header" row align-center>
          <span>{{ item.title }}</span>
          <v-spacer/>
          <v-btn v-if="item.type === templateTypes.JSON"
                 icon
                 @click.stop="openMenuBuilder(item)">
            <v-icon>dashboard</v-icon>
          </v-btn>
          <v-btn @click.stop="onEdit(item)" icon>
            <v-icon>edit</v-icon>
          </v-btn>
        </v-layout>
        <v-card>
          <v-card-text class="grey lighten-3">
            <code>{{ item.body }}</code>
            <div><i>[{{ item.id }}]</i></div>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-btn fixed
           dark
           fab
           bottom
           right
           color="primary"
           @click.stop="bottomSheet = !bottomSheet">
      <v-icon>add</v-icon>
    </v-btn>

    <v-bottom-sheet v-model="bottomSheet"
                    :lazy="true"
                    :full-width="true">
      <v-card>
        <v-progress-linear :indeterminate="true" :active="processTemplateSync"/>
        <v-card-title>
          Add Page Template
          <v-spacer/>
          <v-btn @click.stop="bottomSheet = !bottomSheet" icon>
            <v-icon>clear</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="text-xs-center">
          <v-list>
            <v-list-tile @click="bottomSheet=false;onEdit({type:templateTypes.CODE})">
              <v-list-tile-action>
                <v-icon>code</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Code</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="bottomSheet=false;onEdit({type:templateTypes.JSON})">
              <v-list-tile-action>
                <v-icon>menu</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Navigation => currently WIP not ready for usage</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="syncDefaultTemplates()">
              <v-list-tile-action>
                <v-icon>sync</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Synchronize Default Templates</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>

    <lc-edit-page-template-dialog @refetchTemplates="onRefetch"
                                  v-model="selectedModel"
                                  ref="pageTemplateDialog"/>
    <lc-menu-builder :content="selectedModel"
                     ref="menuBuilder"/>
    <lc-edit-footer/>
  </div>
</template>

<script>
  import allPageTemplatesGql from '../gql/pageTemplate/allPageTemplates.gql'
  import {slugifyTemplateKey} from '../util/slugifyHelpers'
  import slugify from 'slugify'

  const TEMPLATE_TYPE = {
    CODE: 'CODE',
    JSON: 'JSON'
  }

  export default {
    layout: 'admin',
    middleware: 'isAuth',
    data () {
      return {
        selectedModel: {},
        bottomSheet: false,
        processTemplateSync: false,
        allPageTemplates: [],
        loadingKey: 0
      }
    },
    computed: {
      templateTypes () {
        return TEMPLATE_TYPE
      },
      pageTemplatesByCurrentLocale () {
        const currentLocaleUpper = this.$store.state.lc.locale.toUpperCase()
        return this.allPageTemplates
          ? this.allPageTemplates.filter(pageTemplate => (pageTemplate.languageKey === currentLocaleUpper))
          : []
      }
    },
    methods: {
      onRefetch () {
        this.allPageTemplates = []
        this.refetchGql('allPageTemplates')
      },
      openDialog () {
        const ref = this.$refs.pageTemplateDialog
        ref.openDialog()
      },
      openMenuBuilder (item) {
        this.selectedModel = item
        this.$refs.menuBuilder.toggleVisibility()
      },
      onEdit (item) {
        this.selectedModel = item
        this.openDialog()
      },
      async syncDefaultTemplates () {
        const ref = this.$refs.pageTemplateDialog
        const templates = Object.keys(this.$cms.TEMPLATE)
        this.processTemplateSync = true
        for (const template of templates) {
          const key = slugifyTemplateKey(template, this.$store.state.lc.locale)
          const variables = {
            title: slugify((template + ' ' + this.$store.state.lc.locale.toUpperCase()).replace('_', ' '), {
              replacement: ' ',
              remove: /[$*_+~.()'"!\-:@]/g
            }),
            type: TEMPLATE_TYPE.CODE,
            key: key,
            body: '<div><!-- place your content here --></div>',
            languageKey: this.$store.state.lc.locale.toUpperCase()
          }
          if (!this.allPageTemplates.find(e => e.key === key)) {
            await ref.submitTemplate(variables)
          }
        }
        this.processTemplateSync = false
        this.bottomSheet = false
      }
    },
    apollo: {
      allPageTemplates: {
        query: allPageTemplatesGql,
        variables () {
          return {
            languageKey: this.$store.state.lc.locale.toUpperCase()
          }
        }
      }
    }
  }
</script>
