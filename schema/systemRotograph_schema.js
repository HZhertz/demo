const joi = require("joi")
const pageNum = joi.number().required()
const pageSize = joi.number().required()
const title = joi.string().optional().allow(null, "")
const image = joi.string().required()
const address = joi.string().required()
const startTime = joi.string().optional()
const endTime = joi.string().optional()
const id = joi.number().min(1).required()
exports.reg_getSystemRotographList_schema = {
    query: {
        pageNum,
        pageSize,
        title
    }
}
exports.reg_addSystemRotograph_schema = {
    body: {
        title,
        image,
        address,
        startTime,
        endTime
    }
}
exports.reg_editSystemRotograph_schema = {
    body: {
        title,
        image,
        address,
        startTime,
        endTime,
        id
    }
}
exports.reg_deleteSystemRotograph_schema = {
    params: {
        id
    }
}