<template>
  <el-dialog
    title="关联角色"
    :visible.sync="dialogVisible"
    width="450px"
    :close-on-click-modal="false"
    @closed="reset"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-position="top">
      <el-form-item label="用户编码" prop="userCode">
        <el-input v-model="formData.userCode" readonly />
      </el-form-item>
      <el-form-item label="关联角色" prop="roleIds">
        <el-select v-model="formData.roleIds" multiple multiple-limit="1" clearable style="width:100%">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible= false">取消</el-button>
      <el-button type="primary" @click="submitForm()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      formData: {
        firmId: null,
        roleIds: null,
        userCode: null
      },
      roleList: [],
      rules: {
        userCode: [
          { required: true, message: '请输入用户编码', trigger: 'blur' }
        ]
        // roleIds: [
        //   { required: true, message: "请选择关联的角色", trigger: "blur" }
        // ]
      }
    }
  },
  mounted() {
    this.loadRole()
  },
  methods: {
    reset() {
      this.formData = {
        firmId: null,
        roleIds: [],
        userCode: null
      }
      this.$refs.formData.resetFields()
    },
    showDialog(row) {
      this.loadRole()
      for (const index in row.roleIds) {
        row.roleIds[index] = Number(row.roleIds[index])
      }
      this.formData = {
        firmId: row.firmId,
        roleIds: row.roleIds == null ? [] : row.roleIds,
        userCode: row.userCode
      }
      this.dialogVisible = true
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.protocol.param_addUserToRole.data = this.formData
          this.http.post(this.protocol.param_addUserToRole).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
              this.$emit('reLoad')
              this.$message({ type: 'success', message: message })
              this.dialogVisible = false
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        } else {
          return false
        }
      })
    },
    loadRole() {
      this.http.post(this.protocol.param_queryRoleSelect).then(res => {
        const { code, message, value } = res.data
        if (code >= 0) {
          this.roleList = value.content
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
<style lang="scss">
</style>
