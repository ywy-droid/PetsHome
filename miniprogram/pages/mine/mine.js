// miniprogram/pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true //控制登录显示
    ,
    avatarUrl:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */                                                        
  onLoad: function() {
    console.log('ssss')
    wx.getSetting({
      success: (res) => {
        console.log(res, "setting");
        if (res.authSetting['scope.userInfo']) {
          //已授权 获取信息
          wx.getUserInfo({
            withCredentials: 'false',
            lang: 'zh_CN',
            timeout: 10000,
            success: (res) => {
              console.log(res, "用户信息")
              this.setData({
                avatarUrl:res.userInfo.avatarUrl,
                name:res.userInfo.nickName
              })
            }
          })
          this.setData({
            flag:true
          })

        } else {
          console.log('meiyou shouqaun ')
          //未授权
          //授权模态框打开
          this.setData({
            flag: false
          })
          console.log('打开')
         
        }
      },
      fail: () => {
      }
    })
  },


  onLoginSuccess(data){
      this.setData({
        flag: data.detail.flag
      })
  },
  onLoginFail(data){
    this.setData({
      flag: data.detail.flag
    })
    wx.showModal({
      title: '用户授权才能发布',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#1269db',
      success: (result) => {
        if (result.confirm) {

        }
      },
      fail: () => { },
      complete: () => { }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})