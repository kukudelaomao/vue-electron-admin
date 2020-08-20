import store from '@/store'
import http from './http'
import protocol from '../api/protocol'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export function rightButtonCheck(value) {
  if (value) {
    const rightButton = store.getters.rightButton
    let hasPermission = false
    for (const item in rightButton) {
      if (rightButton[item].code === value) {
        hasPermission = true
      }
    }
    return hasPermission
  } else {
    console.error('传递一个要判断的权限按钮code!')
    return false
  }
}

export function loadRight() {
  protocol.param_findButton.data.userId = sessionStorage.getItem('UserId')
  protocol.param_findButton.data.parentRightCode = sessionStorage.getItem('code')
  return new Promise(function(resolve) {
    http.post(protocol.param_findButton).then(res => {
      const { code, message, value } = res.data
      if (code === 0 && value.length > 0) {
        store.commit('SET_RIGHTBUTTON', value)
        resolve('getRBSuccess')
      } else {
        console.log(message)
        // this.$message({ type: 'warning', message: message })
      }
    })
  })
}
