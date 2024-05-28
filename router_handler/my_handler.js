const db = require("../db")
exports.getPersonInfo = (req, res) => {
    let sql = "select id,username,phone,image from user where id=?"
    db.query(sql, req.auth.id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            info: result[0]
        })
    })
}

exports.addDoctorCard = (req, res) => {
    let { relationship,
        patientName,
        idNumber,
        address,
        emergencyContact,
        emergencyPhone,
        height,
        bodyWeight,
        medicalHistory,
        allergyHistory } = req.body
    let info = {
        relationship,
        patient_name: patientName,
        id_number: idNumber,
        address,
        emergency_contact: emergencyContact != "undefined" ? emergencyContact : null,
        emergency_phone: emergencyPhone != "undefined" ? emergencyPhone : null,
        height: height != "undefined" ? height : null,
        body_weight: bodyWeight != "undefined" ? bodyWeight : null,
        medical_history: medicalHistory != "undefined" ? medicalHistory : null,
        allergy_history: allergyHistory != "undefined" ? allergyHistory : null,
        user_id: req.auth.id
    }
    let sqlSelect = "select count(*) as count from doctorcard where relationship='本人' and user_id=?"
    let sqlSelect1 = "select count(*) as count from doctorcard where relationship!='本人' and user_id=?"
    db.query(relationship === "本人" ? sqlSelect : sqlSelect1, [req.auth.id], (err, json) => {
        if (err) return res.err(err)
        if (relationship === "本人" && json[0].count === 1) {
            return res.err("添加失败，本人只能有一张就诊卡")
        }
        if (relationship !== "本人" && json[0].count >= 5) {
            return res.err("添加失败，一个用户最多绑定五张就诊卡")
        }
        let sql = "insert into doctorcard set ?"
        db.query(sql, info, (err, result) => {
            if (err) return res.err(err)
            res.send({
                code: 200,
                message: "就诊卡添加成功"
            })
        })
    })
}

exports.getDoctorCardList = (req, res) => {
    let sql = "select id,relationship,patient_name as patientName,id_number as idNumber from doctorcard where user_id=? order by relationship asc"
    db.query(sql, [req.auth.id], (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "就诊卡列表查询成功",
            list: result
        })
    })
}
exports.getDoctorCardItem = (req, res) => {
    let { id } = req.query
    let sql = "select id,relationship,patient_name as patientName,id_number as idNumber,address,emergency_contact as emergencyContact,emergency_phone as emergencyPhone,height,body_weight as bodyWeight,medical_history as medicalHistory,allergy_history as allergyHistory from doctorcard where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "就诊卡信息查询成功",
            data: result[0]
        })
    })
}

exports.editDoctorCard = (req, res) => {
    let { relationship,
        patientName,
        idNumber,
        address,
        emergencyContact,
        emergencyPhone,
        height,
        bodyWeight,
        medicalHistory,
        allergyHistory,
        id } = req.body
    let info = {
        relationship,
        patient_name: patientName,
        id_number: idNumber,
        address,
        emergency_contact: emergencyContact != "undefined" ? emergencyContact : "",
        emergency_phone: emergencyPhone != "undefined" ? emergencyPhone : "",
        height: height != "undefined" ? height : "",
        body_weight: bodyWeight != "undefined" ? bodyWeight : "",
        medical_history: medicalHistory != "undefined" ? medicalHistory : "",
        allergy_history: allergyHistory != "undefined" ? allergyHistory : "",
        user_id: req.auth.id
    }
    let sql = "update doctorcard set ? where id=?"
    db.query(sql, [info, id], (err, json) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "修改就诊卡成功"
        })
    })
}
exports.deleteDoctorCard = (req, res) => {
    let { id } = req.params
    let sql = "delete from doctorcard where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: '就诊卡删除成功'
        })
    })
}

exports.editUserName = (req, res) => {
    let sql = "update user set ? where id=?"
    db.query(sql, [req.body, req.auth.id], (err, result) => {
        if (err) return err
        res.send({
            code: 200,
            message: "修改用户名成功"
        })
    })
}