const db = require("../db/index")
const moment = require("moment")

exports.getTemaList = (req, res) => {
    let { pageNum, pageSize, title } = req.query
    const sql = "select id,title,introduction,expertise,create_time as createTime from department where title like ? order by id desc limit ?,?"
    db.query(sql, [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) return res.err(err)
        const sqlCount = "select count(*) as count from department where title like ?"
        db.query(sqlCount, [`%${title}%`], (err, json) => {
            if (err) return res.err(err)
            let r = result ? result.map(item => {
                return {
                    ...item,
                    createTime: moment(item.createTime).format("YYYY-MM-DD hh:mm:ss")
                }
            }) : []
            res.send({
                code: 200,
                message: "科室列表查询成功",
                data: {
                    count: json[0].count,
                    list: r
                }
            })
        })

    })
}

exports.addTema = (req, res) => {
    let info = {
        ...req.body,
        create_time: new Date()
    }
    let sql = "insert into department set ?"
    db.query(sql, info, (err, json) => {
        if (err) return res.err(err)
        if (json.affectedRows !== 1) return res.err("插入失败")
        res.send({
            code: 200,
            message: "科室新增成功"
        })
    })
}
exports.editTema = (req, res) => {
    let info = {
        ...req.body,
    }
    delete info.id
    let sql = "update department set ? where id=?"
    db.query(sql, [info, req.body.id], (err, json) => {
        if (err) return res.err(err)
        if (json.affectedRows !== 1) return res.err("更改修改")
        res.send({
            code: 200,
            message: "科室修改成功"
        })
    })
}

exports.deleteTema = (req, res) => {
    let { id } = req.params
    let sql = "delete from department where id=?"
    db.query(sql, id, (err, json) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "删除成功"
        })
    })
}