<template>
  <el-dialog
    title="新增栏目"
    :visible.sync="dialogVisible"
    width="800px"
    center
    @close="resetFormData('form')"
  >
    <div class="formContainer">
      <div class="uploadForm">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="所属栏目" prop="categoryId">
            <el-cascader
              v-model="form.categoryId"
              :options="categoryOptions"
              :props="cascaderProps"
              clearable
            />
          </el-form-item>
          <el-form-item label="栏目名称" prop="categoryName">
            <el-input v-model="form.categoryName" placeholder="请输入栏目名称" />
          </el-form-item>
          <el-form-item label="标识" prop="categoryMark">
            <el-input v-model="form.categoryMark" placeholder="请输入标识" />
          </el-form-item>
          <el-form-item label="栏目属性" prop="categoryAttribute">
            <el-radio-group v-model="form.categoryAttribute">
              <el-radio :label="1">最终列表栏目</el-radio>
              <el-radio :label="2">外部链接</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="isShowLink" label="链接" prop="categoryLink">
            <el-input v-model="form.categoryLink" placeholder="请输入链接" />
            <p class="tips">可以填写完整的url，如：<span>this.http://www.abc.com</span>，也可以填写 <span>模块/控制器/操作</span>，如：<span>cms/index/index</span></p>
          </el-form-item>
          <el-form-item label="是否隐藏栏目" prop="state">
            <el-radio-group v-model="form.state">
              <el-radio :label="0">隐藏</el-radio>
              <el-radio :label="1">显示</el-radio>
            </el-radio-group>
            <p class="tips">隐藏后前台不可见</p>
          </el-form-item>
          <el-form-item label="立即启用" prop="immediateEffect">
            <el-radio-group v-model="form.immediateEffect">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示位置" prop="displayPos">
            <el-radio-group v-model="form.displayPos">
              <el-radio :label="1">两者均可</el-radio>
              <el-radio :label="2">Mobile</el-radio>
              <el-radio :label="3">Web</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input v-model="form.sort" placeholder="请输入排序" />
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
export default {
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
        categoryId: null,
        categoryName: null,
        categoryMark: null,
        categoryAttribute: 1,
        categoryLink: null,
        state: 1,
        immediateEffect: 1,
        displayPos: 1,
        sort: null
      },
      rules: {
        categoryName: [
          { required: true, message: '请选择所属栏目', trigger: 'change' }
        ],
        categoryId: [
          { required: true, message: '请输入栏目名称', trigger: 'change' }
        ],
        categoryMark: [
          { required: true, message: '请输入栏目标识', trigger: 'change' }
        ],
        categoryLink: [
          { required: true, message: '请输入链接', trigger: 'change' }
        ]
      },
      categoryOptions: [],
      isShowLink: false
    }
  },
  watch: {
    'form.categoryAttribute': {
      handler: function(val, oldVal) {
        if (val === 2) {
          this.isShowLink = true
        } else if (val === 1) {
          this.isShowLink = false
        }
      }
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    showDialog(row, type) {
      // this.$refs['form'].resetFields()
      this.dialogVisible = true
      if (row) {
        // 如果不进行转变 修改form会同时修改row
        const temData = JSON.parse(JSON.stringify(row))

        // 如果type=1为新增子栏目，将除所属栏目以外的全部信息重置
        if (type === 1) {
          this.form.categoryId = temData.categoryId
        } else {
          this.form = temData
        }
      }
    },
    getCategory() {
      const that = this
      this.protocol.param_findContentType.data.parentId = null
      this.http.postDev(this.protocol.param_findContentType).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          that.categoryOptions = value
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const that = this
          this.protocol.param_saveContentType.data.categoryId = this.form.categoryId
          this.protocol.param_saveContentType.data.categoryName = this.form.categoryName
          this.protocol.param_saveContentType.data.categoryMark = this.form.categoryMark
          this.protocol.param_saveContentType.data.categoryAttribute = this.form.categoryAttribute
          this.protocol.param_saveContentType.data.categoryLink = this.form.categoryLink
          this.protocol.param_saveContentType.data.state = this.form.state
          this.protocol.param_saveContentType.data.immediateEffect = this.form.immediateEffect
          this.protocol.param_saveContentType.data.displayPos = this.form.displayPos
          this.protocol.param_saveContentType.data.sort = this.form.sort
          this.http.postDev(this.protocol.param_saveContentType).then(res => {
            const { code, message } = res.data
            if (code === 0) {
              that.$message({ type: 'success', message: message })
              that.dialogVisible = false
              that.$emit('reLoad')
            } else {
              that.$message({ type: 'warning', message: message })
            }
          })
        }
      })
    },
    resetFormData(formName) {
      this.form = {
        categoryId: null,
        categoryName: null,
        categoryMark: null,
        categoryAttribute: 1,
        categoryLink: null,
        state: 1,
        immediateEffect: 1,
        displayPos: 1,
        sort: null
      }
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.formContainer {
  display: flex;
  flex-direction: row;
}
.uploadForm {
  width: 720px;
}
.tips {
  font-size: 12px;
  color: #999999;
}
.tips span {
  font-style: italic;
  color: #ff0000;
}
</style>

