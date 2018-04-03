export default function ({app,store}, inject) {
  // make config options available with this.$cms in templates
    console.log('init cms variables',<%= serialize(options) %>)
  inject('cms', <%= serialize(options) %>)
  app.cms = <%= serialize(options) %>
  app.$cms = <%= serialize(options) %>
}
