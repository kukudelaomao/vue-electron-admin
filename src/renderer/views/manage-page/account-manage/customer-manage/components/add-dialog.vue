<template>
  <el-dialog
    :title="titleData"
    :visible.sync="dialogVisible"
    width="40%"
    :close-on-click-modal="false"
    @closed="resetForm()"
  >
    <el-form
      ref="formDataAdd"
      inline
      :model="formData"
      :rules="rules"
      label-position="top"
      style="margin-left:6%;"
    >
      <el-form-item label="客户名称" prop="firmName" style="width:44%">
        <el-input v-model="formData.firmName" />
      </el-form-item>
      <!-- <el-form-item label="电子邮箱" prop="email" style="width:44%">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>-->
      <el-form-item label="所属用户" prop="userCode" style="width:44%">
        <el-select
          v-model="formData.userCode"
          placeholder="请输入用户编码搜索"
          filterable
          clearable
          style="width:100%"
          remote
          :remote-method="getUserCode"
          :loading="searchLoading"
          :no-data-text="searchText"
        >
          <el-option
            v-for="item in selectreferrerList1"
            :key="item.id"
            :value="item.userCode"
            :label="item.userCode"
          >
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userCode }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="推荐人" prop="parentUsrCode" style="width:44%">
        <el-select
          v-model="formData.parentUsrCode"
          placeholder="请输入用户编码搜索"
          filterable
          clearable
          style="width:100%"
          remote
          :remote-method="getFrimCode"
          :loading="searchLoading"
          :no-data-text="searchText"
        >
          <el-option
            v-for="item in selectreferrerList"
            :key="item.id"
            :value="item.userCode"
            :label="item.userCode"
          >
            <span style="float: left">{{ item.id }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.userCode }}</span>
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
    <span slot="footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button v-if="titleData=='创建客户'" type="primary" @click="submitAdd()">创建</el-button>
      <el-button v-if="titleData=='修改客户信息'" type="primary" @click="sumitUpdate()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
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
    // var validatePassCheck = (rule, value, callback) => {
    //   if (value === this.formData.userCode) {
    //     callback(new Error('所属用户和推荐人不能一致'));
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
      // 控制窗口显示与隐藏
      dialogVisible: false,
      userType: window.g.APP_USER_TYPE,
      // 表格的参数
      formData: {
        firmName: null,
        firmStatus: 1,
        marketId: window.g.APP_MARKET_ID,
        userCode: null,
        parentUsrCode: null,
        email: null
      },
      selectreferrerList: [],
      selectreferrerList1: [],
      // selectMarketList: [],
      selectaccountTypeList: [],
      searchLoading: false,
      searchText: '未找到匹配的用户',
      // 标题名称
      titleData: null,
      // 加上验证  必须输入字段后才能点击确定
      rules: {
        firmName: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
        ],
        userCode: [
          { required: true, message: '所属用户不能为空', trigger: 'blur' }
        ],
        // parentUsrCode:[
        //   { required: false,validator: validatePassCheck, trigger: "blur" }
        // ],
        email: [
          // { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    // 用于父组件调用的方法  用于显示dialog 并且将数据传递给子组件
    showDialog(type, row) {
      this.formData.isCreateUser = true
      if (row) {
        this.formData.isCreateUser = false
        // const temData = JSON.parse(JSON.stringify(row))
        this.formData.firmId = row.id
        this.formData.firmName = row.firmName
        this.formData.userCode = row.userCode
        this.formData.parentUsrCode = row.parentUserCode
        this.selectreferrerList = []
        this.selectreferrerList.push({
          id: row.parentUsrCode,
          userCode: row.parentUsrCode
        })
        this.selectreferrerList1 = []
        this.selectreferrerList1.push({
          id: row.userCode,
          userCode: row.userCode
        })
        // console.log(this.selectreferrerList)
        this.formData.userId = row.userId
      }
      this.titleData = type
      this.dialogVisible = true
    },
    // 新建提交
    submitAdd() {
      this.$refs.formDataAdd.validate(valid => {
        if (valid) {
          const temData = JSON.parse(JSON.stringify(this.formData))
          if (this.formData.userCode === this.formData.parentUsrCode) {
            this.$message({
              type: 'warning',
              message: '所属用户与推荐人不能是相同编码'
            })
            return
          }
          this.protocol.param_addFirm.data = temData
          this.protocol.param_addFirm.data.firmStatus = 1
          this.http.post(this.protocol.param_addFirm).then(res => {
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
    sumitUpdate() {
      this.$refs.formDataAdd.validate(valid => {
        if (valid) {
          const temData = JSON.parse(JSON.stringify(this.formData))
          if (this.formData.userCode === this.formData.parentUsrCode) {
            this.$message({
              type: 'warning',
              message: '所属用户与推荐人不能是相同编码'
            })
            return
          }
          this.protocol.param_updateFirmInfo.data = temData
          this.protocol.param_updateFirmInfo.data.firmId = temData.firmId
          this.protocol.param_updateFirmInfo.data.firmName = temData.firmName
          this.protocol.param_updateFirmInfo.data.userCode = temData.userCode
          this.protocol.param_updateFirmInfo.data.marketId = window.g.APP_MARKET_ID
          this.http.post(this.protocol.param_updateFirmInfo).then(res => {
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
      this.formData = {
        firmId: null,
        firmName: null,
        firmStatus: 1,
        userId: null,
        userType: null,
        userStatus: 'N',
        isCreateUser: false,
        email: null,
        parentUsrCode: null
      }
      this.selectreferrerList = []
      this.selectreferrerList1 = []
      // 调用ElementUI方法  清除验证时的 红色与绿色框   可注释后看一下
      this.$refs.formDataAdd.resetFields()
    },
    getFrimCode(query) {
      if (query !== '') {
        this.searchLoading = true
        if (query.length < 2) {
          setTimeout(() => {
            // this.$message({ type: "warning", message: "至少输入六个字符" });
            this.searchText = '至少输入两位参数进行搜索'
            this.selectreferrerList = []
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
              this.selectreferrerList = value
              if (this.selectreferrerList.length <= 0) {
                this.searchText = '未找到匹配的用户'
              }
            } else {
              this.$message({ type: 'warning', message: message })
            }
          })
        }, 1000)
      } else {
        this.selectreferrerList = []
      }
    },
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
                this.searchText = '未找到匹配的用户'
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
    add0(m) {
      return m < 10 ? '0' + m : m
    },
    format(shijianchuo) {
      // shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return (
        y +
        '-' +
        this.add0(m) +
        '-' +
        this.add0(d) +
        ' ' +
        this.add0(h) +
        ':' +
        this.add0(mm) +
        ':' +
        this.add0(s)
      )
    }
  }
}
</script>

<style scoped>
</style>
<style lang="scss">
</style>
