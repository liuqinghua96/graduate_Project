<template>
  <div class="articlelist_container">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="根据文章标题检索"
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
        <!-- 添加文章 -->
        <el-col :span="18">
          <el-button type="primary"
                     @click="toAddArticle()"
                     plain>添加文章</el-button>
        </el-col>
      </el-row>
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
                         width="240">
        </el-table-column>
        <el-table-column prop="article_desc"
                         label="摘要"
                         width="440">
        </el-table-column>
        <el-table-column label="状态"
                         width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.article_state === '已发布'"
                    type="success">已发布</el-tag>
            <el-tag v-else
                    type="danger">草稿</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="user_email"
                         label="发布者"
                         width="160">
        </el-table-column>
        <el-table-column prop="cate_name"
                         label="所属类别"
                         width="100">
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
                           round
                           @click="delArticle(scope.row.article_id)"></el-button>
              </el-tooltip>
              <el-tooltip v-if="scope.row.user_state === 0"
                        class="item"
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
      <!-- 分页 -->
      <el-pagination background
                     :page-size="queryMsg.pageSize"
                     :current-page="queryMsg.pageNum"
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="changePager">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
import Mixin from './ArticleList_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
