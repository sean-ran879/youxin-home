//获取应用实例
var app = getApp()
Page({
  data: {
    text: "Page useraccount",
    animationData: {},
    animationData1: {},
    nickName: "",
    opacityFlag: false,
    opacityFlag1: false,
    myaccount: "",
    allMoney: 404,
    allMoney2: 404,
    userId: 0,
    chongzhi: 0,
    tixian: 0
  },
  onLoad: function(options) {
    var that = this;
    var userId = options.userId;
    that.setData({
      userId: userId
    });
    // 页面初始化 options为页面跳转所带来的参数
    app.getUserInfo(function(userInfo) {
      that.setData({
        nickName: userInfo.nickName
      })
    });
    that.loadClick();
  },
  loadClick: function() {
    var that = this;
    var userId = that.data.userId;
    wx.request({
      url: "http://192.168.71.1:8081/userInfo/getByUserId4",
      data: {
        userId: userId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var result = res.data.phoneList4;
        that.setData({
          myaccount: result['myaccount'],
          allMoney: result['allMoney']
        })
      }
    });
    wx.request({
      url: "http://192.168.71.1:8081/repayment/getMoney",
      data: {
        loanId: userId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var result = res.data.money;
        that.setData({
          allMoney2: result
        })
      }
    })
  },

  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  onTenderClick: function() {
    this.setData({
      opacityFlag: true
    });
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })
    //this.animation = animation
    animation.translateY('-70%').step();
    this.setData({
      animationData: animation.export()
    })
  },
  onTenderClick1: function() {
    this.setData({
      opacityFlag1: true
    });
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })
    //this.animation = animation
    animation.translateY('-70%').step();

    this.setData({
      animationData1: animation.export()
    })
  },
  //关闭投标页面.
  onTenderCloseClick: function() {
    this.setData({
      opacityFlag: false
    });

    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })

    //this.animation = animation

    animation.translateY('100%').step();

    this.setData({
      animationData: animation.export()
    })
  },
  onTenderCloseClick1: function() {
    this.setData({
      opacityFlag1: false
    });

    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })

    //this.animation = animation

    animation.translateY('100%').step();

    this.setData({
      animationData1: animation.export()
    })
  },
  onCancelTap: function() {
    this.onTenderCloseClick();
  },
  onCancelTap1: function() {
    this.onTenderCloseClick1();
  },
  //返回
  onBackClick: function() {
    // wx.navigateTo({
    //   url : '../investment/investment'
    // });
    wx.navigateBack();
  },
  accountDetails: function(e) {
    wx.navigateTo({
      url: '../useraccount/accountDetails'
    });

  },
  cardDetails: function(e) {
    wx.navigateTo({
      url: '../useraccount/cardDetails?userId='+this.data.userId,
    });
  },
  chongzhiClick: function(e) {
    var that = this;
    var chongzhi = that.data.chongzhi;
    if (chongzhi > 0 && that.data.allMoney > 0) {
      var allMoney = Number(that.data.allMoney) + Number(chongzhi);
      console.log("充值后的金额是:" + allMoney);
      wx.request({
        url: "http://192.168.71.1:8081/userInfo/updateAccount",
        data: {
          userId: that.data.userId,
          allMoney: allMoney
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log("跳转")
          //  wx.navigateTo({
          //    url: '../my/my?userId=' + that.data.userId,
          //  })
          wx.showModal({
            title: '提示',
            content: '充值成功',
            showCancel: false
          })
          wx.request({
            url: "http://192.168.71.1:8081/userInfo/addBankFlow",
            data: {
              userId: that.data.userId,
              money: chongzhi,
              myaccount:that.data.myaccount
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
          })
          that.loadClick();
          that.onTenderCloseClick();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入正确的金额',
        showCancel: false
      })
    }
  },
  tixianClick: function(e) {
    var that = this;
    var tixian = that.data.tixian;
    var tixian1=0-tixian;
    console.log("记录"+tixian1);
    if (this.data.allMoney < tixian) {
      wx.showModal({
        title: '提示',
        content: '当前账户金额不足',
        showCancel: false
      })
    } else {
      var allMoney = that.data.allMoney - tixian;
      console.log("提现后的金额为" + allMoney);
      wx.request({
        url: "http://192.168.71.1:8081/userInfo/updateAccount",
        data: {
          userId: that.data.userId,
          allMoney: allMoney
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          console.log("跳转")
          wx.request({
            url: "http://192.168.71.1:8081/userInfo/addBankFlow",
            data: {
              userId: that.data.userId,
              money: tixian1,
              myaccount: that.data.myaccount
            },
            method: 'GET',
            header: {
              'Content-Type': 'application/json'
            },
          })
          wx.showModal({
            title: '提示',
            content: '提现成功',
            showCancel: false
          })
          that.loadClick();
          that.onTenderCloseClick1();
        }
      })
    
    }
  },
  getchongzhi: function(e) {
    this.setData({
      chongzhi: e.detail.value
    })
  },
  gettixian: function(e) {
    this.setData({
      tixian: e.detail.value
    })
  },
})