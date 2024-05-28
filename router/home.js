const express = require('express')
const expressJoi = require('@escook/express-joi')
const home_handler = require('../router_handler/home_handler')
const router = express.Router()
const {
  reg_getHospitalAnnouncement_schema,
  reg_getMoreHospitalAnnouncement_schema,
  reg_getHospitalAnnouncementInfo_schema
} = require('../schema/home_schema')

//用户端首页轮播图
router.get('/getRotographList', home_handler.getRotographList)
//用户端首页公告列表
router.get(
  '/getHospitalAnnouncementList',
  home_handler.getHospitalAnnouncementList
)
//用户端搜索医院公告
router.get(
  '/getHospitalAnnouncement',
  expressJoi(reg_getHospitalAnnouncement_schema),
  home_handler.getHospitalAnnouncement
)
//用户端获取更多医院公告列表
router.get(
  '/getMoreHospitalAnnouncement',
  expressJoi(reg_getMoreHospitalAnnouncement_schema),
  home_handler.getMoreHospitalAnnouncement
)
//用户端医院公告详情
router.get(
  '/getHospitalAnnouncementInfo',
  expressJoi(reg_getHospitalAnnouncementInfo_schema),
  home_handler.getHospitalAnnouncementInfo
)

//通知公告列表
router.get('/getAnnouncementList', home_handler.getAnnouncementList)
router.get(
  '/getAnnouncementInfo',
  expressJoi(reg_getHospitalAnnouncementInfo_schema),
  home_handler.getAnnouncementInfo
)

module.exports = router
