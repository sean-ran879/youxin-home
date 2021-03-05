 //index.js
 //获取应用实例
 var app = getApp()
 Page({
   data: {

     userPhone: '',
     passWord: '',
     noinput: false,
     pwdinput: false,
     motto: '没有帐号？点击进行注册-->',
     userInfo: {}
   },
   bindViewTap: function() {
     wx.navigateTo({
       url: '../register/register'
     })
   },
   noinput: function(e) {
     var val = e.detail.value;
     var toastText;

     this.setData({
       noinput: true
     });

     if (val != '' && val.length == 11) {
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
           console.log("....调用后台接口成功.....");

           if (list == null || list == '') {
             toastText = '手机号未注册，请先注册！';
             wx.showModal({
               title: '提示',
               content: toastText,
               showCancel: false
             })

           }
         },
         fail: function(res) {
           console.log(".....调用后台接口失败.....",res);
      
         }
       })
     }

   },
   pwdinput: function(e) {
     this.setData({
       pwd: e.detail.value
     });
     this.setData({
       pwdinput: true
     });
   },
   formSubmit: function(e) {
     var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
     var that = this;
     var val = e.detail.value;
     var phone = e.detail.value.usePhone;
     var toastText = '';
     var titleText;
     var iconText = 'none';
     if (e.detail.value.userPhone.length == 0) {
       toastText = '请输入手机号!';

     } else if (e.detail.value.userPhone.length < 11) {
       toastText = '手机号长度有误！';

     } else if (!myreg.test(e.detail.value.userPhone)) {
       toastText = '手机号格式错误！';

     } else if (e.detail.value.passWord.length == 0) {
       toastText = '请输入登录密码！';

     } else if (e.detail.value.passWord.length < 6) {
       toastText = '密码长度错误';
     } else {
       var phone = e.detail.value.userPhone;
       //  wx.request({
       //    url: "http://127.0.0.1:8081/userInfo/getByUserPhone",
       //    method: 'GET',
       //    data: {
       //      userPhone: val,
       //    },
       //    header: {
       //      "Content-Type": "json"
       //    },
       //    success: function(res) {
       //      var list = res.data.phoneList;
       //      console.log("....调用后台接口成功.....");

       //      if (list == null || list == '') {
       //        titleText = '手机号未注册，请先注册！';
       //        wx.showToast({
       //          title: titleText,
       //          icon: 'none',
       //          duration: 2000

       //        });

       //      }
       //       return;
       //    },
       //    fail: function(res) {
       //      console.log(".....调用后台接口失败.....");
       //    }
       //  })
       wx.request({

         url: "http://192.168.71.1:8081/user/loginUser",
         data: {
           userPhone: e.detail.value.userPhone,
           passWord: e.detail.value.passWord,
         },
         header: {
           'content-type': 'application/json' // 默认值
         },
         success: function(res) {
           var list = res.data.login;
           console.log(".....密码验证返回值" + list);
           if (list == '11') {
             titleText = "登录成功";
             iconText = 'success';
             wx.showToast({
               title: titleText,
               icon: iconText,
               success: () => {
                 setTimeout(() => {
                   wx.redirectTo({
                     url: '../applylogin/applylogin?userPhone=' + phone
                   })
                 }, 200)
               }
             });
           } else if (list == '12') {
             titleText = "登录成功";
             iconText = 'success';
             wx.showToast({
               title: titleText,
               icon: iconText,
               success: () => {
                 setTimeout(() => {
                   wx.redirectTo({
                     url: '../investmentLogin/investmentLogin?userPhone=' + phone,
                   })
                 }, 200)
               }
             });

           } else {
             titleText = '密码错误！';
             wx.showModal({
               title: '提示',
               content: titleText,
               showCancel: false
             })
           }
          //  wx.showModal({
          //    title: '提示',
          //    content: toastText,
          //    showCancel: false
          //  })
         }


       })

     }
   
   },
   onLoad: function (options) {

     var that = this;
  
     that.setData({ userPhone: options.userPhone });
     if(options.userPhone.length>2){
     wx.request(

       {
         url: "http://192.168.71.1:8081/user/addUserCredit",
         data:{userPhone:options.userPhone},       
         header: {
           'Content-Type': 'application/json'
         },
       })
     }
   },

   onReady: function() {},

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
     //   if (this.data.no == '' || this.data.pwd == '') {
     //     this.setData({ disabled: true });
     //   } else {
     //     this.setData({ disabled: false });
     //   }
     // },
     // loginClick: function () {

     //   wx.navigateTo({

     //     url: '../farmermain/farmermain',

     //   })

   },




   registerClick: function() {

     wx.navigateTo({

       url: '../register/register'


     })

   }

 })