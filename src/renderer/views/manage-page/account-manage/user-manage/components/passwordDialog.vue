<!--
 * @Description:
 * @Author: Enma
 * @Date: 2019-04-16 14:34:53
 * @LastEditors: Enma
 * @LastEditTime: 2019-06-06 17:55:49
 -->
<template>
  <el-dialog
    title="重置密码"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @closed="resetForm"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-position="top">
      <el-form-item label="用户编码" prop="userCode">
        <el-input v-model="formData.userCode" readonly />
      </el-form-item>
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
        marketId: null,
        userCode: null,
        password: null,
        userId: null
      },
      rules: {
        userCode: [
          { required: true, message: '请输入用户账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 8, max: 20, message: '密码长度保证8-20位', trigger: 'change' },
          { validator: validatePass, trigger: 'change' }
        ]
      }
    }
  },
  /* */
  mounted() {},
  methods: {
    showDialog(row) {
      console.log(row)
      const temData = JSON.parse(JSON.stringify(row))
      this.formData.userCode = temData.userCode
      this.formData.marketId = temData.marketId
      this.formData.userId = temData.id
      this.dialogVisible = true
    },
    resetForm() {
      this.$refs.formData.resetFields()
    },
    submit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.protocol.param_updateUserInfo.data.marketId = window.g.APP_MARKET_ID
          // this.protocol.param_updateUserInfo.data.password = this.formData.password
          this.protocol.param_updateUserInfo.data.password = this.dataFormat.getMd5('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' + this.formData.password)
          this.protocol.param_updateUserInfo.data.userId = this.formData.userId
          this.http.post(this.protocol.param_updateUserInfo).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
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
