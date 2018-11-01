import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VNavigationDrawer,
  VToolbar,
  // custom
  VList,
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
  }
})
