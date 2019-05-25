import qs from 'qs'
export default {
  name: 'ShowDetail',
  data () {
    return {
      hotRecommend: [],
      weekHotList: [],
      articleInfo: {},
      contentText: '',
      queryId: this.$route.query.id,
      // 评论列表
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
  watch: {
    '$route' (to, from) {
      this.getArticle_Detail(this.$route.query.id)
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
      this.form.articleId = this.articleInfo.article_id
      document.getElementById(
        'content'
      ).innerHTML = this.articleInfo.article_text
      this.$refs.form.resetFields()
      this.getArticleLastCmt(id)
    },
    // 获取当前展示文章的相关最新评论
    async getArticleLastCmt (id) {
      const {data: { result }} = await this.$http.get('getArticleLastCmt', {params: { id }})
      result.forEach((item, i) => {
        item.user_pic = '../../../static/' + item.user_pic
      })
      this.commentList = result
    },
    // 跳转至列表页
    toShowList (id) {
      this.$router.push({ path: '/showList', query: { id } })
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
          this.getArticleLastCmt(this.$route.query.id)
        }
      })
      this.form.textarea = ''
    },
    async getWeekHot () {
      // 按照点赞数量获取
      const {data: {result}} = await this.$http.get('getWeekHot')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.weekHotList = result
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    }
  },
  mounted () {
    this.getArticle_Detail(this.queryId)
    this.getWeekHot()
  }
}
