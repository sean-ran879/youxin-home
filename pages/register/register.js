//index.js
var zhenzisms = require('../../utils/zhenzisms.js');
var zscode;
var resCode;
var va2;
//获取应用实例
const app = getApp();
Page({
  data: {
    hidden: true,
    btnValue: '',
    btnDisabled: false,
    passWord: '',
    pwd: '',
    userPhone: '',
    role: '',
    userCode: '',
    second: 60,
    isDisabled: true,
    addUrl: "http://192.168.71.1:8081/user/addUser",
  },
  onLoad: function() {

  },
  //手机号输入
  bindPhoneInput(e) {
    console.log(e.detail.value);
    var val = e.detail.value;
    va2 = val;
    var toastText = '';
    this.setData({
      userPhone: val
    })
    if (val != '') {
      this.setData({
        hidden: false,
        btnValue: '获取验证码'
      })
    } else {
      this.setData({
        hidden: true
      })
    }
    if (val != '' && val.length == 11) {
      //判断该手机号是否已经注册
      wx.request({
        url: "http://192.168.71.1:8081/user/getByUserPhone",
        method: 'GET',
        data: {
          userPhone: val,
        },
        header: {
          "Content-Type": "json"
        },
        success: function(res) {
          var list = res.data.phoneList;
          console.log("....调用后台接口成功....."+list);
          if (list) {
            toastText = '手机号已注册，请重新输入！';
            wx.showModal({
              title: '提示',
              content: toastText,
              showCancel: false
            })
          }
        },
        fail: function(res) {
          console.log(".....调用后台接口失败.....");
        }
      })
    }

  },
  //验证码输入
  bindCodeInput(e) {
    this.setData({
      userCode: e.detail.value
    })
  },
  //获取短信验证码
  getCode(e) {
    console.log('获取验证码');
    var that = this;
    wx.request({
      url: "http://192.168.71.1:8081/user/getVerifyCode",
      method: 'GET',
      data: {
        userPhone: va2,
      },
      header: {
        "Content-Type": "json"
      },
      success: function(res) {
        var list = res.data.verifyCode;
        console.log("....调用后台接口成功.....");
        if (list) {
          zscode = list;
          that.codety();
          // zhenzisms.client.init('https://sms_developer.zhenzikj.com', '104614', '248a3341-95ca-46cc-89b1-23ab068e600c');
          // zhenzisms.client.send(function(res) {
          //   if (res.data.userCode == 0) {
          //     that.timer();
          //     return;
          //   }
          //   wx.showToast({
          //     title: res.data.data,
          //     icon: 'none',
          //     duration: 2000
          //   })
          // }, that.data.userPhone, '优信之家提醒，您的验证码为:'+zscode+'短信5分钟内有效，请勿向任何人泄露。如非本人操作，请忽略本短信');



        } else {
          wx.showToast({
            title: '获取验证码失败',
            icon: 'none',
            duration: 3000
          });
        }
      },
     
      fail: function(res) {
        console.log(".....调用后台接口失败.....");
      }
    })
  },
  codety:function(){
    this.timer();
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '104614', '248a3341-95ca-46cc-89b1-23ab068e600c');
    zhenzisms.client.send(function (res) {
      // if (res.data.code == 0) {
      //  this.timer();
      //   return;
      // }
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, this.data.userPhone, '优信之家提醒，您的验证码为:' + zscode + '短信5分钟内有效，请勿向任何人泄露。如非本人操作，请忽略本短信');


  },
  timer: function() {
    console.log("发现Timer");
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  formSubmit: function(e) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    var that = this;
    var formData = {
      userId: 0,
      userPhone: e.detail.value.userPhone,
      passWord: e.detail.value.passWord,
      userRole: e.detail.value.userRole
    };
    var userPhone = {
      userPhone: e.detail.value.userPhone,
    };
    var url = that.data.addUrl;
    var toastText;
    var iconText = 'none';
    if (e.detail.value.userPhone.length == 0) {
      toastText = '请输入手机号!';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
      
    } else if (e.detail.value.userPhone.length < 11) {
      toastText = '手机号长度有误！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (!myreg.test(e.detail.value.userPhone)) {
      toastText = '手机号格式错误！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.passWord.length == 0) {
      toastText = '请设置登录密码！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.passWord.length < 6) {
      toastText = '请设置6个字符以上的密码';
      // wx.showToast({
      //   title: toastText,
      //   icon: iconText,
      //   duration: 2000
      // })
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.pwd.length == 0) {
      toastText = '请确认登录密码！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.passWord != e.detail.value.pwd) {
      toastText = '两次密码不一致！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.passWord == e.detail.value.pwd && e.detail.value.userRole == "") {
      toastText = '请选择用户角色！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.userCode.length==0) {
      toastText = '请输入验证码！';
      wx.showModal({
        title: '提示',
        content: toastText,
        showCancel: false
      })
    } else if (e.detail.value.userCode != '') {
      wx.request({
        url: "http://192.168.71.1:8081/user/isVerifyCode",
        method: 'GET',
        data: {
          userPhone: e.detail.value.userPhone,
          userCode: e.detail.value.userCode,
        },
        header: {
          "Content-Type": "json"
        },
        success: function(res) {
          var list = res.data.flag;
          console.log("....调用判断验证码后台接口成功.....");
          if (list == '1') {
            resCode = list;
            console.log(resCode);
            toastText = '验证码正确！';
          } else {
            resCode='0'
            console.log('验证码过期！');
          }
          if (resCode == '0') {
            toastText = '验证码过期！';
          } else {
            console.log("我执行了1"),
            wx.request(
              {
              url: "http://192.168.71.1:8081/user/addUser",
              data: JSON.stringify(formData),
              method: 'POST',
              header: {
                'Content-Type': 'application/json'
              },
    
            })
            toastText = '注册成功';
            iconText = 'success';
          }
          wx.showToast({
            title: toastText,
            icon: iconText,
            success: () => {
              if (toastText == '注册成功') {
                setTimeout(() => {
                  wx.redirectTo({
                    url: '../login/login?userPhone=' +e.detail.value.userPhone,
                  })
                }, 500)
              }
            }
          });
        },
        fail: function(res) {
          console.log("判断验证码是否正确出问题了！！！")
          console.log(".....调用判断验证码后台接口失败.....");
        }
      })
    }
  },
  openAlert: function() {
    var ithis = this;
    var list = ['借款', '投资人'];
    wx.showModal({
      content: '用户角色一经选择不可修改，请认真选择',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showActionSheet({
            itemList: list,
            success: function(res) {
              if (!res.cancel) {
                console.log(res.tapIndex)
                console.log(list[res.tapIndex])
                ithis.setData({
                  userRole: list[res.tapIndex],
                  isDisabled: true,
                })
              }
            },
            fail(res) {
              console.log("选择用户出问题了！！！！")
              console.log(res.errMsg)
            }

          });
        }
      }
    });
  }
});