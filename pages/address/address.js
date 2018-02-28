const API=require('../../utils/route.js');
const app = getApp();
// pages/address/address.js
Page({
  /**
   * 页面的初始数据 
   */
  data: {
    userId: "",//用户id
    payId:"",
    defaultId:0,
    delFlag:false,
    delIndex:"",
    delUid:"",
    receiveData: []
  },
  // 选择默认地址
  changeOption:function(event){
    let index = event.currentTarget.dataset ? event.currentTarget.dataset.index:event;
    let userid = this.data.userId;
    let that = this;
    wx.request({
      url: API.updateDefaultAddress,
      method:"post",
      header: { "content-type":"application/x-www-form-urlencoded"},
      data:{
        userId:userid,
        addressId: index
      },//默认地址id
      success:function(res) {
        console.log(userid);
        console.log(index,"ddd");
        that.setData({
          defaultId: index
        });
      }
    })
  },
  // 选择要删除的地址
  selectedOpt:function(event){
    let index = event.currentTarget.dataset.index;
    let uId = this.data.userId;
    let that = this;
    that.data.delIndex = index;
    that.data.delUid = uId;
    that.setData({
      delFlag:true 
    });
  },
  // 删除地址
  delOption:function(){
    let receiveInfo = this.data.receiveData;
    let delAddressId = this.data.delIndex;
    let delUid = this.data.userId;
    let that = this;
    if (delAddressId!=null){
      wx.request({
        url: API.deleteAddress,
        method: "post",
        data: {
          userId:delUid,
          addressId: delAddressId
        },//删除的地址id
        header: { "content-type": "application/x-www-form-urlencoded"},
        success: function () {
          that.hiddenModel();
          that.getAllAddress();
        }
      })
    }
    
  },
  // 隐藏模态框
  hiddenModel:function(){
    // console.log(event);
    this.setData({
      delFlag:false
    });
  },
  // 空函数
  none:function(){},
  // 添加地址
  addAddress:function(){
    let userId = this.data.userId;
    wx.redirectTo({
      url: '/pages/addAddress/addAddress?userId='+userId,
    })
  },
  // 编辑地址
  redactAddress:function(event){
    console.log(event,"dove");
    let redactAddressId = event.currentTarget.dataset.redactindex;
    let receiveInfo = this.data.receiveData;
    let addressInfo = {};
    for (let i = 0; i < receiveInfo.length; i++) {
      if (receiveInfo[i].addressId == redactAddressId) {
        addressInfo = receiveInfo[i];
        break;
      }
    }
    addressInfo = JSON.stringify(addressInfo);
    wx.redirectTo({
      url: '/pages/addAddress/addAddress?addressInfo=' + addressInfo + "&redactIndex=" + redactAddressId,
    })
  },
  // 返回地址信息给支付页面
  comfirmAddress:function(event){
    let that = this;
    if (that.data.payId!=""){
      console.log(that.data.payId,123);
      let addressId = event.currentTarget.dataset.addressid;
      let address = that.data.receiveData;
      let addressData = {};
      for (let i = 0; i < address.length;i++){
        if(address[i].addressId == addressId){
          addressData = JSON.stringify(address[i]);
          break;
        }
      }
      wx.redirectTo({
        url: '/pages/order/order?addressData=' + addressData,
        success: function () {
          console.log(addressData, "dove");
          that.setData({
            payId: ""
          });
        }
      })
    }
  },
  // 请求所有地址数据
  getAllAddress:function(options) {
    let that = this;
    let userId = that.data.userId;
    console.log(userId);
    let payId = options?options.payId?options.payId:"":"";
    wx.request({
      url: API.getAllAddressByUserId,
      // url: "http://fatezero.e2.luyouxia.net:31952/getAllAddressByUserId",
      data: {
        userId:userId
      },
      method: "post",
      header:{"content-type":"application/x-www-form-urlencoded"},
      success: function (res) {
        // console.log(res);
        let dataInfo = res.data.Addresss?res.data.Addresss:[];
        console.log(res);
        let addressData = [];
        let defaultId = 0;
        if (dataInfo.length>0) {
          let addressInfo = (typeof dataInfo == "string") ? JSON.parse(dataInfo) : dataInfo;
          for (let i = 0; i < addressInfo.length; i++) {
            let data = {
              addressId: addressInfo[i].addressId,
              peopleName: addressInfo[i].Name,
              peoplePhone: addressInfo[i].phone,
              province: addressInfo[i].province,
              city: addressInfo[i].city,
              area: addressInfo[i].area,
              detailAddress: addressInfo[i].detailAddress,
              userId: addressInfo[i].userId
            };
            if (addressInfo[i].defaultAddress==1){
              defaultId = addressInfo[i].addressId;
            }
            addressData.push(data);
          }
          if (payId != "") {
            that.setData({
              payId: options.payId,
              receiveData: addressData,
              defaultId: defaultId
            });
          } else {
            that.setData({
              receiveData: addressData,
              defaultId: defaultId
            });
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userId:app.globalData.userInfo.userId
    })
    console.log(this.data.userId,123456);
    this.getAllAddress(options);
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