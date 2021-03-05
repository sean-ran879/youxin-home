// pages/cardList/cardList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     cardList:'',
     userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      userId:options.userId
    })
    console.log("页面接收的参数为" + options.userId);
 
    wx.request({
      url: "http://192.168.71.1:8081/userInfo/getBankInfo",
      method:'POST',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = JSON.stringify(res.data.success) ;
        console.log("....调用后台接口成功....." + list);
        that.setData({
          cardList: res.data.success 
        })
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
      }
    })




  },
backClick:function(){
  wx.navigateTo({
    url: '../bindCard/bindCard?userId=' + this.data.userId,
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