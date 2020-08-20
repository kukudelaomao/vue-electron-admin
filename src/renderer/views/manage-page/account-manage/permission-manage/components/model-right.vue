<template>
  <transition name="slide-fade">
    <div v-if="loadCss" class="cardAll">
      <el-card class="cardSmall">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-col :span="12">
              <span class="treeDataName">{{ treeData.rightName }} </span>
              <span class="treeDataCode"> {{ treeData.code }}</span>
            </el-col>
            <!-- 删除节点 -->
            <el-button
              v-if="rightForm.delete"
              v-show="showButton"
              class="operateButton"
              @click="delTree(treeData.rightCode, 1)"
            >删除节点</el-button>
            <!-- 修改节点 -->
            <el-button
              v-if="rightForm.edit"
              v-show="showButton"
              class="operateButton"
              @click="showDialog('修改权限节点', treeData)"
            >修改节点</el-button>
            <!-- 添加节点 -->
            <el-button
              v-if="rightForm.add"
              v-show="showButton"
              class="operateButton"
              type="primary"
              @click="showDialog('添加权限节点', null)"
            >添加节点</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="cardLarge">
        <el-table :data="tableData" border :height="tableHeight">
          <el-table-column type="index" />
          <!-- 权限名称 -->
          <el-table-column prop="rightName" label="权限名称" />
          <!-- 权限编码 -->
          <el-table-column prop="code" label="权限编码" />
          <!-- 排序 -->
          <el-table-column prop="sortId" label="排序" />
          <!-- 操作 -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 删除 -->
              <el-button v-if="rightForm.delete" type="primary" plain size="small" @click="delTree(scope.row.rightCode,2)">删除</el-button>
              <!-- 编辑 -->
              <el-button v-if="rightForm.edit" type="primary" plain size="small" @click="showDialog('修改权限节点',scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <tree-add-dialog ref="treeAddDialog" @reLoad="reLoad" @reLoadTable="loadData" />
    </div>
  </transition>
</template>

<script>
import treeAddDialog from './tree-add-dialog'
export default {
  components: {
    treeAddDialog
  },
  data() {
    return {
      tableHeight: window.innerHeight - 245,
      treeData: '',
      loadCss: true,
      showButton: false,
      tableData: [],
      // 接入真实接口时全部改为false
      rightForm: {
        add: false,
        edit: false,
        delete: false
      }
    }
  },
  methods: {
    getButtonRight() {
      this.rightForm.add = this.rightButtonCheck('role-manager-add')
      this.rightForm.edit = this.rightButtonCheck('role-manager-edit')
      this.rightForm.delete = this.rightButtonCheck('role-manager-delete')
    },
    showDialog(type, treeData) {
      this.$refs.treeAddDialog.showDialog(type, treeData)
    },
    reLoad() {
      this.$emit('reLoad')
    },
    getData(data) {
      this.showButton = true
      this.loadCss = false
      this.tableData = []
      this.treeData = data
      this.parentRightCode = data.rightCode
      this.loadData(data)
      this.$nextTick(function() {
        this.loadCss = true
      })
    },
    loadData(data) {
      if (data.children.length !== 0) {
        for (let i = 0; i < data.children.length; i++) {
          data.children[i].code = data.children[i].name
        }
        this.tableData = data.children
      } else {
        this.protocol.param_queryAeRight.data.parentRightCode = data.rightCode
        this.http.postDev(this.protocol.param_queryAeRight).then(res => {
          const { code, message, value } = res.data
          if (code === 0) {
            this.tableData = value
          } else {
            this.$message({ type: 'warning', message: message })
          }
        })
      }
    },
    delTree(rightCode, type) {
      this.$confirm('是否删除该节点？', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'error'
      })
        .then(() => {
          this.protocol.param_consoleDeleteAeRight.data.id = rightCode
          this.http.postDev(this.protocol.param_consoleDeleteAeRight).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              if (type === 1) {
                this.$emit('reLoad')
                // 清空右侧全部内容
                this.showButton = false
                this.loadCss = false
                this.treeData = ''
                this.tableData = []
                this.$nextTick(function() {
                  this.loadCss = true
                })
              } else {
                this.$emit('reLoad')
                this.loadData()
              }
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
.cardAll {
  width: calc(100% - 370px);
}
.treeDataName {
  line-height:35px;
}
.treeDataCode {
  line-height: 35px;
}
.operateButton {
  float: right;
  margin-left: 10px;
}
.cardSmall {
  height: 77px;
}
.cardLarge {
  height: calc(100vh - 177px);
  overflow-y: auto;
}
</style>
