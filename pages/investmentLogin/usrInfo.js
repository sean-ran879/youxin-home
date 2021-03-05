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
    //地址组件数据
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    //所在地区
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    addressInfo: '',
    userId: 0
  },

  onLoad: function (options) {
    var that = this;
    var userId = options.userId;
    that.setData({
      userId: options.userId
    });
    console.log("个人信息补充页面接收的参数：" + userId);
  },
  // userInfo: function () {
  //   wx.navigateTo({
  //     url: '/pages/userInfo/userInfo'
  //   })
  // },

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
      company: "优信之家",
      userId: that.data.userId,
      work: e.detail.value.work,
      salary: e.detail.value.salary,
      preAddress: e.detail.value.addressInfo,
    };
    console.log('formData=====' + JSON.stringify(formData));

    wx.request(
      {
        url: "http://192.168.71.1:8081/userInfo/updateInfo",
        data: JSON.stringify(formData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
      })
    wx.navigateTo({
      // url: '../msg/info_success',
      url: '../bindCard/bindCard?userId=' + that.data.userId+'&pageStatus='+0,
    })

  },
  //地址组件函数
  bindChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const citys = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        citys: citys,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.citys[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })
      return;
    }


  },
  open: function () {
    this.setData({
      condition: !this.data.condition
    })
  },
  onLoad: function (options) {

    var that = this;

    that.setData({
      userId: options.userId
    })
    console.log("页面接收的参数为" + options.userId);
    tcity.init(that);
    var cityData = that.data.cityData;
    const provinces = [];
    const citys = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }
    that.setData({
      'provinces': provinces,
      'citys': citys,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');
    //地址组件函数

  }

})
