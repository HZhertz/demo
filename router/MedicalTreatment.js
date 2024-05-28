const express = require("express")
const router = express.Router()
const expressJoi = require("@escook/express-joi")
const MedicalTreatment = require("../router_handler/MedicalTreatment_handler")
const { reg_getMedicalTreatment_schema } = require("../schema/MedicalTreatment_schema")
router.get("/getUserMedicalTreatment", MedicalTreatment.getUserMedicalTreatment)
router.get("/getMedicalTreatment", expressJoi(reg_getMedicalTreatment_schema), MedicalTreatment.getMedicalTreatment)

module.exports = router
