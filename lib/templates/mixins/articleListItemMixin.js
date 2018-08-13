export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    styleType: {
      type: String | null,
      'default': 'Cards'
    },
    height: {
      type: Number | null | false,
      'default': null
    },
    properties: {
      type: Object,
      'default': () => {
      }
    }
  },
  computed: {
    previewImage () {
      const mediaImg = this.item.media && this.item.media.find(mediaItem => mediaItem.previewImage)
      const previewImage = mediaImg && mediaImg.previewImage
      return previewImage || 'https://placeholdit.co//i/500x500?bg=000&text=No Image found'
    },
    localPublishedDate () {
      if (!this.item.publishedDate) return
      const d = new Date(this.item.publishedDate)
      return d.toLocaleDateString()
    }
  }
}
