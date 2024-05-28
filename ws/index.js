let ws = require("ws")
const db = require("../db")
const server = new ws.Server({ port: 8000 })
let clients = []
let clientId = []
server.on("open", () => {
    console.log("WebSocket open")
})
server.on("close", () => {
    console.log("WebSocket close")
})
server.on("error", () => {
    console.log("WebSocket error")
})
server.on("connection", (ws, request) => {
    let id = request.url.split("id=")[1]
    if (clientId.indexOf(id) !== -1) {
        clientId.splice(clientId.indexOf(id), 1, id)
        clients.splice(clientId.indexOf(id), 1, { id, ws })
    } else {
        if (id == null) return
        clientId.push(id)
        clients.push({ id, ws })
    }
    console.log("当前用户id", clientId)
    ws.on("message", onMessage)
})
function onMessage(msg) {
    let item = JSON.parse(msg)
    insertChat(item, () => {
        clients.forEach(json => {
            //接收方
            if (json.id == item.receiver) {
                json.ws.send(JSON.stringify({ code: 300, message: "用户对话", senderId: item.senderId }).toString("utf8"))
            }
            //发送方 
            else if (json.id == item.senderId) {
                json.ws.send(JSON.stringify({ code: 301, message: "用户对话" }).toString("utf8"))
            }
        })
    })


}

function insertChat({ senderId, receiver, content }, callback) {
    let sql = "insert into chat set ?"
    let info = {
        content: content,
        sender_id: senderId,
        receiver: receiver,
        create_time: new Date()
    }
    db.query(sql, info, (err, result) => {
        if (err) return console.log("用户对话添加错误", err)
        console.log("用户对话添加成功")
        callback()
    })
}
function onClients() {
    return clients
}
module.exports = {
    onClients,
}