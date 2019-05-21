<template>
  <div class="articleEdit_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/articleList'}">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <quill-editor v-model="articleInfo.article_text"
                    style="height:430px; marginBottom:40px;">
      </quill-editor>
      <div class="btnGroup">
        <el-button type="primary" plain class="formBtn" @click="submitEditArticle('草稿')">保存草稿</el-button>
        <el-button type="success" plain class="formBtn" @click="submitEditArticle('已发布')">重新发布</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'articleDetail',
  data () {
    return {
      queryId: this.$route.query.id,
      articleInfo: {}
    }
  },
  methods: {
    // 获取文章详情
    async getArticle_Detail (id) {
      const {
        data: { result }
      } = await this.$http.get('getArticle_Detail', {
        params: { id }
      })
      result[0].article_file = '../../../static/' + result[0].article_file
      this.articleInfo = result[0]
    },
    // 编辑文章为草稿/发布
    async submitEditArticle (state) {
      this.articleInfo.article_state = state
      const { data } = await this.$http.post(
        'submitEditArticle',
        qs.stringify(this.articleInfo)
      )
      if (data.code !== 200) return this.$message.error(data.message)
      this.$message.success(data.message)
      this.$router.push('/articleList')
    }
  },
  mounted () {
    this.getArticle_Detail(this.queryId)
  }
}
</script>
<style scoped>
.el-button {
  margin-right: 20px;
  margin-top: 20px;
}
</style>
