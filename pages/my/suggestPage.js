
const app = getApp();

Page({
  data: {
    loading: false,
    opinion: '',
    phone: '',
    url: app.globalData.url
  },

  formSubmit: function (e) {
    var that = this;
    var formData = {
      id: 0,
      phone: e.detail.value.phone,
     suggest: e.detail.value.opinion
    };
    let content = e.detail.value.opinion;
    let contact = e.detail.value.phone;
    let regPhone = /^1[3578]\d{9}$/;
    let regEmail = /^[a-z\d_\-\.]+@[a-z\d_\-]+\.[a-z\d_\-]+$/i;
    if (content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容不能为空!',
      })
      return false
    }
    if (contact == "") {
      wx.showModal({
        title: '提示',
        content: '手机号或者邮箱不能为空!',
      })
      return false
    }
    if (contact == "" && content == "") {
      wx.showModal({
        title: '提示',
        content: '反馈内容,手机号或者邮箱不能为空!',
      })
      return false
    }
    if ((!regPhone.test(contact) && !regEmail.test(contact)) || (regPhone.test(contact) && regEmail.test(contact))) { //验证手机号或者邮箱的其中一个对 这个关系饶了俩小时^_^
      wx.showModal({
        title: '提示',
        content: '您输入的手机号或者邮箱有误!',
      })
      return false
    } else {
    var url1=that.data.url;
      var toastText="提示";
      var  iconText;
      wx.request({
        url: url1 + '/suggestInfo/addSuggest',
        data: JSON.stringify(formData),
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
      })
      toastText = '提交成功';
      iconText = 'success';
    }
    wx.showToast({
      title: toastText,
      icon: iconText,
      success: () => {
        if (toastText == '提交成功') {
          setTimeout(() => {
            wx.redirectTo({
              url: '../my/suggestPage',
            })
          }, 500)
        }
      }
    });
  }
})