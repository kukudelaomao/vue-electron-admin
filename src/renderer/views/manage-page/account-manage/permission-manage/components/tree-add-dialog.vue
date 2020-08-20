<template>
  <el-dialog
    :title="titleData"
    :visible.sync="dialogVisible"
    width="450px"
    :close-on-click-modal="false"
    @closed="resetForm"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-position="top">
      <!-- 所属节点 -->
      <el-form-item label="所属节点" prop="pid">
        <el-cascader
          v-model="formData.pid"
          :props="cascaderProps"
          :options="treeListOptions"
          clearable
        />
      </el-form-item>
      <!-- 节点标题 -->
      <el-form-item label="节点标题" prop="rightName">
        <el-input v-model="formData.rightName" />
      </el-form-item>
      <!-- 节点编码 -->
      <el-form-item label="节点编码" prop="code">
        <el-input v-model="formData.code" />
      </el-form-item>
      <!-- 权限类型 -->
      <el-form-item v-if="titleData == '添加权限节点'" label="权限类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio border :label="1" class="settingsButton">行级别权限</el-radio>
          <el-radio border :label="2" class="settingsButton">按钮级别权限</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 节点图标 -->
      <el-form-item v-if="formData.type !== 2" label="节点图标" prop="rightIcon">
        <el-input v-model="formData.rightIcon" disabled class="nodeIcon" />
        <!-- 图标 -->
        <el-popover placement="top" width="700" trigger="click">
          <div class="icons-wrapper">
            <div v-for="item of iconsMap" :key="item" @click="generateIconCode(item)">
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="chooseIcon" />
              </div>
            </div>
            <!-- 清除 -->
            <el-button type="small" class="clearButton" @click="formData.rightIcon = null">清除</el-button>
          </div>
          <!-- 查看图标 -->
          <el-button slot="reference" type="primary" plain>查看图标</el-button>
        </el-popover>
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sortId">
        <el-input v-model="formData.sortId" />
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">隐藏</el-radio>
          <el-radio :label="1">显示</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible= false">取 消</el-button>
      <!-- 创建 -->
      <el-button v-if="titleData == '添加权限节点'" type="primary" @click="submitForm()">创 建</el-button>
      <!-- 保存 -->
      <el-button v-if="titleData == '修改权限节点'" type="primary" @click="submitUpdateForm()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
