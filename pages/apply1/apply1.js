import {
  repayDate
} from '../../utils/util'
Page({
  data: {
    // 剩余借款额度,本地初始化
    maxAmount: 2001,
    totalPeriod:'',
    useLoan: '',
    num: 0,
    creditValue:0,
    // accountIndex: 0,
    // accountIndex1: 0,
    // accountIndex2: 0,
    // accounts: ["微信号", "QQ", "Email"],
    // accounts1: ["3", "6", "12", "18", "24"],
    // accounts2: [3, 6, 12, 18, 24],
    userId: 0,
    investId: 0,
    transflowId: 0,
    money1: '',
    rate: '',
    //费率区间
    // updown: "",
    // up: '',
    // down: '',
    loading: false,
    disabled: false,
    repayMoney: '',
    totalCharge: '',
    singleRepay: '',
    platformServiceFee: ''
  },
  // bindMoneyInput: function(e) {
  //   var that = this
  //   var va = e.detail.value
  //   this.setData({
  //     money1: va
  //   })
  //   if (that.data.rate != '') {
  //     var va = that.data.rate
  //     var money = that.data.money1
  //     var num = that.data.num
  //     wx.request({
  //       url: "http://192.168.71.1:8081/creditFun/getLoanResult",
  //       data: {
  //         money: money,
  //         period: num,
  //         rate: va
  //       },
  //       method: 'GET',
  //       header: {
  //         "Content-Type": "json"
  //       },
  //       success: function(res) {
  //         var list = res.data.moneyList;
  //         console.log("....调用后台接口成功....." + list);
  //         that.setData({
  //           repayMoney: list['repayMoney'],
  //           totalCharge: list['totalCharge'],
  //           singleRepay: list['singleRepay'],
  //           platformServiceFee: list['platformServiceFee'],
  //           money2: that.data.money1
  //         })
  //       },
  //       fail: function(res) {
  //         console.log(".....调用后台接口失败.....");
  //       }
  //     })
  //   }
  // },
  // bindRateInput: function(e) {
  //   var that = this
  //   var va = e.detail.value
  //   var money = that.data.money1
  //   var num = that.data.num
  //   that.setData({
  //     rate: va
  //   })
  //   if (money != '') {
  //     wx.request({
  //       url: "http://192.168.71.1:8081/creditFun/getLoanResult",
  //       data: {
  //         money: money,
  //         period: num,
  //         rate: va
  //       },
  //       method: 'GET',
  //       header: {
  //         "Content-Type": "json"
  //       },
  //       success: function(res) {
  //         var list = res.data.moneyList;
  //         console.log("....调用后台接口成功....." + list);
  //         that.setData({
  //           repayMoney: list['repayMoney'],
  //           totalCharge: list['totalCharge'],
  //           singleRepay: list['singleRepay'],
  //           platformServiceFee: list['platformServiceFee'],
  //           money2: that.data.money1
  //         })
  //       },
  //       fail: function(res) {
  //         console.log(".....调用后台接口失败.....");
  //       }
  //     })
  //   }
  // },
  // bindAccountChange: function(e) {
  //   console.log('picker account 发生选择改变，携带值为', e.detail.value);
  //   var s = e.detail.value
  //   var period = this.data.accounts1[s]
  //   this.setData({
  //     accountIndex: e.detail.value,
  //     useLoan: period
  //   })
  // },
  // bindAccountChange1: function(e) {
  //   var that = this
  //   console.log('picker account 发生选择改变，携带值为', e.detail.value);
  //   var s = e.detail.value
  //   console.log('picker account 发生选择改变，携带值为11111', s);
  //   var period = that.data.accounts2[s]
  //   that.setData({
  //     accountIndex1: s,
  //     num: period
  //   })
  //   console.log('选择的期数是', period);
  //   wx.request({
  //     url: "http://192.168.71.1:8081/RateLimit/getByTotal",
  //     data: {
  //       totalPeriod: period
  //     },
  //     method: 'GET',
  //     header: {
  //       "Content-Type": "json"
  //     },
  //     success: function(res) {
  //       var list = res.data.RateLimit;
  //       console.log("....调用后台接口成功....." + list);
  //       that.setData({
  //         up: list['rateMin'],
  //         down: list['rateMax'],
  //         updown: "费率期间" + list['rateMin'] + "—" + list['rateMax']
  //       })
  //       console.log(that.data.updown)
  //     },
  //     fail: function(res) {
  //       console.log(".....调用后台接口失败.....");
  //     }
  //   })
  // },
  onLoad: function(options) {
    var that = this
    var userId = options.userId
    var investId = options.investId
    var transflowId = options.transflowId
    var preMoney=options.preMoney
    var rate1=options.rate1
    var rate=options.rate
    var money=options.money
    var useLoan=options.useLoan
    var creditValue=options.creditValue
    // 页面初始化 options为页面跳转所带来的参数
    that.setData({
      userId: userId,
      investId: investId,
      transflowId: transflowId,
      maxAmount:preMoney,
      totalPeriod:rate1,
      useLoan:useLoan,
      money1:money,
      rate:rate,
      creditValue:creditValue
    })
   
    wx.request({
      url: "http://192.168.71.1:8081/creditFun/getLoanResult",
      data: {
        money: money,
        period:rate1,
        rate: rate
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.moneyList;
        console.log("....调用后台接口成功....." + list);
        that.setData({
          repayMoney: list['repayMoney'],
          totalCharge: list['totalCharge'],
          singleRepay: list['singleRepay'],
          platformServiceFee: list['platformServiceFee'],
          money2: that.data.money1
        })
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
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
 
  formSubmit: function(e) {
    var that = this
    var va = that.data.rate
    var up = that.data.up
    var down = that.data.down
    var money = that.data.money1
    var maxAmount=that.data.maxAmount
  var creditValue=that.data.creditValue
    console.log("....更新的用户信用值..." + creditValue);
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getPreLoan",
      data: {
        loanId: that.data.userId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.List;
        console.log("....调用后台接口成功....." + list);
        if (list) {
          wx.showModal({
            title: '提示',
            content: '存在审核中的订单，申请失败！',
            showCancel: false
          })
        }
       else{
          if (money == '') {
            wx.showModal({
              title: '提示',
              content: '借款金额不能为空！',
              showCancel: false
            })
          } else if (parseInt(money) > maxAmount) {
            wx.showModal({
              title: '提示',
              content: '额度不足！',
              showCancel: false
            })
            return false
          }
          else if (money < 200) {
            wx.showModal({
              title: '提示',
              content: '借款金额不能低于200！',
              showCancel: false
            })
          } else if (va == '') {
            wx.showModal({
              title: '提示',
              content: '请输入费率！',
              showCancel: false
            })
          } else if (va > down || va < up) {
            wx.showModal({
              title: '提示',
              content: '请选择正常范围内的费率',
              showCancel: false
            })
          } else {
            wx.request({
              url: "http://192.168.71.1:8081/LoanOrder/updateOrder",
              data: {
                loanId: that.data.userId,
                transflowId: that.data.transflowId,
                orderStatus:2,
                creditValue:that.data.creditValue
              },
              method: 'GET',
              header: {
                "Content-Type": "json"
              },
              success: function (res) {
                var list = res.data.success;
                console.log("....调用后台接口成功.....," + list);
                if (list == 'success') {
                  wx.showToast({
                    title: '借款申请成功！',
                    icon: 'success',
                    success: () => {
                      setTimeout(() => {
                        wx.navigateTo({
                          url: '../applyNavbar/applyNavbar?userId=' + that.data.userId + '&preMoney=' + maxAmount
                        });
                      }, 3000)
                    }
                  });
                }
              },
              fail: function (res) {
                console.log(".....调用后台接口失败.....");
              }
            })




          }
       }
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  
  }
})