const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// 获取用户列表
router.get('/api/graduate/getUser', (req, res) => {
  // 查询除了管理员外的所有用户
  db.query(
    'select * from users where user_state <> 0 and user_email like ? ',
    '%' + req.query.query + '%',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取用户列表失败' })
      }
      const total = result.length
      // abc中存储的是result.length/5向上取整得到的值
      const abc = Math.floor(result.length / 5)
      const pageStart = (req.query.pageNum - 1) * 5
      if (req.query.pageNum <= abc) {
        result = result.slice(pageStart, pageStart + 5)
      } else {
        result = result.slice(pageStart)
      }
      res.send({ code: 200, message: '获取用户列表成功', result, total })
    }
  )
})


// 根据id获取单个用户
router.get('/api/graduate/getOnlyUser', (req, res) => {
  db.query(
    'select * from users where user_id = ?',
    req.query.id,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取当前用户失败' })
      }
      res.send({ code: 200, message: '获取当前用户成功', result })
    }
  )
})

// 添加用户
router.post('/api/graduate/addUser', (req, res) => {
  const addObj = {
    user_email: req.body.user_email,
    user_pwd: req.body.user_pwd,
    user_tel: req.body.user_tel,
    user_nickname: req.body.user_nickname,
    user_state: 1,
    user_addtime: moment().format('YYYY-MM-DD'),
    user_pic: 'default.jpg'
  }
  db.query('insert into users set?', addObj, (err, result) => {
    if (err || result.affectedRows !== 1) {
      console.log(err)
      return res.send({ code: 201, message: '添加新用户失败' })
    }
    res.send({ code: 200, message: '添加新用户成功' })
  })
})

// 编辑用户
router.post('/api/graduate/editUser', (req, res) => {
  // 创建存储新的个人信息的对象
  const editObj = {
    user_email: req.body.user_email,
    user_pwd: req.body.user_pwd,
    user_tel: req.body.user_tel,
    user_nickname: req.body.user_nickname,
    user_sign: req.body.user_sign || ''
  }
  db.query(
    'update users set ? where user_id = ?',
    [editObj, req.body.user_id],
    (err, result) => {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '编辑用户失败' })
      }
      res.send({ code: 200, message: '编辑用户成功' })
    }
  )
})

// 删除用户
router.post('/api/graduate/delUser', (req, res) => {
  db.query(
    `delete from users where user_id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '删除用户失败' })
      }
      res.send({ code: 200, message: '删除用户成功' })
    }
  )
})

// 切换用户状态
router.post('/api/graduate/modifyUser', (req, res) => {
  const changeStateObj = {
    user_state: req.body.state
  }
  db.query(
    'update users set ? where user_id = ?',
    [changeStateObj, req.body.id],
    (err, result) => {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '修改用户状态失败' })
      }
      res.send({ code: 200, message: '修改用户状态成功' })
    }
  )
})
module.exports = router
