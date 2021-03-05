// pages/my/showCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
bankName:'',
bankId:'',
userId:0,
my12:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userId = options.userId;
    var my12=options.my12;
    that.setData({
      userId: options.userId,
      my12:my12
    });
    wx.request({
      url: "http://192.168.71.1:8081/userInfo/getByUserId3",
      data: {
        userId: userId,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var result = res.data.phoneList3;
        that.setData({
          bankName: result['bankName'],
          bankId:result['bankId']
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  //换绑
  onClick1:function(){
    wx.navigateTo({
      // url: '../msg/info_success',
      url: '../bindCard/bindCard?userId=' + this.data.userId + '&pageStatus=' + 2,
    })

  },
  //返回
  onClick2: function () {
 if(this.data.my12==0){
      wx.navigateTo({
        // url: '../msg/info_success',
        url: '../my/my?userId=' + this.data.userId,
      })
 }else if(this.data.my12==1){
   wx.navigateTo({
     // url: '../msg/info_success',
     url: '../my2/my2?userId=' + this.data.userId,
   })
 }
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})