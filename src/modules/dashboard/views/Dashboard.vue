<template>
  <AppLayout>
    <router-view />
  </AppLayout>

</template>

<script>
import AppLayout from './../componets/AppLayout.vue'

export default {
  name: 'Dashboard',
  components: {
    AppLayout
  }
}
</script>
