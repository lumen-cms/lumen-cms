export default {
  methods: {
    layoutPanelHandler (content, currentClass) {
      if (content.layoutPanel) {
        currentClass[content.layoutPanel] = true
        if (content.layoutPanel.includes('Alert')) {
          currentClass['st-alert'] = true
        }
        if (content.layoutPanel.includes('Panel')) {
          currentClass['st-panel'] = true
        }
        delete currentClass['content-element']
        delete currentClass['content-text-image']
      }
    }
  }
}
