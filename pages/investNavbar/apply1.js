import {
  repayDate
} from '../../utils/util'
Page({
  data: {
    // 剩余借款额度,本地初始化
    totalPeriod: '',
    useLoan: '',
    num: 0,
    userId: 0,
    loanId: 0,
    transflowId: 0,
    money: '',
    rate: '',
    transPw: '',
    loading: false,
    disabled: false,
    repayMoney: '',
    totalCharge: '',
    singleRepay: '',
    platformServiceFee: ''
  },
  onLoad: function(options) {
    var that = this
    var userId = options.userId
    var loanId = options.loanId
    var transflowId = options.transflowId
    var money1 = options.money1
    var rate = options.rate
    var useLoan = options.useLoan
    var rate1 = options.rate1
    wx.request({
      url: "http://192.168.71.1:8081/creditFun/getLoanResult",
      data: {
        money: money1,
        period: rate1,
        rate: rate
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.moneyList;
        console.log("....调用后台接口成功....." + list);
        that.setData({
          repayMoney: list['repayMoney'],
          totalCharge: list['totalCharge'],
          singleRepay: list['singleRepay'],
          platformServiceFee: list['platformServiceFee'],
          money2: that.data.money
        })
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
    // 页面初始化 options为页面跳转所带来的参数
    that.setData({
      userId: userId,
      loanId: loanId,
      transflowId: transflowId,
      money: money1,
      totalPeriod: rate1,
      useLoan: useLoan,
      rate: rate
    })
    // console.log("apply1页面接收的参数有userId=" + userId + ",investId=" + investId + ",transflowId=" + transflowId)
    console.log("apply1页面接收的参数有userId=" + that.data.userId)
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
  onTenderCloseClick: function() {
    this.setData({
      opacityFlag: false
    });
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })
    animation.translateY('100%').step();
    this.setData({
      animationData: animation.export()
    })
  },
  changeinput: function(e) {
    this.setData({
      transPw: e.detail.value
    })
  },
  fkClick: function() {
    var that = this
    var transPw = that.data.transPw
    if (transPw.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入交易密码',
        showCancel: false
      })
    } else {
      wx.request({
        url: "http://192.168.71.1:8081/user/getById",
        data: {
          userId: that.data.userId
        },
        method: 'GET',
        header: {
          "Content-Type": "json"
        },
        success: function(res) {
          var list = res.data.success;
          console.log("....调用后台接口成功....." + list);

          var trans = list['transPw']
          if (trans == that.data.transPw) {
            wx.request({
              url: "http://192.168.71.1:8081/LoanOrder/updateOrder",
              data: {
                investId: that.data.userId,
                transflowId: that.data.transflowId,
                orderStatus: 1
              },
              method: 'GET',
              header: {
                "Content-Type": "json"
              },
              success: function(res) {
                var list = res.data.success;
                console.log("....调用后台接口成功....." + list);
                if (list == 'success') {
                  wx.request({
                    url: "http://192.168.71.1:8081/creditFun/installCal",
                    data: {
                      transflowId: that.data.transflowId,
                      investId: that.data.userId,
                      loanId: that.data.loanId,
                      perPeriod: that.data.totalPeriod,
                      money: that.data.singleRepay
                    },
                    method: 'GET',
                    header: {
                      "Content-Type": "json"
                    },
                    success: function(res) {
                      var list = res.data.success;
                      if (list == true) {
                        wx.showToast({
                          title: '投资成功',
                          icon: 'success',
                          success: () => {
                            setTimeout(() => {
                              wx.navigateTo({
                                url: '../investNavbar/investNavbar?userId=' + that.data.userId
                              });
                            }, 3000)
                          }
                        });
                      }
                    },

                  })



                }
              },
              fail: function(res) {
                console.log(".....调用后台接口失败.....");
              }
            })



          } else {
            wx.showModal({
              title: '提示',
              content: '密码错误，请重新输入',
              showCancel: false
            })
          }

        },
        fail: function(res) {
          console.log(".....调用后台接口失败.....");
        }
      })

    }


  },
  formSubmit: function(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '您将借款给此用户',
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
          that.setData({
            opacityFlag: true
          });
          var animation = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
          })
          //this.animation = animation
          animation.translateY('-70%').step();

          that.setData({
            animationData: animation.export()
          })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  }
})