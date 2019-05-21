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
              <el-button @click="resetForm()" class="OwnBtn" size="small">重置</el-button>
              <el-button type="primary"
                        @click="editSubmit()" class="OwnBtn" size="small">确 定</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的文章">
          <div class="myArticle_content">
            <!-- 文章列表 -->
            <el-table :data="articleList"
                      stripe
                      style="width: 100%"
                      ref="articleTable">
              <el-table-column type="index"
                              width="40">
              </el-table-column>
              <el-table-column prop="article_title"
                              label="标题"
                              width="300">
              </el-table-column>
              <el-table-column label="状态"
                              width="150">
                <template slot-scope="scope">
                  <el-tag v-if="scope.row.article_state === '已发布'"
                          type="success">已发布</el-tag>
                  <el-tag v-else
                          type="danger">草稿</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="cate_name"
                              label="所属类别"
                              width="120">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-tooltip class="item"
                                effect="dark"
                                content="文章详情"
                                placement="top"
                                round>
                      <el-button size="mini"
                                icon="el-icon-more"
                                round
                                @click="toDetail(scope.row.article_id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="删除文章"
                                placement="top">
                      <el-button size="mini"
                                icon="el-icon-delete"
                                @click="delArticle(scope.row.article_id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="编辑文章"
                                placement="top">
                      <el-button size="mini"
                                icon="el-icon-edit"
                                round
                                @click="toEditArticle(scope.row.article_id)"></el-button>
                    </el-tooltip>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <!-- 分页 -->
              <el-pagination background
                            :page-size="queryMsg.pageSize"
                            :current-page="queryMsg.pageNum"
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="changeOwnPager">
              </el-pagination>
              <!-- 添加文章 -->
              <el-button type="primary"
                          @click="toAddArticle()"
                          class="addArticleBtn"
                          style="margin:20px 50px;">添加文章</el-button>
            </el-row>
          </div>
        </el-tab-pane>
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
.myArticle_content {
  margin-top: 50px;
}
.addArticleBtn {
  margin-left: 30px;
}
</style>
