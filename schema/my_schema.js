const joi = require("joi")
const relationship = joi.string().valid("本人", "配偶", "父母", "子女", "其他").required()
const patientName = joi.string().required()
const idNumber = joi.string().required()
const address = joi.string().required()
const emergencyContact = joi.string().optional().allow(null, "")
const emergencyPhone = joi.string().optional().allow(null, "")
const height = joi.string().optional().allow(null, "")
const bodyWeight = joi.string().optional().allow(null, "")
const medicalHistory = joi.string().optional().allow(null, "")
const allergyHistory = joi.string().optional().allow(null, "")
const id = joi.number().required()
const username = joi.string().alphanum().min(1).max(10).required()

exports.reg_addDoctorCard_schema = {
    body: {
        relationship,
        patientName,
        idNumber,
        address,
        emergencyContact,
        emergencyPhone,
        height,
        bodyWeight,
        medicalHistory,
        allergyHistory
    }
}
exports.reg_getDoctorCardItem_schema = {
    query: {
        id
    }
}
exports.reg_editDoctorCard_schema = {
    body: {
        relationship,
        patientName,
        idNumber,
        address,
        emergencyContact,
        emergencyPhone,
        height,
        bodyWeight,
        medicalHistory,
        allergyHistory,
        id
    }
}
exports.reg_deleteDoctorCard_schema = {
    params: {
        id
    }
}
exports.reg_editUserName_schema = {
    body: {
        username
    }
}