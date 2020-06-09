// components/seekDetail/seekDetail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      
    seekpets: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },


  created() {
    console.log(this.properties.seekpets,"1223-15252")
  },
  methods:{
    morehandel(e) {
      console.log(e)
      const seekid = e.currentTarget.id;
      wx.navigateTo({
        url: `/pages/seekInfo/seekInfo?seekid=${seekid}`,
      })
    }
 }
 

})
