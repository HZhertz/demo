const joi = require("joi")
const userId = joi.number().required()
exports.reg_getMedicalTreatment_schema = {
    query: {
        userId
    }
}