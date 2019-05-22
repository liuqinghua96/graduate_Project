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
  db.query('select * from article where article_state = ? order by rand() limit 0,5','已发布', (err, result) => {
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
    'select * from comment,article,users where comment.cmt_userid = users.user_id and comment.cmt_articleid = article.article_id and comment.cmt_state = 0 order by comment.cmt_id desc limit 0,6',
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
// 获取最新公告
router.get('/api/graduate/getLastAnnounce', (req, res) => {
  db.query('select * from announce where anc_state = 0 order by anc_id desc limit 0,2', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新公告失败' })
    }
    res.send({ code: 200, message: '获取最新公告成功', result })
  })
})
// 获取焦点关注
router.get('/api/graduate/getFocus', (req, res) => {
  db.query('select * from article where article_state = ? order by article_focus desc limit 0,5','已发布', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取焦点关注文章失败' })
    }
    res.send({ code: 200, message: '获取焦点关注文章成功', result })
  })
})
// 获取一周热门排行
router.get('/api/graduate/getWeekHot', (req, res) => {
  db.query('select * from article  where article_state = ? order by article_good desc limit 0,5','已发布', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取一周排行文章失败' })
    }
    res.send({ code: 200, message: '获取一周排行文章成功', result })
  })
})
// 获取热门推荐
router.get('/api/graduate/getHotRecommend', (req, res) => {
  db.query('select * from article  where article_state = ? order by article_click desc limit 0,4','已发布', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取热门推荐文章失败' })
    }
    res.send({ code: 200, message: '获取热门推荐文章成功', result })
  })
})
// 获取最新发布
router.get('/api/graduate/getLastSubmit', (req, res) => {
  db.query('select * from article,users,cates where article.article_userid = users.user_id and article.article_cateid = cates.cate_id  and article_state = ? order by article_id desc limit 0,3','已发布', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新发布文章失败' })
    }
    res.send({ code: 200, message: '获取最新发布文章成功', result })
  })
})

// -------------------------------------------------------文章列表页局部区域---------------------------------------------------------------------
// 根据栏目id获取对应栏目列表信息
router.get('/api/graduate/getShowList', (req, res) => {
  db.query(`select * from article,users,cates where article.article_userid = users.user_id and article.article_cateid = cates.cate_id and article_state = ? and article.article_cateid = ${req.query.id} order by article_id desc limit 0,4`,'已发布',(err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取对应栏目文章失败' })
    }
    res.send({ code: 200, message: '获取对应栏目文章成功', result })
  })
})

// -------------------------------------------------------文章详情页局部区域---------------------------------------------------------------------
// 根据id获取文章的详细信息
router.get('/api/graduate/getArticle_Detail', (req, res) => {
  db.query(`select * from article,users,cates where article.article_userid = users.user_id and article.article_cateid = cates.cate_id and article.article_id = ${req.query.id}`, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新发布文章失败' })
    }
    res.send({ code: 200, message: '获取最新发布文章成功', result })
  })
})
// 获取当前展示文章的相关最新评论
router.get('/api/graduate/getArticleLastCmt', (req, res) => {
  db.query(`select * from comment,users where comment.cmt_userid = users.user_id and comment.cmt_articleid = ${req.query.id} and comment.cmt_state = 0`, (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取相关评论失败' })
    }
    res.send({ code: 200, message: '获取相关评论成功', result })
  })
})
// 当前登录用户发布评论
router.post('/api/graduate/submitArticle_Cmt', (req, res) => {
  const submitObj = {
    cmt_content: req.body.textarea,
    cmt_articleid: req.body.articleId,
    cmt_userid: req.body.userId,
    cmt_addtime: moment().format('YYYY-MM-DD'),
    cmt_state: req.body.cmtState
  }
  db.query('insert into comment set?', submitObj, (err, result) => {
    if (submitObj.cmt_state == 0) {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '评论失败' })
      }
      res.send({ code: 200, message: '评论成功' })
    } else {
      if (err || result.affectedRows !== 1) {
        console.log(err)
        return res.send({ code: 201, message: '保存草稿失败' })
      }
      res.send({ code: 200, message: '保存草稿成功' })
    }
  })
})

// -------------------------------------------------------公告列表页局部区域---------------------------------------------------------------------
// 获取全部公告
router.get('/api/graduate/getAllAnnounce', (req, res) => {
  db.query('select * from announce where anc_state = 0 order by anc_id desc', (err, result) => {
    if (err) {
      console.log(err)
      return res.send({ code: 201, message: '获取最新公告失败' })
    }
    res.send({ code: 200, message: '获取最新公告成功', result })
  })
})

// -------------------------------------------------------个人中心页局部区域---------------------------------------------------------------------
// 获取当前用户发表的文章列表
router.get('/api/graduate/getOwnArticle', (req, res) => {
  // 查询除了管理员外的所有用户
  db.query(
    `select * from article,cates where article_title like ?  and article.article_cateid = cates.cate_id and article.article_userid = ${req.query.article_userid}`,
    '%' + req.query.query + '%',
    (err, result) => {
      if (err) {
        console.log(err)
        return res.send({ code: 201, message: '获取文章列表失败' })
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
      res.send({ code: 200, message: '获取文章列表成功', result, total })
    }
  )
})
// 获取当前用户发表的评论列表
router.get('/api/graduate/getOwnComment', (req, res) => {
  db.query(
    `select * from comment,article where article.article_id = comment.cmt_articleid and article.article_title like ? and comment.cmt_userid = ${req.query.cmt_userid}`,
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
module.exports = router
