<template>
  <div class="showOwn_container content">
    <div class="panel">
      <h3>个人中心</h3>
      <el-tabs tab-position="left" style="height: 400px;marginTop:20px;" @tab-click="tabClick">
        <el-tab-pane label="个人信息" ref="ownInfo">
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
                        @click="editOwnInfoSubmit()" class="OwnBtn" size="small">确 定</el-button>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="我的文章" ref="ownArticle">
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
                                content="详情"
                                placement="top"
                                round>
                      <el-button size="mini"
                                icon="el-icon-more"
                                round
                                @click="toDetail(scope.row.article_id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="删除"
                                placement="top"
                                round>
                      <el-button size="mini"
                                icon="el-icon-delete"
                                @click="delOwnArticle(scope.row.article_id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="编辑"
                                placement="top">
                      <el-button size="mini"
                                icon="el-icon-edit"
                                round
                                @click="toEditOwnArticle(scope.row.article_id)"></el-button>
                    </el-tooltip>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
            <el-row>
              <!-- 分页 -->
              <el-pagination background
                            :page-size="queryArticleMsg.pageSize"
                            :current-page="queryArticleMsg.pageNum"
                            layout="prev, pager, next"
                            :total="articleTotal"
                            @current-change="changeOwnArticlePager">
              </el-pagination>
              <!-- 添加文章 -->
              <el-button type="primary"
                          @click="toAddOwnArticle()"
                          class="addArticleBtn"
                          style="margin:20px 50px;">添加文章</el-button>
            </el-row>
          </div>
          <!-- 编辑文章弹出层 -->
          <el-dialog width="900px"
                    title="编辑文章"
                    :visible.sync="dialogArticleEditVisible">
            <quill-editor v-model="editArticleForm.article_text"
                          style="height:350px; marginBottom:40px;">
            </quill-editor>
            <div class="btnGroup editBtn">
              <el-button type="primary" plain class="formBtn" @click="submitEditArticle('草稿')">保存草稿</el-button>
              <el-button type="success" plain class="formBtn" @click="submitEditArticle('已发布')">重新发布</el-button>
            </div>
          </el-dialog>
          <!-- 添加文章弹出层 -->
          <el-dialog width="80%"
                    title="添加文章"
                    :visible.sync="dialogArticleAddVisible">
            <el-form label-position="right"
                    label-width="80px"
                    :model="addArticleInfo"
                    :rules="rules2"
                    ref="addArticleInfo">
              <el-form-item label="所属栏目" prop="article_cateid">
                <el-select v-model="addArticleInfo.article_cateid"
                          placeholder="请选择">
                  <el-option v-for="(item,i) in cateOptions"
                            :key="i"
                            :label="item.cate_name"
                            :value="item.cate_id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标题" prop="article_title">
                <el-input v-model="addArticleInfo.article_title"></el-input>
              </el-form-item>
              <el-form-item label="摘要" prop="article_desc">
                <el-input v-model="addArticleInfo.article_desc"></el-input>
              </el-form-item>
              <el-form-item label="文章内容" prop="article_text">
                <quill-editor v-model="addArticleInfo.article_text"
                              style="height:255px; marginBottom:40px;">
                </quill-editor>
              </el-form-item>
            </el-form>
            <div class="btnGroup">
              <el-button type="primary"
                        plain
                        class="formBtn"
                        @click="submitAddArticle('草稿')">保存草稿</el-button>
              <el-button type="success"
                        plain
                        class="formBtn"
                        @click="submitAddArticle('已发布')">发布文章</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="我的评论" ref="ownComment">
          <div class="myAnnounce_content">
            <!-- 评论列表 -->
            <el-table :data="commentList"
                      stripe
                      style="width: 100%">
              <el-table-column type="index"
                              width="50">
              </el-table-column>
              <el-table-column prop="article_title"
                              label="文章标题"
                              width="300">
              </el-table-column>
              <el-table-column prop="cmt_content"
                              label="评论内容"
                              width="200">
              </el-table-column>
              <el-table-column label="评论状态"
                              width="100">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.cmt_state === 0"
                            type="success"
                            size="mini">已发布</el-tag>
                    <el-tag v-else
                            type="danger"
                            size="mini">草稿</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-tooltip class="item"
                                effect="dark"
                                content="删除"
                                placement="top">
                      <el-button size="mini"
                                icon="el-icon-delete"
                                round
                                @click="delComment(scope.row.cmt_id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item"
                                effect="dark"
                                content="编辑"
                                placement="top">
                      <el-button size="mini"
                                icon="el-icon-edit"
                                round
                                @click="showDialogCommentEditForm(scope.row)"></el-button>
                    </el-tooltip>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background
                          :page-size="queryCommentMsg.pageSize"
                          :current-page="queryCommentMsg.pageNum"
                          layout="prev, pager, next"
                          :total="commentTotal"
                          @current-change="changeCommentPager">
            </el-pagination>
          </div>
          <!-- 编辑评论弹出层 -->
          <el-dialog width="500px"
                    title="编辑评论"
                    :visible.sync="dialogCommentEditVisible">
            <el-form :model="editCommentForm"
                    label-width="80px"
                    autocomplete="off"
                    :rules="rules_cmt"
                    ref="editCommentForm">
              <el-form-item label="文章标题"
                            prop="article_title">
                <el-input v-model="editCommentForm.article_title"
                          disabled></el-input>
              </el-form-item>
              <el-form-item label="评论内容"
                            prop="cmt_content">
                <el-input v-model="editCommentForm.cmt_content"></el-input>
              </el-form-item>
              <el-form-item label="发布状态"
                            prop="cmt_state">
                <el-select v-model="editCommentForm.cmt_state"
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
              <el-button @click="dialogCommnetEditVisible = false">取 消</el-button>
              <el-button type="primary"
                        @click="editCommentSubmit()">确 定</el-button>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="panel focus">
      <h3>焦点关注</h3>
      <ul>
        <li v-for="(item,i) in focusList" :class="i===0?'large':''" :key="i">
          <a @click="toShowDetail(item.article_id)">
            <img :src="item.article_file" alt="">
            <span>{{item.article_title}}</span>
          </a>
        </li>
      </ul>
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
.btnGroup.editBtn {
  margin-top: 80px;
}
.el-button.formBtn {
  margin-right: 20px;
  margin-top: 35px;
}
.el-button.formBtn:first-child {
  margin-left: 100px;
}
</style>
