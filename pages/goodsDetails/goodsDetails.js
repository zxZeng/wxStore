// pages/goodsDetail/goodsDetail.js
const app = getApp();
const API = require("../../utils/route.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    isCart: true,
    hasUserInfo: false,
    showModal: false,
    toast: {
      display: true,
      msg: ""
    },
    imageUrls: [],
    goodsDetail:{},
    detailUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var pid = options.id;
    if (app.globalData.userInfo) {
      _this.setData({
        hasUserInfo: true,
      })
    }
    this.setData({
      productId: pid
    })
    wx.request({
      url: API.productLinkInfo,
      method: 'post',
      data: {
        productId: pid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        _this.setData({
          goodsDetail: res.data.Product,
          detailUrl: res.data.downs,
          imageUrls: res.data.ups
        })
      }
    })
  },
  // 评价数据
  reviewInfo() {
    var _this = this;
    wx: wx.request({
      url: 'https://xxx.com/reviewList',
      success: function (res) {
      },
    })
  },
  detailMinus() {
    if (this.data.num > 1) {
      this.data.num--;
      this.setData({ num: this.data.num })
    }
  },
  detailPlus() {
    this.data.num++;
    this.setData({ num: this.data.num })
  },
  buyModal() {
    this.setData({
      showModal: true,
      isCart: false
    })
  },
  // 跳转首页
  homeModal() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  cartModal() {
    this.setData({
      showModal: true,
      isCart: true
    })
  },
  cartModalClose() {
    this.setData({ showModal: false })
  },
  joinCart(e) {
    var _this = this;
    let userId = app.globalData.userInfo.userId;
    let goods = _this.data.goodsDetail;
    let totalMoney = _this.data.num * goods.productPrice;
    let productId = goods.productId;
    let productName = goods.productName;
    let indexImage = goods.indexImage;
    let productPrice = goods.productPrice;
    let dataInfo = {
      userId: userId,
      productId: productId,
      productName: productName,
      indexImage: indexImage,
      productNum: _this.data.num,
      totalMoney: totalMoney,
      productPrice: productPrice
    };
    if (_this.data.isCart) {
      _this.setData({ showModal: false })
      wx.request({
        url: API.addOrder,
        method: 'post',
        data: dataInfo,
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          _this.setData({ toast: { display: false, msg: "添加成功" } })
          console.log("添加成功",res)
        }
      })
    } else {
      _this.data.goodsDetail.productNum = _this.data.num
      app.globalData.orderGoods = [];
      app.globalData.orderGoods.push(_this.data.goodsDetail);
      // var totalMoney = this.data.goodsDetail.price * this.data.goodsDetail.num;
      wx.navigateTo({
        url: '/pages/order/order?totalMoney=' + totalMoney 
      })
    }
  },
  setUserInfo(data){
    if (data.detail.errMsg==="getUserInfo:ok") {
      app.globalData.userInfo = data.detail.userInfo
      wx.showToast({
        title:"登陆成功",
        icon:"success"
      })
      this.setData({
        hasUserInfo: true
      })
    }
  },
  shoppingCart() {
    wx.switchTab({
      url: '/pages/shoppingCart/shoppingCart',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
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