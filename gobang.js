const ws = new WebSocket("ws://localhost:8080")
let list = []
ws.onopen = () => {
  console.log(`服务器连接`)
}
ws.onmessage = msg => {
  // console.log(`来自服务器端的数据`)
  list = JSON.parse(msg.data)
  render()
}
ws.onclose = () => {
  console.log("服务器关闭")
}
let canvas = document.getElementById('tutorial')
let ctx = canvas.getContext('2d')

for (let i = 1; i <= 15; i++) {
  ctx.beginPath()
  ctx.moveTo(20, 20 * i)
  ctx.lineTo(300, 20 * i)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(20 * i, 20)
  ctx.lineTo(20 * i, 300)
  ctx.stroke()
}

canvas.addEventListener('click', e => {
  let X = Math.round(e.layerX / 20) * 20
  let Y = Math.round(e.layerY / 20) * 20
  // 避免重新写入覆盖
  if (JSON.stringify(list).indexOf(JSON.stringify({
      x: X,
      y: Y
    })) != -1) return
  ctx.beginPath()
  ctx.arc(X, Y, 10, 0, 2 * Math.PI, false)
  ctx.fillStyle = list.length % 2 == 0 ? 'black' : 'white'
  ctx.fill()
  list.push({
    x: X,
    y: Y
  })
  ws.send(JSON.stringify(list));
})
document.getElementById('btn').addEventListener('click', e => {
  list.pop()
  ws.send(JSON.stringify(list));
})

function render() {
  ctx.clearRect(0, 0, 320, 320)
  for (let i = 1; i <= 15; i++) {
    // 横线
    ctx.beginPath()
    ctx.moveTo(20, 20 * i)
    ctx.lineTo(300, 20 * i)
    ctx.stroke()
    // 纵线
    ctx.beginPath()
    ctx.moveTo(20 * i, 20)
    ctx.lineTo(20 * i, 300)
    ctx.stroke()
  }
  list.forEach((item, index) => {
    ctx.beginPath()
    ctx.arc(item.x, item.y, 10, 0, 2 * Math.PI, false)
    ctx.fillStyle = index % 2 == 0 ? 'black' : 'white'
    ctx.fill()
  })
}