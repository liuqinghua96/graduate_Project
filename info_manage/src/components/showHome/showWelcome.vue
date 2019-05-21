<template>
<div class="content">
  <div class="panel top">
    <h3>最新公告</h3>
    <ol>
      <li v-for="(item,i) in lastAnnounce" :key="i">
        <i>{{i+1}}</i>
        <span class="anc_title">【{{item.anc_title}}】</span>
        <span class="anc_content">{{item.anc_content}}</span>
        <span>{{item.anc_addtime}}</span>
      </li>
    </ol>
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
  <div class="panel hots">
    <h3>热门推荐</h3>
    <ul>
      <li v-for="(item,i) in hotRecommend" :key="i">
        <a @click="toShowDetail(item.article_id)">
          <img :src="item.article_file" alt="">
          <span>{{item.article_title}}</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="panel new">
    <h3>最新发布</h3>
    <div v-for="(item,i) in lastSubmitList" class="entry" :key="i">
      <div class="head">
        <span class="sort">{{item.cate_name}}</span>
        <a @click="toShowDetail(item.article_id)">{{item.article_title}}</a>
      </div>
      <div class="main">
        <p class="info">{{item.user_nickname}} 发表于 {{item.article_addtime}}</p>
        <p class="brief">{{item.article_desc}}</p>
        <p class="extra">
          <span class="reading">阅读({{item.article_click}})</span>
          <span class="comment">评论({{item.article_cmt}})</span>
          <a class="like">
            <i class="fa fa-thumbs-up"></i>
            <span>赞({{item.article_good}})</span>
          </a>
          <a class="tags">
            分类：<span @click="toShowList(item.cate_id)">{{item.cate_name}}</span>
          </a>
        </p>
        <a class="thumb">
          <img :src="item.article_file" alt="">
        </a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Mixin from './ShowWelcome_Mixin'
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
</style>
