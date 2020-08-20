<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="titleData"
    :visible.sync="dialogVisible"
    width="500px"
    @closed="resetForm()"
  >
    <!-- 所属角色 -->
    <el-form ref="form" :model="form" :rules="rules" label-position="top">
      <el-form-item label="所属角色" prop="pid">
        <el-cascader
          v-model="form.pid"
          :props="cascaderProps"
          :options="roleListOptions"
          clearable
        />
      </el-form-item>
      <!-- 角色名称 -->
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- 选择授权 -->
      <el-form-item v-if="form.id === null" label="选择授权" prop="menuAuth">
        <el-tree
          ref="SlotMenuList"
          :data="rightList"
          :props="props"
          node-key="rightCode"
          highlight-current
          :expand-on-click-node="false"
          :default-checked-keys="form.menuAuth"
          show-checkbox
        />
      </el-form-item>
      <!-- 角色描述 -->
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
      <!-- 排序 -->
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" :disabled="isDisabled.sort" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <!-- 新增角色 -->
      <el-button v-if="titleData=='新增角色'" type="primary" :loading="addBtnStatus" :disabled="addBtnStatus" @click="submitAdd()">创 建</el-button>
      <!-- 修改角色 -->
      <el-button v-if="titleData=='修改角色'" type="primary" :loading="updateBtnStatus" :disabled="updateBtnStatus" @click="sumitUpdate()">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    roleList: {
      type: Array,
      default: function() {
        return []
      }
    },
    rightList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        id: null,
        pid: null,
        name: null,
        menuAuth: [],
        description: '',
        sort: 100
      },
      titleData: '',
      rules: {
        pid: [
          { required: true, message: '请选择所属角色', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ]
      },
      props: {
        label: 'rightName',
        children: 'children'
      },
      cascaderProps: {
        value: 'roleId',
        label: 'roleName',
        checkStrictly: true
      },
      roleListOptions: [{
        roleId: '0',
        roleName: '顶级角色',
        menuAuth: '',
        children: []
      }],
      addBtnStatus: false,
      updateBtnStatus: false,
      isDisabled: {
        sort: true
      }
    }
  },
  methods: {
    showDialog(type, row) {
      this.dialogVisible = true
      this.updateBtnStatus = false
      this.addBtnStatus = false
      if (row) {
        // 如果不进行转变 修改form会同时修改row
        const temData = JSON.parse(JSON.stringify(row))
        this.form = temData
        if (this.form.pid === 0) {
          this.form.pid = '0'
        }
      }
      this.titleData = type
      this.removeNoChildren(this.roleList)
      this.roleListOptions[0].children = this.roleList
    },
    removeNoChildren(data) {
      for (const item of data) {
        if (item.children && item.children.length !== 0) {
          this.removeNoChildren(item.children)
        } else {
          delete item.children
        }
      }
    },
    submitAdd() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addBtnStatus = true
          const checkList = this.$refs.SlotMenuList.getCheckedKeys()
          const halfCheckList = this.$refs.SlotMenuList.getHalfCheckedKeys()
          if (halfCheckList.length > 0) {
            checkList.push(...halfCheckList)
          }
          for (let i = 0; i < checkList.length; i++) {
            checkList[i] = checkList[i] + ''
          }
          // 获取选中的权限
          this.protocol.param_addRoleAllInfo.data.menuAuth = JSON.stringify(checkList)
          if (this.form.pid instanceof Array) {
            this.protocol.param_addRoleAllInfo.data.pid = Number(this.form.pid[this.form.pid.length - 1])
          } else {
            this.protocol.param_addRoleAllInfo.data.pid = Number(this.form.pid)
          }
          this.protocol.param_addRoleAllInfo.data.name = this.form.name
          this.protocol.param_addRoleAllInfo.data.description = this.form.description
          this.protocol.param_addRoleAllInfo.data.roleSort = this.form.sort
          this.http.postDev(this.protocol.param_addRoleAllInfo).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$emit('reLoad')
              this.dialogVisible = false
              this.$message({ type: 'success', message: message })
            } else {
              this.$message({ type: 'warning', message: message })
              this.addBtnStatus = false
            }
          })
        } else {
          return false
        }
      })
    },
    sumitUpdate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateBtnStatus = true
          this.protocol.param_UpdateRole.data.id = this.form.id
          if (this.form.pid instanceof Array) {
            this.protocol.param_UpdateRole.data.pid = Number(this.form.pid[this.form.pid.length - 1])
          } else {
            this.protocol.param_UpdateRole.data.pid = Number(this.form.pid)
          }
          this.protocol.param_UpdateRole.data.name = this.form.name
          this.protocol.param_UpdateRole.data.description = this.form.description
          this.protocol.param_UpdateRole.data.sort = this.form.sort
          this.http.postDev(this.protocol.param_UpdateRole).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$emit('reLoad')
              this.dialogVisible = false
              this.$message({ type: 'success', message: message })
            } else {
              this.$message({ type: 'warning', message: message })
              this.updateBtnStatus = false
            }
          })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.form = {
        id: null,
        pid: null,
        name: null,
        menuAuth: [],
        description: '',
        sort: 100
      }
      if (this.$refs.SlotMenuList) {
        this.$refs.SlotMenuList.setCheckedNodes([]) // 树形选项置空
      }
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
