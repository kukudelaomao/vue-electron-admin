<template>
  <!-- ElementUI弹窗 diaglog  通过:visible.sync的 true false 来控制是否显示.   @closed表示在关闭页面时调用的方法 -->
  <el-dialog :title="titleData" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false" @closed="resetForm()">
    <el-form ref="formUpdatePwd" :model="formData" :rules="rules" label-position="top">
      <!-- 注意 el-input 绑定数值后  要在相应的 el-form-item 也要写prop -->
      <el-form-item label="手机号" prop="cellphone">
        <el-input v-model="formData.cellphone" readonly />
      </el-form-item>
      <el-form-item label="交易密码" prop="password">
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="formData.confirmPwd" type="password" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="sumitUpdate()">确认</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 控制窗口显示与隐藏
      dialogVisible: false,
      // 表格的参数
      formData: {},
      titleData: null,
      rules: {
        cellphone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码必须大于六位', trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    updatepwdDialogs(type, row) {
      if (row) {
        this.formData = {
          // cellphoneSP 加密后的手机号
          userId: row.userId,
          cellphone: row.maskCellphone
          // ***************************
        }
      }
      this.titleData = type
      this.dialogVisible = true
    },
    sumitUpdate() {
      this.$refs.formUpdatePwd.validate(valid => {
        if (valid) {
          this.protocol.param_updatepwd.data.password = this.dataFormat.getMd5(
            '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' + this.formData.password
          )
          // cellphoneSP
          this.protocol.param_updatepwd.data.userId = this.formData.userId
          // ***************************
          this.http.post(this.protocol.param_updatepwd).then(res => {
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
    },
    // 关闭页面时 重置数据
    resetForm() {
      this.formData = {}
      // 调用ElementUI方法  清除验证时的 红色与绿色框   可注释后看一下
      this.$refs.formUpdatePwd.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
<style lang="scss">
</style>
