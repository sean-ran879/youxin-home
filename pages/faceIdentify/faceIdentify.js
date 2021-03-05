//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util')
//微信接口参数

Page({
      data: {
   
        userId: 0,
        ImagePath: '',
        motto: '人脸拍照',
      },
      takePhoto() {
        var that = this;
        const ctx = wx.createCameraContext();
        ctx.takePhoto({
              quality: 'high',
              success: (res) => {
                console.log('temp photo path:', res.tempImagePath);
                this.setData({
                  ImagePath: res.tempImagePath,
                  photoTaken: true,
                })
                //插入上传代码段
                wx.showLoading({
                  title: '上传中...',
                  duration: 3000
                })
                // wx.previewImage({
                //   urls: [this.data.ImagePath],
                   
                // })
                wx.uploadFile({
                    url: "http://127.0.0.1:8081/upload/picture1", //接口处理
                    filePath: res.tempImagePath,
                    name: 'files', //name should be the file key in formData,
                    header: {
                      "Content-Type": "multipart/form-data"
                    },
                    formData: {
                      userId: this.data.userId,
                    },
                    success: function(res) {
                      var text;
                      var imgdata1 = JSON.parse(res.data);
                    
                      console.log("人脸识别结果：" + imgdata1['result']['score']);
                     if( imgdata1['result']['score']){
                          if (imgdata1['result']['score'] >=80) {        
                        console.log("执行跳转页面");        
                           wx.navigateTo({
                           url: '../msg/face_success?userId=' + that.data.userId,
                          })
                        }
                        else{
                        wx.navigateTo({
                          url: '../msg/msg_fail?userId=' + that.data.userId,
                        })

                        }
                        // if (imgdata1['number'] != '0') {
                        //   console.log(imgdata1);
                        //   var s = JSON.stringify(imgdata1)
                        //   that.setData({
                        //     imgdata: s
                        //   })


                        // } else {
                        //   text = '请上传正确的身份证照片';
                        //   console.log(text);
                        //   wx.showModal({
                        //     title: '提示',
                        //     content: text,
                        //     showCancel: false
                        //   })

                        // }


                     }
                     else{
                       wx.navigateTo({
                         url: '../msg/msg_fail?userId=' + that.data.userId,
                       })
                     }


                      },
                      fail: err => {

                          wx.hideLoading();

                          wx.showToast({

                            title: '请求超时',

                            icon: 'loading',

                            duration: 2000

                          });

                          if (fail) {

                            if (failCallback != null) {

                              failCallback(err);

                            }

                          }

                        },

                        complete: function() {
                          wx.hideLoading();
                        }
                    })
                }
              })
          },
          error(e) {

            console.log(e.detail)

          },
       onLoad: function(options) {

            var that = this;
            var userId = options.userId;
            that.setData({
              userId: options.userId
            });
            console.log("人脸识别页面接收的参数：" + userId);

          }
      })