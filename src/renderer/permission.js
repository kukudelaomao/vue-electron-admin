import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  if (sessionStorage.getItem('Sessionstr')) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) { // 判断当前用户是否已拉取完user_info信息
        next()
      } else {
        store.dispatch('GetPermission').then(res => { // 拉取user_info
          // 假登录
          const resultList = res.data.value // note: roles must be a array! such as: ['editor','develop']
          // console.log(resultList)
          // const resultList = [] // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { resultList }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          // 假登录
          // 如果没有session就会退出登录
          console.log('登录失效,请重新登录')
          store.dispatch('FedLogOut').then(() => {
            Message.error('登录失效,请重新登录')
            store.dispatch('delAllViews').then(() => {
              // 改变当前标签(因为他会保留当前标签页.再次登录会出现一样的页面)
              router.push('/dashboard') // You can set another route
              // 刷新页面
              window.location.reload()// In order to re-instantiate the vue-router object to avoid bugs
            })
            next({ path: '/' })
            NProgress.done()
          })
        })
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
