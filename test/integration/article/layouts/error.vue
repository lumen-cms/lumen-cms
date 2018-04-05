<template>
  <lc-error :error="error"/>
</template>
<script>
  export default {
    props: {
      error: Object | String | Array
    }
  }
</script>
