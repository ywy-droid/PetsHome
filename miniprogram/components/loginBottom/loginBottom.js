// components/loginBottom/loginBottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
created:function(){
  console.log(this.properties.flag)
},
  /**
   * 组件的方法列表
   */
  methods: {
   
    onGetUserInfo(e) {
      console.log(e);
      if (e.detail.userInfo) {
        const {
          nickName,
          avatarUrl,
          province,
          city
        } = e.detail.userInfo;
        // console.log(nickName, avatarUrl, province, city)

        //通知父组件可以关闭 
       this.triggerEvent("loginSuccess",{"flag":true})
        //上传到userlist表
        wx.cloud.callFunction({
          name: 'login',
          data: {
            userName: nickName,
            userImg: avatarUrl
          },
          success: (res) => {
            console.log(res);
            wx.setStorageSync("openid", res.result.openid);
          },
          fail: (err) => {
            console.log(err);

          }
        })
      }
      else {
        //用户没有授权
        //通知父组件可以打开授权
        this.triggerEvent("loginFail", { "flag": true })
      }
    }
  }
})
