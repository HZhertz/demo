const db = require("../db")
exports.getRegisterList = (req, res) => {
    let { pageNum, pageSize, title, departmentId } = req.query
    let sql = "select a.id,a.sitting_time as sittingTime,a.sitting_num as sittingNum,a.surplus_sitting_num as surplusSittingNum,b.id as doctorId,b.doctor_name as doctorName,b.professional_title as professionalTitle,c.title as departmentTitle from doctor_register as a left join doctor as b on a.doctor_id=b.id left join department as c on b.department_id=c.id where b.department_id=? and b.doctor_name like ? order by a.sitting_time asc limit ?,?"
    let sql1 = "select a.id,a.sitting_time as sittingTime,a.sitting_num as sittingNum,a.surplus_sitting_num as surplusSittingNum,b.id as doctorId,b.doctor_name as doctorName,b.professional_title as professionalTitle,c.title as departmentTitle from doctor_register as a left join doctor as b on a.doctor_id=b.id left join department as c on b.department_id=c.id where b.doctor_name like ? order by a.sitting_time asc limit ?,?"
    db.query(departmentId ? sql : sql1, departmentId ? [departmentId, `%${title}%`, (+pageNum - 1) * +pageSize, +pageSize] : [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) return res.err(err)
        let sqlCount = "select count(*) as count from doctor_register as a left join doctor as b on a.doctor_id=b.id where b.department_id=? and b.doctor_name like ?"
        let sqlCount1 = "select count(*) as count from doctor_register as a left join doctor as b on a.doctor_id=b.id where b.doctor_name like ?"
        db.query(departmentId ? sqlCount : sqlCount1, departmentId ? [departmentId, `%${title}%`] : [`%${title}%`], (err1, json) => {
            if (err1) return res.err(err1)
            res.send({
                code: 200,
                message: "查询成功",
                data: {
                    count: json[0].count,
                    list: result
                }
            })
        })
    })
}

exports.addRegister = (req, res) => {
    let { doctorId, sittingTime, sittingNum } = req.body
    let sql = "select * from doctor_register where doctor_id=? and sitting_time=?"
    db.query(sql, [doctorId, sittingTime], (err, result) => {
        if (err) return res.err(err)
        if (result && result.length > 0) return res.err("该医生在该时间段已有设置")
        let sql1 = "insert into doctor_register set ?"
        let info = {
            doctor_id: doctorId,
            sitting_time: sittingTime,
            sitting_num: sittingNum,
            surplus_sitting_num: sittingNum
        }
        db.query(sql1, info, (err1, json) => {
            if (err1) return res.err(err1)
            res.send({
                code: 200,
                message: "新增成功"
            })
        })
    })
}

exports.editRegister = (req, res) => {
    let { doctorId, sittingTime, sittingNum, id } = req.body
    let sql = "select * from doctor_register where id!=? and doctor_id=? and sitting_time=?"
    db.query(sql, [id, doctorId, sittingTime], (err, result) => {
        if (err) return res.err(err)
        if (result && result.length > 0) return res.err("该医生在该时间段已有设置")
        let sql1 = "update doctor_register set ? where id=?"
        let info = {
            doctor_id: doctorId,
            sitting_time: sittingTime,
            sitting_num: sittingNum
        }
        db.query(sql1, [info, id], (err1, json) => {
            if (err1) return res.err(err1)
            res.send({
                code: 200,
                message: "修改成功"
            })
        })
    })
}
exports.deleteRegister = (req, res) => {
    let { id } = req.params
    let sql = "delete from doctor_register where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "删除成功"
        })
    })
}