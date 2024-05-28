const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const content = joi.string().required()
const isAlert = joi.number().min(0).max(1).required()
const id = joi.number().required()
exports.reg_getSystemAnnouncement_schema = {
    query: {
        pageNum,
        pageSize,
        title
    }
}
exports.reg_addSystemAnnouncement_schema = {
    body: {
        title,
        content,
        isAlert,
    }
}
exports.reg_updateSystemAnnouncement_schema = {
    body: {
        id,
        title,
        content,
        isAlert,
    }
}
exports.reg_getSystemAnnouncementItem_schema = {
    params: {
        id
    }
}