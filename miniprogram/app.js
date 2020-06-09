//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    this.globalData = {
      loginflag: true, //登录不显示
      attention: [] //用户的关注
    }

  },
  setGlobalFlag(flag) {
    this.globalData.loginflag = flag;
  },
  getGlobalFlag() {
    return this.globalData.loginflag
  },
  setGlobalAttention(params) {
    const {
      petid,
      data
    } = params;
    if (petid) {
      this.globalData.attention.forEach((el, index) => {
        console.log(el)
        if (item.petid == petid) {
          this.globalData.attention.splice(index, 1);
        } else {
          this.globalData.attention.push(el);

        }

      })
    }
    else{
      this.globalData.attention = data
    }

    console.log(this.globalData.attention)
  },
  getGlobalAttention() {
    console.log(this.globalData.attention)
    return this.globalData.attention
  },
  callAttention(params) {
    const {
      openid,
      kind
    } = params;
    wx.cloud.callFunction({
      name: getWhere,
      data: {
        collection: 'attention',
        condition: {
          openid: openid,
          kind: kind
        }
      },
      success: (res) => {
        console.log(res)
        return res.result.data
      }
    })
  }


})