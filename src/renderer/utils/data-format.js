import crypto from 'crypto'
export default {
  // MD5加密
  getmd5(data) {
    var md5 = crypto.createHash('md5')
    md5.update(data)
    var a = md5.digest('hex')
    return a
  },
  formatDate: {
    format: function(timestamp) {
      var date = new Date(parseInt(timestamp))
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var min = date.getMinutes()
      var sec = date.getSeconds();
      [year, month, day, hour, min, sec] = [year, month, day, hour, min, sec].map(item => item < 10 ? '0' + item : item)
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`
    },
    formatTime: function(timestamp) {
      var date = new Date(parseInt(timestamp))
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      var hour = date.getHours()
      var min = date.getMinutes()
      var sec = date.getSeconds();
      [year, month, day, hour, min, sec] = [year, month, day, hour, min, sec].map(item => item < 10 ? '0' + item : item)
      return `${hour}:${min}:${sec}`
    },
    formatSpan: function(stime, etime) {
      var usedTime = etime - stime // 两个时间戳相差的毫秒数
      var days = Math.floor(usedTime / (24 * 3600 * 1000))
      // 计算出小时数
      var leave1 = usedTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      if (days === 0) {
        leave1 = usedTime
      }
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      if (hours === 0) {
        leave2 = usedTime
      }
      var minutes = Math.floor(leave2 / (60 * 1000))
      var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      if (minutes === 0) {
        leave3 = usedTime
      }
      var seconds = Math.floor(leave3 / (1000))
      // 转成两位数
      if (parseInt(hours) < 10) {
        hours = '0' + hours
      }
      if (parseInt(minutes) < 10) {
        minutes = '0' + minutes
      }
      if (parseInt(seconds) < 10) {
        seconds = '0' + seconds
      }

      var time = days + '天' + hours + '时' + minutes + '分' + seconds + '秒'
      time = hours + ':' + minutes + ':' + seconds
      return time
    },
    formatDay: function(timestamp) {
      var date = new Date(parseInt(timestamp))
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate();
      [year, month, day] = [year, month, day].map(item => item < 10 ? '0' + item : item)
      return `${year}-${month}-${day}`
    },
    formatMonth: function(timestamp) {
      var date = new Date(parseInt(timestamp))
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate();
      [year, month, day] = [year, month, day].map(item => item < 10 ? '0' + item : item)
      return `${year}-${month}`
    },
    formatTimeMin: function(faultDate, completeTime) {
      var stime = Date.parse(new Date(faultDate))
      var etime = Date.parse(new Date(completeTime))
      var usedTime = etime - stime // 两个时间戳相差的毫秒数
      var days = Math.floor(usedTime / (24 * 3600 * 1000))
      // 计算出小时数
      var leave1 = usedTime % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      var time = days + '天' + hours + '时'
      return time
    }
  },
  getTimes(str) {
    let len = 0
    try {
      len = str.toString().split('.')[1].length // 计算出小数点后有几位
    } catch (e) {
      len = 0 // 小数点后没有东西，就默认为零位
    }
    const m = Math.pow(10, len)
    return m
  },
  // 截取图片
  getSmallBase64(url, callback) {
    var Img = new Image()
    var dataURL = ''
    var drawEncoderOptions = 40000.0 / url.length > 1 ? 0.92 : 40000.0 / url.length
    Img.src = 'data:image/jpeg;base64,' + url
    Img.onload = function() { // 异步
      var canvas = document.createElement('canvas')
      var width = Img.width
      var height = Img.height
      canvas.width = 300
      canvas.height = 300.0 * (height / width)
      canvas.getContext('2d').drawImage(Img, 0, 0, 300, 300 * (height / width))
      dataURL = canvas.toDataURL('image/jpeg')
      const i = dataURL.indexOf(',') // 截取data:image/png;base64,后的内容
      const imageName = dataURL.substring(i + 1, dataURL.length) // 把图片的二进制流付给表单ruleFinancingForm里面的idImage
      callback ? callback(imageName, drawEncoderOptions) : null
    }
  },
  floatAdd(arg1, arg2) {
    let r1, r2
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    const n = Math.max(r1, r2)
    const m = Math.pow(10, n)
    return ((arg1 * m + arg2 * m) / m).toFixed(n)
  },
  floatSub(arg1, arg2) {
    let r1, r2
    try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
    const m = Math.pow(10, Math.max(r1, r2))
    // last modify by deeka
    // 动态控制精度长度
    const n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  floatMul(arg1, arg2) {
    if (arg1 && arg2) {
      let m = 0
      const s1 = Number(arg1).toString()
      const s2 = Number(arg2).toString()
      try { m += s1.split('.')[1].length } catch (e) {}
      try { m += s2.split('.')[1].length } catch (e) {}
      return (Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)).toFixed(m)
    } else {
      return 0
    }
  },
  // 浮点数除法运算
  floatDiv(arg1, arg2) {
    arg1 = Number(arg1)
    arg2 = Number(arg2)
    var t1 = 0
    var t2 = 0
    var r1; var r2
    try { t1 = arg1.toString().split('.')[1].length } catch (e) {}
    try { t2 = arg2.toString().split('.')[1].length } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''))
    r2 = Number(arg2.toString().replace('.', ''))
    let n = 0
    if (t2 > t1) {
      n = t2 - t1
      if (n === 0) {
        n = t2
      }
    } else {
      n = t1 - t2
      if (n === 0) {
        n = t1
      }
    }
    return (r1 / r2) * Math.pow(10, t2 - t1)
  },
  getmonday() {
    const now = new Date()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    now.setMilliseconds(0)
    const nowTime = now.getTime()
    const day = now.getDay()
    const oneDayLong = 24 * 60 * 60 * 1000
    const mondayTime = nowTime - (day - 1) * oneDayLong
    return mondayTime
  }
}
