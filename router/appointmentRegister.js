//预约挂号
const express = require("express")
const expressJoi = require("@escook/express-joi")
const appointmentRegister = require("../router_handler/appointmentRegister_handler")
const router = express.Router()
const { reg_getDoctorList_schema, reg_getDoctorItem_schema, reg_getAppointmentRegisterInfo_schema, reg_addAppointmentRegister_schema, reg_removeAppointmentRegister_schema } = require("../schema/appointmentRegister_schema")

//查询科室列表
router.get("/geDepartmentList", appointmentRegister.geDepartmentList)
router.get("/getDoctorList", expressJoi(reg_getDoctorList_schema), appointmentRegister.getDoctorList)
router.get("/getDoctorItem", expressJoi(reg_getDoctorItem_schema), appointmentRegister.getDoctorItem)
//放号列表
router.get("/getAppointmentRegisterInfo", expressJoi(reg_getAppointmentRegisterInfo_schema), appointmentRegister.getAppointmentRegisterInfo)
//预约
router.get("/addAppointmentRegister", expressJoi(reg_addAppointmentRegister_schema), appointmentRegister.addAppointmentRegister)
//取消预约
router.get("/removeAppointmentRegister", expressJoi(reg_removeAppointmentRegister_schema), appointmentRegister.removeAppointmentRegister)

//系统消息
router.get("/getSystemMessage", appointmentRegister.getSystemMessage)
//获取预约记录
router.get("/getReservationRecord", appointmentRegister.getReservationRecord)

module.exports = router