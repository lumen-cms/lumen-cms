<template>
  <v-layout row>
    <v-btn :disabled="disabled" flat
           :icon="icon && !label"
           :class="btnClass"
           @click="showConfirm = !showConfirm">
      <v-icon v-if="icon" v-text="icon"/>
      <span v-if="label" v-text="label"/>
    </v-btn>
    <template v-if="showConfirm">
      <v-btn flat icon @click="showConfirm = false">
        <v-icon class="red--text">cancel</v-icon>
      </v-btn>
      <v-btn flat icon @click="!disabled && $emit('onConfirm',true)"
             :loading="loading || $store.state.lc.updating || $store.state.lc.deleting">
        <v-icon class="green--text">check_circle</v-icon>
      </v-btn>
    </template>
  </v-layout>
</template>
<script>
  export default {
    name: 'LcConfirmBtn',
    props: {
      label: String,
      icon: String,
      btnClass: String,
      loading: {
        type: Boolean,
        default: false
      },
      disabled: Boolean
    },
    data () {
      return {
        showConfirm: false
      }
    }
  }
</script>
