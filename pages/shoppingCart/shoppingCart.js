// pages/shoppingCart/shoppingCart.js
const app = getApp();
const API = require("../../utils/route.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    cartInfo: [],
    selectGoods:[],
    isEdit: true,
    allPickState: false,
    loadFlag: true,
    isKong: true,
    userId:'',
    hasUserInfo:false,
    totalMoney:0,
    totalCount:0,
    toast: {
      display: true
    },
  },
  getCartList:function(data){
    const that = this
    if (data.detail.errMsg==="getUserInfo:ok") {
      app.globalData.userInfo = data.detail.userInfo
      console.log(data.detail.userInfo)
      that.setData({
        hasUserInfo: true,
        userId:data.detail.userInfo.nickName
      },function(){
        that.getCartInfo()
      })
    }    
  },
  //修改选择状态
  checkChange: function (e) {
    console.log(e.detail.value)
    var _this = this;
    // let orderId = this.data.cartInfo.find(i => i.id == e.detail.value[0]).id;
    console.log(this.data.cartInfo)
    // let selected = this.data.cartInfo.find(i => i.id == e.detail.value[0]).selected;
    // console.log(this.data.cartInfo)
    if (selected == 0){
      selected = 1
    }else{
      selected = 0
    }

    // // 请求（success以后执行  this.getCartInfo()）
    // wx.request({
    //   url: API.updateOrderSelect,
    //   data: {
    //     userId: _this.data.userId,
    //     orderId: orderId,
    //     selected:selected
    //   },
    //   method: "post",
    //   header: {
    //     "content-type": "application/x-www-form-urlencoded"
    //   },
    //   success: function (res) {
    //     _this.getCartInfo()
    //   }
    // })
  },
  //全选
  allPick(e) {
    console.log(e)
    var _this = this
    this.setData({
      allPickState: !this.data.allPickState
    })
    let allPickState = this.data.allPickState;
    if (allPickState == 0) {
      allPickState = false
    } else {
      allPickState = true
    }
     wx.request({
      url: API.updateOrderAllSelect,
      data: {
        userId: _this.data.userId,
        selected: allPickState
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        _this.getCartInfo()
      }
    })


  }, 
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    if (app.globalData.userInfo) {
      this.setData({
        userId: app.globalData.userInfo.userId
        // hasUserInfo: true
      },function(){
        that.getCartInfo()
      })
    } 
  },
  purchase(){
    wx.navigateTo({
      url: '/pages/goodsList/goodsList',
    })
  },
  getCartInfo() {
    var _this = this;
    let userId = _this.data.userId;
    this.data.loadFlag=true
    wx.request({
      url: API.getOrdersByUserId,
      data: {
        userId: userId
      },
      method: "post",
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        _this.setData({ loadFlag: false })
        // console.log(res.data,123);
        let data = res.data.Orders ? res.data.Orders:[];
        let info = [];
        for (let i = 0; i < data.length; i++) {
          let dt = {
            imageUrls: [data[i].indexImage],
            productName: data[i].productName,
            productPrice: data[i].productPrice,
            productSum: data[i].productNum,
            id: data[i].orderId,
            selected: data[i].selected,
            productId: data[i].productId
          };
          info.push(dt);
        }
        _this.setData({
           cartInfo: info
         });
        if (res.data.length == 0) {
          _this.setData({ isKong: true });
        } else {
          _this.setData({ isKong: false });
        }
        //  app.globalData.orderGoods = _this.data.cartInfo;
        _this.totalMoney();
        _this.totalCount()
      }
    })
  },
  //购物车数量减
  cartMinus(e) {
    var _this = this
    let userId = app.globalData.userInfo.userId;
    let productSum = this.data.cartInfo.find(i => i.productId == e.currentTarget.dataset.id).productSum;
    let productPrice = this.data.cartInfo.find(i => i.productId == e.currentTarget.dataset.id).productPrice;
    let totalMoney = productSum * productPrice;
    let productId = e.currentTarget.dataset.id;
    console.log(productId)
    if (this.data.cartInfo.find(i => i.productId == e.currentTarget.dataset.id).productSum > 1) {
      wx.request({
        url: API.updateProductNum,
        data: {
          userId: userId,
          productId: productId,
          productNum: productSum - 1,
          totalMoney: totalMoney
        },
        success: function (res) {
          _this.getCartInfo()
        }
      })
    }
  },
  //购物车数量加
  cartPlus(e) {
    var _this = this
    let userId = app.globalData.userInfo.userId;
    let productSum = this.data.cartInfo.find(i => i.productId == e.currentTarget.dataset.id).productSum;
    let productPrice = this.data.cartInfo.find(i => i.productId == e.currentTarget.dataset.id).productPrice;
    let totalMoney = productSum * productPrice;
    let productId = e.currentTarget.dataset.id;
    wx.request({
      url: API.updateProductNum,
      data: {
        userId: userId,
        productId: productId,
        productNum: productSum + 1,
        totalMoney: totalMoney
      },
      success: function (res) {
        _this.getCartInfo()
      }
    })
  },
  //计算总数量
  totalCount() {
    let _this = this;
    let userId = app.globalData.userInfo.userId;
    let totalCount = 0;
    wx.request({
      url: API.querySelectedOrder,
      data: {
        userId: userId
      },
      success: function (res) {
        console.log(1)
        console.log(res);
        console.log(1)
        if (res.data.Orders){
          for (let i = 0; i < res.data.Orders.length; i++) {
            totalCount += res.data.Orders[i].productSum
          }
          this.setData({ totalCount: totalCount })
        }
      }
    })
    
    
    
  },
  //计算总价
  totalMoney() {
    let _this = this;
    let userId = app.globalData.userInfo.userId;
    let totalMoney = 0;
    wx.request({
      url: API.querySelectedOrder,
      data: {
        userId: userId
      },
      success: function (res) {
        console.log(res.data.Orders);
        if (res.data.Orders) {
          for (let i = 0; i < res.data.Orders.length; i++) {
            totalMoney += res.data.Orders[i].productPrice * res.data.Orders[i].productSum
          }
          this.setData({ totalMoney: totalMoney })
        }
      }
    })

  },
  //删除购物车商品
  cartListDel(e) {
    var _this = this;
    let userId = app.globalData.userInfo.userId;
    wx.request({
      url: API.deleteOrders,
      method: 'post',
      data: {
        userId: userId,
        orderIds: e.currentTarget.dataset.orderid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res);
        _this.getCartInfo()
      }
    })
  },
  // 结算
  buyProduct(){
    var _this = this
    var orderArr = []
    for(let i= 0;i<this.data.cartInfo.length; i++){
      if (this.data.cartInfo[i].selected == 1){
        orderArr.push(this.data.cartInfo[i].id)
      }
    }

    console.log(orderArr);
    if (orderArr.length > 0) {
      app.globalData.orderCart = [];
      app.globalData.orderCart.push(orderArr);
        wx.navigateTo({
          url: '/pages/order/order'
        })
    }else{
      _this.setData({
        toast: { display: false}
      })
    }
    
  },
  //修改编辑状态
  cartEdit() {
    this.setData({ isEdit: !this.data.isEdit })
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
    this.getCartInfo()
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