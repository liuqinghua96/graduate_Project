<template>
  <div class="login_container">
    <h1>基于Vue信息资讯展示与管理平台</h1>
    <div class="login_box">
      <img src="../../assets/images/logo.png"
           alt="">
      <el-form ref="form"
               :model="form"
               :rules="rules">
        <el-form-item prop="email">
          <el-input prefix-icon="iconfont icon-user-fill"
                    v-model="form.email"
                    placeholder="邮箱"
                    type="text"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont icon-eye-slash"
                    v-model="form.password"
                    placeholder="密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item class="btn_group">
          <el-button type="danger"
                     plain
                     @click="checkLogin()">登录</el-button>
          <el-button type="primary"
                     plain
                     @click="register()">注册</el-button>
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
    return {
      form: {
        email: 'cyj@ali.com',
        password: '123123'
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      return this.$router.push('/register')
    },
    checkLogin () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { data } = await this.$http.post('checkLogin', qs.stringify(this.form))
          // 查询不到用户信息
          if (data.code !== 200) return this.$message.error({ message: data.message, duration: 1000 })
          // 普通用户账号已被禁用
          if (data.result[0].user_state === 2) {
            return this.$message.warning({ message: '对不起，您的账号已被禁用', duration: 1000 })
          }
          // 普通用户登录成功跳转至前台首页
          this.$message.success({ message: data.message, duration: 1000 })
          sessionStorage.setItem('token', data.result[0].user_id)
          if (data.result[0].user_state === 1) {
            return this.$router.push('/showWelcome')
          }
          // 管理员用户登录成功跳转至后台欢迎界面
          if (data.result[0].user_state === 0) {
            return this.$router.push('/welcome')
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.login_container {
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
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  background: linear-gradient(45deg, #d2ecf1, #efefef);
  box-shadow: 0 0 16px #fff;
  border-radius: 8px;
  padding: 0 20px;
  box-sizing: border-box;
}
.login_box img {
  display: block;
  margin: 20px auto;
  width: 80px;
}
.login_box .btn_group {
  text-align: center;
}
.login_box .btn_group button {
  margin: 10px 30px;
  font-size: 14px;
}
</style>
