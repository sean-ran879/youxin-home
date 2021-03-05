Page({
  data: {
    // text:"这是一个页面"
    exchangeMoney: ' 1688 , 8888 , 8880',
    preMoney:'200,000.00',
    btnText:'获取额度',
    userPhone:'',
    userId:0,
    pageStatus:1,

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
  url:function(){
   if(this.data.preLimit=='200,000.00'){

     wx.showModal({
       title: '提示',
       content: '请先获取额度！',
       showCancel: false
     })
     wx.navigateTo({
       title: '授信',
       url: '../credit/credit?userId=' + this.data.userId + '&pageStatus=' + this.data.pageStatus
     });
   }
   else{
     wx.navigateTo({
       title: '授信',
       url: '../applyNavbar/applyNavbar?userId='+this.data.userId+'&preMoney='+this.data.preMoney
     });
   }
  },
  urlMy:function(){
    if (this.data.preLimit == '200,000.00') {

      wx.showModal({
        title: '提示',
        content: '请先获取额度！',
        showCancel: false
      })
      wx.navigateTo({
        title: '授信认证',
        url: '../credit/credit?userId=' + this.data.userId
      });
    }
    else {
      wx.navigateTo({
        title: '个人中心',
        url: '../my/my?userId=' + this.data.userId 
      });
    }

  },
  // toUserAccount: function () {
  //   wx.navigateTo({
  //     url: '../useraccount/useraccount'
  //   });
  // },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({userPhone: options.userPhone });
    console.log('参数值：'+options.userPhone);
    wx.request({
      url: "http://192.168.71.1:8081/user/userCredit",
      method: 'GET',
      data: {
        userPhone: options.userPhone,
      },
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.userCredit;
        console.log("....调用后台接口成功.....");
        if (list['allLimit']!=null) {
            that.setData({
              btnText: '当前额度',
              preMoney:list['preLimit'],
              userId:list['userId']
              })
          userId: list['userId']
          console.log("用户id为：" + list['userId']); 
        }
        that.setData({
          userId: list['userId']
        })
        console.log("用户id为：" + list['userId']); 
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  },
  btnLimit:function(){
   var btnText=this.data.btnText;
   var userId=this.data.userId;
    console.log(userId);
   if(btnText=='获取额度'){
     wx.navigateTo({
       title: '授信认证',
       url: '../credit/credit?userId=' + userId + '&pageStatus=' + this.data.pageStatus
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