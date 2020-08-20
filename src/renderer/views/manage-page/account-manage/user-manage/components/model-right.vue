<template>
  <el-card class="cardAll">
    <div>
      <el-row ref="searchRow" :gutter="10">
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.userCode" placeholder="用户编码" clearable />
        </el-col>
        <!-- <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-input placeholder="所属客户" clearable v-model="searchForm.firmName"></el-input>
          </el-col>-->
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.cellphone" placeholder="账号" clearable />
        </el-col>
        <el-col :xs="12" :sm="10" :md="6" :lg="6" class="searchItem">
          <el-button type="primary" @click="loadData()">搜索</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-col>
        <el-button
          v-if="rightForm.add"
          type="primary"
          style="float:right;margin-right:10px;"
          @click="showDialog()"
        >创建用户</el-button>
      </el-row>
    </div>

    <el-table ref="table" v-loading="loading" :data="tableData" :height="tableHeight" header-cell-class-name="table-head-cell-class" highlight-current-row show-summary>
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="用户编码" prop="userCode" align="center" />
      <el-table-column label="账户" prop="cellphone" align="center" />
      <!-- <el-table-column label="昵称" prop="nickname" /> -->
      <el-table-column label="所属客户" prop="firmName" align="center" />
      <!-- <el-table-column label="电子邮箱" prop="email" align="center" /> -->
      <el-table-column label="账号状态" prop="userStatus" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.userStatus == 'D'">禁用</span>
          <span v-else-if="scope.row.userStatus == 'N'">正常</span>
        </template>
      </el-table-column>
      <el-table-column label="用户类型" prop="userType" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.userType == 'T'">前台用户</span>
          <span v-else-if="scope.row.userType == 'A'">管理员</span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" prop="roleName" align="center">
        <template slot-scope="scope">{{ scope.row.roleName|arrToString }}</template>
      </el-table-column>
      <el-table-column label="操作" width="340" align="center">
        <template slot-scope="scope">
          <div>
            <div>
              <el-button
                v-if="rightForm.role"
                type="primary"
                size="mini"
                plain
                @click="showRoleDialog(scope.row)"
              >关联角色</el-button>
              <!-- <el-button
                v-if="rightForm.lock"
                plain
                size="mini"
                @click="lockUser(scope.row)"
              >销户用户</el-button> -->
              <el-button
                v-if="rightForm.delete"
                type="danger"
                size="mini"
                plain
                @click="deleteData(scope.row.id)"
              >禁用</el-button>
              <el-button
                v-if="rightForm.delete"
                type="success"
                size="mini"
                plain
                @click="deleteData1(scope.row.id)"
              >可用</el-button>
              <!-- <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="unlockUser(scope.row)"
                  v-if="rightForm.unlock"
              >解锁用户</el-button>-->
              <!-- <el-button
                v-if="rightForm.change"
                size="mini"
                type="warning"
                plain
                @click="showDialog(scope.row)"
              >变更信息</el-button> -->
              <el-button
                v-if="rightForm.change"
                size="mini"
                plain
                @click="showPasswordDialog(scope.row)"
              >重置密码</el-button>
              <!-- <div style="margin-top:3px;"> -->
              <!-- <el-button
                    size="mini"
                    plain
                    @click="showDialog(scope.row)"
                    v-if="rightForm.change"
              >变更信息</el-button>-->
              <!-- <el-button
                    size="mini"
                    plain
                    @click="showPasswordDialog(scope.row)"
                    v-if="rightForm.reset"
              >重置密码</el-button>-->
              <!-- </div> -->
            </div>
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
    <member-add-dialog ref="memberAddDialog" @reLoad="postFn" />
    <password-dialog ref="passwordDialog" @reLoad="postFn" />
    <user-to-role-dialog ref="userToRoleDialog" @reLoad="postFn" />
    <!-- <update-member-info ref="updateMemberInfo" v-on:reLoad="postFn"></update-member-info> -->
  </el-card>
</template>

