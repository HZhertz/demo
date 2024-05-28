const db = require("./db")
//全局配置文件
var md5 = require('blueimp-md5')
var moment = require('moment')
var Base64 = require('js-base64').Base64;
var request = require('request');
const { onClients } = require("./ws")
/*
 生成指定长度的随机数
 */
function randomCode(length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var result = ""; //统一改名: alt + shift + R
    for (var i = 0; i < length; i++) {
        var index = Math.ceil(Math.random() * 9);
        result += chars[index];
    }
    return result;
}
/*
向指定号码发送指定验证码
 */
function sendCode(phone, code, callback) {
    var ACCOUNT_SID = '2c9488768610eb8001862e8f2138057f';
    var AUTH_TOKEN = '76e96ee498874713b515593b79ebe95a';
    var Rest_URL = 'https://app.cloopen.com:8883';
    var AppID = '2c9488768610eb8001862e8f223a0586';
    //1. 准备请求url
    /*
     1.使用MD5加密（账户Id + 账户授权令牌 + 时间戳）。其中账户Id和账户授权令牌根据url的验证级别对应主账户。
     时间戳是当前系统时间，格式"yyyyMMddHHmmss"。时间戳有效时间为24小时，如：20140416142030
     2.SigParameter参数需要大写，如不能写成sig=abcdefg而应该写成sig=ABCDEFG
     */
    var sigParameter = '';
    var time = moment().format('YYYYMMDDHHmmss');
    sigParameter = md5(ACCOUNT_SID + AUTH_TOKEN + time);
    var url = Rest_URL + '/2013-12-26/Accounts/' + ACCOUNT_SID + '/SMS/TemplateSMS?sig=' + sigParameter;

    //2. 准备请求体
    var body = {
        to: phone,
        appId: AppID,
        templateId: '1',
        "datas": [code, "1"]
    }
    //body = JSON.stringify(body);

    //3. 准备请求头
    /*
     1.使用Base64编码（账户Id + 冒号 + 时间戳）其中账户Id根据url的验证级别对应主账户
     2.冒号为英文冒号
     3.时间戳是当前系统时间，格式"yyyyMMddHHmmss"，需与SigParameter中时间戳相同。
     */
    var authorization = ACCOUNT_SID + ':' + time;
    authorization = Base64.encode(authorization);
    var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': JSON.stringify(body).length + '',
        'Authorization': authorization
    }

    //4. 发送请求, 并得到返回的结果, 调用callback
    // callback(true);
    request({
        method: 'POST',
        url: url,
        headers: headers,
        body: body,
        json: true
    }, function (error, response, body) {
        console.log(error, body)
        callback(body.statusCode === '000000');
    });
}
/**
 * 每天下午6点（上下错30分钟）执行该函数
 * 判断用户预约是否过期
 */
function everyDayAfterSix() {
    let suo = false
    setInterval(() => {
        //每天超过6点执行
        console.log("执行判断用户预约是否过期，当前时间：" + moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
        let time = moment(moment(new Date()).format("YYYY-MM-DD") + " 18:00:00")
        if (!suo && new Date() > time) {
            suo = true
            let sql1 = "select b.id from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join doctor_register as c on a.doctor_register_id=c.id where a.isSeeDoctor=0 and c.sitting_time=?"
            let sql = `update doctorcard set is_break=is_break+1 where id in (select a.doctorcard_id as id from registration_relation as a left join doctor_register as c on a.doctor_register_id=c.id where a.isSeeDoctor=0 and c.sitting_time=?)`
            db.query(sql, moment((new Date())).format("YYYY-MM-DD"), (err, result) => {
                if (err) return console.log("错误", err)
                let sql2 = "select b.id,b.user_id,b.is_break as isBreak,b.relationship,b.patient_name as patientName,c.id as insertId  from registration_relation as a left join doctorcard as b on a.doctorcard_id=b.id left join doctor_register as c on a.doctor_register_id=c.id where a.isSeeDoctor=0 and c.sitting_time=?"
                db.query(sql2, moment((new Date())).format("YYYY-MM-DD"), (err, info) => {
                    if (err) return console.log("错误", err)
                    let user = info ? info.map(item => item.user_id) : []
                    if (info) {
                        let j = 0
                        for (let i = 0, len = info.length; i < len; i++) {
                            let item = {
                                content: info[i].relationship === "本人" ? `您已超过预约时间，预约时间为${moment((new Date())).format("YYYY-MM-DD")}，失约次数为${info[i].isBreak}次（注：超过3次将不能预约）！` : `您为(${info[i].relationship})${info[i].patientName}预约未在规定时间内问诊,预约时间为${moment((new Date())).format("YYYY-MM-DD")}，失约次数为${info[i].isBreak}次（注：超过3次将不能预约）！`,
                                registration_relation_id: info[i].insertId,
                                create_time: new Date(),
                                user_id: info[i].user_id
                            }
                            let sql3 = "insert into system_message set ?"
                            db.query(sql3, item, (err, r) => {
                                if (err) return console.log("错误", err)
                                j++
                                if (j >= info.length) {
                                    //即使通讯
                                    let clients = onClients()
                                    clients.length !== 0 && clients.forEach(item => {
                                        if (!user.includes(parseInt(item.id))) return
                                        item.ws.send(JSON.stringify({ code: 200, message: "失约记录" }).toString("utf8"))
                                    })
                                }

                            })
                        }
                    }
                })
            })
        }
        if (suo && new Date() < time) {
            suo = false
        }
    }, 1000 * 60 * 30)
}
module.exports = {
    jwtSecretKey: "zhaohx8 +_+ =_=",
    sendCode,
    randomCode,
    everyDayAfterSix
}