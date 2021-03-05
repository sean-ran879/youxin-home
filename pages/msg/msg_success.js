Page({
  data: {
    pageStatus: '',
    userId: '',
    userPhone:''
  },
  onLoad: function (options) {
    var that = this;
    var userId = options.userId;
    that.setData({
      userId: options.userId
    })
    console.log("实名认证成功页面接收的参数为" + options.userId);
  },
facePage:function(){
  var that=this
  wx.request({
    url: "http://192.168.71.1:8081/user/getById",
    data: {
      userId: that.data.userId
    },
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var result = res.data.success;

      if (result) {
        that.setData({
          userPhone: result['userPhone']
        })
        wx.reLaunch({
          url: '../investmentLogin/investmentLogin?userPhone=' + that.data.userPhone,
        })
        // wx.navigateTo({
        //   url:
        // })
      }

    }

  })
 
}
});