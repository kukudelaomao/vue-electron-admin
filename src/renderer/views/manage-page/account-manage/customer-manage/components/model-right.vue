<template>
  <el-card class="cardAll">
    <div>
      <el-row ref="searchRow" :gutter="10">
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.firmCode" placeholder="客户编码" clearable />
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.firmName" placeholder="客户名称" clearable />
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.firmName" placeholder="客户名称" clearable />
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.firmName" placeholder="客户名称" clearable />
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-button type="primary" @click="loadData()">搜索</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-col>
        <el-button
          type="primary"
          class="operateButton"
          @click="showDialog('创建客户')"
        >创建客户</el-button>
        <export-excel
          class="exportButton"
          :table-ref="$refs.table"
          :search-form="searchForm"
          protocol-name="param_export_exportAccountFundsFlowToday"
          :file-name="'基差订单查询.xlsx'"
        />
      </el-row>

    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :height="tableHeight"
      :data="tableData"
      highlight-current-row
      header-cell-class-name="table-head-cell-class"
      show-summary
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="客户名称" prop="firmName" align="center" />
      <el-table-column label="客户编码" prop="firmCode" align="center" />
      <!-- <el-table-column label="推荐人" prop="parentUserCode" /> -->
      <el-table-column label="所属用户" prop="userCode" align="center" />
      <el-table-column label="客户状态" prop="firmStatus" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.firmStatus == 'C'">已开户</span>
          <span v-else-if="scope.row.firmStatus == 'A'">已激活</span>
          <span v-else-if="scope.row.firmStatus == 'D'">已注销</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" prop="createTime" :formatter="dateFormat" align="center" />
      <el-table-column label="更新时间" prop="updateTime" :formatter="dateFormat" align="center" />
      <!-- <el-table-column label="操作" width="200" fixed="right" align="center"> -->
      <!-- <template slot-scope="scope">
          <el-button
            v-if="rightForm.unfreeze"
            plain
            size="mini"
            type="success"
            @click="freezonMethod(scope.row.firmId,'1')"
          >解冻</el-button>
          <el-button
            v-if="rightForm.freeze"
            plain
            size="mini"
            type="warning"
            @click="freezonMethod(scope.row.firmId,'2')"
          >冻结</el-button>
        </template> -->
      <!-- </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <el-button
            v-if="rightForm.edit"
            type="warning"
            size="mini"
            plain
            @click="showDialog('修改客户信息',scope.row)"
          >修改客户信息</el-button> -->
          <div style="margin-top:2px;">
            <!-- <el-button
              v-if="rightForm.delete && scope.row.firmStatus !== 0"
              type="danger"
              size="mini"
              plain
              @click="deleteData(scope.row.id)"
            >禁用</el-button>
            <el-button
              v-if="rightForm.delete && scope.row.firmStatus !== 1"
              type="success"
              size="mini"
              plain
              @click="deleteData1(scope.row.id)"
            >可用</el-button> -->
            <el-button
              v-if="rightForm.lock"
              plain
              size="mini"
              @click="lockUser(scope.row)"
            >销户用户</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :totals="total"
      :page="page+1"
      :page-size="pageSize"
      @gotoPage="gotoPage"
      @changePageSize="changePageSize"
    />
    <!-- 新增文章弹窗 -->
    <add-dialog ref="forAddDialog" @reLoad="postFn" />
    <!-- <deit-dialog ref="updatepwdDialog" @reLoad="postFn" /> -->
  </el-card>
