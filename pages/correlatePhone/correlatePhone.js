// pages/correlatePhone/correlatePhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    verificationCodeBtn:"获取验证码",
    time:60,
    flag:true
  },
  reqVerificationCode:function(){
    var that = this;
    var flag = that.data.flag;
    if(flag){
      var time1 = that.data.time;
      that.setData({
        verificationCodeBtn: "剩余 " + time1 + " S",
        time: time1,
        flag: false
      });
      var interval = setInterval(function () {
        that.data.time--;
        var time1 = that.data.time;
        if (time1 <= 0) {
          clearInterval(interval);
          that.setData({
            verificationCodeBtn: "获取验证码",
            time: 60,
            flag: true
          });
        } else {
          that.setData({
            verificationCodeBtn: "剩余 " + time1 + " S",
            time: time1,
            flag: false
          });
        }
      }, 1000);
    }
    
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