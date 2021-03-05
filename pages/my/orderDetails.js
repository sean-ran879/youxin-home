// pages/my/orderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    transflowId:0,
    name:'',
    orderList:'',
    period:'',
    allFree:'',
    status:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var transflowId = options.orderList
    var userId=options.userId
    var status=options.status
    var name=options.name
    this.setData({
      transflowId:transflowId,
      name:name,
      status:status,
      userId:userId
    })
    var that=this
    console.log("投资人姓名的个人信息：" + JSON.stringify(transflowId))
    wx.request({
      url: "http://192.168.71.1:8081/LoanOrder/getTransId",
      data: {
        transflowId:that.data.transflowId
      },
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var list = res.data.transId;
        console.log("....调用后台接口成功....." + list);
        that.setData({
         orderList:list
        })
      },
      fail: function (res) {
        console.log(".....调用后台接口失败.....");
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