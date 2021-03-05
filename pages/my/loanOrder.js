var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({
  data: {
    tabs: ["在还中订单", "审核中订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    allMoney: 0,
    investName: '',
    transTime: '',
    allMoney1: '',
    num1: 0,
    rate1: 0,
    useLoan1: '',
    investName1: '',
    invest: '',
    orderList: '',
    orderList2: '',
    investId: 0,
    userId:0,
    status:1
  },
  onLoad: function(options) {
    var that = this;
    var userId = options.userId
    that.setData({
      userId: userId
    })
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getTransOrder1",
      data: {
        loanId: that.data.userId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.TradsOrder1;
        that.setData({
          orderList:list
        })
        // console.log("得到用户在还中的订单详情" + JSON.stringify(list))
        var list2;
        for (let c in list) {
          let name = list[c].investId
          // console.log("每个在还中订单的循环内得到的投资人ID: "+name)
          wx.request({
            url: "http://192.168.71.1:8081/userInfo/getByUserId",
            data: {
              userId: name,
            },
            method: 'GET',
            header: {
              "Content-Type": "json"
            },
            success: function(res) {
              var list3 = res.data.phoneList;
              // console.log("投资人姓名的个人信息：" + JSON.stringify(list3))
              var investName = list3['userName']
              list2 = list
              list2[c] = investName
              // list1[c] = list[c]['useLoan']
              // console.log("姓名列表111111" + JSON.stringify(list2))
              that.setData({
                orderList2: list2
              })
              console.log("订单列表11111" + that.data.orderList)
              console.log("订单列表22" + that.data.orderList2)
            }

          })
        }
      
      }
    })



    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getPreLoan",
      data: {
        loanId: that.data.userId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.List;
        if(list==null){
          that.setData({
            status:0
          })
        }else{
        that.setData({
          allMoney1: list['allMoney'],
          num1: list['totalPeriod'],
          rate1: list['rate'],
          useLoan1: list['useLoan'],
          transTime1: list['transTime'],
          investId: list['investId']
        })
      }
        console.log("....得到用户是否存在审核中的订单....." + JSON.stringify(list));
        if (list) {
          if (list['orderStatus'] == '0') {
            that.setData({
              investName1: '所有人'
            })
          } else if (list['orderStatus'] == '2') {
            wx.request({
              url: "http://192.168.71.1:8081/userInfo/getByUserId",
              data: {
                userId: that.data.investId,
              },
              method: 'GET',
              header: {
                "Content-Type": "json"
              },
              success: function(res) {
                var list = res.data.phoneList;
                var investName = list['userName']
                that.setData({
                  investName1: investName,
                })
              }
            })

          }

        }
      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })

  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});