var express = require("express")
var swig = require("swig")
var mongoose = require('mongoose')
//处理post提交过来的数据
var bodyParser = require('body-parser')

var Cookies = require('cookies')

var app = new express()

var User = require('./models/User')

app.use('/public',express.static(__dirname+'/public'))

app.engine('html',swig.renderFile)
app.set('views','./views')
app.set('view engine','html')
//取消模板缓存
swig.setDefaults({cache:false})
//bodyparser设置
app.use(bodyParser.urlencoded({extended:true}))

//设置cookies
app.use(function(req,res,next){
    req.cookies = new Cookies(req,res)

    //解析登录用户的cookie信息
    req.userInfo = {};

    if(req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //是否为管理员
            User.findById(req.userInfo._id).then(function(userInfo){
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin)
                next()
            })
        }catch(e){
            // next()
        }

    }else {
        next()
    }
})

app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))


mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败')
    }else{
        console.log('数据库连接成功')
        app.listen(3000)
    }
})