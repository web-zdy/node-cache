const KKB = require('./kkb')
const app = new KKB()
require('./cache/client')
const Router = require('./router')
// const Koa = require('koa')
// const app = new Koa()

// app.use((req, res) => {
//   res.writeHead(200)
//   res.end('hi KKB')
// })

// app.use(ctx => {
//   ctx.body = 'hehe'
// })

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await next();
//   ctx.body += "4";
// });
// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

// 拦截要放在最前面才能拦截所有请求
app.use(require("./iptable"));
// 读取静态文件
const static = require('./static')
app.use(static(__dirname + '/public'));

const router = new Router();
router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => {
  ctx.req.addListener('data', (postDataChunk) => {
    console.log(ctx.req.url, '收到post数据 ---->', postDataChunk.toString())
    ctx.body = postDataChunk.toString()
  })
});

// 路由实例输出父中间件 router.routes()
console.log(router.routes())
app.use(router.routes());

// 函数数据缓存
const cache = require('./cache/cache')
app.use(cache('/api/data'))
// class数据缓存
// const Cache = require('./cache/cacheClass')
// const cache = new Cache('/api/data')
// app.use(cache.cacheApi)
app.listen(3000, '0.0.0.0', () => {
  console.log('监听端口3000');
})