<script>
import memberAddDialog from './memberAddDialog'
import passwordDialog from './passwordDialog'
import userToRoleDialog from './userToRoleDialog'
// import updateMemberInfo from "./updateMemberInfo";
import pagination from '@/components/until/pagination'
// 导出AAAA
export default {
  components: {
    memberAddDialog,
    passwordDialog,
    userToRoleDialog,
    // updateMemberInfo,
    pagination
    // 导出AAAA
  },
  filters: {
    arrToString: function(value) {
      if (!value) return ''
      const temData = JSON.stringify(value)
      return temData.substring(1, temData.length - 1)
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      total: 1,
      page: 0,
      pageSize: this.protocol.param_queryAllRoleInfo.data.size
        ? this.protocol.param_queryAllRoleInfo.data.size
        : 15,
      tableHeight: 0,
      searchForm: {
        userCode: null,
        papersCode: null,
        firmName: null,
        cellphone: null
      },
      rightForm: {
        role: false,
        lock: false,
        unlock: false,
        change: false,
        reset: false,
        export: false,
        add: false,
        delete: false
      }
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
  methods: {
    getButtonRight() {
      this.rightForm.role = this.rightButtonCheck('user-role')
      this.rightForm.lock = this.rightButtonCheck('user-lock')
      this.rightForm.unlock = this.rightButtonCheck('user-manager-unlock')
      this.rightForm.change = this.rightButtonCheck('user-update')
      // this.rightForm.reset = this.rightButtonCheck('user-updatepwd')
      this.rightForm.delete = this.rightButtonCheck('customer-salesaccount')
      this.rightForm.export = this.rightButtonCheck('user-manager-export')
      this.rightForm.add = this.rightButtonCheck('user-query')
    },
    resetSearchForm() {
      this.searchForm = {
        userCode: null,
        papersCode: null,
        firmName: null,
        cellphone: null
      }
    },
    // 添加管理员
    showDialog(row) {
      this.$refs.memberAddDialog.showDialog(row)
    },
    // 关联角色
    showRoleDialog(row) {
      this.$refs.userToRoleDialog.showDialog(row)
    },

    // 重置密码
    showPasswordDialog(row) {
      this.$refs.passwordDialog.showDialog(row)
    },
    // 加载table数据
    loadData() {
      this.protocol.param_queryUserInfo.data = {
        page: 0,
        size: this.protocol.param_queryAllRoleInfo.data.size
          ? this.protocol.param_queryAllRoleInfo.data.size
          : 15,
        sort: [
          {
            direction: 'DESC', // "ASC",
            property: 'createTime'
          }
        ],
        userCode: this.searchForm.userCode ? this.searchForm.userCode : null,
        firmName: this.searchForm.firmName ? this.searchForm.firmName : null,
        papersCode: this.searchForm.papersCode
          ? this.searchForm.papersCode
          : null,
        userType: this.searchForm.userType ? this.searchForm.userType : null,
        firmId: this.searchForm.firmId ? this.searchForm.firmId : null,
        cellphone: this.searchForm.cellphone ? this.searchForm.cellphone : null
        // marketId: window.g.APP_MARKET_ID
      }
      this.postFn(0)
    },
    gotoPage(page) {
      this.postFn(page - 1)
    },
    // 改变显示数量
    changePageSize(size) {
      this.protocol.param_queryUserInfo.data.size = size
      this.postFn(0)
    },
    postFn(page) {
      this.loading = true
      if (page !== null) {
        this.protocol.param_queryUserInfo.data.page = page
      }
      this.http.post(this.protocol.param_queryUserInfo).then(res => {
        const { code, message, value } = res.data
        if (code >= 0) {
          this.tableData = value.content
          this.total = value.totalElements
          if (page) {
            this.page = page
          }
          if (this.tableData.length === 0 && this.page >= 2) {
            this.postFn(this.page - 1)
          }
        } else {
          this.$message({ type: 'warning', message: message })
        }
        this.loading = false
      })
    },
    unlockUser(row) {
      console.log(row)
      this.$confirm('是否解锁该用户? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          this.protocol.param_updateUserStatusInfo.data = {
            userId: row.id,
            userStatus: 'N'
          }
          this.http.post(this.protocol.param_updateUserStatusInfo).then(res => {
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
    // // 锁定
    // lockUser(row) {
    //   this.$confirm('是否销户该用户? ', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.protocol.param_updateUserStatusInfo.data = {
    //         userId: row.id,
    //         userStatus: 'D'
    //       }
    //       this.http.post(this.protocol.param_updateUserStatusInfo).then(res => {
    //         const { code, message } = res.data
    //         if (code >= 0) {
    //           this.postFn()
    //           this.$message({ type: 'success', message: message })
    //         } else {
    //           this.$message({ type: 'warning', message: message })
    //         }
    //       })
    //     })
    //     .catch(() => {})
    // },
    deleteData(userId) {
      this.$confirm('是否进行禁用?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.protocol.param_updateUserStatusInfo.data.userId = userId
          // console.log(this.searchForm.id)
          this.protocol.param_updateUserStatusInfo.data.userStatus = 'D'
          this.http.post(this.protocol.param_updateUserStatusInfo).then(res => {
            // eslint-disable-next-line no-unused-vars
            const { code, message, value } = res.data
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
    deleteData1(userId) {
      this.$confirm('是否进行可用?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.protocol.param_updateUserStatusInfo.data.userId = userId
          // console.log(this.searchForm.id
          this.protocol.param_updateUserStatusInfo.data.userStatus = 'N'
          this.http.post(this.protocol.param_updateUserStatusInfo).then(res => {
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
    updateUserStatus(type, userId) {
      let confirmText = ''
      let confirmType = ''
      if (type === 'N') {
        confirmText = '是否解冻该用户'
        confirmType = 'success'
      } else if (type === 'L') {
        confirmText = '是否冻结该用户'
        confirmType = 'warning'
      } else {
        return
      }
      this.$confirm(confirmText, '提示', {
        canfirmButtonText: '确定',
        cancelButtonText: '取消',
        type: confirmType
      })
        .then(() => {
          this.protocol.param_updateUserStatus.data.userId = userId
          this.protocol.param_updateUserStatus.data.userStatus = type
          this.http.post(this.protocol.param_updateUserStatus).then(res => {
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
    }
  }
}
</script>

<style scoped>
</style>
