<template>
  <v-dialog v-model="showDialog">
    <v-btn slot="activator"
           :class="showClass"
           :icon="icon && !label">
      <v-icon v-if="icon">{{ icon }}</v-icon>
      {{ label }}
    </v-btn>
    <v-card>
      <v-card-text>
        <slot/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'LcDialog',
    props: {
      icon: String,
      label: String,
      showClass: String
    },
    data () {
      return {
        showDialog: false
      }
    },
    watch: {
      '$route.fullPath' () {
        this.showDialog && (this.showDialog = false)
      }
    }
  }
</script>
