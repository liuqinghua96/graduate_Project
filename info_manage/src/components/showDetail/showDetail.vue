<template>
<div class="content">
  <div class="article">
    <div class="breadcrumb">
      <dl>
        <dt>当前位置：</dt>
        <dd><a href="javascript:;">奇趣事</a></dd>
        <dd>变废为宝！将手机旧电池变为充电宝的Better RE移动电源</dd>
      </dl>
    </div>
    <h2 class="title">
      <a href="javascript:;">又现酒窝夹笔盖新技能 城里人是不让人活了！</a>
    </h2>
    <div class="meta">
      <span>DUX主题小秘 发布于 2015-06-29</span>
      <span>分类: <a href="javascript:;">奇趣事</a></span>
      <span>阅读: (2421)</span>
      <span>评论: (143)</span>
    </div>
  </div>
  <div class="panel hots">
    <h3>热门推荐</h3>
    <ul>
      <li v-for="(item,i) in hotRecommend" :key="i">
        <router-link to="/showDetail">
          <img :src="item.article_file" alt="">
          <span>{{item.article_title}}</span>
        </router-link>
      </li>
    </ul>
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

</style>
