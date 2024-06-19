const { log } = require('console')
const { Socket } = require('dgram')
const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const fs = require('fs')

const app = express()

const server = http.createServer(app)

const scoketServer = new WebSocket.Server({ path: '/socket', port: '8090' })

scoketServer

app.get('/', (req, res) => {
  console.log(req.params);
  res.send({ msg: 'hello Traveler' })
})

server.listen(8091, () => {
  console.log('server is running at http://localhost:8091')
})