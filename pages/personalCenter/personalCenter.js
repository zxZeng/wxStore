const app = getApp()
// pages/personalCenter.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    path:"/pages/myOrder/myOrder",
    hasUserInfo: false,
    orderStatusInfo:[
      {
        icon: "iconfont icon-icondaifahuo",
        text: "待发货",
        pathTo: "/pages/myOrder/myOrder"
      },
      {
        icon: "iconfont icon-daishouhuofuben",
        text: "待收货",
        pathTo: "/pages/myOrder/myOrder"
      },
      {
        icon: "iconfont icon-daipingjia01",
        text: "待评价",
        pathTo: "/pages/myOrder/myOrder"
      }
    ],
    menuInfo:[
      {
        text:"优惠券",
        pathTo:"/pages/myCupones/myCupones"
      },
      {
        text: "地址管理",
        pathTo:"/pages/address/address"
      }, 
      // {
      //   text: "绑定手机",
      //   pathTo:"/pages/correlatePhone/correlatePhone"
      // }, 
      {
        text: "关于我们",
        pathTo:"/pages/aboutUs/aboutUs"
      }
    ]
  },
  pathTo:function(event){
    let path = event.currentTarget.dataset.path;
    if (!app.globalData.userInfo && path!="/pages/aboutUs/aboutUs") {
      wx.showToast({
        title:"请先登录",
        icon:"none"
      })
    }else{
      let params = event.currentTarget.dataset.params;
      wx.navigateTo({
        url: path+"?params="+params,
        success: function (res) {},
        fail: function (res) { console.log("fail"); },
        complete: function (res) { },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  setUserInfo:function(data){
    if (data.detail.errMsg==="getUserInfo:ok") {
      app.globalData.userInfo = data.detail.userInfo
      this.setData({
        userInfo: data.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})