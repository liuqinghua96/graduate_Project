import qs from 'qs'
export default {
  name: 'showOwn',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      editForm: {},
      rules: {
        user_email: [
          { required: true, message: '邮箱不得为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        user_nickname: [
          { required: true, message: '昵称不得为空', trigger: 'blur' }
        ],
        user_pwd: [
          { required: true, message: '密码不得为空', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        user_tel: [
          { required: true, message: '手机号不得为空', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      queryMsg: {
        article_userid: sessionStorage.getItem('token'),
        query: '',
        pageNum: 1,
        pageSize: 5
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
    async getOwnData () {
      const { data } = await this.$http.get('getOnlyUser', { params: { id: sessionStorage.getItem('token') } })
      this.editForm = data.result[0]
    },
    resetForm () {
      this.getData()
      this.$refs.editForm.resetFields()
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editUser',
            qs.stringify(this.editForm)
          )
          if (data.code !== 200) return this.$message.error('修改个人信息失败')
          this.$message.success('修改个人信息成功')
          this.getData()
          this.$refs.editForm.resetFields()
        }
      })
    },
    // 获取文章列表
    async getOwnArticleData () {
      let { data } = await this.$http.get('getOwnArticle', {
        params: this.queryMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.articleList = data.result
      this.total = data.total
    },
    // 切换页码
    changeOwnPager (newpage) {
      this.queryMsg.pageNum = newpage
      this.getOwnArticleData()
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
          this.getOwnArticleData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  },
  mounted () {
    this.getOwnData()
    this.getOwnArticleData()
  }
}
