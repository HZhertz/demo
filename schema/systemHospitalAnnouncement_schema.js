const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const content = joi.string().required()
const id = joi.number().required()
const image = joi.string().required()
const isRecommend = joi.number().required()
exports.reg_getSystemHospitalAnnouncement_schema = {
    query: {
        pageNum,
        pageSize,
        title
    }
}
exports.reg_addSystemHospitalAnnouncement_schema = {
    body: {
        title,
        content,
        image
    }
}
exports.reg_editSystemHospitalAnnouncement_schema = {
    body: {
        title,
        content,
        image,
        id
    }
}
exports.reg_deleteSystemHospitalAnnouncement_schema = {
    params: {
        id
    }
}
exports.reg_setSystemHospitalAnnouncementRecommend_schema = {
    query: {
        id,
        isRecommend
    }
}
