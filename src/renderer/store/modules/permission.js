import {
  asyncRouterMap,
  constantRouterMap
} from '@/router'
import store from '@/store/index'
// import Layout from '@/layout/index'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(routes, roles) {
//   const res = []

//   routes.forEach(route => {
//     const tmp = {
//       ...route
//     }
//     if (hasPermission(roles, tmp)) {
//       if (tmp.children) {
//         tmp.children = filterAsyncRouter(tmp.children, roles)
//       }
//       res.push(tmp)
//     }
//   })

//   return res
// }

/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

// 对比网上router与本地router 形成新的router
// function recursionRouter(userRouter = [], allRouter = []) {
//   var realRoutes = []
//   if (userRouter != undefined) {
//     allRouter.forEach((v, i) => {
//       userRouter.forEach((item, index) => {
//         // if (item.id === v.meta.id && item.id != null && item.id != '') {
//         if (item.code === v.meta.rightCode) {
//           if (item.children && item.children.length > 0) {
//             // item.children.meta.icon = 'dashboard'
//             v.children = recursionRouter(item.children, v.children)
//           }
//           v.meta = {
//             title: item.rightName,
//             icon: item.rightIcon
//           }
//           realRoutes.push(v)
//         }
//       })
//     })
//   } else {
//     store.dispatch('LogOut').then(() => {
//       console.log('权限树获取失败')
//       window.location.reload() // In order to re-instantiate the vue-router object to avoid bugs
//     })
//   }
//   // 假登录
//   return realRoutes
//   // return allRouter
// }
// 把本地的页面引用地址  根据 righteCode 直接填充在网上获取的完整权限树上
import notFoundPage from '@/views/error-page/404'
function onlineRecursionRouter(onlineRouter = [], halfRouter = []) {
  if (onlineRouter !== undefined) {
    const halfRouterRight = []
    for (let i = 0; i < halfRouter.length; i++) {
      halfRouterRight.push(halfRouter[i].rightCode)
    }
    createNewRoutes(onlineRouter, halfRouter, halfRouterRight)
  } else {
    store.dispatch('LogOut').then(() => {
      console.log('权限树获取失败')
      window.location.reload() // In order to re-instantiate the vue-router object to avoid bugs
    })
  }
  // console.log(onlineRouter)
  // 假登录
  return onlineRouter
}

function createNewRoutes(onlineRouter, halfRouter, halfRouterRight) {
  for (let i = 0; i < onlineRouter.length; i++) {
    if (halfRouterRight.indexOf(onlineRouter[i].meta.rightCode) !== -1) {
      const index = halfRouterRight.indexOf(onlineRouter[i].meta.rightCode)
      if (onlineRouter[i].children && onlineRouter[i].children.length > 0) {
        onlineRouter[i].path = '/' + onlineRouter[i].path
        createNewRoutes(onlineRouter[i].children, halfRouter, halfRouterRight)
      }
      onlineRouter[i].component = halfRouter[index].component
      onlineRouter[i].alwaysShow = halfRouter[index].alwaysShow
      onlineRouter[i].meta.icon = onlineRouter[i].meta.rightIcon
      onlineRouter[i].meta.id = onlineRouter[i].id
    } else {
      onlineRouter[i].path = '/404/' + onlineRouter[i].path
      onlineRouter[i].component = notFoundPage
      onlineRouter[i].meta.icon = onlineRouter[i].meta.rightIcon
      onlineRouter[i].meta.id = onlineRouter[i].id
      createNewRoutes(onlineRouter[i].children, halfRouter, halfRouterRight)
    }
  }
}

// 这部分除非有bug与新需求,否则不要随意修改,有很多地方的代码都是有原因的,删除修改可能有其他的问题
// Vue router拥有层级关系,原本具有完整地址的router节点被移动到顶级
// 索引的页面必须改为Layout 并且为其创建一个children  让children的数据等于原本的router节点
/** function addchildren(accessedRouters) {
  accessedRouters.forEach((value, index) => {
    if (value.component !== Layout) {
      const temData = {
        alwaysShow: false,
        component: accessedRouters[index].component,
        id: accessedRouters[index].id,
        meta: accessedRouters[index].meta,
        name: accessedRouters[index].name,
        path: '/' + accessedRouters[index].path
      }
      // 如果移动的是二级菜单.二级菜单改为Layout,将二级菜单的内容传递到children 并且设置为隐藏(否则二级菜单下拥有原本空二级菜单)
      if (accessedRouters[index].children && accessedRouters[index].children.length > 0) {
        temData.hidden = true
      }
      accessedRouters[index].children.push(temData)
      accessedRouters[index].alwaysShow = false
      accessedRouters[index].component = Layout
    }
  })
  // console.log(accessedRouters)
  return accessedRouters
} **/

const permission = {
  state: {
    routers: [],
    addRouters: [],
    lineRouter: [],
    rightButton: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_LINEROUTER: (state, lineRouter) => {
      state.lineRouter = lineRouter
    },
    SET_RIGHTBUTTON: (state, rightButton) => {
      state.rightButton = rightButton
    }
  },
  actions: {
    // GenerateRoutes({ commit }, data) {
    //   return new Promise(resolve => {
    //     // const { roles } = data
    //     // let accessedRouters
    //     // if (roles.includes('admin')) {
    //     //   accessedRouters = asyncRouterMap
    //     // } else {
    //     //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
    //     // }
    //     commit('SET_ROUTERS', asyncRouterMap)
    //     resolve()
    //   })
    // },
    GenerateRoutes({
      commit
    }, data) {
      return new Promise(resolve => {
        // const { userRouter } = data
        const userRouter = data.resultList
        const accessedRouters = onlineRecursionRouter(userRouter, asyncRouterMap)
        // accessedRouters = addchildren(accessedRouters)
        // 在创建了新的router后,最后加一个404的页面(这个是这套管理后台必须的,否则进入错误页面将没有内容)
        accessedRouters.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        commit('SET_ROUTERS', accessedRouters)
        commit('SET_LINEROUTER', userRouter)
        resolve()
      })
    }
  }
}

export default permission
