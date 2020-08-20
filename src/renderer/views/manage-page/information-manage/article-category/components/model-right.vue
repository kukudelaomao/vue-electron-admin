<template>
  <el-card class="cardAll">
    <div ref="searchRow">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-input v-model="searchForm.categoryName" placeholder="请输入文章分类" clearable />
          </el-col>
          <el-col :xs="12" :sm="6" :md="4" :lg="4" class="searchItem">
            <el-button type="primary" @click="loadData()">搜索</el-button>
            <el-button @click="resetSearchForm()">重置</el-button>
          </el-col>
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
      row-key="categoryId"
      default-expand-all
      highlight-current-row
      header-cell-class-name="table-head-cell-class"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="categoryId"
        label="ID"
      />
      <el-table-column
        prop="categoryName"
        label="分类名称"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
      />
      <el-table-column
        prop="sort"
        label="排序"
      >
        <template slot-scope="scope">
          <el-popover
            v-model="scope.row.isShowChangeSort"
            placement="top-start"
            trigger="click"
            width="306"
            @show="getTempSort(scope.row)"
          >
            <el-input v-model="tempSort" class="articleCateSort" placeholder="排序" />
            <el-button type="primary" icon="el-icon-check" circle @click="changeSort(scope.row)" />
            <el-button type="warning" icon="el-icon-close" circle @click="scope.row.isShowChangeSort = false" />
            <el-button slot="reference" type="text">{{ scope.row.sort }}</el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
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
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="rightForm.add" type="primary" size="mini" plain @click="showDialog(scope.row, 1)">新增子栏目</el-button>
          <el-button v-if="rightForm.edit" type="primary" size="mini" plain @click="showDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增文章分类弹窗 -->
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
      tableData: [],
      multipleSelection: [],
      tableHeight: 0,
      searchForm: {
        categoryName: null
      },
      // 接入真实接口时全部改为false
      rightForm: {
        add: true,
        edit: true,
        forbidden: true,
        startUsing: true
      },
      loading: false,
      tempSort: null
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
      this.rightForm.add = this.rightButtonCheck('category-add')
      this.rightForm.edit = this.rightButtonCheck('category-edit')
      this.rightForm.forbidden = this.rightButtonCheck('category-forbidden')
      this.rightForm.startUsing = this.rightButtonCheck('category-startUsing')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetSearchForm() {
      this.searchForm = {
        categoryName: null
      }
    },
    loadData() {
      this.postFn()
    },
    postFn() {
      const that = this
      this.loading = true
      this.protocol.param_findContentType.data.categoryName = this.searchForm.categoryName
      this.http.postDev(this.protocol.param_findContentType).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.formatDateAndState(value)
          that.tableData = value
        } else {
          that.$message({ type: 'warning', message: message })
        }
        this.loading = false
      })
    },
    formatDateAndState(data) {
      for (const item of data) {
        item.isShowChangeSort = false
        item.createTime = this.dataFormat.formatDate.format(item.createTime)
        if (item.state === 1) {
          item.isShow = true
        } else {
          item.isShow = false
        }
        if (item.children.length !== 0) {
          this.formatDateAndState(item.children)
        }
      }
    },
    showDialog(row, type) {
      this.$refs.addDialog.showDialog(row, type)
    },
    getTempSort(row) {
      this.tempSort = row.sort
    },
    changeSort(row) {
      this.editItem(row, 1)
    },
    switchState(row) {
      this.editItem(row, 2)
    },
    editItem(row, type) {
      const that = this
      this.protocol.param_saveContentType.data.parentCategoryId = null
      this.protocol.param_saveContentType.data.categoryId = row.categoryId
      this.protocol.param_saveContentType.data.categoryName = row.categoryName
      // type=1 修改排序 type=2 改变禁用/开启
      if (type === 1) {
        this.protocol.param_saveContentType.data.sort = this.tempSort
      } else if (type === 2) {
        this.protocol.param_saveContentType.data.sort = row.sort
      }
      this.protocol.param_saveContentType.data.state = row.isShow === true ? 1 : 0
      this.http.postDev(this.protocol.param_saveContentType).then(res => {
        const { code, message } = res.data
        if (code === 0) {
          that.$message({ type: 'success', message: message })
          that.postFn()
        } else {
          that.$message({ type: 'warning', message: message })
        }
        row.isShowChangeSort = false
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
            deleteIds.push(item.categoryId)
          }
          const that = this
          this.protocol.param_switchContentTypeState.data.type = type
          this.protocol.param_switchContentTypeState.data.categoryId = deleteIds
          this.http.postDev(this.protocol.param_switchContentTypeState).then(res => {
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
