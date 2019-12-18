const axios = require('axios')

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

(function () {
  setInterval(async () => {
    let baseUrl = 'http://localhost:3000/api/data/'
    let url = baseUrl + 'get' + getRandomInt(10)
    axios({
      method: 'GET',
      url
    }).then((res) => {
      console.log('客户端收到应答：', res.status, res.data)
    })
  }, 200);
})()