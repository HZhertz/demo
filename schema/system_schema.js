const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const introduction = joi.string().required()
const expertise = joi.string().required()
const id = joi.number().min(1).required()
exports.reg_getTemaList_schema = {
    query: {
        pageNum,
        pageSize,
        title
    }
}
exports.reg_addTema_schema = {
    body: {
        title,
        introduction,
        expertise
    }
}
exports.reg_editTema_schema = {
    body: {
        id,
        title,
        introduction,
        expertise
    }
}
exports.reg_deleteTema_schema = {
    params: {
        id
    }
}