const db = require('../db')
const moment = require('moment')
const { onClients } = require('../ws')
moment.locale('zh-cn')
exports.geDepartmentList = (req, res) => {
  let sql = 'select id,title,introduction,expertise from department'
  db.query(sql, [], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '科室列表获取成功',
      list: result
    })
  })
}

exports.getDoctorList = (req, res) => {
  let { departmentId } = req.query
  let sql =
    'select id,doctor_name as doctorName,doctor_expertise as doctorExpertise,professional_title as professionalTitle from doctor where department_id=?'
  db.query(sql, [departmentId], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '医生列表查询成功',
      list: result
    })
  })
}

exports.getDoctorItem = (req, res) => {
  let { id } = req.query
  let sql =
    'select id,doctor_name as doctorName,doctor_desc as doctorDesc,doctor_expertise as doctorExpertise,professional_title as professionalTitle from doctor where id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '医生信息查询成功',
      info: result[0]
    })
  })
}
exports.getAppointmentRegisterInfo = (req, res) => {
  let { id, cardId } = req.query
  let today = moment(new Date()).format('YYYY-MM-DD')
  let endTime = moment(new Date().getTime() + 1000 * 60 * 60 * 24 * 7).format(
    'YYYY-MM-DD'
  )
  let sql = `select id,sitting_time as sittingTime,sitting_num as sittingNum,surplus_sitting_num as surplusSittingNum from doctor_register where doctor_id=? and sitting_time<=? and sitting_time>=?`
  db.query(sql, [id, endTime, today], (err, result) => {
    if (err) return res.err(err)
    let sql1 =
      'select isAppointment from registration_relation where doctorcard_id=? and doctor_register_id=?'
    let j = 0
    let arr = []
    if (result.length) {
      for (let i = 0, len = result.length; i < len; i++) {
        db.query(sql1, [cardId, result[i].id], (err, info) => {
          if (err) return res.err(err)
          let item = {
            ...result[i],
            isAppointment: info[0] ? info[0].isAppointment : 0
          }
          arr.push(item)
          j++
          if (j >= result.length) {
            res.send({
              code: 200,
              message: '放号列表查询成功',
              list: arr
            })
          }
        })
      }
    } else {
      res.send({
        code: 200,
        message: '放号列表查询成功',
        list: result
      })
    }
  })
}

