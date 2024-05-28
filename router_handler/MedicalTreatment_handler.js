const db = require('../db')
exports.getUserMedicalTreatment = (req, res) => {
  let sql =
    'select a.id,a.sender_id as senderId,b.username from chat as a left join user as b on a.sender_id=b.id where a.receiver=1'
  db.query(sql, [], (err, result) => {
    console.log(result)
    if (err) return res.err(err)
    if (!result)
      return res.send({
        code: 200,
        message: '消息用户列表查询成功',
        list: []
      })
    let arr = []
    function find(arr, senderId) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].senderId === senderId) return true
      }
      return false
    }
    result.forEach((item) => {
      if (find(arr, item.senderId)) return
      arr.push(item)
    })
    console.log('arr', arr)
    res.send({
      code: 200,
      message: '消息用户列表查询成功',
      list: arr
    })
  })
}

exports.getMedicalTreatment = (req, res) => {
  let { userId } = req.query
  console.log('@@', userId, req.auth.id)
  let sql =
    'select id,content,sender_id as senderId,receiver from chat where (sender_id=? and receiver=?) or (sender_id=? and receiver=?) order by create_time asc'
  db.query(sql, [userId, req.auth.id, req.auth.id, userId], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '消息列表查询成功',
      list: result || []
    })
  })
}
