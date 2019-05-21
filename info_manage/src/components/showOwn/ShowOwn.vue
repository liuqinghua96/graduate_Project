<template>
  <div class="showOwn_container content">
    <div class="panel">
      <h3>个人中心</h3>
      <el-tabs tab-position="left" style="height: 550px;marginTop:20px;">
        <el-tab-pane label="个人信息">
          <el-form :model="editForm"
                  label-width="80px"
                  autocomplete="off"
                  :rules="rules"
                  style="width:600px;marginTop:50px;"
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
                          prop="user_pwd"
                          type="password">
              <el-input v-model="editForm.user_pwd"></el-input>
            </el-form-item>
            <el-form-item label="手机号"
                          prop="user_tel">
              <el-input v-model="editForm.user_tel"></el-input>
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="editForm.user_sign"></el-input>
            </el-form-item>
            <div class="button-group">
              <el-button @click="resetForm()" class="OwnBtn" size="small">重置</el-button>
              <el-button type="primary"
                        @click="editSubmit()" class="OwnBtn" size="small">确 定</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的文章">我的文章</el-tab-pane>
        <el-tab-pane label="我的评论">我的评论</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Mixin from './showOwn_Mixin.js'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
.content .top span.anc_title {
  float: none;
  font-weight: 700;
}
.content .top span.anc_content {
  float: none;
}
.button-group {
  text-align: center;
}
.button-group .OwnBtn {
  margin: 20px 30px;
}
</style>
