<template>
  <el-card class="cardAll">
    <div ref="searchRow">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-input v-model="searchForm.contentTitle" placeholder="模板名称/模板标识" clearable />
          </el-col>
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-select v-model="searchForm.status" class="search-width-100" placeholder="请选择状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-select v-model="searchForm.sendType" class="search-width-100" placeholder="请选择发送方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-button type="primary" @click="loadData()">搜索</el-button>
            <el-button @click="resetSearchForm()">重置</el-button>
          </el-col>
          <el-button
            v-if="rightForm.delete"
            type="danger"
            class="operateButton"
            @click="deleteData(2)"
          >删除</el-button>
          <el-button
            v-if="rightForm.forbidden"
            type="warning"
            class="operateButton"
            @click="switchStateDatas(1)"
          >禁用</el-button>
          <el-button
            v-if="rightForm.startUsing"
            type="success"
            class="operateButton"
            @click="switchStateDatas(2)"
          >启用</el-button>
          <el-button
            v-if="rightForm.add"
            type="primary"
            class="operateButton"
            @click="showDialog()"
          >新增</el-button>
        </el-col>
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
        prop="name"
        label="标题"
      />
      <el-table-column
        prop="mark"
        label="模板标识"
      />
      <el-table-column
        prop="sendTypeName"
        label="发送方式"
      />
      <el-table-column
        prop="status"
        label="禁用/开启"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isShow"
            @change="switchState(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="模板内容"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="showContentDialog(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
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
    <!-- 新增邮件模板弹窗 -->
    <add-dialog ref="addDialog" @reLoad="postFn" />
    <!-- 查看邮件模板弹窗 -->
    <el-dialog
      title="查看邮件模板"
      :visible.sync="contentDialogVisible"
      width="800px"
    >
      <div>{{ dialogContent }}</div>
      <span slot="footer" class="dialog-footer" />
    </el-dialog>
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
      pageSize: this.protocol.param_findEmailTemplate.data.size
        ? this.protocol.param_findEmailTemplate.data.size : 15,
      tableData: [],
      multipleSelection: [],
      tableHeight: 0,
      searchForm: {
        contentTitle: null,
        status: null,
        sendType: null
      },
      // 接入真实接口时全部改为false
      rightForm: {
        add: true,
        edit: true,
        delete: true,
        forbidden: true,
        startUsing: true
      },
      loading: false,
      contentDialogVisible: false,
      dialogContent: '',
      statusOptions: [],
      options: []
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
      this.rightForm.forbidden = this.rightButtonCheck('article-forbidden')
      this.rightForm.startUsing = this.rightButtonCheck('article-startUsing')
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
      this.protocol.param_findEmailTemplate.data = {
        page: this.initPage,
        size: this.protocol.param_findEmailTemplate.data.size
          ? this.protocol.param_findEmailTemplate.data.size : 15,
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
      this.protocol.param_findEmailTemplate.data.size = size
      this.postFn(this.initPage)
    },
    postFn(page) {
      const that = this
      this.loading = true
      if (page !== null) {
        this.protocol.param_findEmailTemplate.data.page = page
      }
      this.http.postDev(this.protocol.param_findEmailTemplate).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          for (const item of value.content) {
            // 禁用/开启
            if (item.status === 1) {
              item.isShow = true
            } else {
              item.isShow = false
            }
            // 发送方式
            if (item.sendType === 1) {
              item.sendTypeName = '手机短信'
            } else if (item.sendType === 2) {
              item.sendTypeName = '邮件'
            }
          }
          for (const item of value.content) {
            item.createTime = this.dataFormat.formatDate.format(item.createTime)
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
    showContentDialog(row) {
      this.contentDialogVisible = true
      this.dialogContent = row.content
    },
    switchState(row) {
      const that = this
      this.protocol.param_saveEmailTemplate.data.id = row.id
      this.protocol.param_saveEmailTemplate.data.sendType = row.sendType
      this.protocol.param_saveEmailTemplate.data.name = row.name
      this.protocol.param_saveEmailTemplate.data.mark = row.mark
      this.protocol.param_saveEmailTemplate.data.content = row.content
      this.protocol.param_saveEmailTemplate.data.status = row.isShow === true ? 1 : 0
      this.http.postDev(this.protocol.param_saveEmailTemplate).then(res => {
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
          this.protocol.param_deleteEmailTemplate.data.id = deleteIds
          this.http.postDev(this.protocol.param_deleteEmailTemplate).then(res => {
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
    switchStateDatas(type) {
      // type=1 禁用 type=2 启用
      let confirmMessage
      let confirmType
      if (type === 1) {
        confirmMessage = '请确认是否禁用？'
        confirmType = 'error'
      } else if (type === 2) {
        confirmMessage = '请确认是否启用？'
        confirmType = 'success'
      }
      this.$confirm(confirmMessage, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: confirmType
      })
        .then(() => {
          const deleteIds = []
          for (const item of this.multipleSelection) {
            deleteIds.push(item.id)
          }
          const that = this
          this.protocol.param_switchEmailTemplateState.data.type = type
          this.protocol.param_switchEmailTemplateState.data.categoryId = deleteIds
          this.http.postDev(this.protocol.param_switchEmailTemplateState).then(res => {
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
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

