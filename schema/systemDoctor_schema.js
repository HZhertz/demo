const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const departmentId = joi.number().required()
const doctorDesc = joi.string().required()
const doctorExpertise = joi.string().required()
const professionalTitle = joi.string().required()
const id = joi.number().min(1).required()
const image = joi.string().optional().allow(null, "")
exports.reg_getDoctorList_schema = {
    query: {
        pageNum,
        pageSize,
        title,
        departmentId
    }
}
exports.reg_addDoctor_schema = {
    body: {
        title,
        doctorDesc,
        doctorExpertise,
        departmentId,
        professionalTitle,
        image
    }
}
exports.reg_editDoctor_schema = {
    body: {
        title,
        doctorDesc,
        doctorExpertise,
        departmentId,
        professionalTitle,
        id,
        image
    }
}
exports.reg_deleteDoctor_schema = {
    params: {
        id
    }
}