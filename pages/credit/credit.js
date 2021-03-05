Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageStatus:0,
    photos: "/images/zm.png",
    photos2: "/images/fm.png",
    userId: 0,
    imgdata: '',
    status: 0,
    status2: 0 //身份证
    // photos: "/images/identity-zm.png",
    // photos2: "/images/identity-fm.png",
  },
  //上传身份证
  touchphoto: function(e) {
    var that = this
    var no = e.currentTarget.id;
    if (no == "1") {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          that.setData({
            photos: tempFilePaths,
            status2: 1
          })
          that.upLoadImg(tempFilePaths, 'card_user')
        }
      })
    } else if (no == "2") {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          that.setData({
            photos2: tempFilePaths,
            status: 1
          })
        }
      })
    }
  },
  upLoadImg: function(list, type) {
    var that = this;
    this.upload(that, list, type);
  },
  //多张图片上传
  upload: function(page, path, type) {
    var that = this;
    var curImgList = [];
    for (var i = 0; i < path.length; i++) {
      wx.showToast({
          icon: "loading",
          title: "正在上传"
        }),
        wx.uploadFile({
        url: "http://192.168.71.1:8081/upload/picture", //接口处理
          filePath: path[0],
          name: 'files',
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            userId: this.data.userId,
            photoType: 0
          },
          success: function(res) {
            var text;
            var imgdata1 = JSON.parse(res.data);
            if (imgdata1['number'] != '0') {
              console.log(imgdata1);
              var s = JSON.stringify(imgdata1)
              that.setData({
                imgdata: s
              })
            } else {
              text = '请上传正确的身份证照片';
              console.log(text);
              wx.showModal({
                title: '提示',
                content: text,
                showCancel: false
              })
            }
            if (res.statusCode != 200) {
              wx.showModal({
                title: '提示',
                content: '上传失败',
                showCancel: false
              })
              return;
            }
            var data = res.data

            page.setData({ //上传成功修改显示头像
              src: path[0]
            })
          },
          fail: function(e) {
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          },
          complete: function() {
            wx.hideToast(); //隐藏Toast
          }
        })
    }
  },

  submitclick: function(e) {
    var text;
    if (this.data.status == 0 || this.data.status1 == 0) {
      text = "请上传身份证照片!"
      wx.showModal({
        title: '提示',
        content: text,
        showCancel: false
      })
    } else {
      wx.navigateTo({
        url: '../cardOcr/cardOcr?imgdata=' + this.data.imgdata + '&userId=' + this.data.userId+'&pageStatus='+this.data.pageStatus,
      })
    }
  },
  onLoad: function(options) {
    var that = this;
    var pageStatus=options.pageStatus
    that.setData({
      userId: options.userId,
      pageStatus:pageStatus
    });
    // that.getusercard();
    console.log('参数值：' + options.userId);
  },

})