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
  VFlex,
  VIcon,
  VImg,
  VLabel,
  VLayout,
  VMenu,
  VProgressCircular,
  VProgressLinear,
  VSpacer,
  VTabs,
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
    VFlex,
    VIcon,
    VImg,
    VLabel,
    VLayout,
    VMenu,
    VProgressCircular,
    VProgressLinear,
    VSpacer,
    VTabs,
    VTooltip
  },
  directives: {
    Ripple,
    Scroll
  }
})
