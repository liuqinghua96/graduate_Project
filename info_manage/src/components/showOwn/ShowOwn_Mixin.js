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
      }
    }
  },
  methods: {
    async getData () {
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
    }
  },
  mounted () {
    this.getData()
  }
}
