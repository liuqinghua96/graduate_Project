<template>
  <div class="register_container">
    <h1>基于Vue信息资讯展示与管理平台</h1>
    <div class="register_box">
      <img src="../../assets/images/logo.png"
           alt="">
      <el-form ref="form"
               :model="form"
               :rules="rules">
        <el-form-item prop="email">
          <el-input v-model="form.email"
                    placeholder="邮箱"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="form.nickname"
                    placeholder="昵称"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="form.phone"
                    placeholder="手机号"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password"
                    placeholder="密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input v-model="form.repassword"
                    placeholder="确认密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn_group">
          <el-button type="danger"
                     plain
                     @click="register()">注册</el-button>
          <el-button type="primary"
                     plain
                     @click="reback()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Login',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6 || value.length > 18) {
        callback(new Error('密码长度在6-18位之间'))
      } else {
        if (this.form.repassword !== '') {
          this.$refs.form.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: '',
        repassword: '',
        nickname: '',
        phone: ''
      },
      rules: {
        email: [
          { required: true, message: '邮箱不得为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不得为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不得为空', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reback () {
      return this.$router.push('/login')
    },
    register () {
      // 提交信息前进行表单填充内容的格式验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 请求服务器端register接口
          const { data } = await this.$http.post('register', qs.stringify(this.form))
          // 如果服务器端返回的状态码不是200（不成功），提示错误信息
          if (data.code !== 200) return this.$message.error({ message: data.message, duration: 1000 })
          // 注册成功，提示注册成功，并跳转至URL地址'/login'
          this.$message.success({ message: data.message, duration: 1000 })
          return this.$router.push('/login')
        }
      })
    }
  }
}
</script>
<style scoped>
.register_container {
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(45deg, #35495e, #41b883);
  overflow: hidden;
}
h1 {
  text-align: center;
  margin: 6% 0;
  color: #fff;
  font-family: arial, 'mricosoft yahei';
}
.register_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 600px;
  height: 450px;
  background: linear-gradient(45deg, #d2ecf1, #efefef);
  box-shadow: 0 0 16px #fff;
  border-radius: 8px;
  padding: 0 20px;
  box-sizing: border-box;
}
.register_box img {
  display: block;
  margin: 20px auto;
  width: 80px;
}
.register_box .btn_group {
  text-align: center;
}
.register_box .btn_group button {
  margin: 10px 30px;
  font-size: 14px;
}
</style>
