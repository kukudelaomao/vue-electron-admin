<template>
  <el-footer style="height:30px;margin-top:10px;">
    <el-pagination
      :current-page="page"
      :page-size="15"
      layout="pager, jumper"
      background
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-footer>
</template>
<script>
export default {
  name: 'Paging',
  props: {
    'totals': {
      type: Number,
      default: 0
    },
    'page': {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('gotoPage', val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
