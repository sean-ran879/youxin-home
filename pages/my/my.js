//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    modalHidden: true,
    nickName: "",
    avatarUrl: "",
    // userInfo: {
    //     nickName:"",
    //     avatarUrl:""
    // },
    inputname: "",
    userId:0
  },
  li2click:function(){
    wx.navigateTo({
      url: '../my/allRepay',
    })
  },

li1click:function(){
  wx.navigateTo({
    url: '../my/loanOrder?userId='+this.data.userId,
  })
},
  suggestClick:function(){
    wx.navigateTo({
      url: '../my/suggestPage',
    })

  },
  safeCenterClick:function(e){
wx.navigateTo({
  url:'../my/updatePassword?userId='+this.data.userId,
})
  },
 onLoad: function (options) {
    console.log('onLoad个人中心')
    var that = this
    var userId=options.userId
    that.setData({
      userId:userId
    })
    app.getUserInfo(function (userInfo) {
      that.setData({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
      })
    })
  },
  login: function () {
    this.setData({
      modalHidden: false
    })
  },
  saveInput: function (e) {
    this.setData({
      inputname: e.detail.value
    });
  },
  actionConfirm: function (e) {
    var that = this
    wx.setStorageSync('username', this.data.username);
    wx.setStorageSync('password', this.data.password);
    this.setData({
      modalHidden: true,
      nickName: that.data.inputname
    })
  },
  actionCancel: function () {
    this.setData({
      modalHidden: true
    })
  },
  switchChange: function () {

  },

  idCardClick:function(e)
{         
          //   wx.redirectTo({
          //     url: '../bindCard/bindCard',
          //   })
          // } 
     
    wx.navigateTo({
      url: '../my/showCard?userId=' + this.data.userId + '&my12=' +0,
             })
},
userInfoClick:function(e){
  wx.navigateTo({
    url: '../personalInfo/personalInfo1?userId=' + this.data.userId,
  })
},
  myAccountClick:function(e){
    wx.navigateTo({
      url: '../useraccount/useraccount?userId=' + this.data.userId,
    })
  },
    queryClick:function(e){
    wx.navigateTo({
      url: '../article/article',
    })
 },
})
