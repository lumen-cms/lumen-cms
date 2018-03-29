export default async function ({app}, inject) {
  inject('cms',<%= serialize(options) %>) // make config options available with this.$cms in templates
}
