let cache = {}

const startTime = (time) => {
  return formatTime(new Date(time).setHours(0, 0, 0, 0))
}

const formatTime = (time) => {
  return Math.round(time / 1000)
}

const setIntervalClearCache = () => {
  return setInterval(() => {
    if (startTime(new Date()) === formatTime(new Date().getTime())) {
      cache = null
    }
  }, 1000);
}


const getData = (key) => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(key)
    }, 200);
  })
}

module.exports = (path = '/') => {
  return async (ctx, next) => {
    let index = ctx.url.indexOf(path)
    let start = new Date().getTime()
    if (index > -1) {
      let key = ctx.url.slice(index + path.length + 1, ctx.url.length),
        res = '',
        isHasCache = cache[key] ? true : false
      if (isHasCache) {
        res = cache[key]
      } else {
        try {
          res = await getData(key)
          cache[key] = res
        } catch (error) {
          res = '500 服务端异常'
          console.log(error)
        }
      }
      let end = new Date().getTime()
      console.log(`服务端收到${ctx.req.method}请求： ${ctx.url} ${isHasCache ? '缓存' : '接口'} 耗时 ${end - start}ms`)
      ctx.body = res
    } else {
      await next()
    }
  }
}


setIntervalClearCache()