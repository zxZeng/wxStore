// pages/home/home.js
const app = getApp();
const API = require("../../utils/route.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue:'',
    toast: {
      display: true,
      msg: ""
    },
    imgUrls:[
      "http://p3gitomz5.bkt.clouddn.com/miniApplunBo1.jpg",
      "http://p3gitomz5.bkt.clouddn.com/miniApplunBo2.jpg",
      "http://p3gitomz5.bkt.clouddn.com/miniApplunBo3.jpg"
    ],
    newObj:[],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    duration:1000,
    indicatorActiveColor:"#fff",
    circular:true,
    addOk:false,
    loadFlag: false,
    jxObj:[
      { img: 'http://p3gitomz5.bkt.clouddn.com/miniAppjx1.jpg', jxTitle:'纯实木门套装家居木质平开门 平雕原木门四川室内家具定做批发',price:100},
      { img: 'http://p3gitomz5.bkt.clouddn.com/miniAppjx2.jpg', jxTitle: '纯实木门套装家居木质平开门 平雕原木门四川室内家具定做批发', price: 100 },
      { img: 'http://p3gitomz5.bkt.clouddn.com/miniAppjx3.jpg', jxTitle: '纯实木门套装家居木质平开门 平雕原木门四川室内家具定做批发', price: 100 },
      { img: 'http://p3gitomz5.bkt.clouddn.com/miniAppjx4.jpg', jxTitle: '纯实木门套装家居木质平开门 平雕原木门四川室内家具定做批发', price: 100 },
    ],
    fixed:false
  },
  search(e){
  },
  navSearch(e){
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?value=' + e.detail.value
    })
  },
  personal(){
    wx.switchTab({
      url:'/pages/personalCenter/personalCenter'
    })
  },
  classify(){
    wx.switchTab({
      url: '/pages/category/category'
    })
  },
  moreGoods(){
    wx.navigateTo({
      url: '/pages/goodsList/goodsList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  featureDetail(e){
    wx.navigateTo({
      url: '/pages/goodsDetails/goodsDetails?id=' + e.currentTarget.dataset.productid,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 加入购物车
   */
  addCart(e){
    var _this = this;
    let userId = app.globalData.userInfo.userId;
    // console.log("id",e.currentTarget.dataset);
    let productId = e.currentTarget.dataset.productid;
    let totalMoney = e.currentTarget.dataset.price;
    let pName = this.data.jxObj.find(i => i.productId == e.currentTarget.dataset.productid).productName;
    let indexImage = this.data.jxObj.find(i => i.productId == e.currentTarget.dataset.productid).indexImage;
    let productPrice = this.data.jxObj.find(i => i.productId == e.currentTarget.dataset.productid).productPrice;
    wx.request({
      url: API.addOrder,
      method: 'post',
      data: {
        userId: userId,
        productId:productId,
        productName: pName,
        indexImage: indexImage,
        productNum: 1,
        totalMoney: totalMoney,
        productPrice: productPrice
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        _this.setData({
          toast: { display: false, msg: "添加成功" }
        })
        console.log(res)
      }
    })
  },
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
  },
  /**
   * 窗口滚动事件
   */
  onPageScroll:function(object){
    if (object.scrollTop>180){
      this.setData({
        fixed:true
      })
    }else{
      this.setData({
        fixed: false
      })
    }
  },
  // 获取精选商品数据
  featureInfo(){
    var _this = this;
    wx.request({
      url:  API.queryPerfectPro,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        // console.log( res);
        _this.setData({
          jxObj:res.data.Products,
          newObj: res.data.Products
        })
      }
    })
  },
  onReachBottom: function () {
    this.setData({
      loadFlag: true
    });
    let dataInfo = this.data.jxObj;
    let data = this.data.jxObj.concat(dataInfo);
    let that = this;
    // data.push(dataInfo);
    setTimeout(function () {
      that.setData({
        jxObj: data,
        loadFlag: false
      });
    }, 2000);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.featureInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
        }
      })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})