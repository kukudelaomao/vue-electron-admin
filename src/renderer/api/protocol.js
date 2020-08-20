export default {
  // **************************************通用**************************************
  /**
   * 获取验证码
   */
  param_getCatch: {
    url: '/authn/authn/generateCaptcha',
    data: {}
  },
  param_login: {
    url: '/authn/authn/adminLogin',
    data: {}
  },
  param_logout: {
    url: '/authn/authn/logout',
    data: {}
  },
  param_findAllRightNew: {
    url: '/ums/role/findAllRightNew',
    data: {
      firmId: null,
      type: 1 // 1获取权限  2获取按钮权限
    }
  },
  //* **************************************赣州稀有金属交易所管理后台***********************************************

  // ------------------------------------------订单管理------------------------------------------------
  // 订单查询
  param_order_query: {
    url: '/tclound-adminbiz/order/getOrder',
    data: {
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: [],
      orderId: null,
      bsFlag: null,
      status: null,
      firmCode: null,
      firmName: null,
      beginTime: null,
      EndTime: null,
      name: null,
      storeName: null
    }
  },
  // 订单管理-订单导出
  param_exportQueryOrder: {
    url: '/tclound-adminbiz/order/orderExportExcel',
    data: {}
  },
  // 成交查询
  param_deal_query: {
    url: '/tclound-adminbiz/order/turnoverOrder',
    data: {
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: [],
      tradeId: null,
      bsFlag: null,
      firmCode: null,
      firmName: null,
      beginTime: null,
      EndTime: null,
      name: null,
      storeName: null
    }
  },
  param_deal_queryById: {
    url: '',
    data: {

    }
  },
  // 订单管理-成交查询导出
  param_exportClinchDealQuery: {
    url: '/tclound-adminbiz/order/turnoverExportExcel',
    data: {}
  },
  // 持仓查询
  param_commodityHold: {
    url: '/tclound-adminbiz/commodity/hold',
    data: {
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: [],
      firmCode: null,
      firmName: null,
      status: null
    }
  },
  //* *****************************************************账号管理******************************************************************** */
  // 企业认证
  param_enterpriseCertification: {
    url: '/tclound-adminbiz/authentic/apply',
    data: {
      firmName: null,
      firmCode: null,
      enterpriseName: null,
      firmType: null,
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 通过申请（驳回申请)
  param_enterpriseAudit: {
    url: '/tclound-adminbiz/authentic/pass',
    data: {
      status: null,
      firmId: null
    }
  },
  /**
   * 获取客户信息
   */
  param_queryFirmInfo: {
    url: '/ums/ums/queryFirmInfo',
    data: {
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: [
        {
          direction: 'DESC', // "ASC",
          property: 'createTime'
        }
      ],
      cellphone: null,
      createTime: null,
      firmName: null,
      firmStatus: null,
      id: null,
      marketId: null,
      parentFirmId: null,
      updateTime: null,
      userId: null
    }
  },
  /**
   * 销户
   */
  param_updateFirmStatusInfo: {
    url: '/ums/ums/updateFirmStatusInfo',
    data: {
      firmId: null
    }
  },
  /**
   * 冻结解冻用户
   */
  param_updateFirmFreezeStatus: {
    url: '/epsadminbiz/user/updateFirmFreezeStatus',
    data: {
      firmId: null,
      frozenStatus: null
    }
  },
  /**
   * 添加客户
   */
  param_addFirm: {
    url: '/ums/ums/addFirm',
    data: {
      accountName: null,
      area: null,
      cellphone: null,
      email: null,
      firmId: null,
      firmName: null,
      firmStatus: null,
      isQuRegister: null,
      marketId: null,
      nickname: null,
      parentFirmId: null,
      password: null,
      portrait: null,
      sex: null,
      userCode: null,
      userId: null,
      userStatus: null
    }
  },
  /**
   * 添加用户
   */
  param_addUser: {
    url: '/register/register/customer',
    data: {
      // accountName: null,
      // area: null,
      // cellphone: null,
      // email: null,
      // firmId: null,
      // firmName: null,
      // firmStatus: null,
      // isQuRegister: null,
      // marketId: null,
      // nickname: null,
      // parentFirmId: null,
      // password: null,
      // portrait: null,
      // sex: null,
      // userCode: null,
      // userId: null,
      // userStatus: null

      captchaCode: null,
      captchaId: null,
      code: null,
      createWay: 1,
      marketId: null,
      mobilePhone: null,
      password: null,
      userName: null,
      userType: null
    }
  },
  /**
   * 修改客户
   */
  param_updateFirmInfo: {
    url: '/ums/ums/updateFirmInfo',
    data: {
      accountName: null,
      area: null,
      cellphone: null,
      email: null,
      firmId: null,
      firmName: null,
      firmStatus: null,
      marketId: null,
      nickname: null,
      parentFirmId: null,
      password: null,
      portrait: null,
      sex: null,
      userCode: null,
      userStatus: null
    }
  },
  /**
   * 查询使用用户
   */
  param_parentfirmName: {
    url: '/epsadminbiz/dict/parentfirmNameLimit',
    data: {
      firmCode: null,
      size: 50,
      page: 1
    }
  },
  /**
   * 进入页面的权限
   */
  // eslint-disable-next-line no-dupe-keys
  // param_findAllRightNew: {
  //   url: '/adminbiz/access/findAllRightNew',
  //   data: {
  //     firmId: null,
  //     type: 1 // 1获取权限  2获取按钮权限
  //   }
  // },
  /**
   * 权限树 -> 获取权限树
   */
  param_consoleFindAllRightCode: {
    url: '/ums/role/findAllRightCode',
    data: {
      userId: null,
      type: 1 // 1获取权限  2获取按钮权限
    }
  },
  /**
   * 权限树 -> 添加节点
   */
  param_consoleAddAeRight: {
    url: '/ums/role/addRight',
    data: {
      rightName: null,
      parentRightCode: 1,
      type: null // 1：行级别权限 2：按钮级别权限
    }
  },
  /**
   * 权限树 -> 修改节点
   */
  param_consoleUpdateRight: {
    url: '/ums/role/updateRight',
    data: {
      rightCode: null,
      rightName: null
    }
  },
  /**
   * 权限管理 -> 检测按钮权限
   */
  param_findButton: {
    url: '/ums/role/findButton',
    data: {
      parentRightCode: null
    }
  },
  /**
   * 权限管理 -> 查询角色
   */
  param_queryRoleInfo: {
    url: '/ums/role/queryRoleInfo',
    data: {
      page: 1,
      size: 15,
      sort: [],
      roleName: null
    }
  },
  /**
   * 权限管理 -> 新增角色
   */
  param_consoleAddRole: {
    url: '/ums/role/addRole',
    data: {
      roleName: null,
      note: null,
      firmId: null,
      type: null
    }
  },
  /**
   * 权限管理 -> 设置角色权限
   */
  param_addRoleToRight: {
    url: '/ums/role/addRoleToRight',
    data: {
      RightCodeList: [],
      roleId: null
    }
  },
  // 权限管理 查询角色List
  param_queryRoleSelect: {
    url: '/ums/role/queryAllRoleInfo',
    // url: '/ums/role/queryRoleSelect',
    data: {
      page: 0,
      size: 9999,
      roleTypes: [1, 2]
    }
  },
  /**
   * 权限管理 -> 用户管理 -> 查询角色列表
   */
  param_queryAllRoleInfo: {
    url: '/ums/role/queryAllRoleInfo',
    data: {
      id: null,
      name: null,
      roleTypes: null,
      page: 1,
      size: 15,
      sort: [
        {
          direction: 'DESC', // "ASC",
          property: 'createTime'
        }
      ]
    }
  },
  /**
   * 权限管理 -> 查看角色权限树(角色用的)
   */
  param_findUserRightCode: {
    url: '/ums/role/findUserRightCode',
    data: {
      firmId: null, // 当前用户的userid
      roleId: null,
      type: null
    }
  },
  /**
   * 权限树 -> 获取权限树
   */
  param_findAllRightCode: {
    url: '/ums/role/findAllRightCode',
    data: {
      firmId: null,
      type: 1 // 1获取权限  2获取按钮权限
    }
  },
  /**
   * 权限树 -> 删除角色
   */
  param_deleteAERole: {
    url: '/ums/role/deleteAERole',
    data: {
      roleId: null
    }
  },
  param_delete: {
    url: '/cms/column/delete',
    data: {
      id: null // 文章id 数组形式 支持批量删除
    }
  },
  // 权限管理 修改角色
  // eslint-disable-next-line no-dupe-keys
  param_consoleUpdateRole: {
    url: '/ums/role/updateRole',
    data: {
      roleId: null,
      roleName: null,
      note: null
    }
  },
  /**
   * 权限树 -> 获取所有权限
   */
  param_findAllRight: {
    url: '/ums/role/findAllRight',
    data: {
      userId: null,
      type: 1 // 1获取权限  2获取按钮权限
    }
  },
  /**
   * 权限树 -> 删除节点
   */
  param_deleteRight: {
    url: '/ums/role/deleteRight',
    data: {
      id: null
    }
  },
  // 新的 权限树排序
  param_updateRightSort: {
    url: '/ums/role/updateRightSort',
    data: {
      rightCode: null, // 19,
      newSortId: null, // 58,
      parentRightCode: null // 8
    }
  },
  /**
   * 权限树 -> 拖拽排序
   */
  param_updateAllRightSort: {
    url: '/ums/role/updateAllRightSort',
    data: {
      list: null
    }
  },
  // 权限管理 查询管理员
  param_queryUserInfo: {
    url: '/ums/ums/queryUserInfo',
    data: {
      page: 1,
      size: 15,
      sort: [],
      firmId: null
    }
  },
  // 权限管理 查询管理员
  param_selectUserCode: {
    url: '/ums/ums/selectUserCode',
    data: {

    }
  },
  // 修改密码
  param_updateUserInfoMA: {
    url: '/ums/ums/updateUserInfo',
    data: {
      // marketId: null,
      password: null, // 123456789",
      userId: null
    }
  },
  // 选择客户
  param_queryFmFirmRelationsFrozen: {
    url: '/epsadminbiz/query/queryFmFirmRelationsFrozen',
    data: {
      page: 1, // "//第几页",
      size: 1000000, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 添加用户
  param_addUserExchange: {
    url: '/epsadminbiz/user/addUserExchange',
    data: {
      userCode: null, // sunruiting",   //唯一，可用于登陆
      password: null, // 123456789",
      cellphone: null, // 123456789"
      userStatus: null, // N",
      belongsFirmId: null // 73",
    }
  },
  // 修改用户
  param_updateUserInfo: {
    url: '/ums/ums/updateUserInfo',
    data: {
      userId: null, // ",
      userCode: null, // sunruiting",   //唯一，可用于登陆
      password: null, // 123456789",
      cellphone: null, // 123456789"
      userStatus: null // N"
    }
  },
  // 锁定，解锁用户
  param_updateUserStatusInfo: {
    url: '/ums/ums/updateUserStatusInfo',
    data: {
      userId: null, // ",
      userCode: null, // sunruiting",   //唯一，可用于登陆
      password: null, // 123456789",
      cellphone: null, // 123456789"
      userStatus: null // N"
    }
  },
  // 权限管理 查询角色List 为了不接口冲突 重新单独写一个接口
  param_queryAeRoleList: {
    url: '/epsadminbiz/query/queryAeRole',
    data: {
      page: 1,
      size: 999999,
      sort: [],
      roleName: null
    }
  },
  // 权限管理 绑定管理员的角色
  param_addUserToRole: {
    url: '/ums/role/addUserToRole',
    data: {
      firmId: null,
      // roleId: null
      roleId: null
    }
  },
  // 企业关系查询/查询
  param_enterpriseRelationshipQuery_query: {
    url: '/tclound-adminbiz/authentic/queryFirmCertification',
    data: {

    }
  },
  // 企业信息查询/设置推荐
  param_enterpriseInformation_query: {
    url: '/prebankservice/bankAdminbiz/updateRecommendedStatus',
    data: {

    }
  },

  // *********************************************************商品管理********************************************************************************
  param_marketCommodity: {
    url: '/pretrade/manage/marketCommodity',
    data: {
      commodityId: null
    }
  },
  param_getAllStore: {
    url: '/tclound-adminbiz/commodity/getAllStore',
    data: {
      page: 1, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: [
        {
          direction: 'DESC', // "ASC",
          property: 'createTime'
        }
      ],
      firmCode: null,
      firmName: null,
      name: null,
      status: null,
      tradeValue: null
    }
  },
  // ****************************************************内容管理***************************************************
  /**
   * 内容管理 -> 查询文章列表
   */
  param_find: {
    url: '/cms/content/find',
    data: {
      page: 1, // 第几页
      size: 15, // 每页搜索结果个数
      sort: [{
        direction: 'DESC', // "//DESC或ASC",
        property: 'createTime' // "//排序属性"
      }]
    }
  },
  /**
   * 内容管理 -> 查询栏目列表
   */
  param_columnFind: {
    url: '/cms/column/find',
    data: {

    }
  },
  param_columnFind9999: {
    url: '/cms/column/find',
    data: {
      page: 0,
      size: 9999
    }
  },
  /**
   * 内容管理 -> 置顶/取消置顶内容
   */
  param_contentTop: {
    url: '/cms/content/top',
    data: {

    }
  },
  param_content_verify: {
    url: '/cms/content/verify',
    data: {

    }
  },
  /**
   * 内容管理 -> 发布/取消发布内容
   */
  param_publish: {
    url: '/cms/content/publish',
    data: {

    }
  },
  /**
   * 内容管理 -> 新增文章内容
   */
  param_save: {
    url: '/cms/content/save',
    data: {
      // id: null,
      content: null,
      isRecommend: null,
      source: null,
      subtitle: null,
      title: null,
      canComment: null,
      commentCheck: null,
      isDelete: null,
      isPay: null,
      type: null
    }
  },
  /**
   * 内容管理 -> 新增栏目
   */
  param_columnSave: {
    url: '/cms/column/save',
    data: {
      // id: null,
      // name: null,
      // columnType: null,
      // isDelete: null,
      // isHide: null
    }
  },
  // **************************************************赣州稀有金属交易所管理**********************************************
  param_trade_query: {
    url: '/',
    data: {

    }
  },
  param_capacity_deleteVarieties: {
    url: '/precacheservice/capacity/deleteVarieties',
    data: {

    }
  },
  // 删除公告
  param_deleteContent_new: {
    // url: '/epsadminbiz/notice/deleteContent',
    // data: {
    //   id: null // "商品id"
    // }
  },
  param_deleteContent: {
    url: '/cms/content/delete',
    data: {
      id: null // 文章id 数组形式 支持批量删除
    }
  },
  // 查询公告类型
  param_findColumnType: {
    // url: '/epsadminbiz/notice/findColumn',
    // data: {
    //   parentId: null // "//所属栏目id 可不传", // 1是公告 2轮播图  3 内容
    // }
  },
  param_itcommodity_setCommodity: {
    url: '/preadminbiz/itcommodity/setCommodity',
    data: {

    }
  },
  param_deleteGoods: {
    url: '/preadminbiz/itcommodity/deleteCommodity',
    data: {
      name: null,
      type: null
    }
  },
  param_presell_updteputaway: {
    url: '/preadminbiz/presell/updteputaway',
    data: {

    }
  },
  param_addCommodity: {
    url: '/preadminbiz/itcommodity/addCommodity',
    data: {
      name: null,
      type: null
    }
  },
  param_updateCommodity: {
    url: '/preadminbiz/itcommodity/updateCommodity',
    data: {
      // name: null,
      // type: null
    }
  },
  param_deleteitcommodity: {
    url: '/preadminbiz/itcommodity/delete',
    data: {
      id: null
    }
  },
  param_itcommodity_category: {
    url: '/preadminbiz/itcommodity/category',
    data: {

    }
  },
  // 七牛云 图片服务器 获取imgToken
  param_getImageToken: {
    url: '/epsadminbiz/user/auth',
    data: {
      bucket: ''
    }
  },
  // 获取图片列表
  param_getFileList: {
    url: '/uploadfile/getBasePhoto',
    data: {
      'id': null,
      'firmId': null,
      'url': null,
      'photoName': null,
      'type': null
    }
  },
  // 获取图片流
  param_getfileByte: {
    url: '/uploadfile/getfileByte',
    data: {
    }
  },
  prram_itcommodity_update: {
    url: '/preadminbiz/itcommodity/update',
    data: {
      value: null

    }
  },
  prram_itcommodity_add: {
    url: '/preadminbiz/itcommodity/add',
    data: {
      value: null
    }
  },
  // 商品保证金策略展示
  param_presell_setquerymargin: {
    url: '/preadminbiz/presell/margin',
    data: {
      clearStatus: null,
      marginAlgr: null,
      name: null
    }
  },
  param_addmargin: {
    url: '/preadminbiz/presell/addmargin',
    data: {

    }
  },
  param_updatemargin: {
    url: '/preadminbiz/presell/updatemargin',
    data: {

    }
  },
  param_presell_margin: {
    url: '/preadminbiz/presell/setquerymargin',
    data: {
      clearStatus: null,
      marginAlgr: null,
      name: null
    }
  },
  param_presell_setmargin: {
    url: '/preadminbiz/presell/setmargin'
  },
  param_preadminbiz_presell_preserve: {
    url: '/preadminbiz/presell/preserve',
    data: {

    }
  },
  param_presell_noputaway: {
    url: '/preadminbiz/presell/noputaway',
    data: {

    }
  },
  // 商品退市（上市）
  param_presell_doputaway: {
    url: '/preadminbiz/presell/doputaway',
    data: {
      commodityId: null,
      statusCode: null
    }
  },
  // 商品数量审核展示
  param_presell_audit: {
    url: '/preadminbiz/presell/audit',
    data: {
      enterpriseName: null,
      name: null
    }
  },
  param_presell_passaudit: {
    url: '/preadminbiz/presell/passaudit',
    data: {
      // enterpriseName: null,
      // firmCode: null,
      // firmName: null,
      // name: null,
      // orderId: null
    }
  },
  param_preadminbiz_presell_rejectaudit: {
    url: '/preadminbiz/presell/rejectaudit',
    data: {
      // enterpriseName: null,
      // firmCode: null,
      // firmName: null,
      // name: null,
      // orderId: null
    }
  },
  param_queryMarket: {
    url: '/tclound-adminbiz/sch/getmarket',
    data: {
      page: 1, // 1",
      size: 15 // 2",
    }
  },
  // 交易管理 改变市场状态
  param_updateMarketStatus: {
    url: '/tclound-scheduleservice/schedule/updateMarketStatus',
    data: {
      status: 1 // null 1开市 2交易中 3暂停交易 4结算中 5闭市中
    }
  },
  // 交易管理/委托查询
  param_deal_delegation: {
    url: '/tclound-adminbiz/deal/delegation',
    data: {
      buyOrderId: null,
      enterpriseName: null,
      name: null
    }
  },
  // 成交查询
  param_deal_knockdown: {
    url: '/tclound-adminbiz/deal/knockdown',
    data: {
      tradeId: null,
      name: null,
      buyEnterpriseName: null
    }
  },
  // 交易管理/卖委托查询
  param_deal_cancel: {
    url: '/tclound-adminbiz/deal/Cancel',
    data: {
      buyEnterpriseName: null,
      firmCode: null,
      name: null
    }
  },
  // 交易管理/持仓
  param_deal_position: {
    url: '/tclound-adminbiz/deal/position',
    data: {
      enterpriseName: null,
      firmCode: null
    }
  },
  // 提货查询
  param_pick_getpick: {
    url: '/tclound-adminbiz/pick/getpick',
    data: {
      enterpriseName: null,
      firmCode: null,
      name: null
    }
  },
  // 获取市场
  param_selectmarketIdList: {
    url: '/tclound-adminbiz/sch/getmarket',
    data: {}
  },
  // 交易管理 运营管理 交易日历管理 搜索日历
  param_getCalendar: {
    url: '/tclound-adminbiz/sch/calendar',
    data: {}
  },
  // 查询日程安排/事件
  param_scheduleEvent: {
    url: '/tclound-adminbiz/sch/scheduleEvent',
    data: {}
  },
  // 查看商品列表 商品 下拉菜单
  param_findCommodityList: {
    // url: '/epsadminbiz/dict/notQuitCommodity',
    // data: {
    // }
  },
  // 交易管理 运营管理 交易日程设置 查询明细
  param_queryTradeScheduleDetail: {
    url: '/tclound-adminbiz/sch/queryTradeScheduleDetail',
    data: {
      page: 1,
      size: 15,
      sort: []
    }
  },
  // 交易管理 运营管理 交易日历管理 根据日历查日程明细
  param_queryScheduleByCalendar: {
    url: '/tclound-adminbiz/sch/queryScheduleByCalendar',
    data: {
      id: null,
      startCalendarTime: null, // "2019-04-25",
      endCalendarTime: null // "2019-04-26"
    }
  },
  // 交易管理 运营管理 交易日程设置 删除
  param_delSchedule: {
    url: '/tclound-scheduleservice/schedule/delSchedule',
    data: {
      id: null
    }
  },
  // 交易管理 运营管理 交易日程设置 添加日程
  param_addSchedule: {
    url: '/tclound-scheduleservice/schedule/addSchedule',
    data: {
      calendarId: null, // 日历名称
      startTime: null, // 开始时间
      endTime: null, // 结束时间
      repeatTypeCode: null, // 重复类型  1每日 2每周 3每月 4每年 5永不
      repeatFrequencyValue: null, // 重复频率明细 ps:具体传值见后边note
      eventCode: null, // 事件名称 1开市 2闭市 3结算
      statusCode: null, // 事件状态  1启用 2禁用
      repeatEndAt: null, // 重复截止时间
      commodityId: null, // 事件对应商品id  为空时对市场操作
      marketId: null
    }
  },
  // 交易管理 运营管理 交易日程设置 修改日程
  param_updateSchedule: {
    url: '/tclound-scheduleservice/schedule/updateSchedule',
    data: {
      id: null,
      calendarId: null,
      startTime: null,
      endTime: null,
      repeatTypeCode: null,
      repeatFrequencyValue: null,
      eventCode: null,
      statusCode: null,
      repeatEndAt: null,
      marketId: null
    }
  },
  // 交易管理 运营管理 交易日历管理 新增/修改日历名称
  param_alterationCalendar: {
    url: '/tclound-scheduleservice/schedule/alterationCalendar',
    data: {
      calendarId: null, // "",    //日历id
      calendarName: null // ""   //日历名称
    }
  },
  //* ****************************************资金管理*************************************** */
  // 商城资金管理查询
  param_getAdminFunds: {
    url: '/auction-admin/fundQuery/getAdminFunds',
    data: {}
  },
  // 初始化资金密码
  param_setInitialFundPwd: {
    url: '/auction-common-margin/commonmargin/setInitialFundPwd',
    data: {}
  },
  // 修改支付密码
  param_updateFundPwd: {
    url: '/mine/fund/updateFundPwd',
    data: {}
  },
  // 出金
  param_fundOut: {
    url: '/auction-pay/pay/fundOut',
    data: {}
  },
  // 客户资金管理查询
  param_getClentFunds: {
    url: '/auction-admin/fundQuery/getClentFunds',
    data: {}
  },
  // 禁用资金账户
  param_freezeAccount: {
    url: '/auction-common-margin/commonmargin/freezeAccount',
    data: {}
  },
  // 启动资金账户
  param_unFreezeAccount: {
    url: '/auction-common-margin/commonmargin/unFreezeAccount',
    data: {}
  },
  // 查询  查询分类
  param_getGoodsClass: {
    url: '/service-mall-admin/goodsClass/getGoodsClassTree',
    data: {
      sort: []
    }
  },
  // 新增分类
  param_addGoodsClass: {
    url: '/service-mall-admin/goodsClass/addGoodsClass',
    data: {
      // className: null,
      // goodsTypeId: null,
      // parentId: null,
      // iconType: null
    }
  },
  // 更新分类
  param_updateGoodsClass: {
    url: '/service-mall-admin/goodsClass/updateGoodsClass',
    data: {
    }
  },

  // *********************************************三期*********************************************** */
  // 电子签章管理-查询列表
  param_cbcontractservice_signature_findAllSignature: {
    url: '/tclound-contract/signature/findAllSignature',
    data: {
      firmName: null
    }
  },
  // 电子签章管理-删除
  param_cbcontractservice_signature_delete: {
    url: '/tclound-contract/signature/delete',
    data: {
    }
  },
  // 电子签章管理-新增
  param_cbcontractservice_signature_add: {
    url: '/tclound-contract/signature/add',
    data: {
    }
  },
  // 合同模板管理-查询列表
  param_cbcontractservice_contract_findAllContractTemplate: {
    url: '/tclound-contract/contract/findAllContractTemplate',
    data: {
    }
  },
  // 仓库信息/展示
  param_storage_findStorage: {
    url: '/tclound-adminbiz/storage/findStorage',
    data: {

    }
  },
  // 物流订单查询-详情
  param_deliveryManage_logisticsParticulars: {
    url: '/tclound-adminbiz/deliveryManage/logisticsParticulars',
    data: {

    }
  },
  // 自提订单查询-详情
  param_deliveryManage_selfParticulars: {
    url: '/tclound-adminbiz/deliveryManage/selfParticulars',
    data: {

    }
  },
  // 查询所有bizCode
  param_marginManger_selectAllBizCode: {
    url: '/tclound-adminbiz/marginManger/selectAllBizCode',
    data: {

    }
  },
  // 商品存样
  param_applyWarehouse_saveSample: {
    url: '/tclound-adminbiz/applyWarehouse/saveSample',
    data: {

    }
  },
  // 仓库信息/删除
  param_storage_deleteStorage: {
    url: '/tclound-adminbiz/storage/deleteStorage',
    data: {

    }
  },
  // 展示存样商品
  param_applyWarehouse_searchSample: {
    url: '/tclound-adminbiz/applyWarehouse/searchSample',
    data: {

    }
  },
  // 合同模板管理-删除合同模板
  param_cbcontractservice_contract_delete: {
    url: '/tclound-contract/contract/delete',
    data: {

    }
  },
  // 生成签章
  param_cbcontractservice_signature_generateSignature: {
    url: '/tclound-contract/signature/generateSignature',
    data: {

    }
  },
  param_manage_three_auditOrder: {
    url: '/tclound-trade/manage/auditOrder',
    data: {

    }
  },
  // 仓单管理/展示/搜索
  param_warehouseorders_findWarehouseOrders: {
    url: '/tclound-adminbiz/warehouseorders/findWarehouseOrders',
    data: {

    }
  },
  // 物流订单查询
  param_deliveryManage_queryLogisticsOrders: {
    url: '/tclound-adminbiz/deliveryManage/queryLogisticsOrders',
    data: {

    }
  },
  // 确认提货
  param_deliveryManage_notarizePickUp: {
    url: '/tclound-adminbiz/deliveryManage/notarizePickUp',
    data: {

    }
  },
  // 物流订单管理详情
  param_logisticsManage_queryLogisticsParticulars: {
    url: '/tclound-adminbiz/logisticsManage/queryLogisticsParticulars',
    data: {

    }
  },
  // 仓单管理/查看详情
  param_warehouseorders_findWarehouseOrderDetails: {
    url: '/tclound-adminbiz/warehouseorders/findWarehouseOrderDetails',
    data: {

    }
  },
  // 挂单查询
  param_findHangResource: {
    url: '/tclound-adminbiz/warehouseorders/findHangResource',
    data: {

    }
  },
  // 确认接货
  param_deliveryManage_notarizeReceive: {
    url: '/tclound-adminbiz/deliveryManage/notarizeReceive',
    data: {

    }
  },
  param_deliveryManage_queryPostponeOrders: {
    url: '/preadminbiz/deliveryManage/queryPostponeOrders',
    data: {

    }
  },
  // 查看质检单详情
  param_applyWarehouse_inspectionDetail: {
    url: '/tclound-adminbiz/applyWarehouse/inspectionDetail',
    data: {

    }
  },
  // 自提订单查询
  param_deliveryManage_queryPickUpOrders: {
    url: '/tclound-adminbiz/deliveryManage/queryPickUpOrders',
    data: {

    }
  },
  // 公司列表
  param_signature_perCertificationList: {
    url: '/tclound-contract/signature/perCertificationList',
    data: {

    }
  },
  // 公司列表字典
  param_signature_findCertificationList: {
    url: '/tclound-contract/signature/findCertificationList',
    data: {

    }
  },
  // 竞价订单管理-出价记录
  param_auctionTrade_queryOfferPrice: {
    url: '/tclound-adminbiz/auctionTrade/queryOfferPrice',
    data: {

    }
  },
  // 仓单管理/出库
  param_warehouseorders_outWarehouseOrders: {
    url: '/tclound-adminbiz/warehouseorders/outWarehouseOrders',
    data: {

    }
  },
  // 查询竞价规则记录
  param_auctionTrade_queryCbRule: {
    url: '/tclound-adminbiz/auctionTrade/queryCbRule',
    data: {

    }
  },
  // 添加竞价规则
  param_auctionTrade_addCbRule: {
    url: '/tclound-adminbiz/auctionTrade/addCbRule',
    data: {

    }
  },
  // 修改竞价规则
  param_auctionTrade_updateCbRule: {
    url: '/tclound-adminbiz/auctionTrade/updateCbRule',
    data: {

    }
  },
  // 商品分类列表
  param_contract_commodityType: {
    url: '/tclound-contract/contract/commodityType',
    data: {

    }
  },
  // 模式列表
  param_contract_dictModeType: {
    url: '/tclound-contract/contract/dictModeType',
    data: {

    }
  },
  // 交易信息查询
  param_applyWarehouse_searchTradOrder: {
    url: '/tclound-adminbiz/applyWarehouse/searchTradOrder',
    data: {

    }
  },
  // 仓库信息/新增
  param_storage_addStorage: {
    url: '/tclound-adminbiz/storage/addStorage',
    data: {

    }
  },
  // 仓库信息/修改
  param_storage_updateStorage: {
    url: '/tclound-adminbiz/storage/updateStorage',
    data: {

    }
  },
  // 预入库信息查询
  param_applyWarehouse_searchPreCommodity: {
    url: '/tclound-adminbiz/applyWarehouse/searchPreCommodity',
    data: {

    }
  },
  // 预入库信息查询
  param_applyWarehouse_searchPreCommodity999: {
    url: '/tclound-adminbiz/applyWarehouse/searchPreCommodity',
    data: {

    }
  },
  // 所有存样商品id
  param_applyWarehouse_selectAllSampleId: {
    url: '/tclound-adminbiz/applyWarehouse/selectAllSampleId',
    data: {

    }
  },
  param_deliveryManage_queryDeliveryParticulars: {
    url: '/preadminbiz/deliveryManage/queryDeliveryParticulars',
    data: {

    }
  },
  // 仓储费设置查询
  param_market_getMarketParameter: {
    url: '/tclound-adminbiz/market/getMarketParameter',
    data: {

    }
  },
  // 司机信息删除
  param_applyWarehouse_deleteLogisticDriver: {
    url: '/tclound-adminbiz/applyWarehouse/deleteLogisticDriver',
    data: {

    }
  },
  param_applyWarehouse_searchEnterWarehouse: {
    url: '/preadminbiz/applyWarehouse/searchEnterWarehouse',
    data: {

    }
  },
  // 送检
  param_applyWarehouse_submission: {
    url: '/tclound-adminbiz/applyWarehouse/submission',
    data: {
    }
  },
  // 入库审核
  param_applyWarehouse_auditCommodity: {
    url: '/tclound-adminbiz/applyWarehouse/auditCommodity',
    data: {

    }
  },
  // 商品入库
  param_applyWarehouse_enterWarehouse: {
    url: '/tclound-adminbiz/applyWarehouse/enterWarehouse',
    data: {

    }
  },
  // 送检订单查询/质检单审核列表
  param_applyWarehouse_submissionOrder: {
    url: '/tclound-adminbiz/applyWarehouse/submissionOrder',
    data: {

    }
  },
  // 查看报名列表
  param_auctionTrade_getSignUp: {
    url: '/tclound-adminbiz/auctionTrade/getSignUp',
    data: {

    }
  },
  // 查看竞价信息
  param_auctionTrade_getCbAuctionResources: {
    url: '/tclound-adminbiz/auctionTrade/getCbAuctionResources',
    data: {

    }
  },
  // 设置质检费用
  param_applyWarehouse_settingInspectFee: {
    url: '/tclound-adminbiz/applyWarehouse/settingInspectFee',
    data: {

    }
  },
  // 上传质检报告
  param_applyWarehouse_uploadReport: {
    url: '/tclound-adminbiz/applyWarehouse/uploadReport',
    data: {

    }
  },
  // 合同模板管理-新增合同模板
  param_cbcontractservice_contract_add: {
    url: '/tclound-contract/contract/add',
    data: {

    }
  },
  // 仓库样品库位/展示
  param_storagelocation_findStoragelocations: {
    url: '/tclound-adminbiz/storagelocation/findStoragelocations',
    data: {

    }
  },
  // 仓库样品库位/新增
  param_storagelocation_addStoragelocation: {
    url: '/tclound-adminbiz/storagelocation/addStoragelocation',
    data: {

    }
  },
  // 仓库样品库位/修改
  param_storagelocation_updateStorehouse: {
    url: '/tclound-adminbiz/storagelocation/updateStorehouse',
    data: {

    }
  },
  // 仓库样品库位/删除
  param_storagelocation_deleteStorehouse: {
    url: '/tclound-adminbiz/storagelocation/deleteStorehouse',
    data: {

    }
  },
  // 持仓审核
  param_auditHold: {
    url: '/tclound-trade/manage/auditHold',
    data: {

    }
  },
  // 库位/下拉列表
  param_storagelocation_findStoragelocationMap: {
    url: '/tclound-adminbiz/storagelocation/findStoragelocationMap',
    data: {

    }
  },
  // 质检机构/下拉列表
  param_inspectionInstitutions_findInspectionInstitutionsMap: {
    url: '/tclound-adminbiz/inspectionInstitutions/findInspectionInstitutionsMap',
    data: {

    }
  },
  // 质检机构/展示/搜索
  param_inspectionInstitutions_findInspectionInstitutions: {
    url: '/tclound-adminbiz/inspectionInstitutions/findInspectionInstitutions',
    data: {

    }
  },
  // 物流公司查询
  param_applyWarehouse_searchLogisticCompany: {
    url: '/tclound-adminbiz/applyWarehouse/searchLogisticCompany',
    data: {

    }
  },
  // 物流公司新增、修改
  param_applyWarehouse_saveLogisticCompany: {
    url: '/tclound-adminbiz/applyWarehouse/saveLogisticCompany',
    data: {

    }
  },
  // 重量单位列表查询
  param_findWeightUnit: {
    url: '/tclound-adminbiz/dictThree/findWeightUnit',
    data: {

    }
  },
  // 添加/修改重量单位
  param_saveWeightUnit: {
    url: '/tclound-adminbiz/dictThree/saveWeightUnit',
    data: {

    }
  },
  // 短信日志-查询
  param_msgTemplate_queryPostLog: {
    url: '/tclound-adminbiz/msgTemplate/queryPostLog',
    data: {

    }
  },
  // 删除物流公司
  param_applyWarehouse_deleteLogisticCompany: {
    url: '/tclound-adminbiz/applyWarehouse/deleteLogisticCompany',
    data: {

    }
  },
  // 车辆信息查询
  param_applyWarehouse_searchLogisticCar: {
    url: '/tclound-adminbiz/applyWarehouse/searchLogisticCar',
    data: {

    }
  },
  // 车辆信息新增/修改
  param_applyWarehouse_saveLogisticCar: {
    url: '/tclound-adminbiz/applyWarehouse/saveLogisticCar',
    data: {

    }
  },
  // 交易查询
  param_auctionTrade_queryCbOrder: {
    url: '/tclound-adminbiz/auctionTrade/queryCbOrder',
    data: {

    }
  },
  // 交易查询1
  param_auctionTrade_queryCbOrder999: {
    url: '/tclound-adminbiz/auctionTrade/queryCbOrder',
    data: {

    }
  },
  // 交易查询详情
  param_auctionTrade_getCbOrderDetail: {
    url: '/tclound-adminbiz/auctionTrade/getCbOrderDetail',
    data: {

    }
  },
  // 交易查询列表导出
  param_export_exportCbOrder: {
    url: '/tclound-report/export/exportCbOrder',
    data: {

    }
  },
  // 商品交接记录
  param_applyWarehouse_sampleHandovreFlow: {
    url: '/tclound-adminbiz/applyWarehouse/sampleHandovreFlow',
    data: {

    }
  },
  // 查看交易信息详情
  param_applyWarehouse_findOrderDetail: {
    url: '/tclound-adminbiz/applyWarehouse/findOrderDetail',
    data: {

    }
  },
  param_getCommodityCategory: {
    url: '/preadminbiz/itcommodity/category',
    data: {}
  },
  // 车辆信息删除
  param_applyWarehouse_deleteLogisticCar: {
    url: '/tclound-adminbiz/applyWarehouse/deleteLogisticCar',
    data: {

    }
  },
  // 司机信息查询
  param_applyWarehouse_searchLogisticDriver: {
    url: '/tclound-adminbiz/applyWarehouse/searchLogisticDriver',
    data: {

    }
  },
  // 司机信息新增/修改
  param_applyWarehouse_saveLogisticDriver: {
    url: '/tclound-adminbiz/applyWarehouse/saveLogisticDriver',
    data: {

    }
  },
  // 查询竞价规则记录
  param_applyWarehouse_queryCbRule: {
    url: '/tclound-adminbiz/auctionTrade/queryCbRule',
    data: {

    }
  },
  // 质检单审核
  param_applyWarehouse_auditInspectionOrder: {
    url: '/tclound-adminbiz/applyWarehouse/auditInspectionOrder',
    data: {

    }
  },
  // 删除竞价规则记录
  param_auctionTrade_deleteCbRule: {
    url: '/tclound-adminbiz/auctionTrade/deleteCbRule',
    data: {

    }
  },
  // 质检机构/删除
  param_inspectionInstitutions_deleteInspectionInstitutions: {
    url: '/tclound-adminbiz/inspectionInstitutions/deleteInspectionInstitutions',
    data: {

    }
  },
  // 质检机构/新增
  param_inspectionInstitutions_addInspectionInstitutions: {
    url: '/tclound-adminbiz/inspectionInstitutions/addInspectionInstitutions',
    data: {

    }
  },
  // 质检机构/修改
  param_inspectionInstitutions_updateInspectionInstitutions: {
    url: '/tclound-adminbiz/inspectionInstitutions/updateInspectionInstitutions',
    data: {

    }
  },
  // 送检费用列表/展示/搜索
  param_inspection_findInspection: {
    url: '/tclound-adminbiz/inspection/findInspection',
    data: {

    }
  },
  // 运费里程单价列表查询
  param_logisticsManage_queryLogisticsFreight: {
    url: '/tclound-adminbiz/logisticsManage/queryLogisticsFreight',
    data: {

    }
  },
  // 增加运费记录
  param_logisticsManage_addLogisticsFreight: {
    url: '/tclound-adminbiz/logisticsManage/addLogisticsFreight',
    data: {

    }
  },
  // 物流公司列表
  param_logisticsManage_getLogisticsCompany: {
    url: '/tclound-adminbiz/logisticsManage/getLogisticsCompany',
    data: {

    }
  },
  // 修改运费记录
  param_logisticsManage_updateLogisticsFreight: {
    url: '/tclound-adminbiz/logisticsManage/updateLogisticsFreight',
    data: {

    }
  },
  // 竞拍订单查询
  param_auctionTrade_queryAuctionCborder: {
    url: '/tclound-adminbiz/auctionTrade/queryAuctionCborder',
    data: {

    }
  },
  // 删除运费记录
  param_logisticsManage_deleteLogisticsFreight: {
    url: '/tclound-adminbiz/logisticsManage/deleteLogisticsFreight',
    data: {

    }
  },
  param_applyWarehouse_selectAllCertification: {
    url: '/tclound-adminbiz/applyWarehouse/selectAllCertification',
    data: {

    }
  },
  // 查询商品品级id字典表
  param_getCommodityGrade: {
    url: '/preadminbiz/dictThree/getCommodityGrade',
    data: {}
  },
  // 查询包装方式id字典表
  param_getCommodityPackage: {
    url: '/preadminbiz/dictThree/getCommodityPackage',
    data: {}
  },
  // 查询包装规格字典表
  param_getComSpecifications: {
    url: '/preadminbiz/dictThree/getComSpecifications',
    data: {}
  },
  // 查询仓库字典表
  param_getStorage: {
    url: '/tclound-adminbiz/dictThree/getStorage',
    data: {}
  },
  // 仓库信息/下拉列表
  param_storage_findStorageMap: {
    url: '/tclound-adminbiz/storage/findStorageMap',
    data: {

    }
  },
  // 仓储费设置
  param_market_updateMarketParameter: {
    url: '/tclound-adminbiz/market/updateMarketParameter',
    data: {

    }
  },
  // 物流订单列表查询
  param_logisticsManage_queryLogistics: {
    url: '/tclound-adminbiz/logisticsManage/queryLogistics',
    data: {

    }
  },
  // 物流司机列表
  param_logisticsManage_getLogisticsDriver: {
    url: '/tclound-adminbiz/logisticsManage/getLogisticsDriver',
    data: {

    }
  },
  // 增加/修改入库申请
  param_applyWarehouse_addApplyWarehous: {
    url: '/tclound-adminbiz/applyWarehouse/addApplyWarehous',
    data: {

    }
  },
  // 盘库交接展示
  param_applyWarehouse_searchStorageHandover: {
    url: '/tclound-adminbiz/applyWarehouse/searchStorageHandover',
    data: {

    }
  },
  // 盘库交接记录
  param_applyWarehouse_storageHandoverFlow: {
    url: '/tclound-adminbiz/applyWarehouse/storageHandoverFlow',
    data: {

    }
  },
  // 盘库交接
  param_applyWarehouse_storageHandover: {
    url: '/tclound-adminbiz/applyWarehouse/storageHandover',
    data: {

    }
  },
  // 商品交接
  param_applyWarehouse_sampleHandover: {
    url: '/tclound-adminbiz/applyWarehouse/sampleHandover',
    data: {

    }
  },
  // 物流车辆列表
  param_logisticsManage_getLogisticsCar: {
    url: '/tclound-adminbiz/logisticsManage/getLogisticsCar',
    data: {

    }
  },
  // 订单指派
  param_logisticsManage_updateLogistics: {
    url: '/tclound-adminbiz/logisticsManage/updateLogistics',
    data: {

    }
  },
  // 费用结算清单
  param_logisticsManage_queryLogisticsClear: {
    url: '/tclound-adminbiz/logisticsManage/queryLogisticsClear',
    data: {

    }
  },
  // 编辑最终价格
  param_logisticsManage_updateLogisticsPrice: {
    url: '/tclound-adminbiz/logisticsManage/updateLogisticsPrice',
    data: {

    }
  },
  // 仓储费查询
  param_deliveryManage_queryWarehousCost: {
    url: '/tclound-adminbiz/deliveryManage/queryWarehousCost',
    data: {

    }
  },
  // 仓单仓储费查询
  param_deliveryManage_queryWarehousCostHold: {
    url: '/tclound-adminbiz/deliveryManage/queryWarehousCostHold',
    data: {

    }
  },
  // 存单仓储费查询
  param_deliveryManage_queryWarehousCostApply: {
    url: '/tclound-adminbiz/deliveryManage/queryWarehousCostApply',
    data: {

    }
  },
  // 存单货物管理/展示/搜索
  param_warehouseorders_getWarehouse: {
    url: '/tclound-adminbiz/warehouseorders/getWarehouse',
    data: {

    }
  },
  // 仓单货物管理/展示/搜索
  param_warehouseorders_getWarehouseHold: {
    url: '/tclound-adminbiz/warehouseorders/getWarehouseHold',
    data: {

    }
  },
  // 物流公司下拉框
  param_applyWarehouse_selectAllCompany: {
    url: '/tclound-adminbiz/applyWarehouse/selectAllCompany',
    data: {

    }
  },
  // 导出客户资金表
  param_export_exportAccountFunds: {
    url: '/tclound-report/export/exportAccountFunds',
    data: {

    }
  },
  // 导出客户当日资金流水表
  param_export_exportAccountFundsFlowToday: {
    url: '/tclound-report/export/exportAccountFundsFlowToday',
    data: {

    }
  },
  // 导出客户历史资金流水表
  param_export_exportAccountFundsFlow: {
    url: '/tclound-report/export/exportAccountFundsFlow',
    data: {

    }
  },
  // param_cbcontractservice_contract_add: {
  //   url: '/cbcontractservice/contract/add',
  //   data: {

  //   }
  // },
  //* ********************************************资金管理*********************************************
  // 客户资金查询
  param_marginManger_searchAccountFunds: {
    url: '/tclound-adminbiz/marginManger/searchAccountFunds',
    data: {

    }
  },
  // 出入金查询/手工出入金查询/资金流水查询
  param_marginManger_searchAccountFundsFlow: {
    url: '/tclound-adminbiz/marginManger/searchAccountFundsFlow',
    data: {

    }
  },
  param_marginManger_searchAccountFrozenFundsFlow: {
    url: '/preadminbiz/marginManger/searchAccountFrozenFundsFlow',
    data: {

    }
  },
  // 解冻资金
  param_marginManger_unfreezeFund: {
    url: '/tclound-adminbiz/marginManger/unfreezeFund',
    data: {

    }
  },
  // 当日出入金查询/手工出入金查询/资金流水查询
  param_marginManger_searchAccountFundsFlowToday: {
    url: '/tclound-adminbiz/marginManger/searchAccountFundsFlowToday',
    data: {

    }
  },
  // 手工出入金
  param_marginManger_manualFundsInAndOut: {
    url: '/tclound-adminbiz/marginManger/manualFundsInAndOut',
    data: {

    }
  },
  // 质检费用汇总
  param_feeSummary_searchInspectionFeeSum: {
    url: '/tclound-adminbiz/feeSummary/searchInspectionFeeSum',
    data: {

    }
  },
  // 仓储费用汇总
  param_feeSummary_searchWarehousFeeSum: {
    url: '/tclound-adminbiz/feeSummary/searchWarehousFeeSum',
    data: {

    }
  },
  // 导出质检费用汇总表
  param_export_exportInspectionFee: {
    url: '/tclound-report/export/exportInspectionFee',
    data: {

    }
  },
  // 导出仓储费用汇总表
  param_export_exportWarehousFee: {
    url: 'tclound-report/export/exportWarehousFee',
    data: {

    }
  },
  // 银行签到
  param_signInOutManagement_signIn: {
    url: '/prebankservice/bank/signIn',
    data: {

    }
  },
  // 银行签退
  param_signInOutManagement_signBack: {
    url: '/prebankservice/bank/signBack',
    data: {

    }
  },

  // 行情类目管理查询
  param_itcommodity_MarketCategory: {
    url: '/tclound-adminbiz/marketQuotation/MarketCategory',
    data: {

    }
  },
  // 行情类目管理新增
  param_itcommodity_addMarketCategory: {
    url: '/tclound-adminbiz/marketQuotation/addMarketCategory',
    data: {

    }
  },
  // 行情类目管理修改
  param_itcommodity_updateMarketCategory: {
    url: '/tclound-adminbiz/marketQuotation/updateMarketCategory',
    data: {

    }
  },
  // 行情类目管理删除
  param_itcommodity_deleteMarketCategory: {
    url: '/tclound-adminbiz/marketQuotation/deleteMarketCategory',
    data: {

    }
  },

  // =====================================================================================
  // 客户签约管理/企业查询
  param_CustomerContractManagement_searchCustomerContract: {
    url: '/prebankservice/bankAdminbiz/findEnterpriseName',
    data: {

    }
  },
  // 客户签约管理/查询
  param_CustomerContractManagement_query: {
    url: '/prebankservice/bankAdminbiz/findSignInfos',
    data: {

    }
  },
  // 客户签约管理/解约
  param_CustomerContractManagement_userUnSign: {
    url: '/prebankservice/bank/userUnSign',
    data: {

    }
  },
  // 当日出金/企业查询
  param_dayToGoldQuery_enterpriseQuery: {
    url: '/prebankservice/bankAdminbiz/findOutMoneys',
    data: {

    }
  },
  // 当日出金/撤销出金
  param_dayToGoldQuery_cancelToGold: {
    url: '/prebankservice/bank/returnOutMoney',
    data: {

    }
  },
  // 当日出金/查询
  param_dayToGoldQuery_query: {
    url: '/prebankservice/bankAdminbiz/findOutMoneys',
    data: {

    }
  },
  // 撤销出金/查询
  param_cancelToGoldQuery_query: {
    url: '/prebankservice/bankAdminbiz/findReturnOutMoneys',
    data: {

    }
  },
  // 签到签退管理/查询
  param_signInOutManagement_searchSignInOut: {
    url: '/prebankservice/bankAdminbiz/findBankSignInfo',
    data: {

    }
  },
  // 账户划拨记录 /查询
  param_accountTransferRecord_query: {
    url: '/prebankservice/bankAdminbiz/findFundsTransfer',
    data: {

    }
  },
  // 账户划拨记录/导出
  param_accountTransferRecord_export: {
    url: '/tclound-report/export/exportFundsTransfer',
    data: {

    }
  },
  // 银行对账管理/导出
  param_bankReconciliationManagement_query: {
    url: '/prebankservice/bank/reconciliation',
    data: {

    }
  },
  // 稀交所账户明细查询/查询
  param_rareExchangeAccountDetailsQuery_query: {
    url: '/prebankservice/bank/findAccountDetails',
    data: {

    }
  },
  // 客户资金查询/禁用启用资金账号
  param_customerFundsEnquiry_use: {
    url: '/prebankservice/bankAdminbiz/updateAccountState',
    data: {

    }
  },
  // 客户资金查询/初始化资金密码
  param_customerFundsEnquiry_init: {
    url: '/prebankservice/bankAdminbiz/setMarginPwd',
    data: {

    }
  },
  // 自有账户划拨/查询
  param_ownAccountTransfer_query: {
    url: '/tclound-adminbiz/feeSummary/searchccountFundsFeeSum',
    data: {

    }
  },
  // 自有账户划拨/结息
  param_ownAccountTransfer_interest: {
    url: '/prebankservice/bank/fundsTransfer',
    data: {

    }
  },
  // 自有账户划拨/资金划拨
  param_ownAccountTransfer_transfer: {
    url: '/prebankservice/bank/fundsTransfer',
    data: {

    }
  },
  // 入金记录查询/查询
  param_goldEntryRecordQuery_query: {
    url: '/prebankservice/bankAdminbiz/findFundInFlow',
    data: {

    }
  },
  // 入金记录查询/手动银行入金
  param_goldEntryRecordQuery_manualBankDeposit: {
    url: '/prebankservice/bank/fundInManual',
    data: {

    }
  },

  // ****************************************************行情**********************************************
  // 当日行情展示
  param_itcommodity_searchCommodityMarket: {
    url: '/tclound-adminbiz/marketQuotation/searchCommodityMarket',
    data: {

    }
  },
  // 添加/修改商品行情
  param_itcommodity_saveCommodityMarket: {
    url: '/tclound-adminbiz/marketQuotation/saveCommodityMarket',
    data: {

    }
  },
  // 商品行情图表数据
  param_itcommodity_searchMarketPrice: {
    url: '/tclound-adminbiz/marketQuotation/searchMarketPrice',
    data: {

    }
  },
  // ****************************************************系统资源**********************************************
  // 短信模板-查询
  param_msgTemplate_queryMsgTemplate: {
    url: '/tclound-adminbiz/msgTemplate/queryMsgTemplate',
    data: {

    }
  },
  // 短信模板-增加
  param_msgTemplate_addMsgTemplate: {
    url: '/tclound-adminbiz/msgTemplate/addMsgTemplate',
    data: {

    }
  },
  // 短信模板-修改
  param_msgTemplate_updateMsgTemplate: {
    url: '/tclound-adminbiz/msgTemplate/updateMsgTemplate',
    data: {

    }
  },
  param_msgTemplate_deleteMsgTemplate: {
    url: '/preadminbiz/msgTemplate/deleteMsgTemplate',
    data: {

    }
  },
  param_push_addMessagePush: {
    url: '/notification/push/addMessagePush',
    data: {

    }
  },
  param_push_findMsgPush: {
    url: '/notification/push/findMsgPush',
    data: {

    }
  },
  // 市场参数配置查询
  param_dictThree_findCbMarketParameter: {
    url: '/tclound-adminbiz/dictThree/findCbMarketParameter',
    data: {

    }
  },
  // 修改市场参数配置
  param_dictThree_updateCbMarketParameter: {
    url: '/tclound-adminbiz/dictThree/updateCbMarketParameter',
    data: {

    }
  },
  // ****************************************************供求信息管理**********************************************
  // 品种管理-搜索一级类目
  param_supplycommodity_searchSupplyCommoditys: {
    url: '/tclound-adminbiz/supplycommodity/searchSupplyCommoditys',
    data: {

    }
  },
  // 品种管理-增加一级类目
  param_supplycommodity_addSupplyCommodity: {
    url: '/tclound-adminbiz/supplycommodity/addSupplyCommodity',
    data: {

    }
  },
  // 品种管理-删除一级类目
  param_supplycommodity_delSupplyCommodity: {
    url: '/tclound-adminbiz/supplycommodity/delSupplyCommodity',
    data: {

    }
  },
  // 品种管理-修改一级类目
  param_supplycommodity_updSupplyCommodity: {
    url: '/tclound-adminbiz/supplycommodity/updSupplyCommodity',
    data: {

    }
  },

  // 供求信息维护/查看详情
  param_supplyDemand_lookDetails: {
    url: '/tclound-adminbiz/supplycommodity/findSupplyCommodityDetails',
    data: {

    }
  },
  // 供求信息维护/展示、搜索
  param_supplyDemand_search: {
    url: '/tclound-adminbiz/supplycommodity/findSupplyCommoditys',
    data: {

    }
  },
  // 供求信息维护/下架
  param_supplyDemand_pass: {
    url: '/tclound-adminbiz/supplycommodity/updateSupplyCommodityStatus',
    data: {

    }
  },
  // 供求信息维护/置顶
  param_supplyDemand_top: {
    url: '/tclound-adminbiz/supplycommodity/topSupplyCommodityStatus',
    data: {

    }
  },
  // 供求信息维护/展示
  param_supplyDemand_sh: {
    url: '/tclound-adminbiz/supplycommodity/findSupplyCommoditySafes',
    data: {

    }
  },
  // 查询分类
  param_getGoodsClassTree: {
    url: '/ishop-goods-admin/goodsClass/getGoodsClassTree',
    data: {
    }
  },
  // 新增品牌
  param_addGoodsBrand: {
    url: '/tclound-goods-admin/goodsBrand/addGoodsBrand',
    data: {
    }
  },
  // 更新品牌
  param_updateGoodsBrand: {
    url: '/tclound-goods-admin/goodsBrand/updateGoodsBrand',
    data: {
    }
  },
  // 查询品牌
  param_getGoodsBrand: {
    url: '/tclound-goods-admin/goodsBrand/getGoodsBrandList',
    data: {
    }
  },
  // 删除品牌
  param_deleteGoodsBrand: {
    url: '/tclound-goods-admin/goodsBrand/deleteGoodsBrand',
    data: {
    }
  },
  // 新增分类
  param_goodsClass_addGoodsClass: {
    url: '/tclound-goods-admin/goodsClass/addGoodsClass',
    data: {
    }
  },
  // 更新分类
  param_goodsClass_updateGoodsClass: {
    url: '/tclound-goods-admin/goodsClass/updateGoodsClass',
    data: {
    }
  },
  // 删除分类
  param_deleteGoodsClass: {
    url: '/tclound-goods-admin/goodsClass/deleteGoodsClass',
    data: {
    }
  },
  // 查询币种列表
  param_currency_getCurrencyList: {
    url: '/tclound-goods-admin/currency/getCurrencyList',
    data: {
      page: 0, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 新增币种
  param_currency_addCurrency: {
    url: '/tclound-goods-admin/currency/addCurrency',
    data: {

    }
  },
  // 编辑币种
  param_currency_updateCurrency: {
    url: '/tclound-goods-admin/currency/updateCurrency',
    data: {

    }
  },
  // 删除币种
  param_currency_deleteCurrency: {
    url: '/tclound-goods-admin/currency/deleteCurrency',
    data: {

    }
  },
  // 商城查看商品详情
  param_getGoodsDetailById_findOne: {
    url: '/tclound-goods-admin/goods/getGoodsDetailById',
    data: {
    }
  },
  // 查询币种列表
  param_currency_getCurrencyList9999: {
    url: '/tclound-goods-admin/currency/getCurrencyList',
    data: {
      page: 0, // "//第几页",
      size: 9999, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 商城查询出售中商品列表
  param_getAllGoodsList_find: {
    url: '/tclound-goods-admin/goods/getSalesGoodsList',
    data: {
      page: null, // "//第几页",
      size: null, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 修改商品排序
  param_goods_updateGoodsSequence: {
    url: '/tclound-goods-admin/goods/updateGoodsSequence',
    data: {
      'goodsGroupId': null,
      'goodsSequence': 0
    }
  },
  // 商城下架商品
  param_updatePutUnderGoods: {
    url: '/tclound-goods-admin/goods/breakRoleUnderGoods',
    data: {
    }
  },
  // 查询普通申请上架的商品--所有
  param_goods_getExamGoodsList: {
    url: '/tclound-goods-admin/goods/getApplyGoodsList',
    data: {
    }
  },
  // 商品支付类型字典表
  param_selectCommodityPayTypeList: {
    url: '/tclound-goods-admin/goods/getIshopDictPayTypeList',
    data: {
    }
  },
  // 查询普通申请上架通过
  param_goods_applyPass: {
    url: '/tclound-goods-admin/goods/applyPass',
    data: {
    }
  },
  // 查询普通申请上架拒绝
  param_goods_applyFail: {
    url: '/tclound-goods-admin/goods/applyFail',
    data: {
    }
  },
  // 查询违规下架商品列表
  param_getBreakRoleGoodsList_find: {
    url: '/tclound-goods-admin/storeGoods/getBreakRoleGoodsList',
    data: {
      page: 0, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 删除商品
  param_mallGoods_delete: {
    url: '/tclound-goods-admin/storeGoods/deleteGoods',
    data: {
      goodsGroupIds: null
    }
  },
  // 申请上架商品
  param_updateGoodStatus: {
    url: '/tclound-goods-admin/storeGoods/applyOnGoods',
    data: {
      goodsGroupIds: null
    }
  },
  // 商城查询违规下架商品列表
  param_getBreakRoleGoodsList_find_mall: {
    url: '/tclound-goods-admin/goods/getBreakRoleGoodsList',
    data: {
      page: 0, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 店铺查看商品详情
  param_mallGoods_findOne: {
    url: '/tclound-goods-admin/storeGoods/getGoodsById',
    data: {
    }
  },
  // 查询出售中商品列表
  param_getSalesGoodsList_find: {
    url: '/tclound-goods-admin/storeGoods/getSalesGoodsList',
    data: {
      page: 0, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 店铺下架商品
  param_updateUnderGoods: {
    url: '/tclound-goods-admin/storeGoods/putUnderGoods',
    data: {
    }
  },
  // 批量修改商品库存
  param_updateGoodsInventory: {
    url: '/tclound-goods-admin/storeGoods/updateGoodsInventory',
    data: {
    }
  },
  // 查询仓库中商品列表
  param_getWareHouseGoodsList_find: {
    url: '/tclound-goods-admin/storeGoods/getWareHouseGoodsList',
    data: {
      page: 0, // "//第几页",
      size: 15, // "//每页搜索结果个数",
      sort: []
    }
  },
  // 商品分类字典表
  param_selectCommodityCategory: {
    url: '/ishop-goods-admin/goodsClass/getGoodsClassTree',
    data: {
    }
  },
  // 获取我的店铺--不分页
  param_queryMyStoreInfoNoPage: {
    url: '/ishop-store-admin/store/getMyStore',
    data: {
      page: 0,
      size: 9999,
      sort: [
        {
          'direction': 'DESC',
          'property': 'updateTime'
        }
      ]
    }
  },
  // 查询商品属性列表
  param_getGoodsRegionList: {
    url: '/tclound-goods-admin/goodsRegionType/getGoodsRegionList',
    data: {
      page: 0,
      size: 9999
    }
  },
  // 查询所有品牌--添加商品
  param_getGoodsBrandAll: {
    url: '/tclound-goods-admin/goodsBrand/getGoodsBrandList',
    data: {
      page: 0,
      size: 9999
    }
  },
  // 查询参数模板列表
  param_getGoodsTemplateParamList: {
    url: '/tclound-goods-admin/goodsTemplateParam/getGoodsTemplateParamList',
    data: {
    }
  },
  // 查询规格列表
  param_getGoodsSpecList: {
    url: '/tclound-goods-admin/goodsTemplateSpec/getGoodsTemplateSpecList',
    // url: '/tclound-goods-admin/goodsSpec/getGoodsSpecList',
    data: {
    }
  },
  // 增加普通商品
  param_mallGoods_add: {
    url: '/tclound-goods-admin/storeGoods/addGoods',
    data: {
    }
  },
  // 修改普通商品
  param_mallGoods_updateGoods: {
    url: '/tclound-goods-admin/storeGoods/updateGoods',
    data: {
    }
  },
  // 新增规格
  param_addSpec: {
    url: '/tclound-goods-admin/goodsTemplateSpec/addGoodsTemplateSpec',
    // url: '/tclound-goods-admin/goodsSpec/addSpec',
    data: {}
  },
  // 修改规格
  param_updateSpec: {
    url: '/tclound-goods-admin/goodsTemplateSpec/updateGoodsTemplateSpec',
    // url: '/tclound-goods-admin/goodsSpec/updateSpec',
    data: {}
  },
  // 删除规格
  param_deleteSpec: {
    url: '/tclound-goods-admin/goodsTemplateSpec/deleteGoodsTemplateSpec',
    // url: '/tclound-goods-admin/goodsSpec/deleteSpec',
    data: {
    }
  },
  // 添加参数模板
  param_addGoodsTemplateParam: {
    url: '/tclound-goods-admin/goodsTemplateParam/addGoodsTemplateParam',
    data: {
    }
  },
  // 更新参数模板
  param_updateGoodsTemplateParam: {
    url: '/tclound-goods-admin/goodsTemplateParam/updateGoodsTemplateParam',
    data: {
    }
  },
  // 根据Id删除参数模板
  param_deleteGoodsTemplateParam: {
    url: '/tclound-goods-admin/goodsTemplateParam/deleteGoodsTemplateParam',
    data: {
    }
  },
  // 挂单查询详情
  param_findHangResourceDetail: {
    url: '/tclound-adminbiz/warehouseorders/findHangResourceDetail',
    data: {
    }
  },
  // 根据用户角色查询用户
  param_findFrimByRole: {
    url: '/tclound-adminbiz/dictThree/findFrimByRole',
    data: {

    }
  },
  // 查询基差回购
  param_queryBasisQueryRepoOrderLd: {
    url: '/basis-adminbiz/query/queryBasisQueryRepoOrderLd',
    data: {

    }
  },
  // 查询基差订单
  param_queryBasisQueryOrderLd: {
    url: '/basis-adminbiz/query/queryBasisQueryOrderLd',
    data: {

    }
  },
  // 查询基差挂单
  param_queryBasisQueryHangResourceLd: {
    url: '/basis-adminbiz/query/queryBasisQueryHangResourceLd',
    data: {

    }
  },
  // *****************************************融资**********************************************
  // 融资方信息查询
  param_factor_findFactorFirmInfo: {
    url: '/tclound-financeservice/factor/findFactorFirmInfo',
    data: {

    }
  },
  // 添加融资方
  param_preadminbiz_factor_addUser: {
    url: '/tclound-financeservice/factor/addUser',
    data: {

    }
  },
  // 查看总融资信息
  param_factor_findFinanceTotal: {
    url: '/tclound-financeservice/factor/findFinanceTotal',
    data: {

    }
  },
  // 已通过融资申请
  param_factor_findFinanceAgree: {
    url: '/tclound-financeservice/factor/findFinanceAgree',
    data: {

    }
  },
  // 已驳回融资申请
  param_factor_findFinanceRefuse: {
    url: '/tclound-financeservice/factor/findFinanceRefuse',
    data: {

    }
  },
  // 完成融资信息
  param_factor_findFinanceFinish: {
    url: '/tclound-financeservice/factor/findFinanceFinish',
    data: {

    }
  },
  // 未处理融资申请
  param_factor_findFinanceApply: {
    url: '/tclound-financeservice/factor/findFinanceApply',
    data: {

    }
  },
  // 融资信息查询
  param_factor_findFinanceInfo: {
    url: '/tclound-financeservice/factor/findFinanceInfo',
    data: {

    }
  },
  // 融资设置
  param_factor_setupFinanceInfo: {
    url: '/tclound-financeservice/factor/setupFinanceInfo',
    data: {

    }
  },
  // 融资设置(还款期限/手续费比例/逾期费比例)
  param_prefinanceservice_factor_setupPaybackTime: {
    url: '/tclound-financeservice/factor/setupPaybackTime',
    data: {

    }
  },
  // 绑定仓库
  param_factor_bandStorage: {
    url: '/tclound-financeservice/factor/bandStorage',
    data: {

    }
  },
  // 融资信息比例查询
  param_factor_findFinanceRateInfo: {
    url: '/tclound-financeservice/factor/findFinanceRateInfo',
    data: {

    }
  },
  // 删除(还款期限/手续费比例/逾期费比例)
  param_factor_delPaybackTime: {
    url: '/tclound-financeservice/factor/delPaybackTime',
    data: {

    }
  },
  // 质押申请查询
  param_pledge_findPledgeApply: {
    url: '/tclound-financeservice/pledge/findPledgeApply',
    data: {

    }
  },
  // 质押申请报价
  param_pledge_offerPledgeApply: {
    url: '/tclound-financeservice/pledge/offerPledgeApply',
    data: {

    }
  },
  // 逾期融资信息
  param_factor_findFinanceOverdue: {
    url: '/tclound-financeservice/factor/findFinanceOverdue',
    data: {

    }
  },
  // 未处理融资申请/驳回
  param_factor_refuseFinanceApply: {
    url: '/tclound-financeservice/factor/refuseFinanceApply',
    data: {

    }
  },
  // 未处理融资申请/通过
  param_factor_agreeFinanceApply: {
    url: '/tclound-financeservice/factor/agreeFinanceApply',
    data: {

    }
  },
  param_factor_findFactorStorage: {
    url: '/tclound-financeservice/factor/findFactorStorage',
    data: {

    }
  }
}
