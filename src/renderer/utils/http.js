import axios from 'axios'
import store from '@/store/index'
import Vue from 'vue'
import Cookies from 'js-cookie'

// 防抖使用的变量
let checkCodeTimer = false

axios.interceptors.request.use(
  config => {
    // loading
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function checkStatus(response) {
  if (response === undefined) {
    // Vue.prototype.$message({
    //   type: 'warning',
    //   message: '网络异常'
    // })
  } else {
    // loading
    // 如果http状态码正常，则直接返回数据
    if (
      response &&
      (response.status === 200 ||
        response.status === 304 ||
        response.status === 400)
    ) {
      return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
    }
    // 异常状态下，把错误信息返回去
    return {
      status: -404,
      message: '服务器繁忙，请稍后再试或联系管理员'
    }
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.data.msg)
  }
  // 这部分代码解决多个接口并发请求时,登陆失效会在页面多次弹出 "登录失效"的问题
  // 知识点: 连续使用then()时 需要上一个then return一个数据,后面的then()才能拿到数据.
  // 思路是: 当登录失效时,不return 数据.这样具体页面就没有数据可以弹出窗口并且报错(不用理会,下面有一个解决方法).  唯一一个弹窗就是这里调用的$message
  if (res.data) {
    if (res.data.code === -2 || res.data.code === -10011) {
      // 防抖,三秒内里面的内容多次请求也只会执行一次
      if (!checkCodeTimer) {
        checkCodeTimer = true
        Vue.prototype.$message({
          type: 'warning',
          message: res.data.message,
          duration: 2500
        })
        setTimeout(() => {
          checkCodeTimer = false
          // 强制退出登录清空数据
          store.dispatch('LogOut').then(() => {
            // 刷新页面
            window.location.reload() // In order to re-instantiate the vue-router object to avoid bugs
          })
        }, 3000)
        // return new Promise(() => {}) // 这个也许可以终止 Promise的链式调用  可以防止具体页面报错(解决办法),但是实际可能会造成内存泄露哦
      }
    } else {
      return res
    }
  } else {
    return res
  }
}
export default {
  postDev({
    url,
    data
  }) {
    const sessionid = store.state.user.UserUserId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH_DEV,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'Session-Str': sessionstr,
          'User-Id': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH_DEV,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return response
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  getRes({
    url,
    data
  }) {
    // const UserUserType = store.state.user.UserUserType
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      // data.UserUserType = UserUserType
      return axios({
        method: 'get',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        params: data,
        dataType: 'json',
        headers: {
          Authorization,
          'sessionStr': sessionstr,
          'firmId': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'get',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        params: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  get({
    url,
    data
  }) {
    // const UserUserType = store.state.user.UserUserType
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      // data.UserUserType = UserUserType
      return axios({
        method: 'get',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        params: data,
        dataType: 'json',
        headers: {
          Authorization,
          'Session-Str': sessionstr,
          'User-Id': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'get',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        params: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  // post({
  //   url,
  //   data
  // }) {
  //   // const UserUserType = store.state.user.UserUserType
  //   const sessionid = store.state.user.UserUserId
  //   const sessionstr = store.state.user.UserSessionstr
  //   const Authorization = sessionid + ',' + sessionstr + ',' + url

  //   if (sessionid != null && sessionid !== '') {
  //     data.userStr = sessionid
  //     data.sessionStr = sessionstr
  //     // data.UserUserType = UserUserType
  //     return axios({
  //       method: 'post',
  //       baseURL: window.g.APP_URL_PATH,
  //       url: url,
  //       data: data,
  //       dataType: 'json',
  //       headers: {
  //         Authorization,
  //         // 'Session-Str': sessionstr,
  //         'sessionStr':sessionstr,
  //         'User-Id': sessionid,
  //         'Accept-Language': Cookies.get('language') || 'en',
  //         // 'UserId': sessionid
  //         // 'Firm-Id':store.state.user.UserFirmId
  //         'firmId':store.state.user.UserFirmId
  //       },
  //       timeout: 120000
  //     })
  //       .then(response => {
  //         return checkStatus(response)
  //       })
  //       .then(res => {
  //         return checkCode(res)
  //       })
  //   } else {
  //     return axios({
  //       method: 'post',
  //       baseURL: window.g.APP_URL_PATH,
  //       url: url,
  //       data: data,
  //       dataType: 'json',
  //       timeout: 120000
  //     })
  //       .then(response => {
  //         return checkStatus(response)
  //       })
  //       .then(res => {
  //         return checkCode(res)
  //       })
  //   }
  // },
  post({
    url,
    data
  }) {
    // const UserUserType = store.state.user.UserUserType
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      // data.UserUserType = UserUserType
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'sessionStr': sessionstr,
          'firmId': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  post1({
    url,
    data
  }) {
    // const UserUserType = store.state.user.UserUserType
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      // data.UserUserType = UserUserType
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH1,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'sessionStr': sessionstr,
          'firmId': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH1,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  postQu({
    url,
    data
  }) {
    // const UserUserType = store.state.user.UserUserType
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url
    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      // data.UserUserType = UserUserType
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH_Qu,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'sessionStr': sessionstr,
          'firmId': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH_Qu,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  // 导出使用的方法
  postReport({
    url,
    data
  }) {
    const sessionid = store.state.user.UserFirmId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      return axios({
        // 新增了一个返回值类型
        responseType: 'blob',
        method: 'post',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'sessionStr': sessionstr,
          'firmId': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  postFileDev({
    url,
    data
  }) {
    const sessionid = store.state.user.UserUserId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      return axios({
        method: 'post',
        baseURL: window.g.APP_URL_PATH_DEV,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'Session-Str': sessionstr,
          'User-Id': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_ACTIONURL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  postFile({
    url,
    data
  }) {
    const sessionid = store.state.user.UserUserId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      return axios({
        method: 'post',
        baseURL: window.g.APP_ACTIONURL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        headers: {
          Authorization,
          'Session-Str': sessionstr,
          'User-Id': sessionid
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'post',
        baseURL: window.g.APP_ACTIONURL_PATH,
        url: url,
        data: data,
        dataType: 'json',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  },
  getFile({
    url,
    data
  }) {
    const sessionid = store.state.user.UserUserId
    const sessionstr = store.state.user.UserSessionstr
    const Authorization = sessionid + ',' + sessionstr + ',' + url

    if (sessionid != null && sessionid !== '') {
      data.userStr = sessionid
      data.sessionStr = sessionstr
      return axios({
        method: 'get',
        baseURL: window.g.APP_ACTIONURL_PATH,
        url: url,
        data: data,
        dataType: 'jsonp',
        headers: {
          Authorization,
          'Session-Str': sessionstr,
          'User-Id': sessionid,
          'Accept-Language': Cookies.get('language') || 'en'
          // 'UserId': sessionid
        },
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    } else {
      return axios({
        method: 'get',
        baseURL: window.g.APP_ACTIONURL_PATH,
        url: url,
        data: data,
        dataType: 'jsonp',
        timeout: 120000
      })
        .then(response => {
          return checkStatus(response)
        })
        .then(res => {
          return checkCode(res)
        })
    }
  }
}
