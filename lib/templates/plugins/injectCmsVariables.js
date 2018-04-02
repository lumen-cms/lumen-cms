export default async function ({app}, inject) {
  // make config options available with this.$cms in templates
  inject('cms',<%= serialize(options) %>)
}
