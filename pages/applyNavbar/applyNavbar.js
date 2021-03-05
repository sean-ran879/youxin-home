import ad from '../index/ad'
import {
  repayDate
} from '../../utils/util'
var util = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    //当前额度
    maxAmount: 2001,
    useLoan: '教育',
    num: 0,
    accountIndex: 0,
    accountIndex1: 0,
    accountIndex2: 0,
    accounts: ["微信号", "QQ", "Email"],
    accounts1: ["3", "6", "12", "18", "24"],
    accounts2: [3, 6, 12, 18, 24],
    userId: 0,
    investId: 0,
    transflowId: 0,
    money1: '',
    rate: '',
    creditValue: 0,
    //费率区间
    updown: "",
    up: '',
    down: '',
    loading: false,
    disabled: false,
    repayMoney: '',
    totalCharge: '',
    singleRepay: '',
    platformServiceFee: '',
    tabs: ["寻求投资客户", "发布借款需求"],
    money2: "",
    loading: false,
    disabled: false,
    sort1: 0,
    loanList: '',
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    inputShowed: false,
    inputVal: "",
    items: [{
        type: 'radio',
        label: '发布时间',
        value: 'Time',
        checked: true,
        children: [{
            label: '最近七天',
            value: 'SevenDay',
            checked: true, // 默认选中
          },
          {
            label: '最近一个月',
            value: 'Month',
          }
        ],
        groups: ['001'],
      },
      {
        type: 'sort',
        label: '金额',
        value: 'money',
        groups: ['002'],
      },
      {
        type: 'filter',
        label: '筛选',
        value: 'filter',
        checked: true,
        children: [{
            type: 'radio',
            label: '借款金额（单选）',
            value: 'LoanMoney',
            children: [{
                label: '不限',
                value: 'no',
                checked: true,
              },
              {
                label: '1000以下',
                value: '1000',
              },
              {
                label: '10000以下',
                value: '10000',
              },
              {
                label: '10万以下',
                value: '100000',
              },
              {
                label: '20万以下',
                value: '200000',
              }
            ],
          },
          {
            type: 'radio',
            label: '借款期数',
            value: 'LoanNum',
            children: [{
                label: '不限',
                value: 'no',
                checked: true,
              },
              {
                label: '3期',
                value: '3',
              },
              {
                label: '6期',
                value: '6',
              },
              {
                label: '12期',
                value: '12',
              }
            ],
          },
        ],
        groups: ['001', '002'],
      }
    ],
  },
  bindMoneyInput: function(e) {
    var that = this
    var va = e.detail.value
    this.setData({
      money1: va
    })
    if (that.data.rate != '') {
      var va = that.data.rate
      var money = that.data.money1
      var num = that.data.num
      wx.request({
        url: "http://192.168.71.1:8081/creditFun/getLoanResult",
        data: {
          money: money,
          period: num,
          rate: va
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
            money2: that.data.money1
          })
        },
        fail: function(res) {
          console.log(".....调用后台接口失败.....");
        }
      })
    }
  },
  bindRateInput: function(e) {
    var that = this
    var va = e.detail.value
    var money = that.data.money1
    var num = that.data.num
    that.setData({
      rate: va
    })
    if (money != '') {
      wx.request({
        url: "http://192.168.71.1:8081/creditFun/getLoanResult",
        data: {
          money: money,
          period: num,
          rate: va
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
            money2: that.data.money1
          })
        },
        fail: function(res) {
          console.log(".....调用后台接口失败.....");
        }
      })
    }
  },
  loanClick: function() {
    var that = this
    wx.request({
      url: "http://192.168.71.1:8081/useLoan/getUseLoan",
      method: 'POST',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.useLoanList;
        var list1 = res.data.useLoanList;

        for (let c in list) {
          console.log(list[c])
          console.log(list[c]['useLoan'])
          list1[c] = list[c]['useLoan']
        }
        that.setData({
          accounts: list1
        })
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
    wx.request({
      url: "http://192.168.71.1:8081/RateLimit/getByTotal",
      data: {
        totalPeriod: 3
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.RateLimit;
        console.log("....调用后台接口成功....." + list);
        that.setData({
          up: list['rateMin'],
          down: list['rateMax'],
          updown: "费率期间" + list['rateMin'] + "—" + list['rateMax'],
          num: 3
        })
        console.log(that.data.updown)
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
    wx.request({
      url: "http://192.168.71.1:8081/userCredit/getByUserId",
      data: {
        userId: that.data.userId
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.userCredit;
        console.log("....获得用户信用成功....." + list);
  
        that.setData({
          creditValue: list['creditValue'],
        })
        console.log("....获得用户信用成功....." +that.data.creditValue);
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this
    that.setData({
      userId: options.userId,
      maxAmount:options.preMoney
    });
    console.log("我要借款的页面接收的参数为：" + options.userId)
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.loanClick()
    this.getRepos()
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    var s = e.detail.value
    var period = this.data.accounts[s]
    this.setData({
      accountIndex: e.detail.value,
      useLoan: period
    })


  },
  bindAccountChange1: function(e) {
    var that = this
    console.log('picker account 发生选择改变，携带值为', e.detail.value);
    var s = e.detail.value
    console.log('picker account 发生选择改变，携带值为11111', s);
    var period = that.data.accounts2[s]
    that.setData({
      accountIndex1: s,
      num: period
    })
    console.log('选择的期数是', period);
    wx.request({
      url: "http://192.168.71.1:8081/RateLimit/getByTotal",
      data: {
        totalPeriod: period
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.RateLimit;
        console.log("....调用后台接口成功....." + list);
        that.setData({
          up: list['rateMin'],
          down: list['rateMax'],
          updown: "费率期间" + list['rateMin'] + "—" + list['rateMax']
        })
        console.log(that.data.updown)
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  },
  onChange(e) {

    const {
      checkedItems,
      items,
      checkedValues
    } = e.detail
    const params = {}

    console.log(checkedValues)
    //筛选器的总值
    console.log("111111111111" + checkedItems, items, checkedValues)
    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'Time') {
          const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
          params.Time = selected
        } else if (n.value === 'filter') {
          n.children.filter((n) => n.selected).forEach((n) => {
            if (n.value === 'LoanMoney') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.LoanMoney = selected
            } else if (n.value === 'LoanNum') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.LoanNum = selected
            }
          })
        }
      }
    })

    console.log('params', params)

    this.getRepos(params, checkedValues)
  },
  getRepos(params = {}, checkedValues) {
    var that = this
    var formData = {
      params: params,
      checkedValue: checkedValues
    }
    console.log('data', formData)
    // wx.showLoading()
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getOrderList",
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log(res.data.userInfoList)
        var loanList1 = res.data.userInfoList
        // for (let i = 0; i < loanList1.length; i++) {
        //   loanList1['transTime'] = util.formatTime(loanList1['transTime'])
        //   console.log(loanList1['transTime'])
        // }
        for (let c in loanList1) {
          let date = util.formatTime(loanList1[c].transTime)
          loanList1[c].transTime = date
          console.log(loanList1[c].transTime)
        }

        wx.hideLoading()
        that.setData({
          loanList: loanList1
          //  loanList: res.data.userInfoList
        })
      },
    })
  },
  onOpen(e) {
    this.setData({
      opened: true
    })
  },
  onClose(e) {
    this.setData({
      opened: false
    })
  },
  formSubmit: function(e) {
    var that = this
    var va = that.data.rate
    var up = that.data.up
    var down = that.data.down
    var money = that.data.money1
    var maxAmount = that.data.maxAmount
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
        console.log("....得到用户是否存在审核中的订单....." + list);
        if (list) {
          wx.showModal({
            title: '提示',
            content: '存在审核中的订单，申请失败！',
            showCancel: false
          })
 
          
                wx.navigateTo({
                  url: '../applyNavbar/applyNavbar?userId=' + that.data.userId + '&preMoney=' + maxAmount
                });
        
           
        }
        else {
          if (money == '') {
            wx.showModal({
              title: '提示',
              content: '借款金额不能为空！',
              showCancel: false
            })
          } else if (parseInt(money) > maxAmount) {
            console.log("当前额度为" + maxAmount);
            console.log("借款金额为" + money);
            console.log("判断结果为：" + parseInt(money) > maxAmount);
            wx.showModal({
              title: '提示',
              content: '额度不足！',
              showCancel: false
            })
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
              url: "http://192.168.71.1:8081/LoanOrder/addOrder",
              data: {
                loanId: that.data.userId,
                investId:0,
                allMoney:that.data.money1,
                useLoan:that.data.useLoan,
                totalPeriod:that.data.num,
                rate:that.data.rate
              },
              method: 'GET',
              header: {
                "Content-Type": "json"
              },
              success: function (res) {
                var list = res.data.success;
                console.log("....调用后台接口成功....." + list);
                if (list == true) {
                  wx.request({
                    url: "http://192.168.71.1:8081/LoanOrder/updateOrder1",
                    data: {
                      loanId: that.data.userId,
                      creditValue:that.data.creditValue
                    },
                    method: 'GET',
                    header: {
                      "Content-Type": "json"
                    },
                    success: function (res) {
                      var list = res.data.success;
                      console.log("....调用后台接口成功....." + list);
                      if (list == 'success') {
                        wx.showToast({
                          title: '发布成功！',
                          icon: 'success',
                          success: () => {
                            setTimeout(() => {
                              wx.navigateTo({
                                url: '../applyNavbar/applyNavbar?userId=' + that.data.userId + '&preMoney=' + maxAmount
                              });
                            }, 1000)
                          }
                        });
                      }
                    },
                    fail: function (res) {
                      console.log(".....调用后台接口失败.....");
                    }
                  })













               
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
  
});