Page({
  data: {
    userId: '',
    userPhone:''
  },
  onLoad: function(options) {
    var that = this;
    that.setData({
      userId: options.userId
    })
    console.log("授信成功页面的参数为" +that.data.userId);
  },
  facePage: function() {
    var that = this
    var userId = {
      userId: that.data.userId,
    };
    wx.request({
      url: "http://192.168.71.1:8081/creditFun/getCreditValue",
      data:{
        userId: that.data.userId
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var result = res.data.success;
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
                userPhone:result['userPhone']
              })
              wx.navigateTo({
                url: '../applylogin/applylogin?userPhone=' + that.data.userPhone,
              })
            }

          }

        })

        
            
      }


    })







   
  }


});