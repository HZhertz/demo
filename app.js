const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { expressjwt } = require('express-jwt') //解析token
const { jwtSecretKey, everyDayAfterSix } = require('./config')
require('./ws')
const moment = require('moment')
everyDayAfterSix()
const user = require('./router/user')
//科室
const systypeTeam = require('./router/systemTema')
//医生
const systemDoctor = require('./router/systemDoctor')
//挂号
const systemRegister = require('./router/systemRegister')
//通知公告弹窗
const systemAnnouncement = require('./router/systemAnnouncement')
//医院公告
const systemHospitalAnnouncement = require('./router/systemHospitalAnnouncement')
//轮播图
const systemRotograph = require('./router/systemRotograph')

//用户端
const home = require('./router/home')
//我的
const my = require('./router/my')
//预约挂号
const appointmentRegister = require('./router/appointmentRegister')

//通用   对话
const MedicalTreatment = require('./router/MedicalTreatment')

const Joi = require('joi')
//配置post
app.use(bodyParser.urlencoded({ extended: false }))
// 托管静态资源文件
app.use('/uploads', express.static('./public'))
app.use(
  expressjwt({
    secret: jwtSecretKey,
    algorithms: ['HS256'],
    credentialsRequired: true
  }).unless({ path: [/^\/user/] })
) //匹配上不需要token
//封装错误处理中间件
app.use((req, res, next) => {
  res.err = (err, code = 500) => {
    res.send({
      code: code,
      message: err instanceof Error ? err.message : err
    })
  }
  // if (req.auth) clients.push(req.auth.id)
  next() //进入下一个
})
app.use('/user', user)
app.use('/system', systypeTeam)
app.use('/system', systemDoctor)
app.use('/system', systemRegister)
app.use('/system', systemAnnouncement)
app.use('/system', systemHospitalAnnouncement)
app.use('/system', systemRotograph)
app.use('/home', home)
app.use('/my', my)
app.use('/home', appointmentRegister)

app.use('/medicalTreatment', MedicalTreatment)
//错误处理中间件
app.use((err, req, res, next) => {
  //验证失败
  if (err instanceof Joi.ValidationError) {
    return res.send({
      code: 500,
      message: err instanceof Error ? err.message : err
    })
  }
  //身份认证失败的token
  if (err.name === 'UnauthorizedError') {
    return res.send({
      code: 421,
      message: '身份认证失败'
    })
  }
  //未知错误
  res.err(err)
  console.log(err)
})
app.listen(4000, () => {
  console.log(
    '-------------------------4000端口已启用-------------------------'
  )
})
