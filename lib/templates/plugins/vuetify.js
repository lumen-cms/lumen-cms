import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VToolbar,
  // custom
  VList,
  VListGroup,
  VListTile,
  VListTileAction,
  VListTileActionText,
  VListTileAvatar,
  VListTileContent,
  VListTileSubTitle,
  VListTileTitle,
  VBtn,
  VCarousel,
  VCarouselItem,
  VCard,
  VCardActions,
  VCardMedia,
  VCardText,
  VCardTitle,
  VCheckbox,
  VContainer,
  VContent,
  VDialog,
  VDivider,
  VExpansionPanel,
  VExpansionPanelContent,
  VFlex,
  VIcon,
  VImg,
  VLabel,
  VLayout,
  VMenu,
  VProgressCircular,
  VProgressLinear,
  VSpacer,
  VTab,
  VTabs,
  VTabItem,
  VTabsItems,
  VTooltip
} from 'vuetify/lib'
import { Ripple, Scroll } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VToolbar,
    // custom
    VBtn,
    VList,
    VListGroup,
    VListTile,
    VListTileAction,
    VListTileActionText,
    VListTileAvatar,
    VListTileContent,
    VListTileSubTitle,
    VListTileTitle,
    VCarousel,
    VCarouselItem,
    VCard,
    VCardActions,
    VCardMedia,
    VCardText,
    VCardTitle,
    VCheckbox,
    VContainer,
    VContent,
    VDialog,
    VDivider,
    VExpansionPanel,
    VExpansionPanelContent,
    VFlex,
    VIcon,
    VImg,
    VLabel,
    VLayout,
    VMenu,
    VProgressCircular,
    VProgressLinear,
    VSpacer,
    VTab,
    VTabs,
    VTabItem,
    VTabsItems,
    VTooltip
  },
  directives: {
    Ripple,
    Scroll
  },
  minifyTheme: function (css) {
    return process.env.NODE_ENV === 'production'
      ? css.replace(/[\s|\r\n|\r|\n]/g, '')
      : css
  },
  theme: <%= JSON.stringify(options.theme, null, 2) %>
})