exports.addAppointmentRegister = (req, res) => {
  let { cardId, doctorRegisterId } = req.query
  let s = 'select is_break as isBreak from doctorcard where id=?'
  db.query(s, cardId, (err, ssw) => {
    if (err) return res.err(err)
    if (ssw[0].isBreak > 3) return res.err('您已失信，您将不能线上预约！')
    let sq = 'select surplus_sitting_num from doctor_register where id=?'
    db.query(sq, [doctorRegisterId], (err, result) => {
      if (err) return res.err(err)
      if (result.length === 0) return res.err('暂无余号')
      let sql =
        'select id from registration_relation where doctorcard_id=? and doctor_register_id=?'
      db.query(sql, [cardId, doctorRegisterId], (err, result) => {
        if (err) return res.err(err)
        //是否是新增
        if (result.length) {
          let sql1 =
            'update registration_relation set isAppointment=1 where doctorcard_id=? and doctor_register_id=?'
          db.query(sql1, [cardId, doctorRegisterId], (err, info) => {
            if (err) return res.err(err)
            let sql2 =
              'update doctor_register set surplus_sitting_num=surplus_sitting_num-1 where id=?'
            db.query(sql2, [doctorRegisterId], (err, result) => {
              if (err) return res.err(err)
              let sqll =
                'select a.id,a.isAppointment,b.relationship,b.patient_name as patientName,c.sitting_time as sittingTime from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join doctor_register as c on a.doctor_register_id=c.id where a.doctorcard_id=? and a.doctor_register_id=?'
              db.query(sqll, [cardId, doctorRegisterId], (err, rr) => {
                if (err) return res.err(err)
                let sql3 = 'insert into system_message set ?'
                let item = {
                  content:
                    rr[0].relationship === '本人'
                      ? `您已成功预约，预计时间为${rr[0].sittingTime}，请您在规定时间携带本人身份证到达医院看诊！`
                      : `您已成功帮(${rr[0].relationship})${rr[0].patientName}预约,预计时间为${rr[0].sittingTime}，请${rr[0].patientName}在规定时间携带本人身份证到达医院看诊！`,
                  registration_relation_id: rr[0].id,
                  create_time: new Date(),
                  user_id: req.auth.id
                }
                db.query(sql3, item, (err, r) => {
                  if (err) return res.err(err)
                  //即使通讯
                  setTimeout(() => {
                    let clients = onClients()
                    clients.forEach((item) => {
                      if (item.id != req.auth.id) return
                      item.ws.send(
                        JSON.stringify({
                          code: 200,
                          message: '挂号成功'
                        }).toString('utf8')
                      )
                    })
                  }, 5000)
                  res.send({
                    code: 200,
                    message: '预约成功'
                  })
                })
              })
            })
          })
        } else {
          let sql1 = 'insert into registration_relation set ? '
          let info = {
            doctorcard_id: cardId,
            doctor_register_id: doctorRegisterId
          }
          db.query(sql1, info, (err, info) => {
            if (err) return res.err(err)
            let sql2 =
              'update doctor_register set surplus_sitting_num=surplus_sitting_num-1 where id=?'
            db.query(sql2, [doctorRegisterId], (err, result) => {
              if (err) return res.err(err)
              let sqll =
                'select a.isAppointment,b.relationship,b.patient_name as patientName,c.sitting_time as sittingTime from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join doctor_register as c on a.doctor_register_id=c.id where a.id=?'
              db.query(sqll, info.insertId, (err, rr) => {
                if (err) return res.err(err)
                let sql3 = 'insert into system_message set ?'
                let item = {
                  content:
                    rr[0].relationship === '本人'
                      ? `您已成功预约，预计时间为${rr[0].sittingTime}，请您在规定时间携带本人身份证到达医院看诊！`
                      : `您已成功帮(${rr[0].relationship})${rr[0].patientName}预约,预计时间为${rr[0].sittingTime}，请${rr[0].patientName}在规定时间携带本人身份证到达医院看诊！`,
                  registration_relation_id: info.insertId,
                  create_time: new Date(),
                  user_id: req.auth.id
                }
                db.query(sql3, item, (err, r) => {
                  if (err) return res.err(err)
                  //即使通讯  延迟通信，防止弹窗重复
                  setTimeout(() => {
                    let clients = onClients()
                    clients.forEach((item) => {
                      if (item.id != req.auth.id) return
                      item.ws.send(
                        JSON.stringify({
                          code: 200,
                          message: '挂号成功'
                        }).toString('utf8')
                      )
                    })
                  }, 5000)
                  res.send({
                    code: 200,
                    message: '预约成功'
                  })
                })
              })
            })
          })
        }
      })
    })
  })
}
exports.removeAppointmentRegister = (req, res) => {
  let { id } = req.query
  let sql = 'update registration_relation set isAppointment=0 where id=?'
  db.query(sql, id, (err, result) => {
    if (err) return res.err(err)
    let sql1 =
      'select b.id from registration_relation as a left join doctor_register as b on a.doctor_register_id=b.id where a.id=?'
    db.query(sql1, id, (err, json) => {
      if (err) return res.err(err)
      let sql2 =
        'update doctor_register set surplus_sitting_num=surplus_sitting_num+1 where id=?'
      db.query(sql2, json[0].id, (err, results) => {
        if (err) return res.err(err)
        let sqll =
          'select a.id,a.isAppointment,b.relationship,b.patient_name as patientName,c.sitting_time as sittingTime from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join doctor_register as c on a.doctor_register_id=c.id where a.id=?'
        db.query(sqll, [id], (err, rr) => {
          if (err) return res.err(err)
          let sql3 = 'insert into system_message set ?'
          let item = {
            content:
              rr[0].relationship === '本人'
                ? `您已成功取消预约，取消预约时间为${moment(new Date()).format(
                    'YYYY-MM-DD'
                  )}！`
                : `您已成功帮(${rr[0].relationship})${
                    rr[0].patientName
                  }取消预约,取消预约时间为${moment(new Date()).format(
                    'YYYY-MM-DD'
                  )}！`,
            registration_relation_id: rr[0].id,
            create_time: new Date(),
            user_id: req.auth.id
          }
          db.query(sql3, item, (err, r) => {
            if (err) return res.err(err)
            let clients = onClients()
            clients.forEach((item) => {
              if (item.id != req.auth.id) return
              //即使通讯
              setTimeout(() => {
                let clients = onClients()
                clients.forEach((item) => {
                  if (item.id != req.auth.id) return
                  item.ws.send(
                    JSON.stringify({
                      code: 200,
                      message: '取消预约成功'
                    }).toString('utf8')
                  )
                })
              }, 5000)
            })
            res.send({
              code: 200,
              message: '取消预约成功'
            })
          })
        })
      })
    })
  })
}
exports.getSystemMessage = (req, res) => {
  let { id } = req.auth
  let sql =
    'select id,content,create_time as createTime from system_message where user_id=? order by create_time desc'
  db.query(sql, id, (err, result) => {
    if (err) return res.err(err)
    let r = result.length
      ? result.map((item) => {
          return {
            ...item,
            createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      : []
    res.send({
      code: 200,
      message: '系统消息查询成功',
      list: r
    })
  })
}

exports.getReservationRecord = (req, res) => {
  let { id } = req.auth
  let sql =
    'select a.id,a.isAppointment,b.relationship,b.patient_name as patientName,c.username,d.sitting_time as sittingTime,e.doctor_name as doctorName from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join user as c on b.user_id=c.id left join doctor_register as d on a.doctor_register_id=d.id left join doctor as e on d.doctor_id=e.id where c.id=? and a.isAppointment=1 order by d.sitting_time desc'
  db.query(sql, [id], (err, result) => {
    if (err) return res.err(err)
    res.send({
      code: 200,
      message: '预约记录查询成功',
      data: result
    })
  })
}
