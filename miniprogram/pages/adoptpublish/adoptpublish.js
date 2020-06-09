
const {
  arealist
} = require("../../asserts/area.js");
var address;
var weixin;
var age;
var name;
var story;
var changeValue;
var radioindex;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    donateList: [{
        name: 'type',
        radios: [{
            name: "大型犬",
            value: '大型犬',
            checked: true
          },
          {
            name: "中型犬",
            value: '中型犬'
          },
          {
            name: "小型犬",
            value: '小型犬'
          },
          {
            name: "迷你",
            value: '迷你'
          }
        ]
      },
      {
        name: 'sex',
        radios: [{
            name: "男孩",
            value: '男孩',
            checked: true
          },
          {
            name: "女孩",
            value: '女孩'
          }
        ]
      },

      {
        name: '是否驱虫',
        radios: [{
          name: "是",
          value: '已驱虫',
            checked: true
          },
          {
            name: "否",
            value: '未驱虫'
          }
        ]

      },
      {
        name: '是否绝育',
        radios: [{
            name: "是",
          value: '已绝育',
            checked: true
          },
          {
            name: "否",
            value: '未绝育'
          }
        ]
      },
      {
        name: '是否免疫',
        radios: [{
            name: "是",
            value: '已免疫',
            checked: true
          },
          {
            name: "否",
            value: '未免疫'
          }
        ]
      }
    ],
    ask: [{
        name: "仅限同城",
        value: '仅限同城'
      },
      {
        name: "适龄绝育",
        value: '适龄绝育'
      },
      {
        name: "接受家访",
        value: '接受家访'
      },
      {
        name: "文明养宠，出门牵绳，科学喂养",
        value: '文明养宠，出门牵绳，科学喂养'
      },
      {
        name: "迷你",
        value: '迷你'
      },
      {
        name: "有防盗门、纱窗护网",
        value: '有防盗门、纱窗护网'
      },
      {
        name: "免费，无偿领养前取得家人的同意。不离不弃，有病就医，不虐待，不买卖。按时打疫苗。工作稳定，有一定经济基础。",
        value: '免费，无偿领养前取得家人的同意。不离不弃，有病就医，不虐待，不买卖。按时打疫苗。工作稳定，有一定经济基础。'
      },
      {
        name: "凭自有产权房产证办理狗证，不低于皇家狗粮，不得转送，转送需得到送养人同意。违反协议需积极沟通协商解决，协商不成按违约金赔偿。领养前取得家人的同意。不离不弃，有病就医，不虐待，不买卖。按时打疫苗。工作稳定，有一定经济基础。",
        value: "凭自有产权房产证办理狗证，不低于皇家狗粮，不得转送，转送需得到送养人同意。违反协议需积极沟通协商解决，协商不成按违约金赔偿。领养前取得家人的同意。不离不弃，有病就医，不虐待，不买卖。按时打疫苗。工作稳定，有一定经济基础。"

      }
    ],
    show: false //控制地址选择框是否弹出
      ,
    areaList: {},
    fileid: ''
  }

  ,

  onLoad: function(options) {
    this.setData({
      areaList: arealist
    })
  },
  addImg() {
    //添加图片
    wx.chooseImage({
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: 'petshomePic/'+new Date().getTime(),
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          // 成功回调
          success: res => {
            console.log('上传成功', res);
            this.setData({
              fileid: res.fileID
            })
          },
          fail: res => {
            console.log('上传失败', res)
          }
        })
      },
    })
  },
  getRadio(e){
    changeValue = e.detail.value;
  }
  ,
  getIndexHandel(e) {
    console.log('触发');
    radioindex = Number(e.currentTarget.id);
    const datas = this.data.donateList;
    const items = datas[radioindex].radios;
    for (var h = 0; h < items.length; h++) {
      items[h].checked = items[h].value === changeValue;
    }
    datas[radioindex].radios = items;
    this.setData({
      donateList: datas
    });
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.ask
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      ask:items
    })
    console.log(this.data.ask,"ask")
  },
  getStory(e) {
    console.log(e.detail);
    story = e.detail.value;
  },
  getInfo(e) {
    console.log(e, "eeeeee")
    console.log(e.currentTarget.id, "id")
    if (e.currentTarget.id == 'name') {
      name = e.detail.value;
    }
    if (e.currentTarget.id == 'age') {
      age = e.detail.value;
    }
    if (e.currentTarget.id == 'weixin') {
      weixin = e.detail.value;
    }
  },
  showPopup() {
    this.setData({
      show: true
    })
  },

  confirmHandel(data) {
    address = data.detail.values[0].name + data.detail.values[1].name + data.detail.values[2].name;
    console.log(address)
    this.setData({
      show: false
    })
    this.selectComponent('.area').reset();
  },
  cancelHandel() {
    this.setData({
      show: false
    })
    this.selectComponent('.area').reset();
  },

  publishHandel(){
    
//筛选radios checked 为true
    var radiosData = [];
    for (var n = 0; n < this.data.donateList.length; n++) {
      radiosData = radiosData.concat(this.data.donateList[n].radios)
    };
    // console.log(radiosData,"shuzu ")
    const datalist = radiosData.filter((el => {
      return el.checked == true
    }))
   console.log(datalist,"datalist")

   //筛选checkbox
   const checklist = this.data.ask.map((el)=>{
     if (el.checked == true){
       return el.value
     }
   })
   console.log(checklist,"checklist");
   //调用云函数  新增领养表
    var adoptlistItem={}
    adoptlistItem.address = address;
    adoptlistItem.age = age;
    adoptlistItem.deworming = datalist[2].value;
    adoptlistItem.feel = datalist[3].value;
    adoptlistItem.immunity = datalist[4].value;
    adoptlistItem.ask = checklist;
    adoptlistItem.imgsrc =this.data.fileid;
    adoptlistItem.name = name;
    adoptlistItem.weixin = weixin;
    adoptlistItem.sex = datalist[1].value;
    adoptlistItem.type = datalist[0].value;
    console.log(adoptlistItem,"aoditem")
    wx.cloud.callFunction({
      name: "getList",
      data: {
        $url: 'addAdoptList',
        adoptlistItem: adoptlistItem
      },
      success: (res) => {
        console.log(res, "resrequst");
      },
      fail: (res) => {
        console.log(res, "failadd")
      }
    })


  },
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