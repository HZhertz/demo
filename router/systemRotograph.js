const express = require("express")
const expressJoi = require("@escook/express-joi")
const system_rotograph_handler = require("../router_handler/systemRotograph_handler")
const router = express.Router()
// 导入处理路径的核心模块
const path = require('path')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
const rotograph_multer = multer({})
const rotograph_img = multer({ dest: path.join(__dirname, '../public/gotograph') })
const { reg_getSystemRotographList_schema, reg_addSystemRotograph_schema, reg_editSystemRotograph_schema, reg_deleteSystemRotograph_schema } = require("../schema/systemRotograph_schema")
//轮播图
router.get("/getSystemRotographList", expressJoi(reg_getSystemRotographList_schema), system_rotograph_handler.getSystemRotographList)
router.post("/addSystemRotograph", rotograph_multer.single(), expressJoi(reg_addSystemRotograph_schema), system_rotograph_handler.addSystemRotograph)
router.post("/editSystemRotograph", rotograph_multer.single(), expressJoi(reg_editSystemRotograph_schema), system_rotograph_handler.editSystemRotograph)
router.get("/deleteSystemRotograph/:id", expressJoi(reg_deleteSystemRotograph_schema), system_rotograph_handler.deleteSystemRotograph)


router.post("/addSystemRotographImage", rotograph_img.single('image'), system_rotograph_handler.addSystemRotographImage)

module.exports = router


