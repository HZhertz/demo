const express = require("express")
const expressJoi = require("@escook/express-joi")
const my_handler = require("../router_handler/my_handler")
const router = express.Router()
const { reg_addDoctorCard_schema, reg_getDoctorCardItem_schema, reg_editDoctorCard_schema, reg_deleteDoctorCard_schema, reg_editUserName_schema } = require("../schema/my_schema")
// 导入处理路径的核心模块
const path = require('path')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const my_multer = multer({})
router.get("/getPersonInfo", my_handler.getPersonInfo)
//添加就诊卡
router.post("/addDoctorCard", my_multer.single(), expressJoi(reg_addDoctorCard_schema), my_handler.addDoctorCard)
router.get("/getDoctorCardList", my_handler.getDoctorCardList)
router.get("/getDoctorCardItem", expressJoi(reg_getDoctorCardItem_schema), my_handler.getDoctorCardItem)
router.post("/editDoctorCard", my_multer.single(), expressJoi(reg_editDoctorCard_schema), my_handler.editDoctorCard)
router.get("/deleteDoctorCard/:id", expressJoi(reg_deleteDoctorCard_schema), my_handler.deleteDoctorCard)
//修改用户名
router.post("/editUserName", my_multer.single(), expressJoi(reg_editUserName_schema), my_handler.editUserName)


module.exports = router