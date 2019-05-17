const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// 获取公告列表
router.get('/api/graduate/getAnnounce', (req, res) => {
  db.query(
    'select * from announce where anc_title like ? ',
    '%' + req.query.query + '%',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取公告列表失败' })
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
      res.send({ code: 200, message: '获取公告列表成功', result, total })
    }
  )
})

// 添加公告
router.post('/api/graduate/addAnnounce', (req, res) => {
  const addObj = {
    anc_content: req.body.anc_content,
    anc_title: req.body.anc_title,
    anc_state: req.body.anc_state,
    anc_addtime: moment().format('YYYY-MM-DD')
  }
  db.query('insert into announce set?', addObj, (err, result) => {
    if (err || result.affectedRows !== 1) {
      console.log(err)
      return res.send({ code: 201, message: '添加新公告失败' })
    }
    res.send({ code: 200, message: '添加新公告成功' })
  })
})

// 编辑公告
router.post('/api/graduate/editAnnounce', (req, res) => {
  const editObj = {
    anc_title: req.body.anc_title,
    anc_content: req.body.anc_content,
    anc_state: req.body.anc_state
  }
  db.query(
    'update announce set ? where anc_id = ?',
    [editObj, req.body.anc_id],
    (err, result) => {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '编辑公告失败' })
      }
      res.send({ code: 200, message: '编辑公告成功' })
    }
  )
})

// 删除公告
router.post('/api/graduate/delAnnounce', (req, res) => {
  db.query(
    `delete from announce where anc_id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '删除公告失败' })
      }
      res.send({ code: 200, message: '删除公告成功' })
    }
  )
})
module.exports = router
