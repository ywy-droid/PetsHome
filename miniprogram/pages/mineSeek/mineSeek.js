// miniprogram/pages/mineSeek/mineSeek.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seeklist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const openid = wx.getStorageSync('openid');

    wx.cloud.callFunction({
      name:'getWhere',
      data:{
        $url:"getMineseek",
        collection:'seekpets',
        condition:{
          openid: openid
        }
      },
      success:(res)=>{
        console.log(res);
        this.setData({
          seeklist:res.result.data
        })
      },
      fail:(res)=>{
        console.log(res)
      }
    })
  },

  closeHandel(e){
    const index = Number(e.currentTarget.id) ;
    const item = this.data.seeklist[index];
    const id = item._id;
    console.log(id);
    //调用云函数  删除此条数据
    wx.cloud.callFunction({
      name:'del',
      data:{
        collection:"seekpets",
        condition:{
          _id:id
        }
      },
      success:(res)=>{
        console.log(res,"res");
      },
      fail:(res)=>{
        console.log(res,"res");
      }
    })
    
    //删除seeklist本条数据
    this.data.seeklist.splice(index,1);
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