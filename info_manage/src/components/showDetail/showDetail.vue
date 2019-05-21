<template>
  <div class="content">
    <div class="panel top">
      <div class="article">
        <div class="breadcrumb">
          <dl>
            <dt>当前位置：</dt>
            <dd><a @click="toShowList(articleInfo.cate_id)">{{articleInfo.cate_name}}</a></dd>
            <dd>{{articleInfo.article_title}}</dd>
          </dl>
        </div>
        <h2 class="title">
          <a href="javascript:;">{{articleInfo.article_title}}</a>
        </h2>
        <div class="meta">
          <span>{{articleInfo.user_nickname}} 发布于 {{articleInfo.article_addtime}}</span>
          <span>分类: <a @click="toShowList(articleInfo.cate_id)">{{articleInfo.cate_name}}</a></span>
          <span>阅读: ({{articleInfo.article_click}})</span>
          <span>评论: ({{articleInfo.article_cmt}})</span>
        </div>
        <div class="article_cnt"
             id="content">
        </div>
      </div>
    </div>
    <div class="panel">
      <h3>文章评论</h3>
      <ul v-if="commentList.length !== 0">
        <li v-for="(item,i) in commentList" :key="i" class="cmt_part">
          <img :src="item.user_pic" class="ownPic">
          <div class="ps">
            <p class="cmt_user">{{item.user_nickname}}评论说：</p>
            <p class="cmt_text">{{item.cmt_content}}</p>
            <p class="cmt_addtime">评论日期：{{item.cmt_addtime}}</p>
          </div>
        </li>
      </ul>
      <div v-else class="replace">暂无评论，快来发表吧~~~~~</div>
    </div>
    <div class="panel">
      <h3>我的评论</h3>
      <el-form label-position="top"
               label-width="80px"
               :model="form"
               :rules="rules"
               ref="form">
        <!-- 文本域 -->
        <el-form-item prop="textarea">
          <el-input type="textarea"
                    :rows="2"
                    :autosize="{ minRows: 6, maxRows: 10}"
                    style="marginTop:20px"
                    placeholder="请输入评论内容......"
                    v-model="form.textarea">
          </el-input>
        </el-form-item>
        <!-- 提交按钮 -->
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" plain class="formBtn" @click="submitArticle_Cmt(1)">保存草稿</el-button>
        <el-button type="success" plain class="formBtn" @click="submitArticle_Cmt(0)">提交评论</el-button>
      </div>
    </div>
    <div class="panel top">
      <h3>一周热门排行</h3>
      <ol>
        <li v-for="(item,i) in weekHotList" :key="i">
          <i>{{i+1}}</i>
          <a @click="toShowDetail(item.article_id)">{{item.article_title}}</a>
          <span>赞({{item.article_good}})</span>
          <span>阅读 ({{item.article_click}})</span>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
import Mixin from './ShowDetail_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
.article_cnt {
  margin-top: 20px;
}
.el-button {
  margin-right: 20px;
}
.cmt_part {
  margin-bottom: 80px;
  position: relative;
}
.cmt_part:first-child {
  margin-top: 20px;
}
.cmt_part:last-child {
  margin-bottom: 20px;
}
.ownPic {
  position: absolute;
  width: 70px;
  height: 70px;
  display: block;
}
.ps {
  padding: 0 70px;
}
.ps p {
  margin: 0 30px 20px;
}
.ps p:first-child {
  font-size: 14px;
  font-weight: 700;
}
.ps p:nth-child(2) {
  font-size: 18px;
}
.ps p:last-child {
  font-size: 12px;
}
.replace {
  font-size: 20px;
  text-align: center;
  margin: 50px;
}
</style>
