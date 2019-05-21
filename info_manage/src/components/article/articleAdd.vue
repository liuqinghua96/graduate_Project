<template>
  <div class="articleEdit_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path: '/articleList'}">文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form label-position="right"
               label-width="80px"
               :model="articleInfo"
               :rules="rules"
               ref="articleInfo">
        <el-form-item label="所属栏目" prop="article_cateid">
          <el-select v-model="articleInfo.article_cateid"
                     placeholder="请选择">
            <el-option v-for="(item,i) in cateOptions"
                       :key="i"
                       :label="item.cate_name"
                       :value="item.cate_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="article_title">
          <el-input v-model="articleInfo.article_title"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="article_desc">
          <el-input v-model="articleInfo.article_desc"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="article_text">
          <quill-editor v-model="articleInfo.article_text"
                        style="height:255px; marginBottom:40px;">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary"
                   plain
                   class="formBtn"
                   @click="submitAddArticle('草稿')">保存草稿</el-button>
        <el-button type="success"
                   plain
                   class="formBtn"
                   @click="submitAddArticle('已发布')">发布文章</el-button>
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
      cateOptions: [],
      articleInfo: {
        article_title: '',
        article_desc: '',
        article_text: '',
        article_cateid: '',
        article_userid: sessionStorage.getItem('token'),
        article_state: ''
      },
      rules: {
        article_title: [
          { required: true, message: '标题不得为空', trigger: 'blur' }
        ],
        article_desc: [
          { required: true, message: '摘要不得为空', trigger: 'blur' }
        ],
        article_text: [
          { required: true, message: '内容不得为空', trigger: 'blur' }
        ],
        article_cateid: [
          { required: true, message: '栏目类型必选', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getCates () {
      const { data: { result } } = await this.$http.get('getCates')
      this.cateOptions = result
    },
    // 添加文章为草稿/发布
    async submitAddArticle (state) {
      this.articleInfo.article_state = state
      this.$refs.articleInfo.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'submitAddArticle',
            qs.stringify(this.articleInfo)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.$router.push('/articleList')
        }
      })
    }
  },
  mounted () {
    this.getCates()
  }
}
</script>
<style scoped>
.el-button {
  margin-right: 20px;
  margin-top: 35px;
}
.el-button:first-child {
  margin-left: 100px;
}
</style>
