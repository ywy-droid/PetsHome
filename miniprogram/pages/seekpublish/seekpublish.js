const {
  arealist
} = require("../../asserts/area.js");
var changeValue;
var story;
var color;
var weixin;
var address;
var addressDetail;
var date;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [{
        name: "猫猫",
        value: '猫猫',
        checked: true
      },
      {
        name: "狗狗",
        value: '狗狗'
      },
      
      {
        name: "其他",
        value: '其他'
      }
    ],
    areaList: {},
    fileid: "",
    show: false, //控制地址选择框是否弹出
    timeshow: false, //控制时间是否弹出
    minDate: new Date(2000, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      // console.log(value,'日期')
      return value;
    }
  },

  confirm(event) {
    this.setData({
      currentDate: event.detail,
      timeshow: false
    });
    const riqi = new Date(event.detail);
    date = riqi.getFullYear() + '年' + (riqi.getMonth() + 1) + '月' + riqi.getDate() + '日';
    console.log(date, 'shijian')
  },
  cancel(event) {
    this.setData({
      currentDate: '',
      timeshow: false
    });
    date = '';
  },
  /**
   * 生命周期函数--监听页面加载
   */
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
          cloudPath: 'petshomePic/seekpetsPic/' + "seekpetsPic" + new Date().getTime(),
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

  getRadio(e) {
    changeValue = e.detail.value;
    console.log(e.detail)
    const items = this.data.type;
    for (var h = 0; h < items.length; h++) {
      items[h].checked = items[h].value === changeValue;
    }
    this.setData({
      type: items
    });
    console.log(this.data.type, "type");

  },

  getStory(e) {
    story = e.detail.value;
    console.log(story);
  },

  getInfo(e) {
    console.log(e, "eeeeee")
    console.log(e.currentTarget.id, "id")
    if (e.currentTarget.id == 'color') {
      color = e.detail.value;
      console.log(color)
    }
    if (e.currentTarget.id == 'addressDetail') {
      addressDetail = e.detail.value;
    }
    if (e.currentTarget.id == 'weixin') {
      weixin = e.detail.value;
      console.log(weixin)

    }
  },
  showPopup() {
    this.setData({
      show: true
    })
  },
  showTimePopup() {
    this.setData({
      timeshow: true
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
    var typeObj =  this.data.type.filter((el)=>{
      return el.checked==true
    })
    console.log(typeObj)
    var seekItem = {};
    seekItem.color = color;
    seekItem.type = typeObj[0].value;
    seekItem.desc = story;
    seekItem.imgsrc = this.data.fileid;
    seekItem.losttime = date;
    seekItem.address = address+addressDetail;
    seekItem.weixin = weixin;
    console.log(seekItem,"item");
    wx.cloud.callFunction({
      name:'getList',
      data:{
        $url:'addSeekpetsList',
        seekItem: seekItem
      },
      success:(res)=>{
        console.log(res,"res")
      },
      fail:(res)=>{
        console.log(res,"res")
      }
    })
    wx.navigateBack({
      delta: 1
    })
  }
  ,
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