</template>
<script>
import AddDialog from './add-dialog'
// import updatepwdDialog from './updatepwdDialog'
import exportExcel from '@/components/until/exportExcel.vue'
// import pagination from '@/components/until/pagination'
export default {
  components: {
    AddDialog,
    // updatepwdDialog,
    exportExcel
    // pagination
  },
  data() {
    return {
      total: 1,
      page: 0,
      pageSize: this.protocol.param_queryFirmInfo.data.size
        ? this.protocol.param_queryFirmInfo.data.size
        : 15,
      tableData: [],
      multipleSelection: [],
      tableHeight: 0,
      searchForm: {
        firmId: null,
        id: null,
        firmCode: null,
        firmName: null
      },
      // 接入真实接口时全部改为false
      rightForm: {
        add: false,
        edit: false,
        delete: false,
        top: false,
        issue: false,
        lock: false
      },
      loading: false
    }
  },
  created() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.searchRow.$el.clientHeight - 186
    })
  },
  mounted() {
    this.loadData()
  },
  updated() {
    this.$nextTick(() => {
      this.$refs['table'].doLayout()
    })
  },
  methods: {
    getButtonRight() {
      this.rightForm.add = this.rightButtonCheck('customer-add')
      this.rightForm.edit = this.rightButtonCheck('customer-update')
      this.rightForm.lock = this.rightButtonCheck('user-lock')
      this.rightForm.delete = this.rightButtonCheck('customer-salesaccount')
      // this.rightForm.top = rightButtonCheck('article-top')
      this.rightForm.true = this.rightButtonCheck('article-true')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    loadData() {
      this.protocol.param_queryFirmInfo.data = {
        page: 0,
        size: this.protocol.param_queryFirmInfo.data.size
          ? this.protocol.param_queryFirmInfo.data.size
          : 15,
        sort: [
          {
            direction: 'DESC', // "ASC",
            property: 'createTime'
          }
        ],
        firmCode: this.searchForm.firmCode ? this.searchForm.firmCode : null,
        firmName: this.searchForm.firmName ? this.searchForm.firmName : null
      }
      this.postFn(0)
    },
    gotoPage(page) {
      this.postFn(page - 1)
    },
    changePageSize(size) {
      this.protocol.param_queryFirmInfo.data.size = size
      this.postFn(0)
    },
    postFn(page) {
      const that = this
      this.loading = true
      if (page !== null) {
        this.protocol.param_queryFirmInfo.data.page = page
      }
      this.http.post(this.protocol.param_queryFirmInfo).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          for (const item of value.content) {
            if (item.state === 1) {
              item.isShow = true
            } else {
              item.isShow = false
            }
          }
          that.tableData = value.content
          that.total = value.totalElements
          if (page !== null) {
            that.page = page
          }
          if (that.tableData.length === 0 && that.page >= 1) {
            that.postFn(that.page - 1)
          }
        } else {
          that.$message({ type: 'warning', message: message })
        }
        this.loading = false
      })
    },
    showDialog(type, row) {
      this.$refs.forAddDialog.showDialog(type, row)
    },
    // deleteData(firmId) {
    //   this.$confirm('是否进行禁用?', '警告', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'error'
    //   })
    //     .then(() => {
    //       this.protocol.param_updateFirmStatusInfo.data.firmId = firmId
    //       // console.log(this.searchForm.id)
    //       this.protocol.param_updateFirmStatusInfo.data.firmStatus = 'D'
    //       this.http.post(this.protocol.param_updateFirmStatusInfo).then(res => {
    //         // eslint-disable-next-line no-unused-vars
    //         const { code, message, value } = res.data
    //         if (code >= 0) {
    //           // 成功删除后 请求接口刷新页面
    //           this.postFn()
    //           // 使用elementUI 提示成功   type 有success 成功  warning警告
    //           this.$message({ type: 'success', message: message })
    //         } else {
    //           this.$message({ type: 'warning', message: message })
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       // 如果点击了取消会走到这里
    //       // 一般不写这个
    //     })
    // },
    // deleteData1(firmId) {
    //   this.$confirm('是否进行可用?', '警告', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'error'
    //   })
    //     .then(() => {
    //       this.protocol.param_updateFirmStatusInfo.data.firmId = firmId
    //       // console.log(this.searchForm.id
    //       this.protocol.param_updateFirmStatusInfo.data.firmStatus = 'A'
    //       this.http.post(this.protocol.param_updateFirmStatusInfo).then(res => {
    //         const { code, message } = res.data
    //         if (code >= 0) {
    //           // 成功删除后 请求接口刷新页面
    //           this.postFn()
    //           // 使用elementUI 提示成功   type 有success 成功  warning警告
    //           this.$message({ type: 'success', message: message })
    //         } else {
    //           this.$message({ type: 'warning', message: message })
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       // 如果点击了取消会走到这里
    //       // 一般不写这个
    //     })
    // },
    // 锁定
    lockUser(row) {
      this.$confirm('是否销户该用户? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.protocol.param_updateFirmStatusInfo.data = {
            firmId: row.id,
            firmStatus: 'D'
          }
          this.http.post(this.protocol.param_updateFirmStatusInfo).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
              this.postFn()
              this.$message({ type: 'success', message: message })
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        })
        .catch(() => {})
    },
    // 冻结解冻操作
    freezonMethod(firmid, flag) {
      // ElementUI 询问弹窗  只需要修改文字  与 type  。 type 有error 删除红色  warning 警告黄色
      let confirmText = ''
      let confirmType = ''
      if (flag === '1') {
        confirmText = '是否解冻该客户'
        confirmType = 'success'
      } else if (flag === '2') {
        confirmText = '是否冻结该客户'
        confirmType = 'warning'
      } else {
        return
      }
      this.$confirm(confirmText, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // showInput: true
        type: confirmType
      })
        .then(() => {
          this.protocol.param_updateFirmFreezeStatus.data.firmId = firmid
          this.protocol.param_updateFirmFreezeStatus.data.frozenStatus = flag
          // protocol.param_updateFirmFreezeStatus.data.note = value;
          this.http.post(this.protocol.param_updateFirmFreezeStatus).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
              // 成功删除后 请求接口刷新页面
              this.postFn()
              // 使用elementUI 提示成功   type 有success 成功  warning警告
              this.$message({ type: 'success', message: message })
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        })
        .catch(() => {
          // 如果点击了取消会走到这里
          // 一般不写这个
        })
    },
    resetSearchForm() {
      this.searchForm = {
        firmName: null,
        firmCode: null
      }
    },
    // 调整el-table中的时间格式使用的
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      } else {
        return this.format(date)
      }
    },
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    format(shijianchuo) {
      if (!shijianchuo) {
        return '/'
      }
      // shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        this.add0(m) +
        '-' +
        this.add0(d) +
        ' ' +
        this.add0(h) +
        ':' +
        this.add0(mm) +
        ':' +
        this.add0(s)
      )
    }
  }
}
</script>
<style lang='scss' scoped>
</style>

