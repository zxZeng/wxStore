var Mock = require("./utils/WxMock.js");
const API = require("./utils/route.js");
var Random = Mock.Random;
Mock.mock('https://xxx.com/cartList', {
  "code": 200,
  "data|0-2": [
    {
      'id|+1': 1,
      "productName": "@csentence(5,15)",
      "productPrice": "@natural(60, 100)",
      "imagesUrl": 'http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg',
      "productSum": "@natural(1, 10)",
      "isChecked": true
    }
  ]
})
Mock.mock('https://xxx.com/featureList', {
  "code": 200,
  "data|5-10": [
    {
      'id|+1': 1,
      "img": "http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg",
      "jxTitle": "@csentence(5,15)",
      "price": "@natural(60, 100)"
    }
  ]
})
Mock.mock('https://xxx.com/reviewList', {
  "code": 200,
  "data|5-10": [
    {
      'id|+1': 1,
      "userName": "@csentence(2,4)",
      "reviewContent": "@csentence(25,40)",
      "reviewTime": "@natural(60, 100)"
    }
  ]
})
Mock.mock('https://xxx.com/user/delete', {
  "code": 200,
  "message": "s删除成功"
})
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    let that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  that.globalData.userInfo = res.userInfo;
                  that.globalData.userInfo.userId = res.userInfo.nickName;
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (that.userInfoReadyCallback) {
                    that.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    address:{},
    cupones:{},
    orderGoods:[]
  }
})