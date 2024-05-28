const express = require("express")
const path = require("path")
//解析验证规则
const expressJoi = require("@escook/express-joi")
const router = express.Router()
const { reg_getDoctorList_schema, reg_addDoctor_schema, reg_editDoctor_schema, reg_deleteDoctor_schema } = require("../schema/systemDoctor_schema")
const systemDoctor = require("../router_handler/systemDoctor_handler")
const multer = require('multer')
const m = multer({})
const mm = multer({ dest: path.join(__dirname, '../public/doctor') })

//获取医生列表
router.get("/getDoctorList", expressJoi(reg_getDoctorList_schema), systemDoctor.getDoctorList)
//添加医生
router.post("/addDoctor", m.single(), expressJoi(reg_addDoctor_schema), systemDoctor.addDoctor)
//修改医生
router.post("/editDoctor", m.single(), expressJoi(reg_editDoctor_schema), systemDoctor.editDoctor)
//删除医生
router.get("/deleteDoctor/:id", expressJoi(reg_deleteDoctor_schema), systemDoctor.deleteDoctor)
//上传头像
router.post("/uploadDoctor", mm.single("image"), systemDoctor.uploadDoctor)

module.exports = router