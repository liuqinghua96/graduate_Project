import qs from 'qs'
export default {
  name: 'AnnounceList',
  data () {
    return {
      queryMsg: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 用户数据列表条目数
      total: 0,
      announceList: [],
      dialogAddVisible: false,
      addForm: {
        anc_state: 0,
        anc_content: '',
        anc_title: ''
      },
      dialogEditVisible: false,
      editForm: {
        anc_id: 0,
        anc_state: 0,
        anc_content: '',
        anc_title: ''
      },
      rules: {
        anc_title: [
          { required: true, message: '标题不得为空', trigger: 'blur' }
        ],
        anc_content: [
          { required: true, message: '内容不得为空', trigger: 'blur' }
        ],
        anc_state: [
          { required: true, message: '发布状态不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 查询指定公告
    search () {
      this.getData()
    },
    // 获取公告列表
    async getData () {
      let { data } = await this.$http.get('getAnnounce', {
        params: this.queryMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      this.announceList = data.result
      this.total = data.total
    },
    // 切换页码
    changePager (newpage) {
      this.queryMsg.pageNum = newpage
      this.getData()
    },
    // 显示添加新公告的弹框
    showDialogAddForm () {
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加公告
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'addAnnounce',
            qs.stringify(this.addForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogAddVisible = false
          this.getData()
        }
      })
    },
    showDialogEditForm (row) {
      this.dialogEditVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        this.editForm.anc_title = row.anc_title
        this.editForm.anc_content = row.anc_content
        this.editForm.anc_state = row.anc_state
        this.editForm.anc_id = row.anc_id
      })
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editAnnounce',
            qs.stringify(this.editForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogEditVisible = false
          this.getData()
        }
      })
    },
    // 删除公告
    delAnnounce (id) {
      this.$confirm('永久删除该条公告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post(
            'delAnnounce',
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
