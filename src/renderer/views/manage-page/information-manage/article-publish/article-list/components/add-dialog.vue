<template>
  <el-dialog
    title="分布文章"
    :visible.sync="dialogVisible"
    width="800px"
    center
    @close="resetFormData()"
    @opened="getTinymceData"
  >
    <div class="formContainer">
      <div class="uploadForm">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="分类" prop="categoryId">
            <el-cascader
              v-model="form.categoryId"
              :options="categoryOptions"
              :props="cascaderProps"
              clearable
            />
          </el-form-item>
          <el-form-item label="标题" prop="contentTitle">
            <el-input v-model="form.contentTitle" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="状态" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :label="0">隐藏</el-radio>
              <el-radio :label="1">显示</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容" prop="contentText">
            <Tinymce ref="Tinymce" v-model="form.contentText" />
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
      dialogVisible: false,
      activeName: 'image',
      cascaderProps: {
        value: 'categoryId',
        label: 'categoryName',
        checkStrictly: true
      },
      form: {
        id: null,
        contentTitle: null,
        categoryId: null,
        categoryName: '',
        state: 1,
        contentText: ''
      },
      rules: {
        contentTitle: [
          { required: true, message: '请输入文章标题', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请选择所属分类', trigger: 'change' }
        ],
        contentText: [
          { required: true, message: '请填写文章内容', trigger: 'change' }
        ]
      },
      categoryOptions: []
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    showDialog(row) {
      this.dialogVisible = true
      if (row) {
        // 如果不进行转变 修改form会同时修改row
        const temData = JSON.parse(JSON.stringify(row))
        this.form = temData
      }
    },
    getTinymceData() {
      this.$nextTick(() => {
        if (this.form.contentText) {
          this.$refs.Tinymce.setContent(this.form.contentText)
        }
      })
    },
    getCategory() {
      const that = this
      this.protocol.param_findContentType.data.parentId = null
      this.http.postDev(this.protocol.param_findContentType).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.getCategoryState(value)
          that.categoryOptions = value
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    getCategoryState(data) {
      for (const item of data) {
        if (item.state === 0) {
          item.disabled = true
        } else if (item.state === 1) {
          item.disabled = false
        }
        if (item.children.length !== 0) {
          this.getCategoryState(item.children)
        } else {
          delete item.children
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const that = this
          this.protocol.param_saveContent.data.id = this.form.id
          this.protocol.param_saveContent.data.categoryId = this.form.categoryId
          this.protocol.param_saveContent.data.contentTitle = this.form.contentTitle
          this.protocol.param_saveContent.data.contentText = this.form.contentText
          this.protocol.param_saveContent.data.state = this.form.state
          this.http.postDev(this.protocol.param_saveContent).then(res => {
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
        contentTitle: null,
        categoryId: null,
        categoryName: '',
        state: 1
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
</style>

