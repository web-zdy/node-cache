class Cache {
  constructor(path = '/') {
    this.path = path
    this.cache = {}
    this.setIntervalClearCache()
  }

  startTime = (time) => {
    return this.formatTime(new Date(time).setHours(0, 0, 0, 0))
  }

  formatTime = (time) => {
    return Math.round(time / 1000)
  }

  getData = async (key) => {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove(key)
      }, 200);
    })
  }

  setCache = (key, val) => {
    this.cache[key] = val
  }

  getCache = (key) => {
    return (this.cache && this.cache[key]) || ''
  }

  clearCache = () => {
    this.cache = {}
    console.log('定时清除缓存')
  }

  setIntervalClearCache = () => {
    let vm = this
    return setInterval(() => {
      if (vm.startTime(new Date()) === vm.formatTime(new Date().getTime())) {
        vm.clearCache()
      }
    }, 1000);
  }

  cacheApi = async (ctx, next) => {
    let index = ctx.url.indexOf(this.path)
    let start = new Date().getTime()
    if (index > -1) {
      let key = ctx.url.slice(index + this.path.length + 1, ctx.url.length),
        res = '',
        isHasCache = this.getCache(key) ? true : false
      if (isHasCache) {
        res = this.getCache(key)
      } else {
        try {
          res = await this.getData(key)
          this.setCache(key, res)
        } catch (error) {
          res = '500 internal server error'
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

module.exports = Cache