const app = getApp();
const API = require("../../utils/route.js");
// pages/myCupones/myCupones.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    myHeight:400,
    userId: "",
    navActive: "all",
    currentTab: 0,
    animationData: "",
    moveFlag: false,
    navInfo: [
      {
        text: "全部",
        english: "all"
      },
      {
        text: "待发货",
        english: "sendGoods"
      },
      {
        text: "待收货",
        english: "waitReceive"
      },
      {
        text: "待评价",
        english: "remainEvaluated"
      }
    ],
    OrderInfo: {
      all: [],
      sendGoods: [],
      waitReceive: [],
      remainEvaluated: []
    }
  },
  changeNav: function (event) {
    var navActive = event.currentTarget ? event.currentTarget.dataset.nav : event;
    var that = this;
    let currentTab = 0;
    let myHeight = "100vh";
    let baseHeight = 410;
    if(navActive=="all" || navActive=="全部"){
      navActive = "all";
      myHeight = that.data.OrderInfo.all.length * baseHeight;
      currentTab = 0;
    } else if (navActive == "sendGoods" || navActive=="待发货") {
      navActive = "sendGoods";
      myHeight = that.data.OrderInfo.sendGoods.length * baseHeight;
      currentTab = 1;
    } else if (navActive == "waitReceive" || navActive=="待收货") {
      navActive = "waitReceive";
      myHeight = that.data.OrderInfo.waitReceive.length * baseHeight;
      currentTab = 2;
    } else if (navActive == "remainEvaluated" || navActive=="待评价") {
      navActive = "remainEvaluated";
      myHeight = that.data.OrderInfo.remainEvaluated.length * baseHeight;
      currentTab = 3;
    }else {
      navActive = "all";
      myHeight = that.data.OrderInfo.all.length * baseHeight;
      currentTab = 0;
    }
    that.setData({
      navActive: navActive,
      currentTab : currentTab,
      myHeight: myHeight
    });
  },
  getAllOrder: function () {
    // OrderInfo
    let that = this;
    wx.request({
      url: API.allOrders,
      data: { userId: that.data.userId},
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        let data = res.data.Orders ? res.data.Orders : [];
        console.log(data);
        let dataInfo = {
          all: [],
          sendGoods: [],
          waitReceive: [
          ],
          remainEvaluated: []
        };
        for (let i = 0; i < data.length; i++) {
          let btn = [];
          let dt = {
            orderNumber: data[i].orderId,
            orderStatus: "",
            imgsrc: data[i].indexImage,
            productName: data[i].productName,
            productPrice: data[i].productPrice,
            productCount: data[i].productNum,
            btn: []
          };
          let orderStatus = data[i].status;
          if (orderStatus == 1) {
            dt.orderStatus = "待发货";
            dt.btn = [
              {
                btnName: "查看包裹"
              },
              {
                btnName: "发货中"
              }
            ];
            dataInfo.sendGoods.push(dt);
          } else if (orderStatus == 2) {
            dt.orderStatus = "待收货";
            dt.btn = [
              {
                btnName: "查看包裹详情"
              },
              {
                btnName: "查看物流"
              }
            ];
            dataInfo.waitReceive.push(dt);
          } else if (orderStatus == 3) {
            dt.orderStatus = "待评价";
            dt.btn = [
              {
                btnName: "查看详情"
              },
              {
                btnName: "去评价"
              }
            ];
            dataInfo.remainEvaluated.push(dt);
          }
          dataInfo.all.push(dt);
        }
        that.setData({
          OrderInfo:dataInfo
        });
      }
    })
  },
  swiperChange:function (event) {
    let current = event.detail.current;
    let navActive = "";
    let source = event.detail.source;
    let myHeight = "100vh";
    let baseHeight = 410;
    let that = this;
    if(source=="touch"){
      if(current==0){
        navActive = "all";
        myHeight = that.data.OrderInfo.all.length * baseHeight;
      } else if (current == 1) {
        navActive = "sendGoods";
        myHeight = that.data.OrderInfo.sendGoods.length * baseHeight;
      } else if (current == 2) {
        navActive = "waitReceive";
        myHeight = that.data.OrderInfo.waitReceive.length * baseHeight;
      } else if (current == 3) {
        navActive = "remainEvaluated";
        myHeight = that.data.OrderInfo.remainEvaluated.length * baseHeight;
      }
      that.setData({
        navActive:navActive,
        myHeight:myHeight
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.userId = app.globalData.userInfo.userId;
    this.getAllOrder();
    if (options.params) {
      this.changeNav(options.params);
    } else {
      this.changeNav("all");
    }
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