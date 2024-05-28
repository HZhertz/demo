const express = require("express")
//解析验证规则
const expressJoi = require("@escook/express-joi")
const router = express.Router()
const { reg_getTemaList_schema, reg_addTema_schema, reg_editTema_schema, reg_deleteTema_schema } = require("../schema/system_schema")
const systypeTema = require("../router_handler/systemTema_handler")
const multer = require('multer')
const m = multer({})
//科室
router.get("/getTemaList", m.single(), expressJoi(reg_getTemaList_schema), systypeTema.getTemaList)
router.post("/addTema", m.single(), expressJoi(reg_addTema_schema), systypeTema.addTema)
router.post("/editTema", m.single(), expressJoi(reg_editTema_schema), systypeTema.editTema)
router.get("/deleteTema/:id", m.single(), expressJoi(reg_deleteTema_schema), systypeTema.deleteTema)

module.exports = router