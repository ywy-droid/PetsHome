// miniprogram/pages/seekDetail/seekDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seekItem:{},
    concat:'',
    flag: true,
    showFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const seekData = wx.getStorageSync('seekpets');
    const seekItemData =  seekData.filter((el)=>{
      return el._id == options.seekid
    })
    // console.log(seekItem,"item");
    this.setData({
      seekItem: seekItemData[0]
    });

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
            }
          })
          this.setData({
            flag: true,
            showFlag:false
          })
          

        } else {
          console.log('meiyou shouqaun ')
          //未授权
          //授权模态框打开
          this.setData({
            flag: false,
            showFlag:true
          })
          console.log('打开', this.data.flag)
        }
      },
      fail: () => {
      }
    })

  },

  onLoginSuccess(data) {
    console.log(data);
    this.setData({
      flag: data.detail.flag,
      showFlag:false
    })
    // this.data
  },
  onLoginFail(data) {
    this.setData({
      flag: data.detail.flag,
      showFlag: true
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