import qs from 'qs'
export default {
  name: 'ArticleList',
  data () {
    return {
      queryMsg: {
        query: '',
        pageNum: 1,
        pageSize: 3
      },
      // 文章数据列表条目数
      total: 0,
      articleList: [],
      addForm: {},
      article_text: '',
      text: ''
    }
  },
  methods: {
    search () {
      this.getData()
    },
    // 获取文章列表
    async getData () {
      let { data } = await this.$http.get('getArticle', {
        params: this.queryMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.articleList = data.result
      this.total = data.total
    },
    // 切换页码
    changePager (newpage) {
      this.queryMsg.pageNum = newpage
      this.getData()
    },
    // 跳转到文章详情界面
    toDetail (id) {
      this.$router.push({ path: '/articleList/detail', query: { id } })
    },
    // 跳转到编辑文章界面
    toEditArticle (id) {
      this.$router.push({ path: '/articleList/edit', query: { id } })
    },
    toAddArticle () {
      this.$router.push('/articleList/add')
    },
    // 删除文章
    delArticle (id) {
      this.$confirm('永久删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post(
            'delArticle',
            qs.stringify({ id })
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  mounted () {
    this.getData()
  }
}
