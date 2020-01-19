// const WebSocket = require('ws')
// const wss = new WebSocket.Server({ port: 8080 })

// let clients = [] // 实现广播;

// wss.on('connection', function connection(ws) {
//   clients.push(ws)
//   ws.on('message', function incoming(message) {
//     clients
//       .filter(client => {
//         return client.readyState === 1 // 筛选连接状态
//       })
//       .forEach(client => {
//         client.send(message)
//       })
//   })
// })
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080, clientTracking: true })
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(client => {
      client.send(message)
    })
  })
})
