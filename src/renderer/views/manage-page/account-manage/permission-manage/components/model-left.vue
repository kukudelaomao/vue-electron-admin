<template>
  <el-card v-loading="loading" class="cardLarge">
    <el-input v-model="filterText" class="searchInput" placeholder="搜索权限" clearable size="small" />
    <el-button v-if="rightForm.edit && !isSort" size="small" plain type="primay" @click="beginSort()">排序</el-button>
    <el-button v-if="isSort" size="small" plain type="success" @click="submitSort()">结束</el-button>
    <el-button v-if="isSort" size="small" plain @click="resetSort()">重置</el-button>
    <el-tree
      ref="SlotMenuList"
      class="permissionTree"
      :data="treeData"
      :props="props"
      node-key="rightCode"
      highlight-current
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      default-expand-all
      :draggable="isSort"
      @node-click="showTable"
    />
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      treeData: [],
      filterText: '',
      props: {
        label: 'rightName',
        children: 'children'
      },
      // 接入真实接口时全部改为false
      rightForm: {
        edit: true
      },
      sortId: 0,
      isSort: false,
      loading: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.SlotMenuList.filter(val)
    }
  },
  mounted() {
    this.loadTree()
  },
  methods: {
    getButtonRight() {
      // this.rightForm.edit = this.rightButtonCheck('edit')
    },
    beginSort() {
      this.isSort = true
    },
    filterNode(value, data) {
      if (!value) return true
      return data.rightName.indexOf(value) !== -1
    },
    showTable(data, node) {
      this.$emit('showRightTable', data)
    },
    loadTree() {
      // param_findAllRight
      this.loading = true
      this.protocol.param_consoleFindAllRightCode.data.userId = 1
      this.protocol.param_consoleFindAllRightCode.data.type = 1
      this.http.postDev(this.protocol.param_consoleFindAllRightCode).then(res => {
        const { code, message, value } = res.data
        if (code === 0) {
          this.treeData = value
          this.loading = false
        } else {
          this.$message({ type: 'warning', message: message })
        }
      })
    },
    changeSort(data) {
      data.forEach((value, index) => {
        if (value.children && value.children.length > 0) {
          this.changeSort(value.children)
        }
        data[index].sortId = this.sortId++
      })
    },
    resetSort() {
      this.loadTree()
    },
    formatTreeData(data, pid) {
      for (let i = 0; i < data.length; i++) {
        data[i].pid = pid
        data[i].sortId = i + 1
        delete data[i].code
        delete data[i].rightIcon
        delete data[i].rightName
        this.formatTreeData(data[i].children, data[i].rightCode)
      }
    },
    submitSort() {
      this.isSort = false
      const tempData = JSON.parse(JSON.stringify(this.treeData))
      this.formatTreeData(tempData, 0)
      this.loading = true
      this.protocol.param_updateAllMenu.data.list = tempData
      this.http.postDev(this.protocol.param_updateAllMenu).then(res => {
        const { code, message } = res.data
        if (code === 0) {
          this.loadTree()
        } else {
          this.loadTree()
          this.$message({ type: 'warning', message: message })
        }
      })
    }
  }
}
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.searchInput {
  width: 60%;
}
.permissionTree {
  margin-top: 10px;
}
.cardLarge {
  width: 370px;
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
