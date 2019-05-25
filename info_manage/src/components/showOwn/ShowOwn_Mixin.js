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
      // ------------------------------------个人信息部分数据----------------------------
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
      // --------------------------------个人文章列表页------------------------------
      queryArticleMsg: {
        article_userid: sessionStorage.getItem('token'),
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 文章数据列表条目数
      articleTotal: 0,
      articleList: [],
      addForm: {},
      article_text: '',
      // text: ''
      dialogArticleEditVisible: false,
      editArticleForm: {},
      dialogArticleAddVisible: false,
      cateOptions: [],
      addArticleInfo: {
        article_title: '',
        article_desc: '',
        article_text: '',
        article_cateid: '',
        article_userid: sessionStorage.getItem('token'),
        article_state: ''
      },
      rules2: {
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
      },
      // -------------------------------------个人评论列表-------------------------------
      queryCommentMsg: {
        cmt_userid: sessionStorage.getItem('token'),
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 用户数据列表条目数
      commentTotal: 0,
      commentList: [],
      dialogCommentEditVisible: false,
      editCommentForm: {
        cmt_id: 0,
        cmt_state: 0,
        cmt_articleid: 1,
        article_title: '',
        cmt_content: ''
      },
      rules_cmt: {
        cmt_content: [
          { required: true, message: '内容不得为空', trigger: 'blur' }
        ],
        cmt_state: [
          { required: true, message: '发布状态不得为空', trigger: 'blur' }
        ]
      },
      // --------------------------------------焦点关注部分---------------------------------------
      focusList: []

    }
  },
  methods: {

    // ----------------------------------------------切换tab栏部分-----------------------------------------------
    tabClick (element) {
      if (element === this.$refs.ownInfo) {
        this.getOwnData()
      } else if (element === this.$refs.ownArticle) {
        this.getOwnArticleData()
      } else {
        this.getCommentData()
      }
    },

    // -----------------------------------------------个人信息部分--------------------------------------------------
    async getOwnData () {
      const { data } = await this.$http.get('getOnlyUser', { params: { id: sessionStorage.getItem('token') } })
      this.editForm = data.result[0]
    },
    resetForm () {
      this.getOwnData()
      this.$refs.editForm.resetFields()
    },
    editOwnInfoSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editUser',
            qs.stringify(this.editForm)
          )
          if (data.code !== 200) return this.$message.error('修改个人信息失败')
          this.$message.success('修改个人信息成功')
          this.getOwnData()
          this.$refs.editForm.resetFields()
        }
      })
    },

    // -----------------------------------------------文章列表页部分---------------------------------------------------
    // 获取文章列表
    async getOwnArticleData () {
      let { data } = await this.$http.get('getOwnArticle', {
        params: this.queryArticleMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.articleList = data.result
      this.articleTotal = data.total
    },
    // 切换页码
    changeOwnArticlePager (newpage) {
      this.queryArticleMsg.pageNum = newpage
      this.getOwnArticleData()
    },
    // 跳转到文章详情界面
    toDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    },
    // 打开编辑文章界面
    toEditOwnArticle (id) {
      this.dialogArticleEditVisible = true
      this.getArticle_Detail(id)
    },
    // 打开添加文章界面
    toAddOwnArticle () {
      this.dialogArticleAddVisible = true
      this.getCates()
    },
    // 删除文章
    delOwnArticle (id) {
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
    },
    // 根据id获取文章详情
    async getArticle_Detail (id) {
      const {
        data: { result }
      } = await this.$http.get('getArticle_Detail', {
        params: { id }
      })
      result[0].article_file = '../../../static/' + result[0].article_file
      this.editArticleForm = result[0]
    },
    // 编辑文章为草稿/发布
    async submitEditArticle (state) {
      this.editArticleForm.article_state = state
      const { data } = await this.$http.post(
        'submitEditArticle',
        qs.stringify(this.editArticleForm)
      )
      if (data.code !== 200) return this.$message.error(data.message)
      this.$message.success(data.message)
      this.dialogArticleEditVisible = false
      this.getOwnArticleData()
    },
    // 获取栏目列表
    async getCates () {
      const { data: { result } } = await this.$http.get('getCates')
      this.cateOptions = result
    },
    // 添加文章为草稿/发布
    async submitAddArticle (state) {
      this.addArticleInfo.article_state = state
      this.$refs.addArticleInfo.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'submitAddArticle',
            qs.stringify(this.addArticleInfo)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogArticleAddVisible = false
          this.getOwnArticleData()
        }
      })
    },
    // ---------------------------------------------评论列表页部分-------------------------------------------------
    // 获取评论列表
    async getCommentData () {
      let { data } = await this.$http.get('getOwnComment', {
        params: this.queryCommentMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.commentList = data.result
      this.commentTotal = data.total
    },
    // 切换页码
    changeCommentPager (newpage) {
      this.queryCommentMsg.pageNum = newpage
      this.getCommentData()
    },
    // 编辑评论
    showDialogCommentEditForm (row) {
      this.dialogCommentEditVisible = true
      this.$nextTick(async () => {
        this.$refs.editCommentForm.resetFields()
        this.editCommentForm.cmt_articleid = row.cmt_articleid
        this.editCommentForm.cmt_content = row.cmt_content
        this.editCommentForm.article_title = row.article_title
        this.editCommentForm.cmt_state = row.cmt_state
        this.editCommentForm.cmt_id = row.cmt_id
      })
    },
    editCommentSubmit () {
      this.$refs.editCommentForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editComment',
            qs.stringify(this.editCommentForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogCommentEditVisible = false
          this.getCommentData()
        }
      })
    },
    // 删除评论
    delComment (id) {
      this.$confirm('永久删除该条评论?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post(
            'delComment',
            qs.stringify({ id })
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.getCommentData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },

    // ---------------------------------------------焦点关注部分------------------------------------
    async getFocus () {
      const {data: {result}} = await this.$http.get('getFocus')
      result.forEach((item, i) => {
        item.article_file = '../../../static/' + item.article_file
      })
      this.focusList = result
    },
    toShowDetail (id) {
      this.$router.push({ path: '/showDetail', query: { id } })
    }
  },
  mounted () {
    this.getOwnData()
    this.getFocus()
  }
}
