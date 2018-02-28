// pages/order/order.js
const app = getApp();
const API = require("../../utils/route.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCoupon: false,
    toast: {
      display: true,
      msg: ""
    }, 
    isAddress:false,
    num:1,
    totalMoney:0,//总金额
    freightMoney:0,//运费
    couponMoney:0,//优惠金额
    actualMoney:0,//实际金额
    orderGoods: [
      {
        imageUrls: ["http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde3.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde4.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg"],
        title: '四川厂家定制欧式实木墙裙', price: 121, subtitle: ' 客厅护墙板 会所白色护墙板批发',
        tags: ['cccccc', 'dddf', 'fdfff', 'dfffffff'],
        detailUrl: ['http://p3gitomz5.bkt.clouddn.com/miniAppdetail1.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail2.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail3.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail4.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail5.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail6.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail7.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail8.jpg']
      },
      {
        imageUrls: ["http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde3.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde4.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg"],
        title: '四川厂家定制欧式实木墙裙', price: 121, subtitle: ' 客厅护墙板 会所白色护墙板批发',
        tags: ['cccccc', 'dddf', 'fdfff', 'dfffffff'],
        detailUrl: ['http://p3gitomz5.bkt.clouddn.com/miniAppdetail1.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail2.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail3.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail4.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail5.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail6.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail7.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail8.jpg']
      },
      {
        imageUrls: ["http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde3.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde4.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde1.jpg", "http://p3gitomz5.bkt.clouddn.com/miniAppde2.jpg"],
        title: '四川厂家定制欧式实木墙裙', price: 121, subtitle: ' 客厅护墙板 会所白色护墙板批发',
        tags: ['cccccc', 'dddf', 'fdfff', 'dfffffff'],
        detailUrl: ['http://p3gitomz5.bkt.clouddn.com/miniAppdetail1.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail2.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail3.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail4.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail5.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail6.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail7.jpg', 'http://p3gitomz5.bkt.clouddn.com/miniAppdetail8.jpg']
      }
    ],
	  addressInfo:{
      name:"",
      address:""
    },
    cuponesInfo:{
      name:"",
      price:''
    }
  },
  /**
   * 地址管理
   */
  addressInfo(){
    let payId = 1;
    wx.redirectTo({
      url: '/pages/address/address?payId='+payId
    })
  },
  coupon(){
    let payId = 1;
    wx.navigateTo({
      url: '/pages/myCupones/myCupones?payId='+payId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    let userId = app.globalData.userInfo.userId;
    let productId = this.data.orderGoods[0].productId;
    // console.log(options)
    let addressData = options.addressData ? JSON.parse(options.addressData) : app.globalData.address;
    let cuponesData = options.cuponesData ? JSON.parse(options.cuponesData) : app.globalData.cupones;
    if (addressData.peopleName) {
      app.globalData.address = addressData;
      this.setData({
        isAddress: true,
        addressInfo: {
          name: addressData.peopleName,
          address: addressData.province + addressData.city + addressData.area + addressData.detailAddress
        }
      });
    } else {
      this.data.isAddress = false;
    }

    // 没有优惠券可选择了
    /*if (cuponesData.cuponesName) {
      app.globalData.cupones = cuponesData;
      this.setData({
        cuponesInfo: {
          name: cuponesData.cuponesName,
          price: cuponesData.discount
        },
        couponMoney: cuponesData.discount
      });
    }*/

    // 请求的数据
    if (app.globalData.orderCart){
      console.log("购物车")
      wx.request({
        url: APIconfirmOrders,
        method: 'post',
        data: {
          userId: userId,
          orderIds: app.globalData.orderCart,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          // console.log(res.data.Orders)
          let totalMoney=0;
          for (let i = 0; i < res.data.Orders.length; i++) {
            totalMoney += res.data.Orders[i].totalMoney;
          }
          let actualMoney = totalMoney + _this.data.freightMoney - _this.data.couponMoney
          _this.setData({
            orderGoods: res.data.Orders,
            totalMoney: totalMoney,
            actualMoney: actualMoney
          })
        }
      })
    }else{
      console.log("商品详情");
      let orderGoods = app.globalData.orderGoods;
      console.log(orderGoods,333);
      let totolMoney = 0;
      let sendMoney = 0;
      let couponeMoney = 0;
      // 根据全局orderGoods来计算总价
      for(let i = 0;i < orderGoods.length;i++){
        totolMoney += orderGoods[i].productNum*orderGoods[i].productPrice;
        sendMoney += orderGoods[i].sendMoney;
      }
      // 优惠方式的判定
      if(totolMoney >= 4000){
        couponeMoney = 200;
      }else if(totolMoney>=0 && totolMoney<4000){
        couponeMoney = parseInt(totolMoney*0.2);
      }
      console.log(couponeMoney,);
      let actualMoney = totolMoney + sendMoney - couponeMoney;
      this.setData({
        orderGoods: app.globalData.orderGoods,
        freightMoney:sendMoney,
        totalMoney: totolMoney,
        actualMoney: actualMoney,
        couponMoney:couponeMoney
      })
    }
    
  
  },
  pay() {
    var _this = this
    let userId = app.globalData.userInfo.userId;
    let productId = [];
    let productName =[];
    let indexImage = [];
    let productPrice = [];
    let productNum = [];
    let actualMoney = [];
    for (let i = 0; i < this.data.orderGoods.length;i++){
      productId.push(this.data.orderGoods[i].productId);
      productName.push(this.data.orderGoods[i].productName);
      indexImage.push(this.data.orderGoods[i].indexImage);
      productPrice.push(this.data.orderGoods[i].productPrice);
      productNum.push(this.data.orderGoods[i].productNum);
      actualMoney.push(this.data.orderGoods[i].totalMoney);
    }
    wx.request({
      url: API.buyProduct,
      method: 'post',
      data: {
        userId: userId,
        productId: productId,
        productName: productName,
        indexImage: indexImage,
        productNum: productNum,
        totalMoney: actualMoney,
        productPrice: productPrice,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        _this.setData({ toast: { display: false, msg: "支付成功,正在跳转" } })
        wx.navigateTo({
          url: '/pages/myOrder/myOrder?params=待发货',
        })
      }
    })
    wx.requestPayment({
      timeStamp: Math.floor(new Date().getTime()/1000),
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success:function(){

      },
      fail:function(){
        
      }
    })
  },
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
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