<template>
  <el-dialog
    :title="titleData"
    :visible.sync="dialogVisible"
    width="40%"
    :close-on-click-modal="false"
    @closed="resetForm()"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-position="top">
      <el-form-item v-if="!isEdit" label="用户类型" prop="userType">
        <el-select v-model="formData.userType" style="width:100%">
          <el-option :value="1" label="前台用户" />
          <el-option :value="9" label="管理员" />
        </el-select>
      </el-form-item>
      <el-form-item label="登录账号" prop="mobilePhone">
        <el-input v-model="formData.mobilePhone" placeholder="选择前台用户请填写手机号，若选择管理员请按admin_xx格式填写" />
      </el-form-item>
      <el-form-item v-if="!isEdit" label="用户名称" prop="userName">
        <el-input v-model="formData.userName" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item v-if="isEdit" label="客户名称" prop="firmName">
        <el-input v-model="formData.firmName" />
      </el-form-item>
      <el-form-item v-if="!isEdit" label="用户密码" prop="password">
        <el-input v-model="formData.password" type="password" />
      </el-form-item>
      <!-- <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="formData.email" />
      </el-form-item> -->
      <!-- <el-form-item v-if="!isEdit" label="是否快捷创建客户" prop="isQuRegister" style="width:44%">
        <el-switch v-model="formData.isQuRegister" />
      </el-form-item>

      <el-card v-if="formData.isQuRegister" style="width:91%">
        <div slot="header" class="clearfix">
          <span>快捷绑定</span>
        </div>
        <div style="margin-left:6%">
          <el-form-item label="客户名称" prop="firmName" style="width:100%">
            <el-input v-model="formData.firmName" />
          </el-form-item>
        </div>
      </el-card>  -->
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible= false">取消</el-button>
      <el-button v-if="!isEdit" type="primary" @click="submitForm()">创建</el-button>
      <el-button v-if="isEdit" type="primary" @click="updateForm()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入密码"));
    //   } else if (value !== this.formData.password) {
    //     callback(new Error("两次输入密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    // var checkCellPhone = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("手机号不可为空"));
    //   } else {
    //     if (value !== "") {
    //       var reg = /^1[3456789]\d{9}$/;
    //       if (!reg.test(value)) {
    //         callback(new Error("请输入有效的手机号码"));
    //       }
    //     }
    //     callback();
    //   }
    // };
    var checkEmail = (rule, value, callback) => {
      var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
      if (value === '' || value == null) {
        return callback()
      } else {
        if (!re.test(value)) {
          callback(new Error('电子邮箱不正确'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogVisible: false,
      selectreferrerList: [],
      formData: {
        password: null,
        mobilePhone: null,
        // isQuRegister: true,
        firmName: null,
        marketId: window.g.APP_MARKET_ID,
        email: null,
        captchaCode: null,
        captchaId: null,
        code: null,
        createWay: 1,
        userName: null,
        userType: null
      },
      titleData: null,
      // 是否为编辑
      isEdit: false,
      rules: {
        userType: [
          { required: true, message: '请选择用户类型', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请输入登录账户', trigger: 'blur' }
        ],
        email: [
          // { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码必须大于六位', trigger: 'blur' }
        ]
      },
      searchLoading: false,
      searchText: '未找到匹配的客户',
      selectreferrerList1: [],
      rowData: null
    }
  },
  mounted() {},
  methods: {
    getUserCode(query) {
      if (query !== '') {
        this.searchLoading = true
        if (query.length < 2) {
          setTimeout(() => {
            // this.$message({ type: "warning", message: "至少输入六个字符" });
            this.searchText = '至少输入两位参数进行搜索'
            this.selectreferrerList1 = []
            this.searchLoading = false
          }, 500)
          return
        }
        setTimeout(() => {
          this.protocol.param_selectUserCode.data.userCode = query
          this.http.post(this.protocol.param_selectUserCode).then(res => {
            const { code, value, message } = res.data
            if (code >= 0) {
              this.searchLoading = false
              this.selectreferrerList1 = value
              if (this.selectreferrerList1.length <= 0) {
                this.searchText = '未找到匹配的客户'
              }
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        }, 1000)
      } else {
        this.selectreferrerList1 = []
      }
    },
    showDialog(row) {
      // this.loadType();
      this.isEdit = false
      // this.formData.isQuRegister = true
      if (row) {
        console.log(row)
        this.rowData = row
        this.selectreferrerList1 = []
        this.selectreferrerList1.push({
          id: row.userId,
          userCode: row.userCode
        })
        // this.formData.isQuRegister = false
        // this.formData.mobilePhone = row.cellphone
        const temData = JSON.parse(JSON.stringify(row))
        this.formData = {
          userId: temData.userId,
          userCode: temData.userCode,
          firmName: temData.firmName,
          email: temData.email,
          mobilePhone: temData.cellphone,
          userStatus: 'N',
          password: null,
          belongsFirmId: null
        }
        this.isEdit = true
      }
      this.formData.userStatus = 'N'
      this.dialogVisible = true
    },
    resetForm() {
      this.formData = {
        password: null,
        mobilePhone: null,
        // isQuRegister: true,
        firmName: null,
        marketId: window.g.APP_MARKET_ID,
        email: null,
        captchaCode: null,
        captchaId: null,
        code: null,
        createWay: 1,
        userName: null,
        userType: null
      }
      this.$refs.formData.resetFields()
      this.selectreferrerList1 = []
    },
    submitForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          const temData = JSON.parse(JSON.stringify(this.formData))
          this.protocol.param_addUser.data = temData
          for (const key in this.selectreferrerList1) {
            // if (this.selectreferrerList1.hasOwnProperty(key)) {
            const element1 = this.selectreferrerList1[key]
            if (element1.id === temData.userCode) {
              temData.userCode = element1.userCode
            }
            // }
          }
          // if (temData.isQuRegister) {
          // this.protocol.param_addUser.data.password = temData.password
          this.protocol.param_addUser.data.password = this.dataFormat.getMd5('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' + temData.password)
          this.protocol.param_addUser.data.createWay = temData.createWay
          this.protocol.param_addUser.data.marketId = window.g.APP_MARKET_ID
          // this.protocol.param_addUser.data.isQuRegister = 1
          // } else {
          // this.protocol.param_addUser.data.isQuRegister = 2
          // }
          // this.protocol.param_addUser.data.password = temData.password
          this.http.post(this.protocol.param_addUser).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
              this.dialogVisible = false
              this.$emit('reLoad')
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
    updateForm() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          // let temData = JSON.parse(JSON.stringify(this.formData));
          this.protocol.param_updateUserInfo.data.userId = this.rowData.id
          this.protocol.param_updateUserInfo.data.marketId = window.g.APP_MARKET_ID
          this.protocol.param_updateUserInfo.data.cellphone = this.formData.mobilePhone
          this.protocol.param_updateUserInfo.data.email = this.formData.email
          this.protocol.param_updateUserInfo.data.firmName = this.formData.firmName
          this.http.post(this.protocol.param_updateUserInfo).then(res => {
            const { code, message } = res.data
            if (code >= 0) {
              this.dialogVisible = false
              this.$emit('reLoad')
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
