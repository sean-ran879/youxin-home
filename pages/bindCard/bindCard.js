var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageStatus: 0,
    userId: '',
    cardType: '',
    bankName: '',
    bankNumber: '',
    transPw: ''
  },
  getTransPw: function(e) {
    this.setData({
      transPw: e.detail.value
    })
  },
  getUserIdCardNumber: function(e) {
    this.setData({
      bankNumber: e.detail.value
    })
    var temp = util.bankCardAttribution(e.detail.value)
    console.log(temp)
    console.log(temp.bankName)
    if (temp == Error) {
      temp.bankName = '';
      temp.cardTypeName = '';
    } else if (temp.bankName != undefined) {
      this.setData({
        cardType: temp.bankName + temp.cardTypeName,
        bankName: temp.bankName
      })
    }
  },
  //查看支持的银行卡
  bankInfo: function() {
    wx.navigateTo({
      url: '../cardList/cardList?userId=' + this.data.userId,
    })
  },
  //提交转账信息
  submitInfos: function() {
    var compare = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var that = this;
    if (!that.data.bankNumber) {
      wx.showToast({
        title: '银行卡号不能为空',
        icon: 'none',
        image: '',
        duration: 1000
      })
    } else if (!that.data.transPw && that.data.transPw.length != 6) {
      wx.showToast({
        title: '请设置6位交易密码',
        icon: 'none',
        image: '',
        duration: 1000
      })
    } else {
      var bankBind = {
        userId: that.data.userId,
        bankId: that.data.bankNumber,
        bankName: that.data.bankName,
      };
      var transPw = {
        transPw: that.data.transPw,
      };
      wx.request({
        url: "http://192.168.71.1:8081/userInfo/getBankCount",
        // data: JSON.stringify(bankBind),
        data: {
          bankName: that.data.bankName,
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          var result = res.data.success;
          if (result == "no") {
            wx.showModal({
              title: '提示',
              content: '不支持该类型银行卡，请更换',
              showCancel: false
            })
          } else {
            if(that.data.pageStatus!=2){
            wx.request({
              url: "http://192.168.71.1:8081/userInfo/addBankBind",
              data: JSON.stringify(bankBind),
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
              success: function(res) {
                console.log("更新")
                wx.request({
                  url: "http://192.168.71.1:8081/user/updateTransPw",
                  data: {
                    userId: that.data.userId,
                    transPw: that.data.transPw
                  },
                  method: 'GET',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: function(res) {
                    console.log("跳转")
                    if (that.data.pageStatus == 1) {
                      console.log("1")
                      wx.navigateTo({
                        url: '../msg/info_success?userId=' + that.data.userId,
                      })

                    } else if (that.data.pageStatus == 0) {
                      console.log("0")
                      wx.navigateTo({
                        url: '../msg/msg_success?userId=' + that.data.userId,
                      })
                    }
                  }
                })
              }
            })
            }else{
              wx.request({
                url: "http://192.168.71.1:8081/userInfo/updateBank",
                data: JSON.stringify(bankBind),
                method: 'POST',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  console.log("更新")
                  wx.request({
                    url: "http://192.168.71.1:8081/user/updateTransPw",
                    data: {
                      userId: that.data.userId,
                      transPw: that.data.transPw
                    },
                    method: 'GET',
                    header: {
                      'Content-Type': 'application/json'
                    },
                    success: function (res) {
                      console.log("跳转")
                  
                        wx.navigateTo({
                          url: '../my/showCard?userId=' + that.data.userId,
                        })

                    }
                  })
                }
              })
            }
          }
        }
      })
    }
    console.log(that.data.pageStatus)
    console.log(that.data.pageStatus == 0)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var pageStatus = options.pageStatus;
    that.setData({
      // userId: options.userId,
      // pageStatus:pageStatus
      userId: options.userId,
      pageStatus: pageStatus
    })
    console.log("绑定银行卡页面接收的参数为" + options.userId);
    console.log("用户作用" + options.pageStatus);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})