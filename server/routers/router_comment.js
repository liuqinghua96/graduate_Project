const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// 获取评论列表
router.get('/api/graduate/getComment', (req, res) => {
  db.query(
    'select * from comment,users,article where article.article_id = comment.cmt_articleid and users.user_id = comment.cmt_userid and article.article_title like ? ',
    '%' + req.query.query + '%',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取评论列表失败' })
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
      res.send({ code: 200, message: '获取评论列表成功', result, total })
    }
  )
})

// 编辑评论
router.post('/api/graduate/editComment', (req, res) => {
  const editObj = {
    cmt_content: req.body.cmt_content,
    cmt_state: req.body.cmt_state
  }
  db.query(
    'update comment set ? where cmt_id = ?',
    [editObj, req.body.cmt_id],
    (err, result) => {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '编辑评论失败' })
      }
      res.send({ code: 200, message: '编辑评论成功' })
    }
  )
})

// 删除评论
router.post('/api/graduate/delComment', (req, res) => {
  db.query(
    `delete from comment where cmt_id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '删除评论失败' })
      }
      res.send({ code: 200, message: '删除评论成功' })
    }
  )
})
module.exports = router
