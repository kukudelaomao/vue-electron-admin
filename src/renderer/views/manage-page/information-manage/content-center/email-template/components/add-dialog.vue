<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="800px"
    center
    @close="resetFormData()"
    @opened="getTinymceData"
  >
    <div class="formContainer">
      <div class="uploadForm">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="发送方式" prop="sendType">
            <el-select v-model="form.sendType" class="select" placeholder="请选择">
              <el-option
                v-for="item in sendTypeOptions"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入模板名称" />
          </el-form-item>
          <el-form-item label="模板名称" prop="mark">
            <el-input v-model="form.mark" placeholder="请输入模板标识" />
          </el-form-item>
          <el-form-item label="禁用/开启" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">禁用</el-radio>
              <el-radio :label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="模板内容" prop="content">
            <Tinymce ref="Tinymce" v-model="form.content" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">立即提交</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import Tinymce from '@/components/Tinymce/index.vue'
export default {
  components: {
    Tinymce
  },
  data() {
    return {
      dialogTitle: null,
      dialogVisible: false,
      activeName: 'image',
      cascaderProps: {
        value: 'categoryId',
        label: 'categoryName',
        checkStrictly: true
      },
      form: {
        id: null,
        sendType: null,
        name: null,
        mark: null,
        status: 1,
        content: null
      },
      rules: {
        sendTypeName: [
          { required: true, message: '请选择发送方式', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入模板名称', trigger: 'change' }
        ],
        mark: [
          { required: true, message: '请输入模板标识', trigger: 'change' }
        ]
      },
      sendTypeOptions: [],
      sendTypeValue: null
    }
  },
  watch: {

  },
  mounted() {
    this.getSendType()
  },
  methods: {
    showDialog(row) {
      this.dialogVisible = true
      if (row) {
        // 如果不进行转变 修改form会同时修改row
        const temData = JSON.parse(JSON.stringify(row))
        this.sendTypeValue = temData.sendType
        this.form = temData
        this.dialogTitle = '编辑邮件模板'
      } else {
        this.dialogTitle = '新增邮件模板'
      }
    },
    getTinymceData() {
      this.$nextTick(() => {
        if (this.form.content) {
          this.$refs.Tinymce.setContent(this.form.content)
        }
      })
    },
    getSendType() {
      const that = this
      this.protocol.param_findEmailSendType.data.parentId = null
      this.http.postDev(this.protocol.param_findEmailSendType).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.sendTypeOptions = value
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const that = this
          this.protocol.param_saveEmailTemplate.data.id = this.form.id
          this.protocol.param_saveEmailTemplate.data.sendType = this.form.sendType
          this.protocol.param_saveEmailTemplate.data.name = this.form.name
          this.protocol.param_saveEmailTemplate.data.mark = this.form.mark
          this.protocol.param_saveEmailTemplate.data.status = this.form.status
          this.protocol.param_saveEmailTemplate.data.content = this.form.content
          this.http.postDev(this.protocol.param_saveEmailTemplate).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              that.dialogVisible = false
              that.$emit('reLoad')
            } else {
              that.$message({ type: 'warning', message: message })
            }
          })
        }
      })
    },
    resetFormData() {
      this.form = {
        id: null,
        sendType: null,
        name: null,
        mark: null,
        status: 1,
        content: null
      }
      this.$refs.Tinymce.setContent('')
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadForm {
  width: 720px;
}
div.select {
  display: block;
}
</style>

