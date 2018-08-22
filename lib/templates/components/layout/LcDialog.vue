<template>
  <v-dialog>
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
    }
  }
</script>
