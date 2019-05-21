<template>
  <div class="content">
    <div class="panel new">
      <h3>{{h3Text}}</h3>
      <div v-for="(item,i) in dataList"
           class="entry"
           :key="i">
        <div class="head">
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
              分类：<span>{{item.cate_name}}</span>
            </a>
          </p>
          <a class="thumb">
            <img :src="item.article_file"
                 alt="">
          </a>
        </div>
      </div>
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
import Mixin from './ShowList_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
</style>
