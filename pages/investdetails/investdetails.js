Page({
  data: {
    // info: {},
    transflowId: 0,
    opacityFlag: false,
    animationData: {},
    transPw: '',
    loanId: '',
    investId:'',
    loanId1: 0,
    loanName: '',
    creditValue: '',
    gender: '',
    birth: '',
    age: '',
    maritlStatus: '',
    maritlStatus1: 0,
    work: '',
    company: '',
   totalPeriod:0,
    money:0,
    allMoney:0,
    rate:0
  },
  onLoad: function(options) {
     var that = this
    // 页面初始化 options为页面跳转所带来的参数
    var data = JSON.parse(options.transflowId);
    console.log(data)
    that.setData({
      transflowId: data,
       
    });
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getTransId",
      data: {
        transflowId: that.data.transflowId,
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.transId;
       
         
        that.setData({
          loanId1: list['loanId'],
          loanId: list['loanId'],
          creditValue: list['creditValue'],
          investId:list['investId'],
          totalPeriod:list['totalPeriod'],
          allMoney:list['allMoney'],
          rate:list['rate']
        })
        
        wx.request({
          url: "http://192.168.71.1:8081/userInfo/getByUserId",
          data: {
            userId: that.data.loanId,
          },
          method: 'GET',
          header: {
            "Content-Type": "json"
          },
          success: function(res) {
            var list = res.data.phoneList;
            that.setData({
              loanName: list['userName'],
              gender: list['gender'],
              birth: list['birth'],
              maritlStatus: list['maritlStatus'],
              work: list['work'],
              company: list['company']
            })



            wx.request({
              url: "http://192.168.71.1:8081/creditFun/getLoanResult",
              data: {
                money: that.data.allMoney,
                period:that.data.totalPeriod,
                rate: that.data.rate
              },
              method: 'GET',
              header: {
                "Content-Type": "json"
              },
              success: function (res) {
                var list = res.data.moneyList;
                console.log("....调用后台接口成功....." + list);
                that.setData({
               
                 money: list['singleRepay'],
               
          
                })
              },
              fail: function (res) {
                console.log(".....调用后台接口失败.....");
              }
            })
            if (that.data.maritlStatus1 == 0) {
              that.setData({
                maritlStatus: '未婚'
              })
            } else {
              that.setData({
                maritlStatus: '已婚'
              })
            }
           
          },
          fail: function(res) {
            console.log(".....调用后台接口失败.....");
          }
        })






      },
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  },
  onReady: function() {},
  onShow: function() {
    // 页面显示
  },
 
  onHide: function() {
    // 页面隐藏
    console.log('hide')
  },
  onUnload: function() {
    // 页面关闭
    console.log('unload')
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
          userId: that.data.investId
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
                investId: that.data.investId,
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
                      investId: that.data.investId,
                      loanId: that.data.loanId,
                      perPeriod: that.data.totalPeriod,
                      money: that.data.money
                    },
                    method: 'GET',
                    header: {
                      "Content-Type": "json"
                    },
                    success: function(res) {
                      var list = res.data.success;
                      if (list == true) {
                        wx.showToast({
                          title: '投资成功，请在订单详情中查看！',
                          icon: 'success',
                          success: () => {
                            setTimeout(() => {
                              wx.navigateTo({
                                url: '../investNavbar/investNavbar?userId=' + that.data.investId
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

  //点击投标跳转到投标页面
  onClick: function() {
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

  },

})