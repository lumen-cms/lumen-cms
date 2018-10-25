<template>
  <v-card v-bind="genCardAttrs"
          flat>
    <v-layout align-center justify-center fill-height>
      <figure>
        <img v-bind="genImgAttrs">
      </figure>
    </v-layout>
  </v-card>
</template>
<script>
  import imageSourceSetMixin from '../../../../mixins/getImageSourceSet'
  import imageHelperMixin from '../../../../mixins/imageHelperMixin'
  import linkHelperMixin from '../../../../mixins/linkHelperMixin'

  export default {
    name: 'LcImageLightboxItem',
    mixins: [linkHelperMixin, imageSourceSetMixin, imageHelperMixin],
    props: {
      content: Object
    },
    computed: {
      genCardAttrs () {
        if (this.content.linkSlug) {
          const isLinkExternal = this.content.linkSlug && this.isExternalUrl(this.content.linkSlug)
          const linkAttrs = isLinkExternal
            ? {href: this.content.linkSlug}
            : {to: `/${this.content.linkSlug}`}
          return linkAttrs
        }
        return {}
      },
      genImgAttrs () {
        return {
          ...this.getImageSourceSet(this.content),
          ...this.getFileAttrs(this.content, null, null, true)
        }
      }
    }
  }
</script>
