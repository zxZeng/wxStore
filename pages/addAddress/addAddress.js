// pages/addAddress/addAddress.js
const API = require("../../utils/route.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    userId:"",
    area:[],
    redactIndex:"",
    toast: {
      display: true,
      msg: ""
    },
    submitFlag:true,
    addressInfo:{
      addressId:"",
      name:"",
      phone:"",
      detailAddress:"",
      AddressArea:[]
    },
    customItem:""
  },
  // 地址的变化函数
  bindRegionChange:function(event) {
    let a = event.detail.value;
    console.log(event);
    this.setData({
      area:a
    }
    );
  },
  // 控制提示框的显示隐藏
  tipShowHidden: function (status) {
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
  // 填写的信息确认
  confirmData:function(event){
    let info = event.detail.value;
    let condition = event.currentTarget.dataset.condition;
    if(condition==="name"){
      this.data.addressInfo.name = info;
    } else if (condition ==="address"){
      this.data.addressInfo.detailAddress = info;
    } else if (condition === "phone") {
      this.data.addressInfo.phone = info;
    }
  },
  // 保存添加地址
  saveAddress:function(){
    let submitFlag = this.data.submitFlag;
    if(submitFlag){
      let that = this;
      that.data.addressInfo.AddressArea = that.data.area;
      let data = that.data.addressInfo;
      let addressInfo = {
        userId: that.data.userId,
        addressId:data.addressId,
        name: data.name,
        phone: data.phone,
        province: data.AddressArea[0],
        city: data.AddressArea[1],
        area: data.AddressArea[2],
        detailAddress: data.detailAddress,
        defaultAddress: 0
      };
      let redactAddressId = this.data.redactIndex;//默认修改的addressId
      let url = "";
      if (redactAddressId != "") {
        url =  API.updateAddress;
      } else {
        url = API.addAddress;
      }
      that.data.submitFlag = false;
      let flag = true;
      if (addressInfo.name == "" || addressInfo.phone == "" || addressInfo.province == ""
      || addressInfo.area == "" || addressInfo.detailAddress == ""){
        that.tipShowHidden("添加失败");
      }else{
        wx.request({
          url: url,
          method: "post",
          header: { "content-type": "application/x-www-form-urlencoded","charset":"utf-8"},
          data: addressInfo,
          success: function () {
            console.log(addressInfo);
            that.data.submitFlag = true;
            that.tipShowHidden("添加成功");
            setTimeout(function() {
              wx.redirectTo({
                url: '/pages/address/address'
                // success: function () {
                //   console.log(addressInfo);
                // }
              })
            },1000);
          }
        })
      }
    }
  },
  cancelAddress:function(){
    wx.redirectTo({
      url: '/pages/address/address'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    let userId = app.globalData.userInfo.nickName;
    if (options.addressInfo){
      let dataInfo = JSON.parse(options.addressInfo);
      console.log(dataInfo);
      let redactIndex = options.redactIndex;
      this.setData({
        addressInfo: {
          userId:dataInfo.userId,
          addressId:redactIndex,
          name: dataInfo.peopleName,
          phone: dataInfo.peoplePhone,
          detailAddress:dataInfo.detailAddress,
          AddressArea: [dataInfo.province,dataInfo.city,dataInfo.area]
        },
        redactIndex:redactIndex,
        area: [dataInfo.province, dataInfo.city, dataInfo.area],
        userId: userId
      });
    }else if(options.userId){
      this.setData({
        userId: userId
      });
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