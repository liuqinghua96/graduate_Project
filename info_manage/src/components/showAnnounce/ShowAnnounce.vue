<template>
  <div class="content">
    <div class="panel top">
      <h3>全部公告</h3>
      <ol>
        <li v-for="(item,i) in announceList"
            :key="i">
          <i>{{i+1}}</i>
          <span class="anc_title">【{{item.anc_title}}】</span>
          <span class="anc_content">{{item.anc_content}}</span>
          <span>{{item.anc_addtime}}</span>
        </li>
      </ol>
    </div>
    <div class="panel hots">
      <h3>热门推荐</h3>
      <ul>
        <li v-for="(item,i) in hotRecommend"
            :key="i">
          <a @click="toShowDetail(item.article_id)">
            <img :src="item.article_file"
                 alt="">
            <span>{{item.article_title}}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Mixin from './showAnnounce_Mixin.js'
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
