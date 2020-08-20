<template>
  <div class="app-container">
    <model-right ref="modelRight" />
  </div>
</template>

<script>
import modelRight from './components/model-right'
export default {
  components: {
    modelRight
  },
  data() {
    return {
    }
  },
  created() {
    // this.loadRight().then((RBResult) => {
    //   if (RBResult === 'getRBSuccess' && this.$refs.modelRight) {
    //     this.$refs.modelRight.getButtonRight()
    //   }
    // })
  }
}
</script>

<style scoped>
</style>
