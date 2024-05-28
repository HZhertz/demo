const joi = require('joi')
const title = joi.string().optional().allow(null, '')
const id = joi.number().required()
exports.reg_getHospitalAnnouncement_schema = {
  query: {
    title
  }
}
exports.reg_getMoreHospitalAnnouncement_schema = {
  query: {
    id
  }
}
exports.reg_getHospitalAnnouncementInfo_schema = {
  query: {
    id
  }
}
