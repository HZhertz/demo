### 项目初始化

npm install

### MySql 数据库

db/index.js 下

user: "root", //更换成自己用户名
password: "a1448910330",//更换成自己密码

dump-hospital_mysql-202304211117 为 sql 脚本执行即可

### 管理员端地址

https://github.com/HZhertz/hospital-react-admin

### 用户端端地址

https://github.com/HZhertz/hospital-react-user

### 注

验证码 与 手机号发送的验证码均可在控制台查看日志

### bug

多用户一起登陆时，手机号验证码和验证码会取最新值，后续修复
