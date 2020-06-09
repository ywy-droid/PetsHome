// components/loginBar/loginBar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    flag:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  }
  , options: {
    // 组件样式隔离   允许页面样式影响组件样式  isolated 隔离互不影响   shared互相影响  apply-shared 页面影响组件 组件不影响页面        
    styleIsolation: 'apply-shared',
    // 具名插槽   支持多个插槽
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 阻止
    preventTouchMove() {

    },
    login() {
      //拿到openid
      // wx.getUserInfo({
      //  success:(res)=>{
      //    console.log(res,"userinfo");
    //   }
    //  })
    }
  }
})