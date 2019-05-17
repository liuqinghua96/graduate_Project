const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// 获取文章列表
router.get('/api/graduate/getArticle', (req, res) => {
  // 查询除了管理员外的所有用户
  db.query(
    'select * from article,users,cates where article_title like ? and article.article_userid = users.user_id and article.article_cateid = cates.cate_id',
    '%' + req.query.query + '%',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取文章列表失败' })
      }
      const total = result.length
      // abc中存储的是result.length/5向上取整得到的值
      const abc = Math.floor(result.length / 3)
      const pageStart = (req.query.pageNum - 1) * 3
      if (req.query.pageNum <= abc) {
        result = result.slice(pageStart, pageStart + 3)
      } else {
        result = result.slice(pageStart)
      }
      res.send({ code: 200, message: '获取文章列表成功', result, total })
    }
  )
})

// 删除文章
router.post('/api/graduate/delArticle', (req, res) => {
  db.query(
    `delete from article where article_id = ${req.body.id}`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '删除文章失败' })
      }
      res.send({ code: 200, message: '删除文章成功' })
    }
  )
})
module.exports = router
