const axios = require('axios')

;(async () => {
  const r = await axios.get('http://baidu.com')
  console.log(r.data)
})()
