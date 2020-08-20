<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="400px" append-to-body @closed="resetForm">
    <el-form ref="formData" :model="formData" :rules="rules" label-position="top">
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      const number = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
      if (number.test(value)) {
        callback()
      } else {
        callback(new Error('密码不得为纯字母或纯数字'))
      }
    }
    return {
      dialogVisible: false,
      dialogData: {},
      formData: {
        userId: '',
        password: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 8, max: 20, message: '密码长度保证8-20位', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    showDialog(row) {
      this.formData.userId = this.$store.state.user.UserFirmId
      this.dialogVisible = true
    },
    resetForm() {
      this.$refs.formData.resetFields()
    },
    submit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.protocol.param_updateUserInfo.data.password = this.formData.password
          this.protocol.param_updateUserInfo.data.userId = this.formData.userId
          this.http.postDev(this.protocol.param_updateUserInfo).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              this.$emit('reLoad')
              this.dialogVisible = false
              this.$message({ type: 'success', message: message })
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
</style>
<style lang="scss">
</style>
