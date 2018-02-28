// pages/category/category.js
const API = require("../../utils/route.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classObj: [
      // '木门', '墙板',  '衣柜', '书柜','全屋定制'
      ],
    searchValue:''

  },
  search(){
    var _this =this
    wx.navigateTo({
      url: '/pages/goodsList/goodsList?value=' + _this.data.searchValue
    })
  },
  searchInput(e){
    console.log(e.detail.value);
    this.setData({
      searchValue: e.detail.value
    })
  },
  /**
   * 加载分类
   */
  classifyList(){
    var _this = this;
    wx.request({
      url: API.productKinds,
      method: 'post',
      data: {
        // a_id: that.data.albumId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        console.log(res.data,'分类');
        _this.setData({
          classObj: res.data.kind
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.classifyList();
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