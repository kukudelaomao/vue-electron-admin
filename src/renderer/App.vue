<template>
  <div id="app" :class="language==='en' ? 'enApp' : ''">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    language() {
      return this.$store.getters.language
    }
  }
}
</script>