// 图标
import icons from '@/views/icons/svg-icons'
// 图标
export default {
  components: {},
  data() {
    return {
      // 图标
      iconsMap: icons,
      // 图标
      dialogVisible: false,
      formData: {
        pid: null,
        rightName: null,
        rightCode: null,
        code: null,
        type: 1,
        rightIcon: null,
        sortId: null,
        status: 1
      },
      cascaderProps: {
        value: 'rightCode',
        label: 'rightName',
        checkStrictly: true
      },
      treeListOptions: [{
        rightCode: '0',
        rightName: '顶级节点',
        menuAuth: '',
        children: []
      }],
      titleData: null,
      rules: {
        pid: [
          { required: true, message: '请选择所属节点', trigger: 'blur' }
        ],
        rightName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择权限类型', trigger: 'blur' }],
        code: [{ required: true, message: '请输入权限编码', trigger: 'blur' }],
        rightIcon: [{ required: true, message: '请输入节点图标', trigger: 'blur' }],
        sortId: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      }
    }
  },
  mounted() {},
  methods: {
    generateIconCode(item) {
      this.formData.rightIcon = item
    },
    resetForm() {
      this.formData = {
        pid: null,
        rightName: null,
        rightCode: null,
        code: null,
        type: 1,
        rightIcon: null,
        sortId: null,
        status: 1
      }
    },
    showDialog(type, treeData) {
      // 修改权限节点
      if (treeData) {
        const temData = JSON.parse(JSON.stringify(treeData))
        if (temData.rightIcon) {
          temData.type = 1
        } else {
          temData.type = 2
        }
        this.formData = temData
        if (this.formData.pid === 0) {
          this.formData.pid = '0'
        }
      }
      this.titleData = type
      this.dialogVisible = true
      // 获取全部节点
      this.getAllTree()
    },
    getAllTree() {
      const that = this
      this.protocol.param_consoleFindAllRightCode.data.userId = 1
      this.protocol.param_consoleFindAllRightCode.data.type = 1
      this.http.postDev(this.protocol.param_consoleFindAllRightCode).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.treeListOptions[0].children = value
        } else {
          that.$message({ type: 'warning', message: message })
        }
      })
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.protocol.param_consoleAddAeRight.data.title = this.formData.rightName
          this.protocol.param_consoleAddAeRight.data.name = this.formData.code
          this.protocol.param_consoleAddAeRight.data.sort = this.formData.sortId
          this.protocol.param_consoleAddAeRight.data.status = this.formData.status
          if (this.formData.pid instanceof Array) {
            this.protocol.param_consoleAddAeRight.data.pid = this.formData.pid[this.formData.pid.length - 1]
          } else {
            this.protocol.param_consoleAddAeRight.data.pid = this.formData.pid
          }
          if (this.formData.type === 2) {
            this.protocol.param_consoleAddAeRight.data.icon = ''
          } else {
            this.protocol.param_consoleAddAeRight.data.icon = this.formData.rightIcon
          }
          this.http.postDev(this.protocol.param_consoleAddAeRight).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$message({ type: 'success', message: message })
              this.dialogVisible = false
              this.$emit('reLoad')
              this.$emit('reLoadTable')
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        } else {
          return false
        }
      })
    },
    submitUpdateForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.protocol.param_consoleUpdateRight.data.id = this.formData.rightCode
          this.protocol.param_consoleUpdateRight.data.title = this.formData.rightName
          this.protocol.param_consoleUpdateRight.data.name = this.formData.code
          this.protocol.param_consoleUpdateRight.data.sort = this.formData.sortId
          this.protocol.param_consoleUpdateRight.data.status = this.formData.status
          this.protocol.param_consoleUpdateRight.data.module = this.formData.module
          this.protocol.param_consoleUpdateRight.data.urlType = this.formData.urlType
          this.protocol.param_consoleUpdateRight.data.urlValue = this.formData.urlValue
          this.protocol.param_consoleUpdateRight.data.urlTarget = this.formData.urlTarget
          this.protocol.param_consoleUpdateRight.data.onlineHide = this.formData.onlineHide
          this.protocol.param_consoleUpdateRight.data.systemMenu = this.formData.systemMenu
          this.protocol.param_consoleUpdateRight.data.params = this.formData.params
          if (this.formData.pid instanceof Array) {
            this.protocol.param_consoleUpdateRight.data.pid = this.formData.pid[this.formData.pid.length - 1]
          } else {
            this.protocol.param_consoleUpdateRight.data.pid = this.formData.pid
          }
          if (this.formData.type === 2) {
            this.protocol.param_consoleUpdateRight.data.icon = ''
          } else {
            this.protocol.param_consoleUpdateRight.data.icon = this.formData.rightIcon
          }
          this.http.postDev(this.protocol.param_consoleUpdateRight).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$message({ type: 'success', message: message })
              this.dialogVisible = false
              this.$emit('reLoad')
              this.$emit('reLoadTable')
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.icon-item {
  margin: 5px 5px 3px 3px;
  height: 40px;
  text-align: center;
  width: 40px;
  float: left;
  font-size: 25px;
  color: #24292e;
  cursor: pointer;
}
.icon-item:hover {
  background: rgb(187, 187, 187);
  border-radius: 10px;
}
.chooseIcon {
  vertical-align: -0.22em;
}
.settingsButton {
  width: 170px;
}
.nodeIcon {
  width: 298px;
}
.clearButton {
  margin-top: 9px;
}
</style>
