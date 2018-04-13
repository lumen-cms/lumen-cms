<template>
  <v-btn class="blue content-create-btn" :class="{'new-layout-col': isNewLayoutCol}" icon dark
         @click.stop="$store.dispatch('setContentEditDialogData', {
           dialogType: 'create',
           isNewLayoutCol, previousElementSorting, layoutColumn, layoutIndex, contentLayoutElementId, pageContents, pageProps})">
    <v-icon v-text="isNewLayoutCol ? 'playlist_add' : 'add'"/>
  </v-btn>
</template>

<script>
  export default {
    name: 'LcContentCreateNewButton',
    props: {
      previousElementSorting: {
        type: Number,
        required: true
      },
      layoutColumn: {
        type: String | null,
        'default': null
      },
      layoutIndex: {
        type: Number | null
      },
      contentLayoutElementId: String | null,
      pageContents: Array,
      pageProps: Object,
      isNewLayoutCol: {
        type: Boolean,
        'default': false
      }
    }
  }
</script>

<style scoped lang="stylus">
  .content-create-btn {
    z-index 1
    position: absolute;
    transform: scale(0.5, 0.5) translate(-48px, 48px)
    &:hover {
      transform: scale(1, 1) translate(-24px, 24px)
    }
    &.new-layout-col {
      margin-right: 28px
      right: 0;
      top: 50%;
      transform: scale(0.5, 0.5) translate(48px, -48px)
      &:hover {
        transform: scale(1, 1) translate(24px, -24px)
      }
    }
    &:not(.new-layout-col) {
      bottom: 0;
      left: 50%;
    }
  }
</style>
