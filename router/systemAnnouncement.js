const express = require("express")
const expressJoi = require("@escook/express-joi")
const system_Announcement_handler = require("../router_handler/systemAnnouncement_handler")
const announcement = express.Router()
// 导入处理路径的核心模块
const path = require('path')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const announcement_multer = multer({})
const announcement_img = multer({ dest: path.join(__dirname, '../public/announcement') })

const { reg_getSystemAnnouncement_schema, reg_getSystemAnnouncementItem_schema, reg_addSystemAnnouncement_schema, reg_updateSystemAnnouncement_schema } = require("../schema/systemAnnouncement_schema")
//公告列表
announcement.get("/getSystemAnnouncement", expressJoi(reg_getSystemAnnouncement_schema), system_Announcement_handler.getSystemAnnouncement)
//公告详情
announcement.get("/getSystemAnnouncementItem/:id", expressJoi(reg_getSystemAnnouncementItem_schema), system_Announcement_handler.getSystemAnnouncementItem)
// 添加公告
announcement.post("/addSystemAnnouncement", announcement_multer.single(), expressJoi(reg_addSystemAnnouncement_schema), system_Announcement_handler.addSystemAnnouncement)
// 更改公告
announcement.post("/updateSystemAnnouncement", announcement_multer.single(), expressJoi(reg_updateSystemAnnouncement_schema), system_Announcement_handler.updateSystemAnnouncement)
//删除公告
announcement.get("/deleteSystemAnnouncement/:id", expressJoi(reg_getSystemAnnouncementItem_schema), system_Announcement_handler.deleteSystemAnnouncement)

// 公告弹窗列表
announcement.get("/getSystemAnnouncementAlter", system_Announcement_handler.getSystemAnnouncementAlterItem)
//公告设置为已读
announcement.get("/getSystemAnnouncementAlterRead/:id", expressJoi(reg_getSystemAnnouncementItem_schema), system_Announcement_handler.getSystemAnnouncementAlterRead)

announcement.post("/addAnnouncementImage", announcement_img.single('image'), system_Announcement_handler.addAnnouncementImage)

module.exports = announcement