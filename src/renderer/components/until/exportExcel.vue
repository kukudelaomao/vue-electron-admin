<template>
  <div>
    <el-button type="primary" @click="exportExcel()">{{ $t('export.export') }}</el-button>
    <!-- 弹出导出框 -->
    <el-dialog
      append-to-body
      :title="$t('export.Select_the_entry_you_want_to_export')"
      :visible.sync="dialogShowType"
      @closed="closeDialog"
    >
      <el-form ref="reportForm" :model="reportForm">
        <el-form-item prop="checkboxGroup">

          <div style="margin: 0px 0px 15px 10px;">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">{{ $t('export.Select_All') }}</el-checkbox>
          </div>
          <el-checkbox-group v-model="reportForm.checkboxGroup" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="item in formDataList"
              id="export-info"
              :key="item.en"
              :label="item"
              class="checkbox-button-export-border"
              border
            >{{ item.cn }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item align="center" style="color:#C0C4CC">{{ $t('export.Tip_Click_to_export_all_searched_data_directly') }}</el-form-item>
        <el-form-item align="center">
          <el-button type="primary" :loading="buttonLoading" @click="formOut()">{{ $t('export.confirm') }}</el-button>
          <el-button @click="dialogShowType=false">{{ $t('export.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  // @ tableRef 需要导出的el-table的 ref对象  例如  this.$refs.tableData
  // protocolName 导出使用的接口 例如 param_exportQueryFuAccountFundsFlow
  // searchForm 已启用的搜索条件  例如 searchForm:{}
  // fileName 导出的文件名称  例如 资金流水.xls
  props: {
    'tableRef': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'protocolName': {
      type: String,
      default: ''
    },
    'searchForm': {
      type: Object,
      default: function() {
        return {}
      }
    },
    'fileName': {
      type: String,
      default: '导出表格.xls'
    }
  },
  data() {
    return {
      // 导出用容器
      reportForm: {
        checkboxGroup: []
      },
      // 导出用 cn 与en字段名称
      formDataList: [], // tabel传过来的初始数据
      dialogShowType: false,
      buttonLoading: false,
      isIndeterminate: false,
      checkAll: false
    }
  },
  computed: {
    formDataListCnName: function() {
      const tmp = []
      this.formDataList.forEach(element => {
        tmp.push(element.cn)
      })
      return tmp
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
        if (this.tableRef.columns[item].type === 'selection') {
          continue
        }
        if (this.tableRef.columns[item].type === 'expand') {
          continue
        }
        if (this.tableRef.columns[item].label === this.$t('common.operation')) {
          continue
        }
        if (this.tableRef.columns[item].className === 'exportExcept') {
          continue
        }
        const data = {
          cn: this.tableRef.columns[item].label,
          en: this.tableRef.columns[item].property
        }
        temData.push(data)
      }
      // 将searchForm所有的数值赋值给接口
      for (const item in this.searchForm) {
        this.protocol[this.protocolName].data[item] = this.searchForm[item]
      }
      this.formDataList = temData
      this.reportForm.checkboxGroup = this.formDataList
      this.isIndeterminate = false
      this.checkAll = true
      this.dialogShowType = true
    },
    handleCheckAllChange(val) {
      this.reportForm.checkboxGroup = val ? this.formDataList : []
      this.isIndeterminate = false
      console.log(this.reportForm.checkboxGroup)
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.formDataList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.formDataList.length
    },
    // 导出请求
    formOut(formName) {
      let cn = ''
      let en = ''
      if (this.reportForm.checkboxGroup.length === 0) {
        // for (var i = 0; i < this.formDataList.length; i++) {
        //   cn = cn + this.formDataList[i].cn + ','
        //   en = en + this.formDataList[i].en + ','
        // }
        this.$message({ type: 'warning', message: this.$t('export.Please_select_at_least_one_column') })
        return
      } else {
        this.buttonLoading = true
        for (var k = 0; k < this.reportForm.checkboxGroup.length; k++) {
          cn = cn + this.reportForm.checkboxGroup[k].cn + ','
          en = en + this.reportForm.checkboxGroup[k].en + ','
        }
      }
      cn = cn.substring(0, cn.length - 1)
      en = en.substring(0, en.length - 1)
      this.protocol[this.protocolName].data.cn = cn
      this.protocol[this.protocolName].data.en = en
      this.http.postReport(this.protocol[this.protocolName]).then(res => {
        // const blob = res.data
        // const reader = new FileReader()
        // reader.readAsDataURL(blob)
        // reader.onload = e => {
        //   const a = document.createElement('a')
        //   a.download = this.fileName
        //   a.href = e.target.result
        //   document.body.appendChild(a)
        //   a.click()
        //   document.body.removeChild(a)
        //   this.dialogShowType = false
        // }
        console.log(res)
        var blob = new Blob([res.data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        var downloadElement = document.createElement('a')
        var href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        downloadElement.download = this.fileName // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
        this.dialogShowType = false
      })
    },
    // 关闭窗口重置数据
    closeDialog() {
      this.dialogShowType = false
      this.buttonLoading = false
      // this.$refs.reportForm.resetFields()
    }
  }
}
</script>

<style scoped>
/* #export-info{
  margin: 0px 5px 5px 0px;
} */
</style>
