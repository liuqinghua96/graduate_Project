import qs from 'qs'
export default {
  name: 'UserList',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      queryMsg: {
        query: '',
        pageNum: 1,
        pageSize: 5
      },
      // 用户数据列表条目数
      total: 0,
      userList: [],
      dialogAddVisible: false,
      addForm: {
        user_email: '',
        user_pwd: '',
        user_tel: '',
        user_nickname: ''
      },
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
      dialogEditVisible: false,
      editForm: {}
    }
  },
  methods: {
    // 查询指定用户
    search () {
      this.getData()
    },
    // 获取用户列表
    async getData () {
      let { data } = await this.$http.get('getUser', {
        params: this.queryMsg
      })
      if (data.code !== 200) return this.$message.error(data.message)
      data.result.forEach((value, i) => {
        if (value.user_state === 1) {
          value.user_state = true
        } else {
          value.user_state = false
        }
      })
      this.userList = data.result
      this.total = data.total
    },
    // 切换页码
    changePager (newpage) {
      this.queryMsg.pageNum = newpage
      this.getData()
    },
    // 显示添加新用户的弹框
    showDialogAddForm () {
      this.dialogAddVisible = true
      this.$nextTick(() => {
        this.$refs.addForm.resetFields()
      })
    },
    // 添加用户
    addSubmit () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'addUser',
            qs.stringify(this.addForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogAddVisible = false
          this.getData()
        }
      })
    },
    // 编辑用户
    showDialogEditForm (id) {
      this.dialogEditVisible = true
      this.$nextTick(async () => {
        this.$refs.editForm.resetFields()
        const {data} = await this.$http.get('getOnlyUser', {params: {id}})
        this.editForm = data.result[0]
      })
    },
    editSubmit () {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post(
            'editUser',
            qs.stringify(this.editForm)
          )
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.dialogEditVisible = false
          this.getData()
        }
      })
    },
    // 删除用户
    delUser (id) {
      this.$confirm('永久删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data } = await this.$http.post('delUser', qs.stringify({id}))
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    // 切换用户状态----->是否可用：1为可用(true)，2为禁用(false)
    changeState (row) {
      this.$confirm('确定修改该用户状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          if (row.user_state === true) {
            row.user_state = 1
          } else {
            row.user_state = 2
          }
          console.log(row)
          const { data } = await this.$http.post('modifyUser', qs.stringify({state: row.user_state, id: row.user_id}))
          if (data.code !== 200) return this.$message.error(data.message)
          this.$message.success(data.message)
          this.getData()
        })
        .catch(() => {
          this.$message.info('已取消修改')
          this.getData()
        })
    }
  },
  mounted () {
    this.getData()
  }
}
