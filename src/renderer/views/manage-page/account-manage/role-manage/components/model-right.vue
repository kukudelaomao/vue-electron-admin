<template>
  <el-card class="cardAll">
    <div ref="searchRow">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <!-- 会员ID -->
          <el-input v-model="searchForm.id" placeholder="ID" clearable />
        </el-col>
        <!-- 角色名称 -->
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-input v-model="searchForm.name" placeholder="角色名称" clearable />
        </el-col>
        <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
          <el-button type="primary" @click="loadData()">搜索</el-button>
          <el-button @click="resetSearchForm()">重置</el-button>
        </el-col>
        <!-- 删除角色 -->
        <el-button
          v-if="rightForm.delete"
          type="warning"
          class="operateButton"
          @click="delRole(2, null)"
        >删除角色</el-button>
        <!-- 禁用 -->
        <el-button
          v-if="rightForm.lock"
          type="warning"
          class="operateButton"
          @click="switchStatusDatas(1)"
        >禁用</el-button>
        <!-- 启用 -->
        <el-button
          v-if="rightForm.unlock"
          type="success"
          class="operateButton"
          @click="switchStatusDatas(2)"
        >启用</el-button>
        <!-- 新增 -->
        <el-button
          v-if="rightForm.add"
          type="primary"
          class="operateButton"
          @click="showDialog('新增角色')"
        >新增</el-button>
      </el-row>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :height="tableHeight"
      highlight-current-row
      header-cell-class-name="table-head-cell-class"
      default-expand-all
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="roleId"
        label="ID"
      />
      <!-- 角色名称 -->
      <el-table-column
        prop="roleName"
        label="角色名称"
      />
      <!-- 描述  -->
      <el-table-column
        prop="note"
        label="角色描述"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.note" placement="bottom-start">
            <span class="textEllipsis">{{ scope.row.note }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column
        prop="createTime"
        label="创建时间"
        :formatter="formatterDate"
      />
      <el-table-column
        prop="access"
        label="是否可登录后台"
      >
        <template slot-scope="scope">
          <el-switch
            v-if="rightForm.edit"
            v-model="scope.row.access"
            :active-value="switchValue.active"
            :inactive-value="switchValue.inActive"
            @change="switchAccess(scope.row)"
          />
          <span v-else>{{ scope.row.access | accessFilter('是', '否') }}</span>
        </template>
      </el-table-column>
      <!-- 禁用/开启 -->
      <el-table-column
        prop="status"
        label="禁用/开启"
        :formatter="formatterStatus"
      />
      <!-- 操作 -->
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <!-- 设置权限 -->
          <el-button
            v-if="rightForm.auth"
            type="primary"
            plain
            size="mini"
            @click="showTreeDialog(scope.row)"
          >设置权限</el-button>
          <!-- 修改角色 -->
          <el-button
            v-if="rightForm.edit"
            plain
            size="mini"
            @click="showDialog('修改角色', scope.row)"
          >修改角色</el-button>
          <!-- 删除角色 -->
          <el-button
            v-if="rightForm.delete"
            type="warning"
            plain
            size="mini"
            @click="delRole(1, scope.row.id)"
          >删除角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :totals="total" :page="page" :page-size="pageSize" @gotoPage="gotoPage" @changePageSize="changePageSize" />

    <member-add-dialog ref="memberAddDialog" :role-list="allRoleList" :right-list="allRightList" @reLoad="postFn" />
    <right-set-dialog ref="rightSetDialog" @reLoad="postFn" />
  </el-card>
</template>

<script>
import memberAddDialog from './member-add-dialog'
import rightSetDialog from './right-set-dialog'
import pagination from '@/components/until/pagination'
export default {
  components: {
    memberAddDialog,
    rightSetDialog,
    pagination
  },
  filters: {
    accessFilter(access, yes, no) {
      const accessList = {
        0: no,
        1: yes
      }
      return accessList[access]
    }
  },
  data() {
    return {
      total: 1,
      page: 1,
      pageSize: this.protocol.param_queryAeRole.data.size
        ? this.protocol.param_queryAeRole.data.size : 15,
      tableHeight: 0,
      tableData: [],
      multipleSelection: [],
      searchForm: {
        id: null,
        name: null
      },
      switchValue: {
        active: 1,
        inActive: 0
      },
      rightForm: {
        add: true,
        edit: true,
        delete: true,
        auth: true,
        lock: true,
        unlock: true
      },
      allRoleList: [],
      allRightList: [],
      loading: false
    }
  },
  created() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.searchRow.offsetHeight - 165 // 305
    })
  },
  mounted() {
    this.loadData()
    this.getAllRoleList()
    this.getAllRight()
  },
  methods: {
    getButtonRight() {
      this.rightForm.add = this.rightButtonCheck('add')
      this.rightForm.edit = this.rightButtonCheck('edit')
      this.rightForm.delete = this.rightButtonCheck('delete')
      this.rightForm.auth = this.rightButtonCheck('auth')
      this.rightForm.lock = this.rightButtonCheck('lock')
      this.rightForm.unlock = this.rightButtonCheck('unlock')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetSearchForm() {
      this.searchForm = {
        id: null,
        name: null
      }
    },
    getAllRoleList() {
      const that = this
      this.http.postDev(this.protocol.param_queryAeRole).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.allRoleList = value.content
        } else {
          that.$message({ type: 'warning', message: message })
        }
      })
    },
    getAllRight() {
      this.http.postDev(this.protocol.param_consoleFindAllRightCode).then(res => {
        const { code, value, message } = res.data
        if (code === 0) {
          this.allRightList = value
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    showDialog(type, row) {
      this.$refs.memberAddDialog.showDialog(type, row)
    },
    showTreeDialog(row) {
      this.$refs.rightSetDialog.showDialog(row)
    },
    // 获取数据
    loadData() {
      if (this.searchForm.id && !(/(^[0-9]\d*$)/.test(this.searchForm.id))) {
        this.$message({ type: 'warning', message: '请输入有效的ID' })
        return false
      }
      this.protocol.param_queryAeRole.data = {
        page: 1,
        size: this.protocol.param_queryAeRole.data.size
          ? this.protocol.param_queryAeRole.data.size : 15,
        sort: [{
          direction: 'DESC',
          property: 'createTime'
        }],
        id: this.searchForm.id ? this.searchForm.id : null,
        name: this.searchForm.name ? this.searchForm.name : null
      }
      this.postFn(1)
    },
    // 翻页调用的方法
    gotoPage(page) {
      this.postFn(page)
    },
    // 改变显示数量
    changePageSize(size) {
      this.protocol.param_queryAeRole.data.size = size
      this.postFn(1)
    },
    // 获取数据的请求
    postFn(page) {
      this.loading = true
      if (page) {
        this.protocol.param_queryAeRole.data.page = page
      }
      this.http.postDev(this.protocol.param_queryAeRole).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          this.tableData = value.content
          this.total = value.totalElements
          if (page) {
            this.page = page
          }
          if ((this.tableData.length === 0) && (this.page >= 2)) {
            this.postFn(this.page - 1)
          }
        } else {
          this.$message({ type: 'warning', message: message })
        }
        this.loading = false
      })
      this.getAllRoleList()
    },
    formatterDate(row, column, cellValue, index) {
      if (cellValue) {
        return this.dataFormat.formatDate.format(cellValue * 1000)
      } else {
        return '--'
      }
    },
    formatterStatus(row, column, cellValue, index) {
      if (cellValue === 0) {
        return '禁用'
      } else if (cellValue === 1) {
        return '开启'
      }
    },
    switchAccess(row) {
      const that = this
      this.protocol.param_updateRoleAccess.data.id = row.id
      this.protocol.param_updateRoleAccess.data.access = row.access
      this.http.postDev(this.protocol.param_updateRoleAccess).then(res => {
        const { code, message } = res.data
        if (code === 0) {
          that.$message({ type: 'success', message: message })
        } else {
          that.$message({ type: 'warning', message: message })
        }
        that.postFn()
      })
    },
    delRole(type, id) {
      if (type === 2 && this.multipleSelection.length === 0) {
        this.$message({ type: 'warning', message: '请选中想要删除的角色' })
        return false
      }
      this.$confirm('删除后不能恢复，确认删除？', '提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'error'
      })
        .then(() => {
          // type:1 单独删除 type:2 批量删除
          const deleteIds = []
          if (type === 1) {
            deleteIds.push(id)
          } else if (type === 2) {
            for (const item of this.multipleSelection) {
              deleteIds.push(item.id)
            }
          }
          this.protocol.param_consoleDeleteRole.data.userIds = deleteIds
          this.http.postDev(this.protocol.param_consoleDeleteRole).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$message({ type: 'success', message: message })
              this.postFn()
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        })
        .catch(() => {})
    },
    switchStatusDatas(type) {
      if (this.multipleSelection.length === 0) {
        this.$message({ type: 'warning', message: '请选中想要启用/禁用的角色' })
        return false
      }
      // type=1 禁用 type=2 启用
      let confirmMessage
      let confirmType
      if (type === 1) {
        confirmMessage = '确定要执行禁用操作吗？'
        confirmType = 'error'
      } else if (type === 2) {
        confirmMessage = '确定要执行开启操作吗？'
        confirmType = 'success'
      }
      this.$confirm(confirmMessage, '提示', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: confirmType
      })
        .then(() => {
          // type:1 禁用 type:2 启用
          const that = this
          const ids = []
          for (const item of this.multipleSelection) {
            ids.push(item.id)
          }
          if (type === 1) {
            this.protocol.param_updateRoleStatus.data.status = 0
          } else if (type === 2) {
            this.protocol.param_updateRoleStatus.data.status = 1
          }
          this.protocol.param_updateRoleStatus.data.userIds = ids
          this.http.postDev(this.protocol.param_updateRoleStatus).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              that.$message({ type: 'success', message: message })
              that.postFn()
            } else {
              that.$message({ type: 'warning', message: message })
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
