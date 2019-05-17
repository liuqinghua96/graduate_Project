const express = require('express')

const router = express.Router()
// 引入path模块
const path = require('path')
const db = require('../db.js')
const moment = require('moment')

// ------------------------------------------------------------公共区域---------------------------------------------------------------------
// 获取栏目列表
router.get('/api/graduate/getCates', (req, res) => {
  db.query('select * from cates', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取栏目列表失败' })
    }
    res.send({ code: 200, message: '获取栏目列表成功', result })
  })
})

// 获取随机推荐数据
router.get('/api/graduate/getRandCmd', (req, res) => {
  db.query('select * from article order by rand() limit 0,5', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取栏目列表失败' })
    }
    res.send({ code: 200, message: '获取栏目列表成功', result })
  })
})

// 获取最新评论
router.get('/api/graduate/getLastCmt', (req, res) => {
  db.query(
    'select * from comment,article,users where comment.cmt_userid = users.user_id and comment.cmt_id = article.article_id order by comment.cmt_id desc limit 0,6',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取最新评论失败' })
      }
      res.send({ code: 200, message: '获取最新评论成功', result })
    }
  )
})

// -------------------------------------------------------首页局部区域---------------------------------------------------------------------
router.get('/api/graduate/getLastAnnounce', (req, res) => {
  db.query('select * from announce where anc_state = 0 order by anc_id desc limit 0,2', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新公告失败' })
    }
    res.send({ code: 200, message: '获取最新公告成功', result })
  })
})
router.get('/api/graduate/getFocus', (req, res) => {
  db.query('select * from article order by article_focus desc limit 0,5', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取焦点关注文章失败' })
    }
    res.send({ code: 200, message: '获取焦点关注文章成功', result })
  })
})
router.get('/api/graduate/getWeekHot', (req, res) => {
  db.query('select * from article order by article_good desc limit 0,5', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取一周排行文章失败' })
    }
    res.send({ code: 200, message: '获取一周排行文章成功', result })
  })
})
router.get('/api/graduate/getHotRecommend', (req, res) => {
  db.query('select * from article order by article_click desc limit 0,4', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取热门推荐文章失败' })
    }
    res.send({ code: 200, message: '获取热门推荐文章成功', result })
  })
})
router.get('/api/graduate/getLastSubmit', (req, res) => {
  db.query('select * from article,users,cates where article.article_userid = users.user_id and article.article_cateid = cates.cate_id order by article_id desc limit 0,3', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新发布文章失败' })
    }
    res.send({ code: 200, message: '获取最新发布文章成功', result })
  })
})

// -------------------------------------------------------文章列表页局部区域---------------------------------------------------------------------
router.get('/api/graduate/getShowList', (req, res) => {
  db.query(`select * from article,users,cates where article.article_userid = users.user_id and article.article_cateid = cates.cate_id and article.article_cateid = ${req.query.id} order by article_id desc limit 0,4`, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取对应栏目文章失败' })
    }
    res.send({ code: 200, message: '获取对应栏目文章成功', result })
  })
})

// -------------------------------------------------------文章详情页局部区域---------------------------------------------------------------------
module.exports = router
