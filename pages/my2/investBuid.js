var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["交易中的投资", "发布中的投资意向"],
    activeIndex: 0,
    userId:0,
    sliderOffset: 0,
    sliderLeft: 0,
    allMoney1: '',
    num1: 0,
    rate1: 0,
    useLoan1: '',
    investName1: '',
    loanId:0,
    one:'',
    url:'',
    orderList: {},
    orderList2: '',
    all:'1'
  },
  onLoad: function (options) {
    var that = this;
    var userId = options.userId
    that.setData({
      userId: userId
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getTransOrder2",
      data: {
        investId: that.data.userId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.TransOrder2;

        that.setData({
          orderList: list
        })
        console.log("得到用户在还中的订单详情" + JSON.stringify(list))
        var list2;
        for (let c in list) {
          let name = list[c].loanId
          console.log("每个在还中订单的循环内得到的借款人ID: "+name)
          wx.request({
            url: "http://192.168.71.1:8081/userInfo/getByUserId",
            data: {
              userId: name,
            },
            method: 'GET',
            header: {
              "Content-Type": "json"
            },
            success: function (res) {
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
    });

    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getPreLoan1",
      data: {
        investId: that.data.userId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.List;
     
        if (list == null) {
          that.setData({
            all: '0'
          })
        } else {
          
          that.setData({
            allMoney1: list['allMoney'],
            num1: list['totalPeriod'],
            rate1: list['rate'],
            useLoan1: list['useLoan'],
            transTime1: list['transTime'],
            loanId: list['loanId']
          })
          if (list['orderStatus'] == 2) {
            that.setData({
              one: '1',
              url: '../investdetails/investdetails?transflowId=' + list['transflowId']
            })
          }
          console.log("....得到用户是否存在审核中的订单....." + JSON.stringify(list));
          console.log("....得到用户是否存在审核中的订单dddddd....." + that.data.allMoney1);
          // if (list) {
          //   if (list['orderStatus'] == '0') {
          //     that.setData({
          //       investName1: '所有人'
          //     })
          //   } else if (list['orderStatus'] == '2') {
          //     wx.request({
          //       url: "http://192.168.71.1:8081/userInfo/getByUserId",
          //       data: {
          //         userId: that.data.loanId,
          //       },
          //       method: 'GET',
          //       header: {
          //         "Content-Type": "json"
          //       },
          //       success: function (res) {
          //         var list = res.data.phoneList;
          //         var investName = list['userName']
          //         that.setData({
          //           investName1: investName,
          //         })
          //       }
          //     })

          //   }

          // }
        }
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
      }
    })

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  message:function(){
    wx.navigateTo({
      url: this.data.url
    })
  },
  deleteOrder: function () {
    wx.showModal({
      title: '温馨提示',
      content: '确定要撤回此订单吗，撤回后借款用户将看不到您的投资意向',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户确定撤消')
        } else {
          console.log('用户取消')
        }
      }
    });
  },
});