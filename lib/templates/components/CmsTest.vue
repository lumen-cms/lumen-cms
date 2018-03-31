<template>
  <div>
    <h2>
      This is a CMS Test.vue
    </h2>
    <nested-test></nested-test>
  </div>
</template>
<script>
  import NestedTest from './NestedTest'
  export default {
    name: 'CmsTest',
    components:{NestedTest}
  }
</script>
