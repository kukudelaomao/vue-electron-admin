<template>
  <el-dialog
    :title="titleData"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @closed="resetForm"
  >
    <el-tree
      ref="SlotMenuList"
      :data="allRightList"
      :props="props"
      node-key="rightCode"
      highlight-current
      :expand-on-click-node="false"
      :default-checked-keys="defaultCheckList"
      show-checkbox
    />
    <span slot="footer">
      <el-button @click="dialogVisible = false">关闭</el-button>
      <el-button type="primary" @click="submitAdd()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      titleData: '设置权限',
      roleId: null,
      defaultCheckList: [],
      alreadyChecked: [],
      exceptCheckedList: [],
      exceptCheckedParentList: [],
      allRightList: [],
      props: {
        label: 'rightName',
        children: 'children'
      },
      allRightNewFormat: []
    }
  },
  methods: {
    showDialog(row) {
      this.dialogVisible = true
      this.roleId = row.id
      this.menuAuthDefault = row.menuAuth
      this.getAllRight(row)
    },
    getAllRight(row) {
      this.http.postDev(this.protocol.param_consoleFindAllRightCode).then(res => {
        const { code, value, message } = res.data
        if (code === 0) {
          this.allRightList = value
          this.alreadyChecked = JSON.parse(row.menuAuth)
          this.getAllRightNewFormat(value)
          this.exceptChecked()
          this.getAllParent()
          this.getDefaultCheckList(JSON.parse(row.menuAuth))
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    getAllRightNewFormat(value) {
      for (let i = 0; i < value.length; i++) {
        this.allRightNewFormat.push({
          rightCode: value[i].rightCode + '',
          pid: value[i].pid + ''
        })
        if (value[i].children.length !== 0) {
          this.getAllRightNewFormat(value[i].children)
        }
      }
    },
    exceptChecked() {
      for (let i = 0; i < this.allRightNewFormat.length; i++) {
        if (this.alreadyChecked.indexOf(this.allRightNewFormat[i].rightCode) === -1) {
          this.exceptCheckedList.push(this.allRightNewFormat[i])
        }
      }
    },
    getAllParent() {
      for (let j = 0; j < this.exceptCheckedList.length; j++) {
        this.getAllParentList(this.exceptCheckedList[j].pid)
      }
    },
    getAllParentList(value) {
      for (let i = 0; i < this.allRightNewFormat.length; i++) {
        if (this.allRightNewFormat[i].rightCode === value) {
          this.exceptCheckedParentList.push(this.allRightNewFormat[i].rightCode)
          this.getAllParentList(this.allRightNewFormat[i].pid)
        }
      }
    },
    getDefaultCheckList(value) {
      for (let i = 0; i < this.exceptCheckedParentList.length; i++) {
        if (value.indexOf(this.exceptCheckedParentList[i]) !== -1) {
          value.splice(value.indexOf(this.exceptCheckedParentList[i]), 1)
        }
      }
      this.defaultCheckList = value
    },
    submitAdd() {
      const checkList = this.$refs.SlotMenuList.getCheckedKeys()
      const halfCheckList = this.$refs.SlotMenuList.getHalfCheckedKeys()
      if (halfCheckList.length > 0) {
        checkList.push(...halfCheckList)
      }
      for (let i = 0; i < checkList.length; i++) {
        checkList[i] = checkList[i] + ''
      }
      this.protocol.param_addRoleToRight.data.id = this.roleId
      this.protocol.param_addRoleToRight.data.menuAuth = JSON.stringify(checkList)
      this.http.postDev(this.protocol.param_addRoleToRight).then(res => {
        const { code, message } = res.data
        if (code === 0) {
          this.$emit('reLoad')
          this.dialogVisible = false
          this.$message({ type: 'success', message: message })
        } else {
          this.$refs.SlotMenuList.setCheckedKeys(this.defaultCheckList)
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    resetForm() {
      this.defaultCheckList = []
      this.allRightList = []
      this.alreadyChecked = []
      this.exceptCheckedList = []
      this.exceptCheckedParentList = []
      this.allRightNewFormat = []
    }
  }
}
</script>

<style scoped>
</style>
