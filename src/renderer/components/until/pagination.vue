<template>
  <el-footer style="height: 30px; margin-top: 20px; padding: 0px;">
    <el-pagination
      :current-page="initPage === 0 ? page : page + 1"
      :page-sizes="[15, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, pager, jumper, sizes"
      background
      :total="totals"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-footer>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    'totals': {
      type: Number,
      default: 0
    },
    'initPage': {
      type: Number,
      default: 0
    },
    'page': {
      type: Number,
      default: 0
    },
    'pageSize': {
      type: Number,
      default: 15
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('changePageSize', val)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.$emit('gotoPage', val)
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
