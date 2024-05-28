const express = require("express")
const path = require("path")
const expressJoi = require("@escook/express-joi")
const router = express.Router()
const { reg_getRegisterList_schema, reg_addRegister_schema, reg_editRegister_schema, reg_deleteRegister_schema } = require("../schema/systemRegister_schema")
const systemRegister = require("../router_handler/systemRegister_handler")
const multer = require('multer')
const m = multer({})
//挂号
router.get("/getRegisterList", expressJoi(reg_getRegisterList_schema), systemRegister.getRegisterList)
router.post("/addRegister", m.single(), expressJoi(reg_addRegister_schema), systemRegister.addRegister)
router.post("/editRegister", m.single(), expressJoi(reg_editRegister_schema), systemRegister.editRegister)
router.get("/deleteRegister/:id", expressJoi(reg_deleteRegister_schema), systemRegister.deleteRegister)

module.exports = router

