const { Client } = require('pg')

module.exports.hello = async (event) => {
  const client = new Client()
  await client.connect()

  const res = await client.query('SELECT NOW()')
  await client.end()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Database time is ${res.rows[0]}`,
      input: event
    }, null, 2)
  }
}
