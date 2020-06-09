// miniprogram/pages/adopterInfo/adopterInfo.js

const {
  arealist
} = require("../../asserts/area.js");
var changeValues = [];
var changeValue;
var adopterindex;
var address;
var adoptItem ;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adopterInfo: [{
        title: '我是谁',
        radios: [{
          value: '麻麻',
          name: '麻麻',
          checked: true
        }, {
          value: '粑粑',
          name: '粑粑'
        }]
      },
      {
        title: '我多大了',
        radios: [{
          value: '60后',
          name: '60后',
          checked: true
        }, {
          value: '70后',
          name: '70后'
        }, {
          value: '80后',
          name: '80后'
        }, {
          value: '90后',
          name: '90后'
        }, {
          value: '00后',
          name: '00后'
        }]
      },
      {
        title: '工作状态',
        radios: [{
          value: '无业',
          name: '无业',
          checked: true
        }, {
          value: '学生',
          name: '学生'
        }, {
          value: '工作',
          name: '工作'
        }, {
          value: '退休',
          name: '退休'
        }]
      },
      {
        title: '养宠经验',
        radios: [{
          value: '有经验',
          name: '有经验',
          checked: true
        }, {
          value: '无经验',
          name: '无经验'
        }]
      },
      {
        title: '婚姻状况',
        radios: [{
          value: '单身',
          name: '单身',
          checked: true
        }, {
          value: '恋爱',
          name: '恋爱'
        }, {
          value: '已婚',
          name: '已婚'
        }]
      },
      {
        title: '住房情况',
        radios: [{
          value: '自住房',
          name: '自住房',
          checked: true
        }, {
          value: '整租',
          name: '整租'
        }, {
          value: '合租',
          name: '合租'
        }]
      },
      {
        title: '原住民',
        radios: [{
          value: '猫猫',
          name: '猫猫',
          checked: true
        }, {
          value: '狗狗',
          name: '狗狗'
        }, {
          value: '猫狗',
          name: '猫狗'
        }, {
          value: '无',
          name: '无'
        }]
      },
      {
        title: '我的收入',
        radios: [{
          value: '<3千',
          name: '<3千',
          checked: true
        }, {
          value: '3千',
          name: '3千'
        }, {
          value: '6千-1万',
          name: '6千-1万'
        }, {
          value: '1万+',
          name: '1万+'
        }]
      },
    ],
    areaList: {},
    aopterData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options,"options")
    // console.log(arealist);
    this.setData({
      areaList: arealist
    })
     const adoptlist = wx.getStorageSync("adoptlist");
     adoptItem = adoptlist[options.adoptindex];
    //  console.log(adoptItem,"items");
  },


  confirmHandel(data) {
     address = data.detail.values[0].name + data.detail.values[1].name + data.detail.values[2].name;
    this.selectComponent('.area').reset();
  },
  cancelHandel(){
    this.selectComponent('.area').reset();
  },
  radioChange(e) {
    console.log('radio触发')
    changeValue = e.detail.value;
  },
  getIndexHandel(e){
    console.log('触发');
    adopterindex = Number(e.currentTarget.id)
  },
  compeleteHandel(){
    //发送数据
    const openid = wx.getStorageSync("openid");
    const adopterEvent = {}
    const datas = this.data.adopterInfo;
    const items = datas[adopterindex].radios;
    for (var h = 0; h < items.length;h++){
      items[h].checked = items[h].value === changeValue;
    }
    datas[adopterindex].radios = items;

    // console.log(datas);
    this.setData({
      adopterInfo:datas
    });
  // console.log(this.data.adopterInfo)


    var radiosData=[];
    for (var n = 0; n < datas.length; n++) {
      radiosData = radiosData.concat(datas[n].radios)
    };
    // console.log(radiosData,"shuzu ")
    const datalist =   radiosData.filter((el=>{
      return el.checked==true
    }))
  //  console.log(datalist,"datalist")
    //跳转页面

    adopterEvent.adopterSex = datalist[0].value;
    adopterEvent.adopterAge = datalist[1].value;
    adopterEvent.adopterWorkstate = datalist[2].value;
    adopterEvent.adopterExperience =  datalist[3].value;
    adopterEvent.adopterWedding = datalist[4].value;
    adopterEvent.adopterLive = datalist[5].value;
    adopterEvent.adopterPets = datalist[6].value;
    adopterEvent.adopterSalary = datalist[7].value;
    adopterEvent.address = address;
    adopterEvent.adoptOpenid = openid;
    adopterEvent.petsDetail = adoptItem;
    adopterEvent.adoptFlag = false;

    //调用云函数 存储请求数据
    wx.cloud.callFunction({
      name:"requestAdopt",
      data:{
        $url:'requestAdopt',
        adopterEvent
      },
      success:(res)=>{
          console.log(res,"resrequst");
      },
      fail:(res)=>{
        console.log(res,"failadd")
      }
    })


    //跳转到首页
    wx.navigateBack({
      delta:2
    })


  },
  
})