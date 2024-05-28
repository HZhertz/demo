const db = require("../db")
const moment = require("moment")
exports.getSystemHospitalAnnouncement = (req, res) => {
    let { title, pageNum, pageSize } = req.query
    const sql = "select a.id,a.title,a.content,a.create_time as createTime,a.image,a.is_recommend as isRecommend,b.username from hospital_announcement as a left join user as b on a.user_id=b.id where title like ? order by id desc limit ?,?"
    db.query(sql, [`%${title}%`, (+pageNum - 1) * +pageSize, +pageSize], (err, result) => {
        if (err) return res.err(err)
        const sqlCount = "select count(*) as count from hospital_announcement where title like ?"
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
                    list: arr
                }
            })
        })
    })

}
exports.addSystemHospitalAnnouncement = (req, res) => {
    let { title, content, image } = req.body
    let sql = "insert into hospital_announcement set ?"
    let info = {
        title,
        content,
        image,
        create_time: new Date(),
        user_id: req.auth.id
    }
    db.query(sql, info, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "新建公告成功"
        })
    })
}
exports.editSystemHospitalAnnouncement = (req, res) => {
    let { title, content, image, id } = req.body
    let sql = "update hospital_announcement set ? where id=?"
    let info = {
        title,
        content,
        image
    }
    db.query(sql, [info, id], (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "修改公告成功"
        })
    })
}

exports.deleteSystemHospitalAnnouncement = (req, res) => {
    let { id } = req.params
    let sql = "delete from hospital_announcement where id=?"
    db.query(sql, id, (err, result) => {
        if (err) return res.err(err)
        res.send({
            code: 200,
            message: "删除公告成功"
        })
    })
}
exports.addSystemHospitalAnnouncementImage = (req, res) => {
    if (!req.file || req.file.fieldname !== "image") return res.err("上传失败")
    res.send({
        code: 200,
        message: "上传成功",
        data: `/api/uploads/${req.file.path.split("public")[1]}`
    })
}
exports.setSystemHospitalAnnouncementRecommend = (req, res) => {
    let { id, isRecommend } = req.query
    let sql = "select count(*) as count from hospital_announcement where is_recommend=1"
    db.query(sql, [], (err, result) => {
        if (err) return res.err(err)
        if (result[0].count >= 5 && isRecommend == 1) {
            return res.err("首页推荐失败，首页推荐不能超出5个")
        }
        let sql1 = "update hospital_announcement set ? where id=?"
        let info = {
            is_recommend: isRecommend
        }
        db.query(sql1, [info, id], (err, json) => {
            if (err) return res.err(err)
            res.send({
                code: 200,
                message: isRecommend == 1 ? "首页推荐成功" : "取消推荐成功"
            })
        })
    })
}