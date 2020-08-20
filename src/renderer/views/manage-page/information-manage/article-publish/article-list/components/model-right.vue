<template>
  <el-card class="cardAll">
    <div ref="searchRow">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.contentTitle" placeholder="文章标题" clearable />
        </el-col>
        <el-col :xs="12" :sm="10" :md="6" :lg="6" class="searchItem">
          <el-button type="primary" @click="loadData()">搜索</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
          <!-- 导出 -->
          <export-excel
            class="exportButton"
            :table-ref="$refs.table"
            :search-form="searchForm"
            this.protocol-name="param_exportWithdrawList"
            :file-name="'文件名称.xlsx'"
          />
        </el-col>
        <el-button
          v-if="rightForm.delete"
          type="danger"
          class="operateButton"
          @click="deleteData(2)"
        >删除</el-button>
        <el-button
          v-if="rightForm.add"
          type="primary"
          class="operateButton"
          @click="showDialog()"
        >新增</el-button>
      </el-row>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      border
      :height="tableHeight"
      :data="tableData"
      highlight-current-row
      header-cell-class-name="table-head-cell-class"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
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
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
          <el-button @click="handleCopy(scope.row.author, $event)">复制</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
      />
      <el-table-column
        prop="state"
        label="显示/隐藏"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            @change="switchState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="rightForm.edit" type="primary" size="mini" plain @click="showDialog(scope.row)">编辑</el-button>
          <el-button v-if="rightForm.delete" type="danger" size="mini" plain @click="deleteData(1, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :totals="total" :page="page" :init-page="initPage" :page-size="pageSize" @gotoPage="gotoPage" @changePageSize="changePageSize" />
    <!-- 新增文章弹窗 -->
    <add-dialog ref="addDialog" @reLoad="postFn" />
  </el-card>
</template>
<script>
import addDialog from './add-dialog'
export default {
  components: {
    addDialog
  },
  data() {
    return {
      total: 1,
      initPage: 0,
      page: 0,
      pageSize: this.protocol.param_findContent.data.size
        ? this.protocol.param_findContent.data.size : 15,
      tableData: [],
      multipleSelection: [],
      tableHeight: 0,
      searchForm: {
        contentTitle: null
      },
      // 接入真实接口时全部改为false
      rightForm: {
        add: true,
        edit: true,
        delete: true
      },
      loading: false
    }
  },
  created() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.searchRow.style.height - 215 // 305
    })
  },
  mounted() {
    this.loadData()
  },
  methods: {
    getButtonRight() {
      this.rightForm.add = this.rightButtonCheck('article-add')
      this.rightForm.edit = this.rightButtonCheck('article-edit')
      this.rightForm.delete = this.rightButtonCheck('article-delete')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetSearchForm() {
      this.searchForm = {
        contentTitle: null
      }
    },
    loadData() {
      this.protocol.param_findContent.data = {
        page: this.initPage,
        size: this.protocol.param_findContent.data.size
          ? this.protocol.param_findContent.data.size : 15,
        sort: [],
        contentTitle: this.searchForm.contentTitle ? this.searchForm.contentTitle : null
      }
      this.postFn(this.initPage)
    },
    gotoPage(page) {
      const gotoPage = this.initPage === 0 ? page - 1 : page
      this.postFn(gotoPage)
    },
    changePageSize(size) {
      this.protocol.param_findContent.data.size = size
      this.postFn(this.initPage)
    },
    postFn(page) {
      const that = this
      this.loading = true
      if (page !== null) {
        this.protocol.param_findContent.data.page = page
      }
      this.http.postDev(this.protocol.param_findContent).then(res => {
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
    },
    showDialog(row) {
      this.$refs.addDialog.showDialog(row)
    },
    switchState(row) {
      const that = this
      this.protocol.param_saveContent.data.id = row.id
      this.protocol.param_saveContent.data.categoryId = row.categoryId
      this.protocol.param_saveContent.data.contentTitle = row.contentTitle
      this.protocol.param_saveContent.data.contentText = row.contentText
      this.protocol.param_saveContent.data.state = row.isShow === true ? 1 : 0
      this.http.postDev(this.protocol.param_saveContent).then(res => {
        const { code, message } = res.data
        if (code === 0) {
          that.$message({ type: 'success', message: message })
          that.postFn()
        } else {
          that.$message({ type: 'warning', message: message })
        }
      })
    },
    deleteData(type, row) {
      // type:1 单独删除 type:2 批量删除
      this.$confirm('删除后不能恢复，确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          const deleteIds = []
          if (type === 1) {
            deleteIds.push(row.id)
          } else if (type === 2) {
            for (const item of this.multipleSelection) {
              deleteIds.push(item.id)
            }
          }
          const that = this
          this.protocol.param_deleteContent.data.id = deleteIds
          this.http.postDev(this.protocol.param_deleteContent).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              that.$message({ type: 'success', message: message })
              that.postFn()
            } else {
              that.$message({ type: 'warning', message: message })
            }
          })
        })
        .catch(() => {
          this.$refs.table.clearSelection()
        })
    },
    handleCopy(text, event) {
      this.clip(text, event)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

