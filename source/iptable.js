module.exports = async function (ctx, next) {
  const { res, req } = ctx
  const blackList = ['127.0.1.1']
  const ip = getClientIP(req)

  if (blackList.includes(ip)) {
    ctx.body = 'not allowed'
  } else {
    await next()
  }
}

function getClientIP (req) {
  // console.log('req ip:', (
  //   req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
  //   req.connection.remoteAddress ||   // 判断 connection 的远程 IP
  //   req.socket.remoteAddress ||       // 判断后端的socket的IP
  //   req.connection.socket.remoteAddress
  // ));

  return (
    req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
    req.connection.remoteAddress ||   // 判断 connection 的远程 IP
    req.socket.remoteAddress ||       // 判断后端的socket的IP
    req.connection.socket.remoteAddress
  )
}