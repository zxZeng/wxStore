// pages/goodsList/goodsList.js
const app = getApp();
const API = require("../../utils/route.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toast: {
      display: true,
      msg: "",
      icon:''
    },
    loadFlag: false,
    categories: [
      {text:'全部',classname:''},
      { text: '新品', classname: '' },
      { text: '销量', classname: '' },
      { text: '价格', classname: 'iconfont icon-down' }
    ],
    currentTab: 0,
    isDown:true,
    scrollLeftValue: 0, 
    isPickerShow: false,
    isBgNeed: false,
    commodities: [],
    searchValue:'',
    goodsType:''
  },
  /**
   * 加入购物车
   */
  addCart(e) {
    var _this = this;
    let userId = app.globalData.userInfo.userId;
    let productId = e.currentTarget.dataset.productid;
    let totalMoney = e.currentTarget.dataset.price;
    let pName = this.data.commodities.find(i => i.productId == e.currentTarget.dataset.productid).productName;
    let indexImage = this.data.commodities.find(i => i.productId == e.currentTarget.dataset.productid).indexImage;
    let productPrice = this.data.commodities.find(i => i.productId == e.currentTarget.dataset.productid).productPrice;
    wx.request({
      url: API.addOrder ,
      method: 'post',
      data: {
        userId: userId,
        productId: productId,
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
          toast: { display: false, msg: "添加成功",icon:'success'}
        })
        console.log(res)
      }
    })
  },
  toastChange: function () {
    this.setData({ toast: { display: true, msg: "" } })
  },
  /**
   * 点击价格后的图标进行的事件
   */
  iconDown:function(){
    var searchName = this.data.searchValue||""
    var _this = this;
      if (this.data.isDown) {
        this.setData({
          isDown: false,
        })
        wx.request({
          url: API.getProductsByPriceASC,
          method: 'post',
          data: {
            asc: true,
            searchName:searchName
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            _this.setData({
              commodities: res.data.Products
            })
          }
        })
      } else {
        this.setData({
          isDown: true,
        })
        var _this=this;
        wx.request({
          url: API.getProductsByPriceASC,
          method: 'post',
          data: {
            asc: false,
            searchName:searchName
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {
            _this.setData({
              commodities: res.data.Products
            })
          }
        })
      }
  },
  returnLast:function(){
    wx.navigateBack();
  },
  /**

 * 用于自动调整顶部类别滑动栏滑动距离，使滑动到用户可接受的合适位置，但自适应上还未考虑太周到

 * @param {number} idx - The index of currentTap.

 */

  autoScrollTopNav: function (idx) {
    if (idx <= 2) {
      this.data.scrollLeftValue = 0;
    } else {
      this.data.scrollLeftValue = (idx - 2) * 60;
    }
    this.setData({
      scrollLeftValue: this.data.scrollLeftValue
    })
  },
  // 点击按钮跳转页面
  search() {
    var _this = this
    wx.request({
      url: API.likeQueryProductByName,
      method: 'post',
      data: {
        name: _this.data.searchValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        if (res.data.status == "success") {
          _this.setData({ commodities: res.data.Products })
        } else {
          console.log("搜索失败")

        }
      }
    })
  },
  // 获取输入框的值
  searchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  navbarTap: function (e) {
    //将顶部导航栏自动移动到合适的位置
    var idx = e.currentTarget.dataset.idx;
    this.autoScrollTopNav(idx);
    this.setData({
      currentTab: idx
    })
  },

  /**
 
  * 页面左右滑动事件 - 构造滑动动画，若当前页面无数据，自动加载，需要完善加载函数
 
  */

  swiperChange: function (e) {
    var idx = e.detail.current;
    var _this = this;
    var searchName = _this.data.searchValue||""
    this.autoScrollTopNav(idx);
    this.setData({
      currentTab: e.detail.current,
    })
    if (e.detail.current == 0){
      wx.request({
        url: API.getAllProduct,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{
          searchName:searchName
        },
        success: function (res) {
          _this.setData({ commodities: res.data.Products })
          console.log(res.data)
        }
      })
    } else if (e.detail.current == 1){
      wx.request({
        url: API.getProductsByOnlineTime,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{
          searchName:searchName
        },
        success: function (res) {
          _this.setData({ commodities: res.data.Products })
        }
      })
    } else if (e.detail.current == 2) {
      wx.request({
        url: API.getProductsBySalesDesc,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{
          searchName:searchName
        },
        success: function (res) {
          _this.setData({
            commodities:res.data.Products
          })
        }
      })
    }else{
      wx.request({
        url: API.getProductsByPriceASC,
        method: 'post',
        data: {
          asc: false,
          searchName:searchName
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          _this.setData({
            commodities:res.data.Products
          })
        }
      })
    }
    //若无数据，自动加载
    if (this.data.commodities[idx].length == 0) {
      this.downloadMoreItem();
    }
  },
  downloadMoreItem: function () {
    this.setData({
      loadFlag: true
    });
    let dataInfo = this.data.commodities;
    let data = this.data.commodities.concat(dataInfo);
    let that = this;
    // data.push(dataInfo);
    setTimeout(function () {
      that.setData({
        commodities: data,
        loadFlag: false
      });
    }, 2000);
  },
  /**
  * 获取页面内容高度
  */
  getContentHeight: function () {
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          second_height: res.windowHeight - res.windowWidth / 750 * 220
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.getContentHeight();
    this.setData({
      searchValue: options.value,
      goodsType:options.type
    })
    if (options.value == undefined && options.type == undefined){
      wx.request({
        url: API.getAllProduct,
        method: 'post',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data:{
          searchName:_this.data.searchValue||""
        },
        success: function (res) {
          _this.setData({ commodities: res.data.Products})
        }
      })
    } else if (options.type == undefined){
      // 显示搜索结果
      wx.request({
        url: API.likeQueryProductByName,
        method: 'post',
        data: {
          name: _this.data.searchValue
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          if (res.data.status == "success") {
            _this.setData({ commodities: res.data.Products })
          }else{
            console.log("搜索失败")
            _this.setData({toast: { display: false, msg: "没有该商品哦！", icon:'none'}})
          }
          console.log(res)
        }
      })
    }else{
      // 显示分类结果
      this.setData({
        searchValue:_this.data.goodsType
      })
      wx.request({
        url: API.getProductsByKind,
        method: 'post',
        data: {
          productKind: _this.data.goodsType
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {

          _this.setData({ commodities: res.data.Products })
          console.log(res.data)
        }
      })
    }
  },
  /**
   * 商品列表
   */
  listInfo() {
    var _this = this;
    wx.request({
      url: API.getProductsByKind,
      method: 'post',
      data: {
        productKind: _this.data.searchValue
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        _this.setData({ commodities: res.data.Products })
        console.log(res.data)
      }
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