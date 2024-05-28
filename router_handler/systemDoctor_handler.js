const db = require("../db/index")
const moment = require("moment")

exports.getDoctorList = (req, res) => {
    let { pageNum, pageSize, title, departmentId } = req.query
    const sql = "select a.id,a.doctor_name as doctorName,a.doctor_desc as doctorDesc,a.professional_title as professionalTitle,a.doctor_expertise as doctorExpertise,a.image,a.create_time as createTime,b.title as departmentTitle,b.id as departmentId from doctor as a left join department as b on a.department_id=b.id where a.department_id=? and doctor_name like ? order by id desc limit ?,?"
    const sql1 = "select a.id,a.doctor_name as doctorName,a.doctor_desc as doctorDesc,a.professional_title as professionalTitle,a.doctor_expertise as doctorExpertise,a.image,a.create_time as createTime,b.title as departmentTitle,b.id as departmentId from doctor as a left join department as b on a.department_id=b.id where doctor_name like ? order by id desc limit ?,?"
    db.query(departmentId ? sql : sql1, departmentId ? [departmentId, `%${title}%`, (+pageNum - 1) * +pageSize, +pageSize] : [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) return res.err(err)
        const sqlCount = "select count(*) as count from doctor where department_id=? and doctor_name like ?"
        const sqlCount1 = "select count(*) as count from doctor where doctor_name like ?"
        db.query(departmentId ? sqlCount : sqlCount1, departmentId ? [departmentId, `%${title}%`] : [`%${title}%`], (err1, json) => {
            if (err1) return res.err(err1)
            let r = result ? result.map(item => {
                return {
                    ...item,
                    createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }
            }) : []
            res.send({
                code: 200,
                message: "医生列表查询成功",
                data: {
                    count: json[0].count,
                    list: r
                }
            })
        })
    })

}

exports.addDoctor = (req, res) => {
    let { title, image, doctorDesc, doctorExpertise, departmentId, professionalTitle } = req.body
    let info = {
        doctor_name: title,
        doctor_desc: doctorDesc,
        doctor_expertise: doctorExpertise,
        department_id: departmentId,
        professional_title: professionalTitle,
        image: image,
        create_time: new Date()
    }
    let sql = "insert into doctor set ?"
    db.query(sql, info, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "新增医生成功"
        })
    })
}
exports.editDoctor = (req, res) => {
    let { id, image, title, doctorDesc, doctorExpertise, departmentId, professionalTitle } = req.body
    let info = {
        doctor_name: title,
        doctor_desc: doctorDesc,
        doctor_expertise: doctorExpertise,
        department_id: departmentId,
        image: image,
        professional_title: professionalTitle,
    }
    let sql = "update doctor set ? where id=?"
    db.query(sql, [info, id], (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "修改医生成功"
        })
    })
}
exports.deleteDoctor = (req, res) => {
    let { id } = req.params
    let sql = "delete from doctor where id=?"
    db.query(sql, id, (err, json) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "删除成功"
        })
    })
}

exports.uploadDoctor = (req, res) => {
    if (!req.file || req.file.fieldname !== 'image') return res.err("上传失败")
    res.send({
        code: 200,
        message: "上传成功",
        data: `/api/uploads/${req.file.path.split("public")[1]}`
    })
}