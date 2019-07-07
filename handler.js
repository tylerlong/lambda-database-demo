const { Client } = require('pg')
const serverlessHTTP = require('serverless-http')
const express = require('express')
const axios = require('axios')

const app = express()

app.get('/hello', async (req, res) => {
  const client = new Client(`postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/dbname`)
  await client.connect()

  const r = await client.query('SELECT NOW()')
  await client.end()

  res.json(r.rows[0].now)
})

app.get('/world', async (req, res) => {
  res.send('666')
})

app.get('/db-uri', async (req, res) => {
  res.send(process.env.RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI)
})

app.get('/bot-server', async (req, res) => {
  res.send(process.env.RINGCENTRAL_CHATBOT_SERVER)
})

app.get('/baidu', async (req, res) => {
  const r = await axios.get('http://baidu.com')
  res.send(r.data)
})

module.exports.app = serverlessHTTP(app)
