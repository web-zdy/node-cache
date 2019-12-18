const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  const start = new Date().getTime()
  console.log(`start ${ctx.url}`);
  await next()
  const end = new Date().getTime()
  console.log(`请求${ctx.url} 耗时${parseInt(end - start)}`)
  console.log('============')
})

app.use((ctx, next) => {
  ctx.body = [
    {
      name: 'jerry'
    }
  ]
})

app.listen(3000)