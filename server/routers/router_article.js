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

// 新建文章并保存为草稿/发布
router.post('/api/graduate/submitAddArticle', (req, res) => {
  const submitObj = {
    article_title: req.body.article_title,
    article_desc: req.body.article_desc,
    article_cateid: req.body.article_cateid,
    article_text: req.body.article_text,
    article_state: req.body.article_state,
    article_userid: req.body.article_userid,
    article_addtime: moment().format('YYYY-MM-DD'),
    article_click: 0,
    article_good: 0,
    article_bad: 0,
    article_focus: 0,
    article_cmt: 0,
    article_file: 'widget_1.jpg'
  }
  db.query(`insert into article set ? `, submitObj, (err, result) => {
    if (submitObj.article_state == '已发布') {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '发布文章失败' })
      }
      res.send({ code: 200, message: '发布文章成功' })
    } else {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '保存草稿失败' })
      }
      res.send({ code: 200, message: '保存草稿成功' })
    }
  })
})
// 编辑文章并保存为草稿/发布
router.post('/api/graduate/submitEditArticle', (req, res) => {
  const submitObj = {
    article_text: req.body.article_text,
    article_state: req.body.article_state
  }
  db.query(`update article set ? where article_id = ${req.body.article_id}`, submitObj, (err, result) => {
    if (submitObj.article_state == '已发布') {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '重新发布文章失败' })
      }
      res.send({ code: 200, message: '重新发布文章成功' })
    } else {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '保存草稿失败' })
      }
      res.send({ code: 200, message: '保存草稿成功' })
    }
  })
})
module.exports = router
