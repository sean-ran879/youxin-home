Page({
  data: {
    
    userId: 0,
 
  },
  facePage: function () {

    wx.navigateTo({
      url: '../personalInfo/personalInfo?userId='+this.data.userId,
    })
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      userId: options.userId
    });
    // that.getusercard();
    console.log('人脸识别成功后的页面的参数值：' + options.userId);
  },



});