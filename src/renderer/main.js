import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

window.g = {
  APP_URL_PATH: 'http://10.100.10.111:32223/apigateway/',
  APP_ACTIONURL_PATH: 'http://10.100.10.111:32223/apigateway/',
  APP_NAME: '调期管理后台',
  APP_USER_TYPE: '1',
  APP_MARKET_ID: '22'
}

document.title = window.g.APP_NAME

// 全局方法和全局变量
// http
import http from './utils/http'
Vue.prototype.http = http
// global.http = http

// 全局组件
import GL_Component from '@/components/index'
Vue.use(GL_Component)

// 全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 接口
import protocol from './api/protocol'
Vue.prototype.protocol = protocol
// global.protocol = protocol

// 权限
import { loadRight, rightButtonCheck } from './utils/right-button'
Vue.prototype.loadRight = loadRight
Vue.prototype.rightButtonCheck = rightButtonCheck
// global.rightButtonCheck = rightButtonCheck

// 数据格式化
import dataFormat from './utils/data-format'
Vue.prototype.dataFormat = dataFormat
// global.dataFormat = dataFormat

// 复制功能
import clip from '@/utils/clipboard'
Vue.prototype.clip = clip

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
