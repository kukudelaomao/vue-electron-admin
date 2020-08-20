<template>
  <div class="app-container">
    <model-left ref="modelLeft" @showRightTable="showRightTable" />
    <model-right ref="modelRight" @reLoad="reLoad" />
  </div>
</template>

<script>
import modelLeft from './components/model-left'
import modelRight from './components/model-right'
export default {
  components: {
    modelLeft,
    modelRight
  },
  data() {
    return {
    }
  },
  created() {
    this.loadRight().then((RBResult) => {
      if (RBResult === 'getRBSuccess' && this.$refs.modelRight) {
        this.$refs.modelRight.getButtonRight()
      }
    })
  },
  methods: {
    // 左侧子组件点击后,调用右侧子组件的方法
    showRightTable(data) {
      this.$refs.modelRight.getData(data)
    },
    // 右侧组件调用左侧组件刷新树形结构
    reLoad() {
      this.$refs.modelLeft.loadTree()
    }
  }
}
</script>

<style scoped>
</style>
