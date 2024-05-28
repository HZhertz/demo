const joi = require("joi")
const departmentId = joi.number().required()
const id = joi.number().required()
const sittingTime = joi.string().required()
const doctorId = joi.string().required()
const cardId = joi.number().required()
const doctorRegisterId = joi.number().required()

exports.reg_getDoctorList_schema = {
    query: {
        departmentId
    }
}
exports.reg_getDoctorItem_schema = {
    query: {
        id
    }
}
exports.reg_getAppointmentRegisterInfo_schema = {
    query: {
        id,
        cardId,
    }
}
exports.reg_addAppointmentRegister_schema = {
    query: {
        cardId,
        doctorRegisterId
    }
}
exports.reg_removeAppointmentRegister_schema = {
    query: {
        id
    }
}