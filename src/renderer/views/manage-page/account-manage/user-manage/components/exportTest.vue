<template>
  <div>
    <el-button type="primary" style="float:right;margin-right:10px;" @click="exportExcel()">导出</el-button>
    <!-- 弹出导出框 -->
    <el-dialog
      append-to-body
      title="选择您要导出的条目"
      :visible.sync="dialogShowType"
      @closed="closeDialog"
    >
      <el-form ref="reportForm" :model="reportForm">
        <el-form-item prop="checkboxGroup">
          <el-checkbox-group v-model="reportForm.checkboxGroup" size="medium">
            <el-checkbox-button
              v-for="item in formDataList"
              :key="item.en"
              :label="item"
            >{{ item.cn }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="center" style="color:#C0C4CC">提示:直接点击确定导出全部已搜索数据</el-form-item>
        <el-form-item align="center">
          <el-button type="primary" :loading="buttonLoading" @click="formOut()">确定</el-button>
          <el-button @click="dialogShowType=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  // @ tableRef 需要导出的el-table的 ref对象  例如  this.$refs.tableData
  // this.protocolName 导出使用的接口 例如 param_exportQueryFuAccountFundsFlow
  // searchForm 已启用的搜索条件  例如 searchForm:{}
  // fileName 导出的文件名称  例如 资金流水.xls
  props: ['tableRef', 'thisProtocolName', 'searchForm', 'fileName'],
  data() {
    return {
      // 导出用容器
      reportForm: {
        checkboxGroup: []
      },
      // 导出用 cn 与en字段名称
      formDataList: [],
      dialogShowType: false,
      buttonLoading: false
    }
  },
  methods: {
    // 获取数据打开窗口
    exportExcel() {
      const temData = []
      // 遍历table所有的列名称 如果是 序号 空字符串  或者是操作按钮 就会过滤
      for (const item in this.tableRef.columns) {
        if (this.tableRef.columns[item].type === 'index') {
          continue
        }
        if (this.tableRef.columns[item].type === 'expand') {
          continue
        }
        if (this.tableRef.columns[item].label === '操作') {
          continue
        }
        const data = {
          cn: this.tableRef.columns[item].label,
          en: this.tableRef.columns[item].property
        }
        if (this.tableRef.columns[item].property === 'roleNames') {
          data.en = 'roleName'
        }
        temData.push(data)
      }
      // 将searchForm所有的数值赋值给接口
      for (const item in this.searchForm) {
        this.protocol[this.this.protocolName].data[item] = this.searchForm[item]
      }
      this.formDataList = temData
      this.dialogShowType = true
    },
    // 导出请求
    formOut(formName) {
      this.buttonLoading = true
      let cn = ''
      let en = ''
      if (this.reportForm.checkboxGroup === '') {
        for (let i = 0; i < this.formDataList.length; i++) {
          cn = cn + this.formDataList[i].cn + ','
        }
        for (let i = 0; i < this.formDataList.length; i++) {
          en = en + this.formDataList[i].en + ','
        }
      } else {
        for (let i = 0; i < this.reportForm.checkboxGroup.length; i++) {
          cn = cn + this.reportForm.checkboxGroup[i].cn + ','
        }
        for (let i = 0; i < this.reportForm.checkboxGroup.length; i++) {
          en = en + this.reportForm.checkboxGroup[i].en + ','
        }
      }
      cn = cn.substring(0, cn.length - 1)
      en = en.substring(0, en.length - 1)
      this.protocol[this.this.protocolName].data.cn = cn
      this.protocol[this.this.protocolName].data.en = en
      this.http.postReport(this.protocol[this.this.protocolName]).then(res => {
        const blob = res.data
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = e => {
          const a = document.createElement('a')
          a.download = this.fileName
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          this.dialogShowType = false
        }
      })
    },
    // 关闭窗口重置数据
    closeDialog() {
      this.dialogShowType = false
      this.buttonLoading = false
      this.$refs.reportForm.resetFields()
    }
  }
}
</script>

<style scoped>
</style>
<style lang="scss">
</style>
