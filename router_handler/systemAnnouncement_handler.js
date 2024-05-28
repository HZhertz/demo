const db = require('../db/index')
const moment = require("moment")
exports.getSystemAnnouncement = (req, res) => {
    const { pageNum, pageSize, title } = req.query
    const sql = "select a.id,a.title,a.content,a.create_time as createTime,b.username,b.image,c.is_alert as isAlert from announcement as a left join user as b  on a.user_id=b.id left join alert as c on a.id=c.announcement_id where c.user_id=0 and title like ? order by a.id desc limit ?,?"
    db.query(sql, [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) res.err(err)
        const sqlCount = "select count(*) as count from announcement where title like ?"
        db.query(sqlCount, [`%${title}%`,], (err, json) => {
            if (err) res.err(err)
            let arr = result ? result.map(item => {
                return {
                    ...item,
                    createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
                }
            }) : []
            res.send({
                code: 200,
                message: "列表查询成功",
                data: {
                    count: json[0].count,
                    announcementList: arr
                }
            })
        })
    })
}

exports.getSystemAnnouncementItem = (req, res) => {
    const { id } = req.params
    const sql = "select a.title,a.content,b.is_alert as isAlert from announcement as a left join alert as b on a.id=b.announcement_id where a.id=? and b.user_id=0"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        let item = {
            ...result[0],
            createTime: moment(result[0].createTime).format("YYYY-MM-DD HH:mm:ss")
        }
        res.send({
            code: 200,
            message: "查询成功",
            data: item
        })
    })
}
exports.addSystemAnnouncement = (req, res) => {
    const { title, content, isAlert } = req.body
    let info = {
        title,
        content,
        create_time: new Date(),
        user_id: req.auth.id
    }
    let sql = "insert into announcement set ?"
    db.query(sql, info, (err, result) => {
        if (err) return res.err(err)
        if (result.affectedRows !== 1) return res.err("插入失败")
        db.query("select id from user where user_rank=0", [], (e, r) => {
            if (e) return res.err(e)
            let j = 0
            r.unshift({ id: 0 })
            for (let i = 0, len = r.length; i < len; i++) {
                let alertInfo = {
                    announcement_id: result.insertId,
                    is_alert: isAlert,
                    user_id: r[i].id
                }
                let alertSql = "insert into alert set ?"
                db.query(alertSql, alertInfo, (err1, json) => {
                    if (err1) return res.err(err1)
                    if (json.affectedRows !== 1) return res.err("插入失败")
                    j++
                    if (j >= r.length) {
                        res.send({
                            code: 200,
                            message: "创建成功"
                        })
                    }
                })
            }
        })
    })
}

exports.updateSystemAnnouncement = (req, res) => {
    let { id, title, content, isAlert } = req.body
    let sql = "update announcement set ? where id=?"
    let info = {
        title,
        content
    }
    db.query(sql, [info, id], (err, result) => {
        if (err) return res.err(err)
        if (result.affectedRows !== 1) return res.err("修改失败")
        let alertSql = "update alert set ? where announcement_id=?"
        db.query(alertSql, [{ is_alert: isAlert, is_read: 0 }, id], (err1, json) => {
            if (err1) return res.err(err1)
            res.send({
                code: 200,
                message: '更新成功'
            })
        })
    })
}
exports.deleteSystemAnnouncement = (req, res) => {
    let { id } = req.params
    let sql = "delete from announcement where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        let alertSql = "delete from alert where announcement_id=?"
        db.query(alertSql, id, (e, r) => {
            if (e) return res.err(e)
            res.send({
                code: 200,
                message: "删除成功"
            })
        })
    })
}
exports.getSystemAnnouncementAlterItem = (req, res) => {
    let sql = "select a.id,b.title,b.content,b.create_time as createTime,a.is_alert as isAlert,a.is_read as isRead from alert as a left join announcement as b on a.announcement_id=b.id where a.user_id=? and is_alert=1 and is_read=0"
    db.query(sql, req.auth.id, (err, result) => {
        if (err) return res.err(err)
        let list = result && result.map(item => {
            return {
                ...item,
                createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
            }
        })
        res.send({
            code: 200,
            message: "查询成功",
            data: list
        })
    })
}
exports.getSystemAnnouncementAlterRead = (req, res) => {
    let { id } = req.params
    console.log(id)
    let sql = "update alert set ? where id=? and user_id=?"
    db.query(sql, [{ is_read: 1 }, id, req.auth.id], (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            result: "已读成功"
        })
    })
}
exports.addAnnouncementImage = (req, res) => {
    console.log(req.file)
    if (!req.file || req.file.fieldname !== "image") return res.err("上传失败")
    res.send({
        code: 200,
        message: "上传成功",
        data: `/api/uploads/${req.file.path.split("public")[1]}`
    })
}