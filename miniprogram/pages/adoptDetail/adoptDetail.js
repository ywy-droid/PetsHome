// miniprogram/pages/adoptDetaiil/adoptDetail.js
var adoptIndx;
var petid;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adoptItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const adoptlist = wx.getStorageSync("adoptlist");
    
   
      if(options.petid){
        petid = options.petid;
        const item = adoptlist.filter((el)=>{
          return el._id == petid
        })
        console.log(item[0],"item");
        this.setData({
          adoptItem:item[0]
        })
      }
      else{
       adoptIndx = options.adoptIndx;
        this.setData({
          adoptItem: adoptlist[adoptIndx]
        })
      }
   
    // console.log(this.data.adoptItem,"item"); 
    // this.setData({
    //   adoptIndx,
    //   userId
    // });

  },


    requestAdopt: function () {
      //请求领养
      //拿到数据 用户openid 用户自身条件 宠物item  请求表
      //跳转到完善信息页面  
      wx.navigateTo({
        url: `/pages/adopterInfo/adopterInfo?adoptindex=${adoptIndx}`,
      })
    }
,

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