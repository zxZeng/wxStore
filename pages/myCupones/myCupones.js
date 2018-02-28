const app = getApp();
const API = require("../../utils/route.js");
// pages/myOrder/myOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:"",
    cuponesInfo:[
      {
        cuponesId: "cccc1",
        cuponesName: "立减券",
        cuponesTip: "满4000减200",
        discount: "200"
      },
      {
        cuponesId: "cccc2",
        cuponesName: "打折券",
        cuponesTip: "低于4000打八折",
        discount: "8"
      }
    ],
    toast: {
      display: true,
      msg: ""
    },
  },
  // 控制提示框的显示隐藏
  tipShowHidden:function(status) {
    let that = this;
    that.setData({
      toast: {
        display: false,
        msg: status
      }
    });
    setTimeout(function () {
      that.setData({
        toast: {
          display: true,
          msg: ""
        }
      });
    }, 1000);
  },
  // 输入的领券优惠码
  inputCuponesId:function(event) {
    let that = this;
    let cuponesCode = event.detail.value;
    this.setData({
      cuponesId:cuponesCode
    });
  },
  // 添加优惠券
  addCupones:function() {
    let that = this;
    let cuponesCode = that.data.cuponesId;
    let userId = that.data.userId;
    wx.request({
      url: API.fetchCoupon,
      method: "post",
      data: {
        userId: userId,
        couponId: cuponesCode
      },
      header: { "content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        let status = res.data.status;
        if (status == "error") {
          status = "添加失败";
          that.tipShowHidden(status);
        } else {
          status = "添加成功";
          that.hiddenFlag();
          that.tipShowHidden(status);
          that.animateOne();
          that.getAllCupones(1);
        }
      }
    })
  },
  // 显示模态框（输入优惠码）
  showFlag:function(){
    this.setData({
      modalFlag:true
    });
  },
  // 隐藏模态框（输入优惠码）
  hiddenFlag: function () {
    this.setData({
      modalFlag: false
    });
  },
  // 选择类别
  // changeNav: function (event) {
  //   var navActive = event.currentTarget.dataset.nav;
  //   if(!this.data.moveFlag){
  //     this.animateOne();
  //     let status = 0;
  //     if (navActive == "未使用"){
  //       status = 1;
  //     } else if (navActive == "已使用") {
  //       status = 0;
  //     } else if (navActive == "已过期") {
  //       status = -1;
  //     }
  //     this.setData({
  //       navActive: navActive,
  //       moveFlag: true
  //     });
  //     this.getAllCupones(status);
  //   }
  // },
  // 使用优惠券
  useCopones:function(event) {
    let that = this;
    if(that.data.payId!=""){
      let cuponesId = event.currentTarget.dataset.cuponesid;
      let cuponesInfo = that.data.cuponesInfo;
      let cuponesData = {};
      for (let i = 0; i < cuponesInfo.length;i++){
        if (cuponesInfo[i].cuponesId == cuponesId){
          cuponesData = JSON.stringify(cuponesInfo[i]);
          break;
        }
      }
      wx.redirectTo({
        url: '/pages/order/order?cuponesData='+cuponesData,
        success:function() {
          that.setData({
            payId:""
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.data.userId = app.globalData.userInfo.userId;
    // that.setData({
    //   payId: payId
    // });
    // let payId = options.payId ? options.payId : "";
    // if(payId!=""){
      
    // }
    // this.animateOne();
    // that.getAllCupones(1);
  },
  getAllCupones:function(status) {
    let that = this;
    let userId = that.data.userId;
    wx.request({
      url: API.queryAllCanUserCoupon,
      method: "post",
      header: { "content-type": "application/x-www-form-urlencoded" },
      data: {
        userId: userId,
        status: status
      },
      success: function (res) {
        let data = res.data.Coupons;
        let info = [];
        for (let i = 0; i < data.length; i++) {
          let cuponeStatus = "";
          if (data[i].status == 0) {
            cuponeStatus = "已使用";
          } else if (data[i].status == 1) {
            cuponeStatus = "未使用";
          } else if (data[i].status == (-1)) {
            cuponeStatus = "已过期";
          }
          let dt = {
            cuponesId: data[i].couponId,
            cuponesName: data[i].couponName,
            cuponesDate: "有效期至 " + data[i].couponDeadLine,
            cuponesStatus: cuponeStatus,
            cuponesTip: data[i].couponDesc,
            discount: data[i].couponMoneySize
          }
          info.push(dt);
        }
        that.setData({
          cuponesInfo: info
        });
        that.animateTwo();
      }
    })
  },
  // 动作函数一
  animateOne:function() {
    var animation = wx.createAnimation({
      duration: 0,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateX(375).step();
    this.setData({
      animationData: animation.export()
    });
  },
  // 动作函数二
  animateTwo: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.translateX(0).step();
    this.setData({
      animationData: animation.export(),
      moveFlag:false
    })
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