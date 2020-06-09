// 云函数入口文件
const cloud = require('wx-server-sdk')
const tcbRouter = require("tcb-router");

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  const wxContext = cloud.getWXContext();
  const app = new tcbRouter({event});
  app.router("requestAdopt", async (ctx, next) => {
    ctx.body = await db.collection('adoptRquest').add({data:event.adopterEvent}).then((res)=>{
      return res;
    });
  })
  console.log(wxContext.OPENID, typeof wxContext.OPENID,"openid")
  app.router("getMineAdopt",async(ctx,next)=>[
    ctx.body = await db.collection('adoptRquest').where({
      adoptOpenid: wxContext.OPENID,
      adoptFlag:true
    }).get({
      success:(res)=>{
        return res;
      }
    })
  ])
  return app.serve()
}