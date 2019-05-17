<template>
  <div class="commentlist_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
      <el-breadcrumb-item>评论列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="根据文章名称检索"
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
      </el-row>
      <!-- 评论列表 -->
      <el-table :data="commentList"
                stripe
                style="width: 100%">
        <el-table-column type="index"
                         width="100">
        </el-table-column>
        <el-table-column prop="article_title"
                         label="文章标题"
                         width="400">
        </el-table-column>
        <el-table-column prop="cmt_content"
                         label="评论内容"
                         width="200">
        </el-table-column>
        <el-table-column prop="user_email"
                         label="发布者"
                         width="150">
        </el-table-column>
        <el-table-column prop="cmt_addtime"
                         label="评论时间"
                         width="150">
        </el-table-column>
        <el-table-column label="评论状态"
                         width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cmt_state === 0"
                    type="success">已发布</el-tag>
            <el-tag v-else
                    type="danger">草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item"
                        effect="dark"
                        content="删除评论"
                        placement="top">
              <el-button size="mini"
                         icon="el-icon-delete"
                         round
                         @click="delComment(scope.row.cmt_id)"></el-button>
            </el-tooltip>
            <el-tooltip v-if="scope.row.user_state === 0"
                        class="item"
                        effect="dark"
                        content="编辑评论"
                        placement="top">
              <el-button size="mini"
                         icon="el-icon-edit"
                         round
                         @click="showDialogEditForm(scope.row)"></el-button>
            </el-tooltip>
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
    <!-- 编辑评论弹出层 -->
    <el-dialog width="500px"
               title="编辑评论"
               :visible.sync="dialogEditVisible">
      <el-form :model="editForm"
               label-width="80px"
               autocomplete="off"
               :rules="rules"
               ref="editForm">
        <el-form-item label="文章标题"
                      prop="article_title">
          <el-input v-model="editForm.article_title"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="评论内容"
                      prop="cmt_content">
          <el-input v-model="editForm.cmt_content"></el-input>
        </el-form-item>
        <el-form-item label="发布状态"
                      prop="cmt_state">
          <el-select v-model="editForm.cmt_state"
                     placeholder="请选择">
            <el-option key="0"
                       label="发布"
                       :value="0">
            </el-option>
            <el-option key="1"
                       label="草稿"
                       :value="1">
            </el-option>
          </el-select>
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
import Mixin from './CommentList_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
