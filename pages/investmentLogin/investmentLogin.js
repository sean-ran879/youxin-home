Page({
  data: {
    // text:"这是一个页面"
    pageStatus:0,
    exchangeMoney: ' 1688 , 8888 , 8880',
    userId:'',
    btnText: '实名认证',
    userPhone: '',
    bottomNavs: [
      {
        image: '../../images/investment_manage3x.png',
        contentText: '按日记息',
      },
      {
        image: '../../images/bottom_borrow3x.png',
        contentText: '线上借款',
      },
      {
        image: '../../images/debt_manage3x.png',
        contentText: '身份认证',

      },
      {
        image: '../../images/transaction_record3x.png',
        contentText: '交易记录',

      },
      {
        image: '../../images/score_manage3x.png',
        contentText: '专属额度',

      },
      {
        image: '../../images/autotender3x.png',
        contentText: '实时审批',

      },
    ]
  },

  url: function () {
    if (this.data.btnText == '实名认证') {
      wx.showModal({
        title: '提示',
        content: '请先进行实名认证！',
        showCancel: false
      })
      wx.navigateTo({
        title: '授信',
        url: '../credit/credit?userId=' + this.data.userId+'&pageStatus='+this.data.pageStatus
      });
    }
    else {
      wx.navigateTo({
        title: '我要投资',
        url: '../investNavbar/investNavbar?userId=' + this.data.userId
      });
    }
  },
  urlMy: function () {
    if (this.data.btnText == '实名认证') {

      wx.showModal({
        title: '提示',
        content: '请先进行身份认证！',
        showCancel: false
      })
      wx.navigateTo({
        title: '授信认证',
        url: '../credit/credit?userId=' + this.data.userId+'&pageStatus='+this.data.pageStatus
      });
    }
    else {
      wx.navigateTo({
        title: '个人中心',
        url: '../my2/my2?userId=' + this.data.userId
      });
    }

  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    var that = this;

    that.setData({ userPhone: options.userPhone });

    console.log('参数值：' + options.userPhone);
    wx.request({
      url: "http://192.168.71.1:8081/user/getByUserPhone",
      method: 'GET',
      data: {
        userPhone: options.userPhone,
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.phoneList;
        var userId=list['userId'];
        that.setData({
          userId:userId
        })
        console.log("....调用后台接口成功.....");
        if (list) {
          if (list['transPw'] != null) {
            that.setData({
              btnText: '已认证',
            })

          }
          console.log(that.data.userId);
        }
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
      }
    })


  },

  btnLimit: function () {
    var btnText = this.data.btnText;
    if (btnText == '实名认证') {
      wx.navigateTo({
        title: '授信认证',
        url: '../credit/credit?userId=' + this.data.userId + '&pageStatus=' + this.data.pageStatus
      });
    }

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示




  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
});