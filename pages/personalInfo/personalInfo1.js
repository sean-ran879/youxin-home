//index.js
//获取应用实例
const app = getApp()
//地址组件
var tcity = require("../../utils/citys.js");
// var app = getApp()
//地址组件
Page({
  data: {
    maritlStatus: '',
    work: '',
    salary: '',
    guaranteeWork: '',
    guaranteePhone: '',
    userId: 0,
  },
  onLoad: function (options) {
    var that = this;
    var userId = options.userId;
    that.setData({
      userId: options.userId
    });
    console.log("个人信息补充页面接收的参数：" + userId);
    wx.request({
      url: "http://192.168.71.1:8081/userInfo/getByUserId",
      data: {
        userId:userId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.phoneList;
        var maritlStatus1;
        if (result['maritlStatus'] ==0 ) {
          maritlStatus1 = "未婚";
        } else if (e.detail.value.maritlStatus ==1 ) {
          maritlStatus1 = "已婚";
        }
        that.setData({
          maritlStatus:maritlStatus1,
          work:result['work'],
          salary: result['salary']
        })
        }
    })
    wx.request({
      url: "http://192.168.71.1:8081/userInfo/getByUserId1",
      data: {
        userId: userId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.phoneList1;
        that.setData({
          guaranteeWork: result['guaranteeWork'],
          guaranteePhone: result['guaranteePhone'],
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var maritlStatus1;
    if (e.detail.value.maritlStatus == "未婚") {
      maritlStatus1 = 0;
    } else if (e.detail.value.maritlStatus == "已婚") {
      maritlStatus1 = 1;
    } else {
      maritlStatus1 = 2;
    }
    var formData = {
      maritlStatus: maritlStatus1,
      userId: that.data.userId,
      work: e.detail.value.work,
      salary: e.detail.value.salary,
    };
    console.log('formData=====' + JSON.stringify(formData));
    var guarantee = {
      userId: that.data.userId,
      guaranteeWork: e.detail.value.guaranteeWork,
      guaranteePhone: e.detail.value.guaranteePhone,
    };
    console.log('guarantee=====' + JSON.stringify(guarantee));

    wx.request(
      {
        url: "http://192.168.71.1:8081/userInfo/updateInfo",
        data: JSON.stringify(formData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },

      })

    wx.request(
      {
        url: "http://192.168.71.1:8081/userInfo/updateGuarantee",
        data: JSON.stringify(guarantee),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },

      })





    wx.navigateTo({
      // url: '../msg/info_success',
      url: '../personalInfo/personalInfo1?userId=' + this.data.userId,
    })

  },
 
})
