var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
Page({
      data: {
        url: app.globalData.url,
        tabs: ["修改登录密码", "修改交易密码", "修改手机号"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        //修改登录密码
        newPassWord: '',
        passWord: '',
        //修改交易密码
        transPw: '',
        newPw1: '',
        newPw2: '',
        transName: '',
        cardId: '',
        //修改手机号
        userPhone: '',
        newPhone: '',
        name: '',
        userId: 0

      },
      onLoad: function(options) {
        var that = this;

        var userId = options.userId
        that.setData({
          userId: userId
        });
        wx.getSystemInfo({
          success: function(res) {
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
        wx.request({
          url: that.data.url + "/user/getById",
          method: 'GET',
          data: {
            userId:userId
          },
          header: {
            "Content-Type": "json"
          },
          success: function (res) {
            var list = res.data.success;
            that.setData({
              userPhone: list['userPhone']
            });
          },
        })
      },
      tabClick: function(e) {
        this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
        });
      },
      getName: function(e) {
        this.setData({
          name: e.detail.value
        });
      },
      getNewPhone: function(e) {
        this.setData({
          newPhone: e.detail.value
        })
      },
      getCardId: function(e) {
        this.setData({
          cardId: e.detail.value
        })
      },
      getTransName: function(e) {
        this.setData({
          transName: e.detail.value
        })
      },
      getNewPw1: function(e) {
        this.setData({
          newPw1: e.detail.value
        })
      },
      getNewPw2: function(e) {
        this.setData({
          newPw2: e.detail.value
        })
      },
      getTransPw: function(e) {
        this.setData({
          transPw: e.detail.value
        })
      },
      getNewPassWord: function(e) {
        this.setData({
          newPassWord: e.detail.value
        })
      },
      getPassWord: function(e) {
        this.setData({
          passWord: e.detail.value
        })
      },
      btn1: function() {
        var that = this;
        var passWord = that.data.passWord;
        var newPassWord=that.data.newPassWord;

        if (passWord == '') {
          wx.showModal({
            title: '提示',
            content: '请输入新密码!'
          })
        } else if (newPassWord == '') {
          wx.showModal({
            title: '提示',
            content: '请再次输入密码！'
          })
        } else if (passWord == newPassWord) {

          wx.request({
            url: that.data.url + "/user/updatePassWord",
            method: 'GET',
            data: {
              passWord: passWord,
              userId: that.data.userId
            },
            header: {
              "Content-Type": "json"
            },
            success: function(res) {
              var list = res.data.success;
              if (list == 'success') {
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                })
                wx.navigateTo({
                  url: '../my/updatePassword?userId=' + that.data.userId,
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '修改识别，请查看姓名是否正确！',
                })
              }
            },
          })
        } else {
          console.log("1111"+passWord);
          console.log("1111" +newPassWord);
          wx.showModal({
            title: '提示',
            content: '两次密码不一致!',
          })
        }

      },
      btn2: function() {
        var that = this;
        var transPw = that.data.transPw;
        var newPw1 = that.data.newPw1;
        var newPw2 = that.data.newPw2;
        var name = that.data.transName;
        var cardId = that.data.cardId;
        if (transPw == '') {
          wx.showModal({
            title: '提示',
            content: '请输入原交易密码!'
          })
        } else if (newPw1 == '') {
          wx.showModal({
            title: '提示',
            content: '请输入新交易密码！'
          })
        } else if (newPw2 == '') {
          wx.showModal({
            title: '提示',
            content: '请再次输入新交易密码！'
          })
        } else if (name == '') {
          wx.showModal({
            title: '提示',
            content: '请输入真实姓名！'
          })
        } else if (cardId == '') {
          wx.showModal({
            title: '提示',
            content: '请输入身份证号！'
          })
        } else if (newPw1 == newPw2) {
          wx.request({
            url: that.data.url + "/user/updateTransPw1",
            method: 'GET',
            data: {
              transPw: transPw,
              newPw1: newPw1,
              name: name,
              userId: that.data.userId,
              cardId: cardId
            },
            header: {
              "Content-Type": "json"
            },
            success: function(res) {
              var list = res.data.success;
              if (list == 'success') {
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                })
                wx.navigateTo({
                  url: '../my/updatePassword?userId=' + that.data.userId,
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: list
                })
              }
            },
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '两次密码不一致!',
          })
        }
      },
      btn3: function() {
        var that = this;
        var phone = that.data.newPhone;
        var name = that.data.name
        if (phone == '') {
          wx.showModal({
            title: '提示',
            content: '请输入新手机号!'
          })
        } else if (name == '') {
          wx.showModal({
            title: '提示',
            content: '请输入真实姓名!'
          })
        } else if(phone==that.data.userPhone){
          wx.showModal({
            title: '提示',
            content: '更换手机号冲突！'
          })
        }
        else {
          wx.request({
            url: that.data.url + "/user/updatePhone",
            method: 'GET',
            data: {
              phone: phone,
              name: name,
              userId: that.data.userId,

            },
            header: {
              "Content-Type": "json"
            },
            success: function(res) {
              var list = res.data.success;
              if (list == 'success') {
                wx.showModal({
                  title: '提示',
                  content: '修改成功',
                })
                wx.navigateTo({
                  url: '../my/updatePassword?userId=' + that.data.userId,
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: list
                })
              }
            },
          })
        }
      }
});