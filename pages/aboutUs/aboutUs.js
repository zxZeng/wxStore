// pages/aboutUs/aboutUs.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataInfo:[
      {
        name: "联系人",
        info: "周维繁"
      },
      {
        name: "微信",
        info: "zwf78418"
      },
      {
        name: "电话",
        info: "13880457608"
      },
      {
        name: "邮箱",
        info: "1660203013@qq.com"
      },
     
      {
        name: "地址",
        info: "四川省成都市都江堰天马镇金玉工业园65号"
      }, {
        name: "服务热线",
        info: "028-82856265"
      }
    ],
    tip:"技术支持@成都众商加科技有限公司"
  },
  callPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '028-82856265',
      success:function(){
        console.log("success");
      },
      fail: function () {
        console.log("fail");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})