<template>
  <div class="articleDetail_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/articleList'}">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="4"><p class="infoList">发布时间：{{this.info.article_addtime}}</p></el-col>
        <el-col :span="4"><p class="infoList">发布者：{{this.info.user_email}}</p></el-col>
        <el-col :span="3"><p class="infoList">所属栏目：{{this.info.cate_name}}</p></el-col>
        <el-col :span="3"><p class="infoList">状态：{{this.info.article_state}}</p></el-col>
        <el-col :span="3"><p class="infoList">点击量：{{this.info.article_click}}</p></el-col>
        <el-col :span="3"><p class="infoList">评论量：{{this.info.article_cmt}}</p></el-col>
        <el-col :span="2"><p class="infoList">赞：{{this.info.article_good}}</p></el-col>
        <el-col :span="2"><p class="infoList">踩：{{this.info.article_bad}}</p></el-col>
      </el-row>
      <el-row>
        <h1>{{this.info.article_title}}</h1>
        <p class="subtitle">【摘要】{{this.info.article_desc}}</p>
      </el-row>
      <hr/>
      <el-row>
        <div class="content" id="content">
        </div>
      </el-row>
      <el-row class="cmt_list">
        <h3 class="cmt_s">文章评论</h3>
        <ul v-if="commentList.length !== 0">
          <li v-for="(item,i) in commentList" :key="i" class="cmt_part">
            <img :src="item.user_pic" class="ownPic">
            <div class="ps">
              <p class="cmt_user">{{item.user_nickname}}评论说：</p>
              <p class="cmt_text">{{item.cmt_content}}</p>
              <p class="cmt_addtime">评论日期：{{item.cmt_addtime}}</p>
            </div>
          </li>
        </ul>
        <div v-else class="replace">暂无评论，快来发表吧~~~~~</div>
      </el-row>
      <el-row class="cmt_list">
        <h3 class="cmt_s">我的评论</h3>
        <el-form label-position="top"
                label-width="80px"
                :model="form"
                :rules="rules"
                ref="form">
          <!-- 文本域 -->
          <el-form-item prop="textarea">
            <el-input type="textarea"
                      :rows="2"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      style="marginTop:20px"
                      placeholder="请输入评论内容......"
                      v-model="form.textarea">
            </el-input>
          </el-form-item>
          <!-- 提交按钮 -->
        </el-form>
        <div class="btnGroup">
          <el-button type="primary" plain class="formBtn" @click="submitArticle_Cmt(1)">保存草稿</el-button>
          <el-button type="success" plain class="formBtn" @click="submitArticle_Cmt(0)">提交评论</el-button>
        </div>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'articleDetail',
  data () {
    return {
      info: {},
      commentList: [],
      form: {
        articleId: 0,
        userId: sessionStorage.getItem('token'),
        textarea: '',
        // 0为发布状态，1为草稿状态
        cmtState: 0
      },
      rules: {
        textarea: [
          { required: true, message: '评论不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getArticle_Detail (id) {
      const {
        data: { result }
      } = await this.$http.get('getArticle_Detail', {
        params: { id }
      })
      result[0].article_file = '../../../static/' + result[0].article_file
      this.info = result[0]
      this.form.articleId = this.info.article_id
      document.getElementById(
        'content'
      ).innerHTML = this.info.article_text
      this.getArticleLastCmt(id)
    },
    async getArticleLastCmt (id) {
      const {data: { result }} = await this.$http.get('getArticleLastCmt', {params: { id }})
      result.forEach((item, i) => {
        item.user_pic = '../../../static/' + item.user_pic
      })
      this.commentList = result
    },
    // 提交评论为草稿/发布
    submitArticle_Cmt (state) {
      this.form.cmtState = state
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'submitArticle_Cmt',
            qs.stringify(this.form)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          // 这部分要写刷新对应文章的评论区域
        }
      })
      this.form.textarea = ''
      this.getArticleLastCmt(this.$route.query.id)
    }
  },
  mounted () {
    this.getArticle_Detail(this.$route.query.id)
  }
}
</script>
<style scoped>
.infoList {
  font-size: 12px;
}
h1 {
  font-size: 20px;
  margin: 20px 0;
}
p.subtitle {
  font-size: 14px;
  margin-bottom: 10px;
}
.content {
  padding-top: 20px;
}
.cmt_list {
  margin-top: 50px;
}
.cmt_s {
  display: inline-block;
  margin-bottom: 10px;
  line-height: 32px;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 2px solid #386367;
}
.cmt_part {
  margin-bottom: 80px;
  position: relative;
}
.cmt_part:first-child {
  margin-top: 20px;
}
.cmt_part:last-child {
  margin-bottom: 20px;
}
.ownPic {
  position: absolute;
  width: 70px;
  height: 70px;
  display: block;
}
.ps {
  padding: 0 70px;
}
.ps p {
  margin: 0 30px 20px;
}
.ps p:first-child {
  font-size: 14px;
  font-weight: 700;
}
.ps p:nth-child(2) {
  font-size: 18px;
}
.ps p:last-child {
  font-size: 12px;
}
.replace {
  font-size: 20px;
  text-align: center;
  margin: 50px;
}
</style>
