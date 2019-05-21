<template>
  <div class="myown_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <h1 class="main_title">个人中心</h1>
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               style="width:600px"
               ref="editForm">
        <el-form-item label="邮箱"
                      prop="user_email">
          <el-input v-model="editForm.user_email"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称"
                      prop="user_nickname">
          <el-input v-model="editForm.user_nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="user_pwd">
          <el-input v-model="editForm.user_pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="user_tel">
          <el-input v-model="editForm.user_tel"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input v-model="editForm.user_sign"></el-input>
        </el-form-item>
        <div class="button-group">
          <el-button @click="resetForm()">重置</el-button>
          <el-button type="primary"
                     @click="editSubmit()">确 定</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  name: 'MyOwn',
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
      const { data } = await this.$http.get('getOnlyUser', { params: { id: 1 } })
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
</script>
<style scoped>
.el-card {
  padding: 30px;
}
.el-form {
  margin: 0 auto;
}
.el-form-item {
  margin: 26px;
}
.button-group {
  text-align: center;
}
.el-button {
  margin: 20px;
}
.main_title {
  margin: 0;
  font-size: 24px;
  font-weight: 400;
}
</style>
