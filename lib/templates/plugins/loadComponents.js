import Vue from 'vue'

const components = {
  CmsTest: () => import('~~/lib/templates/components/CmsTest.vue')
}

<% Object.keys(options).forEach((key) => {%>
  components['<%= key %>'] = () => import('<%= options[key] %>')
<% }) %>

console.log(components)

Vue.component(
  'cms-test',
  components.CmsTest
)
