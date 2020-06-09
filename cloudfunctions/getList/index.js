// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require("tcb-router");


cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const app = new tcbRouter({
    event
  });
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  });
  //新增关注表
  app.router('addAttention',async(ctx,next)=>{
    // event.attentionItem.openid = wxContext.OPENID;
    console.log(event)
    ctx.body = await db.collection('attention').add({ data: event.attentionItem}).then((res)=>{
      return res;
    })
  })
  
  
  //新增领养宠物表
  app.router('addAdoptList',async(ctx,next)=>{
    console.log(event)
    event.adoptlistItem.openid = wxContext.OPENID;
    ctx.body = await db.collection("adoptList").add(event.adoptlistItem).then((res) => {
      console.log(res, "ressss")
      return res
    })
    await next();
  })
  // 获取领养宠物列表
  app.router("getAdoptList",async (ctx,next)=>{
    console.log('adoptlist');
    ctx.body = await db.collection("adoptList").skip(event.start).limit(event.count).get().then((res)=>{
      console.log(res,"ressss")
      return res
    })
    await next();
  })

  app.router("addSeekpetsList", async (ctx, next) => {
    console.log(event)
    event.seekItem.openid = wxContext.OPENID;
    ctx.body = await db.collection("seekpets").add({data:event.seekItem}).then((res) => {
      return res
    })
    await next();
  })

  app.router("getSeekpetsList",async (ctx,next)=>{
    ctx.body = await db.collection("seekpets").skip(event.start).limit(event.count).get().then((res)=>{
      return res
    })
    await next();
  })

  return app.serve();
}