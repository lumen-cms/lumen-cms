<template>
  <v-select :items="$store.state.lc.materialIconNames"
            name="icon"
            v-model="model"
            label="Icon"
            autocomplete
            cache-items>
    <template slot="item" slot-scope="data">
      <v-list-tile-avatar>
        <v-icon>{{ data.item }}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{ data.item }}</v-list-tile-title>
      </v-list-tile-content>
    </template>
  </v-select>
</template>
<script>
  export default {
    name: 'LcMaterialIconPicker',
    props: {
      value: String
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    mounted () {
      if (!this.$store.state.lc.materialIconNames.length) {
        this.getMaterialNames()
      }
    },
    methods: {
      async getMaterialNames () {
        const fetched = await fetch('https://raw.githubusercontent.com/google/material-design-icons/224895a8/iconfont/codepoints')
          .then(res => res.text())
        const array = fetched.split('\n').map(item => item.split(' ')[0])
        this.$store.dispatch('setMaterialIconNames', array)
      }
    }
  }
</script>
