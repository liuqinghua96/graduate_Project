import qs from 'qs'
export default {
  name: 'CommentList',
  data () {
    return {
      queryMsg: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 用户数据列表条目数
      total: 0,
      commentList: [],
      dialogEditVisible: false,
      editForm: {
        cmt_id: 0,
        cmt_state: 0,
        cmt_articleid: 1,
        article_title: '',
        cmt_content: ''
      },
      rules: {
        cmt_content: [
          { required: true, message: '内容不得为空', trigger: 'blur' }
        ],
        cmt_state: [
          { required: true, message: '发布状态不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查询指定评论
    search () {
      this.getData()
    },
    // 获取评论列表
    async getData () {
      let { data } = await this.$http.get('getComment', {
        params: this.queryMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.commentList = data.result
      this.total = data.total
    },
    // 切换页码
    changePager (newpage) {
      this.queryMsg.pageNum = newpage
      this.getData()
    },
    // 编辑评论
    showDialogEditForm (row) {
      this.dialogEditVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        this.editForm.cmt_articleid = row.cmt_articleid
        this.editForm.cmt_content = row.cmt_content
        this.editForm.article_title = row.article_title
        this.editForm.cmt_state = row.cmt_state
        this.editForm.cmt_id = row.cmt_id
      })
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editComment',
            qs.stringify(this.editForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogEditVisible = false
          this.getData()
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
