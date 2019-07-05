const { Client } = require('pg')
const serverlessHTTP = require('serverless-http')
const express = require('express')

const app = express()

app.get('/hello', async (req, res) => {
  const client = new Client(`postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/dbname`)
  await client.connect()

  const r = await client.query('SELECT NOW()')
  await client.end()

  res.json(r.rows[0].now)
})

app.get('/world', async (req, res) => {
  res.send('888')
})

app.get('/db-uri', async (req, res) => {
  res.send(process.env.RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI)
})

app.get('/bot-server', async (req, res) => {
  res.send(process.env.RINGCENTRAL_CHATBOT_SERVER)
})

module.exports.app = serverlessHTTP(app)

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `I am an exceptional hello`
    }, null, 2)
  }
}
