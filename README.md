# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 组件
npm init  
wx-server-sdk  
vant 组件 npm i @vant/weapp -S --production

滚动条
if (wx.pageScrollTo) {
    wx.pageScrollTo({
      scrollTop: 0,
      goTopHidden: false
    })



弹框后机制滚动
catchtouchmove="preventTouchMove"

hidden 加载父组件上不会由作用 只有在vieW上才有效
<view hidden="true">
<loginBar class="loginbar" >
  
</loginBar>
</view>


options: {
    // 组件样式隔离   允许页面样式影响组件样式  isolated 隔离互不影响   shared互相影响  apply-shared 页面影响组件 组件不影响页面        
    styleIsolation: 'apply-shared',
    // 具名插槽   支持多个插槽
    multipleSlots:true
  },