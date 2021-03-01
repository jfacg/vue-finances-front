<template>
  <v-app-bar
    app
    fixed
    color="primary"
  >
    <v-app-bar-nav-icon @click.stop="$emit('hide', !show)"></v-app-bar-nav-icon>
    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
</template>

<script>
import AppToolbar from './AppToolbar.vue'
export default {
  name: 'AppToolbar',
  props: {
    show: Boolean
  },
  model: {
    prop: 'show',
    event: 'hide'
  }
}
</script>
