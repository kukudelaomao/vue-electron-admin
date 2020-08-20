import pagination from '@/components/until/pagination'
import exportExcel from '@/components/until/exportExcel.vue'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.component('pagination', pagination)
  Vue.component('exportExcel', exportExcel)
}

export default plugin
