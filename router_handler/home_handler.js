const db = require('../db')
const moment = require('moment')

exports.getRotographList = (req, res) => {
  let time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  let sql =
    "select id,title,image,address,start_time as startTime,end_time as endTime from rotograph where start_time='null' or end_time='null' or (?>start_time and ?<end_time)"
  db.query(sql, [time, time], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '轮播图查询成功',
      list: result
    })
  })
}

exports.getHospitalAnnouncementList = (req, res) => {
  const sql =
    'select id,title,content,image,create_time as createTime from hospital_announcement where is_recommend=1'
  db.query(sql, [], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '公告列表查询成功',
      list: result
    })
  })
}
exports.getHospitalAnnouncement = (req, res) => {
  let { title } = req.query
  const sql =
    'select id,title,content,image,create_time as createTime from hospital_announcement where title like ? order by id desc'
  db.query(sql, [`%${title}%`], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '公告列表查询成功',
      list: result
    })
  })
}

exports.getMoreHospitalAnnouncement = (req, res) => {
  let { id } = req.query
  console.log('最后一位id:', id)
  const sql =
    'select id,title,content,image,create_time as createTime from hospital_announcement order by id asc'
  db.query(sql, [], (err, result) => {
    if (err) return res.err(err)
    let data
    if (id < 0) {
      data = result.slice(0, 7)
    } else {
      const index = result.findIndex((item) => item.id === id)
      data = result.slice(index + 1, index + 8)
    }
    res.send({
      code: 200,
      message: 'more公告列表查询成功',
      list: data
    })
  })
}

exports.getHospitalAnnouncementInfo = (req, res) => {
  let { id } = req.query
  const sql =
    'select a.id,a.title,a.content,a.image,a.create_time as createTime,b.username from hospital_announcement as a left join user as b on a.user_id=b.id where a.id=?'
  db.query(sql, [id], (err, result) => {
    if (err) return res.err(err)
    let r = {
      ...result[0],
      createTime: moment(result[0].createTime).format('YYYY-MM-DD HH:mm:ss')
    }
    res.send({
      code: 200,
      message: '公告详情查询成功',
      info: r
    })
  })
}

exports.getAnnouncementList = (req, res) => {
  const sql =
    'select a.id,a.title,a.content,a.create_time as createTime,b.username,b.image,c.id as alertId,c.is_read as isRead from announcement as a left join user as b  on a.user_id=b.id left join alert as c on a.id=c.announcement_id where c.user_id=? order by c.is_read asc'
  db.query(sql, [req.auth.id], (err, result) => {
    if (err) res.err(err)
    const sqlCount = 'select count(*) as count from announcement'
    db.query(sqlCount, [], (err, json) => {
      if (err) res.err(err)
      let arr = result
        ? result.map((item) => {
            return {
              ...item,
              createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        : []
      res.send({
        code: 200,
        message: '列表查询成功',
        data: {
          count: json[0].count,
          list: arr
        }
      })
    })
  })
}
exports.getAnnouncementInfo = (req, res) => {
  let { id } = req.query
  const sql =
    'select a.title,a.content,b.username from announcement as a left join user as b on a.user_id=b.id where a.id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.err(err)
    let item = {
      ...result[0],
      createTime: moment(result[0].createTime).format('YYYY-MM-DD HH:mm:ss')
    }
    res.send({
      code: 200,
      message: '查询成功',
      info: item
    })
  })
}
