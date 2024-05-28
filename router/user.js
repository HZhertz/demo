const express = require("express")
//解析验证规则
const expressJoi = require("@escook/express-joi")
const { reg_login_schema, reg_reguser_schema, reg_getPhoneCode_schema, reg_getPhoneCodeReguser_schema } = require("../schema/user_schema")
const router = express.Router()
const multer = require('multer')
//导入用户路由处理函数对应模块
const userHandler = require("../router_handler/user_handler")
const login = multer({})
//登录
router.post("/login", login.single(), expressJoi(reg_login_schema), userHandler.login)
//注册
router.post('/reguser', login.single(), expressJoi(reg_reguser_schema), userHandler.regUser)
//验证码
router.get('/captcha', userHandler.captcha)
//获取短信验证码
router.post('/getPhoneCode', login.single(), expressJoi(reg_getPhoneCode_schema), userHandler.getPhoneCode)
//注册获取短信验证码
router.post('/getPhoneCodeReguser', login.single(), expressJoi(reg_getPhoneCodeReguser_schema), userHandler.getPhoneCodeReguser)
module.exports = router