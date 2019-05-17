const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// 用户登录验证
router.post('/api/graduate/checkLogin', (req, res) => {
  db.query(
    'select * from users where user_email = ? and user_pwd = ?',
    [req.body.email, req.body.password],
    (err, result) => {
      // 如果出现异常错误，或者数据表中查询到的行数不为1，提示用户名或密码不正确，登录失败
      if (err || result.length !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '用户名或密码不正确，请重新输入' })
      }
      res.send({ code: 200, message: '登录成功',result })
    }
  )
})
// 用户注册
router.post('/api/graduate/register', (req, res) => {
  // 创建一个存储新用户的对象
  const newUserObj = {
    user_email: req.body.email,
    user_pwd: req.body.password,
    user_tel: req.body.phone,
    // 用户昵称
    user_nickname: req.body.nickname, 
    // 默认新用户的状态码为1，表示其为可用的普通用户
    user_state: 1,
    // 默认填充创建该用户的时间
    user_addtime: moment().format('YYYY-MM-DD'),
    // 给该用户提供一个默认头像
    user_pic: 'default.jpg'
  }
  // 数据库操作
  db.query('insert into users set?', newUserObj, (err, result) => {
    // 如果出现异常错误，或者数据表中受影响的行数不为1，提示注册失败
    if (err || result.affectedRows !== 1) {
      console.log(err)
      return res.send({ code: 201, message: '注册失败' })
    }
    res.send({ code: 200, message: '注册成功' })
  })
})

module.exports = router
