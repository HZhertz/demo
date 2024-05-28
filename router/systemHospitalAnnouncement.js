const express = require("express")
const expressJoi = require("@escook/express-joi")
const system_hispitalAnnouncement_handler = require("../router_handler/systemHospitalAnnouncement_handler")
const router = express.Router()
// 导入处理路径的核心模块
const path = require('path')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const hispital_announcement_multer = multer({})
const hispital_announcement_img = multer({ dest: path.join(__dirname, '../public/hospitalAnnouncement') })
const { reg_getSystemHospitalAnnouncement_schema, reg_addSystemHospitalAnnouncement_schema, reg_editSystemHospitalAnnouncement_schema, reg_deleteSystemHospitalAnnouncement_schema, reg_setSystemHospitalAnnouncementRecommend_schema } = require("../schema/systemHospitalAnnouncement_schema")

//医院公告
router.get("/getSystemHospitalAnnouncement", expressJoi(reg_getSystemHospitalAnnouncement_schema), system_hispitalAnnouncement_handler.getSystemHospitalAnnouncement)
router.post("/addSystemHospitalAnnouncement", hispital_announcement_multer.single(), expressJoi(reg_addSystemHospitalAnnouncement_schema), system_hispitalAnnouncement_handler.addSystemHospitalAnnouncement)
router.post("/editSystemHospitalAnnouncement", hispital_announcement_multer.single(), expressJoi(reg_editSystemHospitalAnnouncement_schema), system_hispitalAnnouncement_handler.editSystemHospitalAnnouncement)
router.get("/deleteSystemHospitalAnnouncement/:id", expressJoi(reg_deleteSystemHospitalAnnouncement_schema), system_hispitalAnnouncement_handler.deleteSystemHospitalAnnouncement)
//首页推荐
router.get("/setSystemHospitalAnnouncementRecommend", expressJoi(reg_setSystemHospitalAnnouncementRecommend_schema), system_hispitalAnnouncement_handler.setSystemHospitalAnnouncementRecommend)

router.post("/addSystemHospitalAnnouncementImage", hispital_announcement_img.single('image'), system_hispitalAnnouncement_handler.addSystemHospitalAnnouncementImage)

module.exports = router
