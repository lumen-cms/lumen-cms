<template>
  <v-btn :icon="!text"
         flat
         @click.native="$store.dispatch('triggerSave', !$store.state.lc.triggerSave)"
         :disabled="$store.state.lc.updating || !$store.state.lc.canSave"
         :loading="$store.state.lc.updating">
    <v-icon :dark="$store.state.lc.canSave" v-if="icon" v-text="icon"/>&nbsp;
    {{ text }}
  </v-btn>
</template>
<script>
  export default {
    name: 'LcTriggerSaveBtn',
    props: {
      icon: {
        type: String
      },
      text: {
        type: String
      }
    }
  }
</script>
