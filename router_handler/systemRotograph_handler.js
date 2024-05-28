const db = require("../db")
const moment = require("moment")
exports.getSystemRotographList = (req, res) => {
    let { title, pageNum, pageSize } = req.query
    const sql = "select a.id,a.title,a.address,a.create_time as createTime,a.image,a.start_time as startTime,a.end_time as endTime,b.username from rotograph as a left join user as b on a.user_id=b.id where title like ? order by id desc limit ?,?"
    db.query(sql, [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) return res.err(err)
        const sqlCount = "select count(*) as count from rotograph where title like ?"
        db.query(sqlCount, [`%${title}%`,], (err, json) => {
            if (err) res.err(err)
            let arr = result ? result.map(item => {
                let status = "失效"
                let now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                if (!item.startTime || !item.endTime || item.startTime === "null" || item.endTime === "null" || (now >= item.startTime && now <= item.endTime)) status = "生效"

                return {
                    ...item,
                    status: status,
                    createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
                }
            }) : []
            res.send({
                code: 200,
                message: "列表查询成功",
                data: {
                    count: json[0].count,
                    list: arr
                }
            })
        })
    })
}

exports.addSystemRotograph = (req, res) => {
    let { title, image, address, startTime, endTime } = req.body
    let info = {
        title,
        image,
        address,
        start_time: startTime,
        end_time: endTime,
        create_time: new Date(),
        user_id: req.auth.id
    }
    let sql = "insert into rotograph set ?"
    db.query(sql, info, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "新增成功"
        })
    })
}
exports.editSystemRotograph = (req, res) => {
    let { title, image, address, startTime, endTime, id } = req.body
    let info = {
        title,
        image,
        address,
        start_time: startTime,
        end_time: endTime,
    }

    let sql = "update rotograph set ? where id=?"
    db.query(sql, [info, id], (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "修改成功"
        })
    })
}

exports.deleteSystemRotograph = (req, res) => {
    let { id } = req.params
    let sql = "delete from rotograph where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "删除成功"
        })
    })
}

exports.addSystemRotographImage = (req, res) => {
    if (!req.file || req.file.fieldname !== "image") return res.err("上传失败")
    res.send({
        code: 200,
        message: "上传成功",
        data: `/api/uploads/${req.file.path.split("public")[1]}`
    })
}