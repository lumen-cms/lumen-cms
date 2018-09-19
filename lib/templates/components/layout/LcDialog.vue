<template>
  <v-dialog v-model="showDialog"
            :content-class="dialogClass">
    <v-btn slot="activator"
           :class="showClass"
           :icon="icon && !label">
      <v-icon v-if="icon">{{ icon }}</v-icon>
      {{ label }}
    </v-btn>
    <v-card>
      <v-card-title class="pa-0">
        <v-spacer/>
        <v-btn icon @click="showDialog=false">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="pt-0">
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
      showClass: String,
      dialogClass: String
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
