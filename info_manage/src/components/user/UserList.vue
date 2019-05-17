<template>
  <div class="userlist_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="根据用户邮箱检索"
                type="warning"
                show-icon>
      </el-alert>
      <el-row :gutter="20">
        <!-- 搜索框 -->
        <el-col :span="6">
          <el-input v-model="queryMsg.query"
                    placeholder="请输入内容"
                    class="input-with-select">
            <el-button slot="append"
                       @click="search()"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="18">
          <el-button type="primary"
                     @click="showDialogAddForm()"
                     plain>添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="userList"
                stripe
                style="width: 100%">
        <el-table-column type="index"
                         width="50">
        </el-table-column>
        <el-table-column prop="user_email"
                         label="邮箱"
                         width="180">
        </el-table-column>
        <el-table-column prop="user_nickname"
                         label="昵称"
                         width="120">
        </el-table-column>
        <el-table-column prop="user_gender"
                         label="性别"
                         width="80">
        </el-table-column>
        <el-table-column prop="user_age"
                         label="年龄"
                         width="80">
        </el-table-column>
        <el-table-column prop="user_tel"
                         label="电话"
                         width="150">
        </el-table-column>
        <el-table-column prop="user_sign"
                         label="签名"
                         width="320">
        </el-table-column>
        <el-table-column label="是否可用"
                         width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.user_state"
                       @change="changeState(scope.row)"
                       active-color="#13ce66"
                       inactive-color="#ccc">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item"
                          effect="dark"
                          content="编辑用户"
                          placement="top">
                <el-button size="mini"
                           icon="el-icon-edit"
                           round
                           @click="showDialogEditForm(scope.row.user_id)"></el-button>
              </el-tooltip>
              <el-tooltip class="item"
                          effect="dark"
                          content="删除用户"
                          placement="top">
                <el-button size="mini"
                           icon="el-icon-delete"
                           round
                           @click="delUser(scope.row.user_id)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination background
                     :page-size="queryMsg.pageSize"
                     :current-page="queryMsg.pageNum"
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="changePager">
      </el-pagination>
    </el-card>
    <!-- 添加用户弹出层 -->
    <el-dialog width="500px"
               title="添加用户"
               :visible.sync="dialogAddVisible">
      <el-form :model="addForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="addForm">
        <el-form-item label="邮箱"
                      prop="user_email">
          <el-input v-model="addForm.user_email"></el-input>
        </el-form-item>
        <el-form-item label="昵称"
                      prop="user_nickname">
          <el-input v-model="addForm.user_nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="user_pwd"
                      type="password">
          <el-input v-model="addForm.user_pwd"></el-input>
        </el-form-item>
        <el-form-item label="手机号"
                      prop="user_tel">
          <el-input v-model="addForm.user_tel"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户弹出层 -->
    <el-dialog width="500px"
               title="编辑用户"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="邮箱"
                      prop="user_email">
          <el-input v-model="editForm.user_email"></el-input>
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
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Mixin from './UserList_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
