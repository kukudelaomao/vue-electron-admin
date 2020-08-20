import {
  loginByUsername,
  logout,
  getPermission
} from '@/api/login'

const user = {
  state: {
    roles: [],
    UserToken: '',
    UserSessionstr: '',
    UserUserId: '',
    UserFirmId: '',
    UserUserType: '',
    UserFirmCode: '',
    UserCellPhone: ''
    // user: '',
    // status: '',
    // code: '',
    // token: '',
    // name: '',
    // avatar: '',
    // introduction: '',
    // setting: {
    //   articlePlatform: []
    // }
  },

  mutations: {
    // SET_CODE: (state, code) => {
    //   state.code = code
    // },
    // SET_TOKEN: (state, token) => {
    //   state.token = token
    // },
    // SET_INTRODUCTION: (state, introduction) => {
    //   state.introduction = introduction
    // },
    // SET_SETTING: (state, setting) => {
    //   state.setting = setting
    // },
    // SET_STATUS: (state, status) => {
    //   state.status = status
    // },
    // SET_NAME: (state, name) => {
    //   state.name = name
    // },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    LOGIN_IN: (state, token) => {
      state.UserToken = token[0]
      state.UserSessionstr = token[1]
      state.UserUserId = token[2]
      state.UserFirmId = token[3]
      state.UserUserType = token[4]
      state.UserFirmCode = token[5]
      state.UserCellPhone = token[6]
    },
    LOGIN_OUT: (state) => {
      state.UserToken = ''
      state.UserSessionstr = ''
      state.UserUserId = ''
      state.UserFirmId = ''
      state.UserUserType = ''
      state.UserFirmCode = ''
      state.UserCellPhone = ''
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const {
            code,
            value
          } = response.data
          if (code === 0) {
            const token = value.userCode
            const sessionStr = value.sessionStr
            const userId = value.userId
            const firmId = value.firmId
            const userType = value.userType
            const firmCode = value.firmCode
            const cellPhone = value.cellPhone
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('Sessionstr', sessionStr)
            sessionStorage.setItem('UserId', userId)
            sessionStorage.setItem('FirmId', firmId)
            sessionStorage.setItem('UserType', userType)
            sessionStorage.setItem('FirmCode', firmCode)
            sessionStorage.setItem('cellPhone', cellPhone)
            commit('LOGIN_IN', [
              sessionStorage.getItem('token'),
              sessionStorage.getItem('Sessionstr'),
              sessionStorage.getItem('UserId'),
              sessionStorage.getItem('FirmId'),
              sessionStorage.getItem('UserType'),
              sessionStorage.getItem('FirmCode'),
              sessionStorage.getItem('cellPhone')
            ])
          }
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取权限信息
    GetPermission({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        // 如果没有session   弹出异常 就会退出登录
        // if (sessionStorage.getItem('Sessionstr')) {
        commit('LOGIN_IN', [
          sessionStorage.getItem('token'),
          sessionStorage.getItem('Sessionstr'),
          sessionStorage.getItem('UserId'),
          sessionStorage.getItem('FirmId'),
          sessionStorage.getItem('UserType'),
          sessionStorage.getItem('FirmCode'),
          sessionStorage.getItem('cellPhone')
        ])
        // 假admin权限
        getPermission(state).then(response => {
          commit('SET_ROLES', 'admin')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
        // } else {
        //   reject('reset')
        // }
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state).then(() => {
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          commit('LOGIN_OUT', [])
          commit('SET_ROLES', '')
          sessionStorage.clear()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('LOGIN_OUT', [])
        commit('SET_ROLES', '')
        sessionStorage.clear()
        resolve()
      })
    }
  }
}

export default user
