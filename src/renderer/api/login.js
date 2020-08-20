import crypto from 'crypto'
import http from '../utils/http'
import protocol from './protocol'

// 用于登录时的Md5加密
function getMd5(str) {
  var md5 = crypto.createHash('md5')
  md5.update(str)
  return md5.digest('hex')
}
/* global returnCitySN */
export function loginByUsername(userInfo) {
  console.log(protocol.param_login)
  const havIPInfo = !(typeof returnCitySN === 'undefined')
  const data = {
    loginAccount: userInfo.username,
    clientIp: havIPInfo ? returnCitySN['cip'] : '',
    // password: getMd5(userInfo.moblie + userInfo.password),
    // password: userInfo.password,
    password: getMd5('47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' + userInfo.password),
    captchaId: userInfo.captchaId,
    captchaCode: userInfo.captchaCode,
    marketId: window.g.APP_MARKET_ID,
    terminalType: '5', // 1：Windows PC 客户端2：iOS 客户端3：android 客户端4：window Web端5：交易所管理后台
    userType: window.g.APP_USER_TYPE // 1：交易所2：交易用户
  }
  protocol.param_login.data = data
  return http.post(protocol.param_login)
}

export function logout(state) {
  const data = {
    userId: state.UserUserId,
    userStr: state.UserUserId,
    sessionStr: state.UserSessionstr
  }
  protocol.param_logout.data = data
  return http.post(protocol.param_logout)
}

export function getPermission(state) {
  const data = {
    userStr: state.UserUserId,
    firmId: state.UserFirmId,
    sessionStr: state.UserSessionstr,
    type: 1
  }
  protocol.param_findAllRightNew.data = data
  return http.post(protocol.param_findAllRightNew)
}
