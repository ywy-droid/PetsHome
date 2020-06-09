// components/nivigationbar.js
const app = getApp(); //调用app的数据
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    adoptlist: {
      type: Array,
      observer: function() {
        console.log('cccccc')
        if (this.data.attentionFlag) {
          this.initAttention();
        } else {
          this.setData({
            adoptList: this.data.adoptlist
          })
        }
        console.log(this.data.adoptList)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indx: -1, //当前点击跳转到详细索引
    cherishId: -2, //当前点击的收藏索引
    cherishInx: [] //收藏的索引
      ,
    flag: true,
    attentionFlag: false,
    adoptList: []
  },
  created() {
    //获取关注数据
    wx.cloud.callFunction({
      name: 'insertUser',
      data: {},
      success: (res) => {
        console.log('succ')
        console.log(res);
        //  this.globalData.attention = res.result.data;
        app.setGlobalAttention({
          petid: '',
          data: res.result.data
        })

      },
      fail: (res) => {
        console.log('fal')
        console.log(res)
      }
    })
  },
  /**
   * 组件的方法列表
   */


  methods: {

    morehandel(e) {

      // console.log(e)
      this.setData({
        indx: e.currentTarget.id
      })



      

      const petid = e.currentTarget.dataset.petid;
      //  console.log(id,userid)
      wx.navigateTo({
        url: `/pages/adoptDetail/adoptDetail?adoptIndx=${this.data.indx}&userId=${petid}`,
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    },
    goadoptDetail() {

    },
   
    cherishHandel(e) {
      console.log(e, "eeee")
      const id = Number(e.currentTarget.id)
      // 判断是否登录 没有登录 loginflag false显示登录模拟【快
      if (!this.data.attentionFlag) {

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
                attentionFlag: true
              })
              this.initAttention()

            } else {
              console.log('meiyou shouqaun ')
              //未授权
              //授权模态框打开
              this.setData({
                flag: false,

              })
              console.log('打开', this.data.flag)

            }
          },
          fail: () => {}
        })
      } else {
        const datas = this.data.adoptList;
        datas[id].flag = !datas[id].flag;
        this.setData({
          adoptList: datas
        })
      }

    },
    onLoginSuccess(data) {
      console.log(data);
      this.setData({
        flag: data.detail.flag,
        attentionFlag: true
      })
      //登陆成功  修改adoptlist中的关注flag




    },
    onLoginFail(data) {
      this.setData({
        flag: data.detail.flag,
        attentionFlag: false
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
        fail: () => {},
        complete: () => {}
      });
    },
    initAttention() {
      console.log('sdctfvgbhnjgh')
      var att = "";
      app.getGlobalAttention().forEach(el => {
        att = att + '.' + el.petid;
      })
      this.setData({
        cherishInx: att
      })
      console.log(this.data.cherishInx);
      var aplist = this.data.adoptlist
      aplist.forEach((el) => {
        if (this.data.cherishInx.indexOf(el._id) == -1) {
          el.flag = false;

        } else {
          el.flag = true;
        }

      })
      console.log(aplist)
      this.setData({
        adoptList: aplist
      })
      console.log(this.data.adoptList)
    }
  },

})