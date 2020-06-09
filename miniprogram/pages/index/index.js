// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adoptlist: [],
    seekpets: [],
    naviList: [{
      id: "a",
      name: "主子日记"
    }, {
      id: "b",
      name: "领养主子"
    }, {
      id: "c",
      name: "寻找主子"
    }, {
      id: "d",
      name: "主子百科"
    }],
    naviIndex: 1, //navi scroll 当前点击
    scrollTp: 0,
    timer: []
    
  },
 onShow(){
   console.log('show')
 },
 
  computed: {
    'flag': function () {
      // this.setData({
      //   flag:app.getGloblaFlag()
      // })
      console.log(app.getGloblaFlag,"flag")
      return app.getGloblaFlag()
    }
  }
  ,
  onLoad() {
    console.log('cominytgrfcdibnjkjo');
    wx.showLoading({
      title: 'wow~ ⊙o⊙'
    });
    this.getadoptlist();
    this.getseekpets();
  },

  Itemhandel(e) {
    // console.log(e);
    this.setData({
      naviIndex: `${e.currentTarget.dataset.index}`
    })
    // console.log( typeof this.data.naviIndex)
  },
  backHandel() {
   wx.pageScrollTo({
     scrollTop: 0,
     duration: 1000,
   })
  },
 
  getadoptlist: function() {
    //获得adopt列表
    wx.cloud.callFunction({
      name: "getList",
      data: {
        start: this.data.adoptlist.length,
        count: 6,
        $url: "getAdoptList"
      }
    }).then((res) => {
      this.setData({
        adoptlist: this.data.adoptlist.concat(res.result.data)
      })
      wx.hideLoading();
      this.data.adoptlist
      wx.setStorageSync("adoptlist", this.data.adoptlist)
      if (res.result.data.length < 1) {
        wx.showModal({
          title: '没有更多小宝贝啦',
          content: '',
        })
      }
      // console.log(this.data.adoptlist);
    }).catch((err) => {
      console.log(err, "出错啦");
      wx.hideLoading();
    })

  },
  getseekpets: function() {
    wx.showLoading({
      title: 'wow~ ⊙o⊙',
    });
    // 获得seekpets列表
    wx.cloud.callFunction({
      name: "getList",
      data: {
        start: this.data.seekpets.length,
        count: 6,
        $url: "getSeekpetsList"
      }
    }).then((res) => {
      this.setData({
        seekpets: this.data.seekpets.concat(res.result.data)
      })
      wx.setStorageSync("seekpets",this.data.seekpets)
      console.log(res.result.data.length)
      if (res.result.data.length < 1) {
        wx.showModal({
          title: '没有更多小宝贝咯',
          content: '',
        })
      }
      wx.hideLoading();
      // console.log(this.data.seekpets, "seek");
    })
  },
  onReachBottom: function() {
    console.log('comin')
    wx.showLoading({
      title: '(～￣(OO)￣)ブ',
    })
    if (this.data.naviIndex == 1) {

      this.getadoptlist();
    }
    if (this.data.naviIndex == 2) {
      this.getseekpets();
    }
  }
})