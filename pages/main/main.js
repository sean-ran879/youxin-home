wx.getLocation({
  success: function(res) {
    var latitude = res.latitude;
    var longitude = res.longitude;
    var address= "经纬度：" + longitude + ", " + latitude;
  },
  fail() {
  wx.showModal({
   title: '提醒',
   content: '您拒绝了位置授权，将无法使用大部分功能，点击确定重新获取授权',
   success(res) {
   //如果点击确定
   if (res.confirm) {
    wx.openSetting({
    success(res) {
     //如果同意了位置授权则userLocation=true
     if (res.authSetting["scope.userLocation"]) {
     that.onLoad()
     }
    }
    })
   }
   }
  })
  }
 })
Page({
  data:{
  
    // text:"这是一个页面"
    exchangeMoney : ' 1688 , 8888 , 8880',
    userPhone:'0',
    contentNavs : [
      {
        leftImage : '../../images/investment3x.png',
        contentText : '项目投资',
        contentDesp : '收益稳定 期限灵活',
        url : '../login/login'
      },
      {
        leftImage : '../../images/investment3x.png',
        contentText : '我要借贷',
        contentDesp : '快速借贷 多样偿还',
        url: '../login/login'
      }
    ],
    bottomNavs : [
      {
        image : '../../images/investment_manage3x.png',
        contentText : '按日记息',
        // url: '../login/login'
      },
      {
        image : '../../images/bottom_borrow3x.png',
        contentText : '线上借款',
      
      },
      {
        image : '../../images/debt_manage3x.png',
        contentText : '身份认证',
       
      },
      {
        image : '../../images/transaction_record3x.png',
        contentText : '交易记录',
   
      },
      {
        image : '../../images/score_manage3x.png',
        contentText : '专属额度',
  
      },
      {
        image : '../../images/autotender3x.png',
        contentText : '实时审批',
 
      },
    ]
  },
  login: function () {
    wx.navigateTo({
      title: '登录',
      url: '../login/login?userPhone='+''
    });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});