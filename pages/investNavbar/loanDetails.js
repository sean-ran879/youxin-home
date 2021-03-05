
import { repayDate } from '../../utils/util'
Page({
  data: {
    animationData: {},
    opacityFlag: false,
    maxAmount: 2001,

    interest: 0.06,
    loanloanDate: 1,
    moneyAll: 500,
    moneyIndex: 0,

    typeIndex: 0,
    repayTime: 0,
    loading: false,
    disabled: false
  },

  dateChange(e) {
    this.setData({
      dateIndex: e.detail.value - 1,
      loanloanDate: e.detail.value,
      repayTime: repayDate(+e.detail.value)
    })
  },
  typeChange(e) {
    this.setData({
      typeIndex: +e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      repayTime: repayDate(1)
    })
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

  },
  onTenderClick: function () {
    this.setData({
      opacityFlag: true
    });

    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })

    //this.animation = animation

    animation.translateY('-70%').step();

    this.setData({
      animationData: animation.export()
    })
  },
  //关闭投标页面.
  onTenderCloseClick: function () {
    this.setData({
      opacityFlag: false
    });

    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: "ease",
    })

    //this.animation = animation

    animation.translateY('100%').step();

    this.setData({
      animationData: animation.export()
    })
  },

  onCancelTap: function () {
    this.onTenderCloseClick();
  },

  //返回
  onBackClick: function () {
    // wx.navigateTo({
    //   url : '../investment/investment'
    // });
    wx.navigateBack();
  },
  upMoneyClick:function(){
    wx.navigateBack({
      delta: 2
    })
  },
  // details: function () {
  //   wx.navigateTo({
  //     url: '../details/investdetails'
  //   });

  // },
  // formSubmit: function (e) {
  //   wx.showToast({
  //     title: '借款申请成功！',
  //     icon: 'success',
  //     success: () => {
  //       setTimeout(() => {
  //         wx.reLaunch({
  //           url: '../applyNavbar/applyNavbar',
  //         })
  //       }, 3000)
  //     }

  //   });
  // }
})



