// pages/cardAddress/cardOcr.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   pageStatus:'',
    userId:0,
    userName:'',
    idCard:'',
    birth:'',
    hjAddress:'',
    gender:'',
    imgdata:0

  },
  submit: function () {

    wx.navigateTo({
      url: '../faceIdentify/faceIdentify',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var pageStatus=options.pageStatus;
    var imgdata1 = JSON.parse(options.imgdata);
    that.setData({
      pageStatus:pageStatus,
      userId: options.userId,
      imgdata:options.imgdata,
      userName:imgdata1['name'],
      idCard:imgdata1['number'],
      birth:imgdata1['birth'],
      hjAddress:imgdata1['address'],
      gender:imgdata1['sex']
    });
    // that.getusercard();
    console.log('参数值：' + options.userId);
    console.log('参数值：' + options.imgdata);
    console.log('参数值：' + imgdata1['address']);
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
  formSubmit: function (e) {
    var that = this;
    var formData = {
      userId: that.data.userId,
      userName : e.detail.value.userName,
      idCard: e.detail.value.idCard,
      birth: e.detail.value.birth,
      hjAddress:e.detail.value.hjAddress,
      gender:e.detail.value.gender
    };
    console.log('参数值：' + formData);
    wx.request(
      {
        url: "http://192.168.71.1:8081/userInfo/addUserInfo",
        data: JSON.stringify(formData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },

      })
      //等于1是借款人授信
      if(this.data.pageStatus==1){
        wx.navigateTo({
          url: '../faceIdentify/faceIdentify?userId=' + that.data.userId,
        })
      }
      else if(this.data.pageStatus==0){
       // 等于0是投资人认证
        wx.navigateTo({
          url: '../investmentLogin/usrInfo?userId=' + that.data.userId,
        })
      }
  
 
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