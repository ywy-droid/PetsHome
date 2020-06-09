// miniprogram/pages/mineAdopt/mineAdopt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adoptlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'requestAdopt',
      data:{
        $url:'getMineAdopt'
      },
      success:(res)=>{
          console.log(res,"resmine");
        // const list = res.result.data.map((el)=>{
        //   return el.petsDetail
        // });


          this.setData({
            adoptlist:res.result.data
          })

          console.log(this.data.adoptlist,"adoptlist")
      },
      fail:(res)=>{
        console.log(res,"falilget")
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