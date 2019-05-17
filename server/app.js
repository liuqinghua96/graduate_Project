const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const url = require('url');


const app = express();
// 监听8888端口
app.listen(8888,()=>{
    console.log('Information-Server is running at 8888......');
});

global.rootPath = __dirname;
// 指定HTML文件使用模板引擎渲染
app.engine('html',require('express-art-template'));
// 加载静态文件
app.use(session({
    secret:'eyfy24fyed',
    resave:false,
    saveUninitialized:false
}));

app.use(bodyParser.urlencoded({extended:false}));

fs.readdir(path.join(__dirname,'routers'),(err,result)=>{
  if(err){
      console.log(err);
  }
  for(let i = 0;i<result.length;i++){
      let router = require(path.join(__dirname,'routers',result[i]));
      app.use(router);
  }
});