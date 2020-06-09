// miniprogram/pages/mineAttention/mineAttention.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attentionlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync("openid");
    console.log(openid,"attention")
    wx.cloud.callFunction({
      name: 'getWhere',
      data: {
        $url:'getMineseek',
        collection:'attention',
       condition:{
         openid: openid
       }
      },
      success: (res) => {
        console.log(res, "resmine");
        this.setData({
          attentionlist: res.result.data
        })

        console.log(this.data.attentionlist, "attentionlist")
      },
      fail: (res) => {
        console.log(res, "falilget")
      }
    })
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