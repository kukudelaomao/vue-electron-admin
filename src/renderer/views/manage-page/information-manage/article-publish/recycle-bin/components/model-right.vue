<template>
  <el-card class="cardAll">
    <div ref="searchRow" />
    <el-table
      ref="table"
      v-loading="loading"
      border
      :height="tableHeight"
      :data="tableData"
      highlight-current-row
      header-cell-class-name="table-head-cell-class"
    >
      <el-table-column
        prop="id"
        label="ID"
      />
      <el-table-column
        prop="contentTitle"
        label="标题"
      />
      <el-table-column
        prop="categoryName"
        label="栏目"
      />
      <el-table-column
        prop="author"
        label="发布人"
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
      />
      <el-table-column
        prop="deleteTime"
        label="删除时间"
      />
      <el-table-column
        prop="deletePerson"
        label="删除人"
      />
    </el-table>
    <pagination :totals="total" :page="page" :init-page="initPage" :page-size="pageSize" @gotoPage="gotoPage" @changePageSize="changePageSize" />
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      total: 1,
      initPage: 0,
      page: 0,
      pageSize: this.protocol.param_findRecycleBinContent.data.size
        ? this.protocol.param_findRecycleBinContent.data.size : 15,
      tableData: [],
      tableHeight: 0,
      loading: false
    }
  },
  created() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - 167
    })
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.protocol.param_findContent.data = {
        page: this.initPage,
        size: this.protocol.param_findRecycleBinContent.data.size
          ? this.protocol.param_findRecycleBinContent.data.size : 15,
        sort: []
      }
      this.postFn(this.initPage)
    },
    gotoPage(page) {
      const gotoPage = this.initPage === 0 ? page - 1 : page
      this.postFn(gotoPage)
    },
    changePageSize(size) {
      this.protocol.param_findRecycleBinContent.data.size = size
      this.postFn(this.initPage)
    },
    postFn(page) {
      const that = this
      this.loading = true
      if (page !== null) {
        this.protocol.param_findRecycleBinContent.data.page = page
      }
      this.http.postDev(this.protocol.param_findRecycleBinContent).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          for (const item of value.content) {
            if (item.state === 1) {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          for (const item of value.content) {
            item.updateTime = this.dataFormat.formatDate.format(item.updateTime)
            item.deleteTime = this.dataFormat.formatDate.format(item.deleteTime)
          }
          that.tableData = value.content
          that.total = value.totalElements
          if (page !== null) {
            that.page = page
          }
          if ((that.tableData.length === 0) && (that.page >= this.initPage + 1)) {
            that.postFn(that.page - 1)
          }
        } else {
          that.$message({ type: 'warning', message: message })
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.addButton {
  float: right;
}
.deleteButton {
  float: right;
  margin-right: 10px;
}
</style>

