const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const departmentId = joi.number().required()
const doctorId = joi.number().min(1).required()
const sittingTime = joi.string().required()
const sittingNum = joi.number().min(1).required()
const id = joi.number().min(1).required()
exports.reg_getRegisterList_schema = {
    query: {
        pageNum,
        pageSize,
        title,
        departmentId
    }
}
exports.reg_addRegister_schema = {
    body: {
        doctorId,
        sittingTime,
        sittingNum
    }
}
exports.reg_editRegister_schema = {
    body: {
        doctorId,
        sittingTime,
        sittingNum,
        id
    }
}
exports.reg_deleteRegister_schema = {
    params: {
        id
    }
}