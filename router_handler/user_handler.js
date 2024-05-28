const db = require("../db/index")
const bcryptjs = require("bcryptjs")
// 加载图片验证码模块
const svgCaptcha = require("svg-captcha")
// 导入生成token包
const jsonWebToken = require("jsonwebtoken")
const { jwtSecretKey, sendCode, randomCode } = require("../config")
let codeSvg
let phoneCode
let phoneCodeReguser
let time
let timeReguser
exports.captcha = (req, res) => {
    // 设置字母随机验证码相关属性
    let options = {
        size: 4, // 4个字母
        noise: 2, // 干扰线2条
        color: true, // 文字颜色
        background: "#666", // 背景颜色
        // 数字的时候，设置下面属性。最大，最小，加或者减
        // mathMin: 1,
        // mathMax: 30,
        // mathOperator: "+",
    }
    //这里可以分为字母和数字随机验证码和数字算数随机验证码,
    //我就先展示字母和数字随机验证码了,
    //如果想尝试数字算数随机验证码可以将下一行取消注释,将数字算数验证码解开注释即可
    let captcha = svgCaptcha.create(options) //字母和数字随机验证码
    // let captcha = svgCaptcha.createMathExpr(options) //数字算数随机验证码

    let { text, data } = captcha
    // text是指产生的验证码，data指svg的字节流信息
    res.type("svg")
    codeSvg = text
    console.log("验证码为", text)
    res.send({ code: 200, img: data, str: text })
}
exports.login = (req, res) => {
    const userInfo = req.body
    const sqlStr = "select * from user where username=?"
    db.query(sqlStr, [userInfo.username], (err, result) => {
        if (err) return res.err(err)
        if (result.length !== 1) return res.err("用户名错误，登陆失败")
        const compareReslut = bcryptjs.compareSync(userInfo.password, result[0].password)
        if (!compareReslut) {
            return res.err("密码错误，登陆失败")
        }
        if (Date.now() - time > 60000) return res.err("验证码超时，请重新获取")
        //短信验证码
        if (userInfo.phoneCode !== phoneCode) return res.err("短信验证码错误，登陆失败")
        //验证码
        if (userInfo.code.toUpperCase() !== codeSvg.toUpperCase()) return res.err("验证码错误，登陆失败")
        //生成token
        const jwtToken = jsonWebToken.sign({ id: result[0].id, username: result[0].username }, jwtSecretKey, { expiresIn: "8h" })
        let isRank = false
        if (result[0].user_rank == 1) isRank = true
        res.send({
            code: 200,
            message: "登陆成功",
            data: `Bearer ${jwtToken}`,
            isRank: isRank,
            id: result[0].id
        })

    })
}
exports.getPhoneCode = (req, res) => {
    const userInfo = req.body
    const sql = "select * from user where username=?"
    db.query(sql, [userInfo.username], (err, result) => {
        if (err) return res.err(err)
        if (result.length !== 1) return res.err("用户名错误，获取失败")
        const compareReslut = bcryptjs.compareSync(userInfo.password, result[0].password)
        if (!compareReslut) {
            return res.err("密码错误，获取失败")
        }
        let phone = result[0].phone
        phoneCode = randomCode(4);//生成4位数字随机验证码
        console.log("手机验证码为：", phoneCode)
        time = Date.now()
        res.send({
            code: 200,
            message: "短信验证码获取成功"
        });
        // sendCode(phone, phoneCode, function (success) {
        //     if (success) {
        //         res.send({
        //             code: 200,
        //             message: "短信验证码获取成功"
        //         });
        //     } else {
        //         res.send({
        //             code: 500,
        //             message: "短信验证码获取失败"
        //         });
        //     }
        // })
    })
}
exports.getPhoneCodeReguser = (req, res) => {
    const userInfo = req.body
    const sql = 'select * from user where phone=?'
    db.query(sql, [userInfo.phone], (err, result) => {
        if (err) return res.err(err)
        //手机号已被注册
        if (result.length > 0) return res.err('该手机号已被注册')
        phoneCodeReguser = randomCode(6);//生成6位数字随机验证码
        timeReguser = Date.now()
        console.log("注册手机验证码为：", phoneCodeReguser)
        res.send({
            code: 200,
            message: "短信验证码获取成功"
        });
        // sendCode(userInfo.phone, phoneCodeReguser, function (success) {
        //     if (success) {
        //         res.send({
        //             code: 200,
        //             message: "短信验证码获取成功"
        //         });
        //     } else {
        //         res.send({
        //             code: 200,
        //             message: "短信验证码获取失败"
        //         });
        //     }
        // })
    })

}
exports.regUser = (req, res) => {
    const userInfo = req.body
    //定义sql语句查询用户名是否被占用
    const sqlStr = "select * from user where phone=? "
    db.query(sqlStr, [userInfo.phone], (err, result) => {
        if (err) {
            return res.err(err)
        }
        // 判断手机号是否被占用
        if (result.length > 0) {
            return res.err("该手机号被占用")
        } else {
            const sqlStr1 = "select * from user where username=? "
            db.query(sqlStr1, [userInfo.username], (err, results) => {
                if (err) {
                    return res.err(err)
                }
                if (results.length > 0) {
                    return res.err("该用户名被占用")
                } else {
                    if (Date.now() - timeReguser > 60000) return res.err("验证码超时，请重新获取")
                    if (phoneCodeReguser !== userInfo.phoneCode) return res.err("短信验证码错误，注册失败")
                    //验证码
                    if (userInfo.code.toUpperCase() !== codeSvg.toUpperCase()) return res.err("验证码错误，登陆失败")
                    userInfo.password = bcryptjs.hashSync(userInfo.password, 10)  //加密
                    db.query("insert into user set ?", { username: userInfo.username, password: userInfo.password, phone: userInfo.phone, user_rank: userInfo.userRank }, (err, result) => {
                        if (err) {
                            res.err(err)
                        }
                        res.send({
                            code: 200,
                            message: "注册成功"
                        })
                    })
                }
            })

        }
    })

}