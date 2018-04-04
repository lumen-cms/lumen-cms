export default {
  created () {
    this.startWatch()
  },
  destroyed () {
    this.$ls.off('setContentCutData', this.watchCut)
    this.$ls.off('setContentCopyData', this.watchCopy)
  },
  methods: {
    startWatch () {
      this.$ls.on('setContentCutData', this.watchCut)
      this.$ls.on('setContentCopyData', this.watchCopy)
    },
    watchCut () {
      const parsed = this.$ls.get('setContentCutData')
      this.$store.dispatch('setContentCutData', parsed)
    },
    watchCopy () {
      const parsed = this.$ls.get('setContentCopyData')
      this.$store.dispatch('setContentCopyData', parsed)
    }
  }
}
