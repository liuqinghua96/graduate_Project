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
      <el-divider>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</el-divider>
      <el-row>
        <div class="content" id="content">
        </div>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'articleDetail',
  data () {
    return {
      info: {}
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
      document.getElementById(
        'content'
      ).innerHTML = this.info.article_text
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
</style>
