const joi = require("joi")
// 定义验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const phone = joi.string().pattern(/^1[3-9]\d{9}$/).required()
const phoneCode = joi.string().required()
const code = joi.string().required()
const userRank = joi.number().required()
exports.reg_login_schema = {
    body: {
        username,
        password,
        phoneCode,
        code
    }
}
exports.reg_reguser_schema = {
    body: {
        username,
        password,
        phone,
        phoneCode,
        code,
        userRank
    }
}
exports.reg_getPhoneCode_schema = {
    body: {
        username,
        password,
    }
}
exports.reg_getPhoneCodeReguser_schema = {
    body: {
        phone
    }
}