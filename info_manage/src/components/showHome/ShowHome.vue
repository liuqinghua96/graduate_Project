<template>
<div class="wrapper">
  <div class="header">
    <h1 class="logo"><router-link to="/showWelcome"><img class="logo_pic" src="../../../static/logo.png" alt=""></router-link></h1>
    <ul class="nav">
      <li v-for="item in cateList" :key="item.cate_id">
        <a @click="toShowList(item.cate_id)">
        <!-- <router-link to="/showList/{{item.cate_id}}"> -->
          <i :class="['fa', `${item.cate_icon}`]"></i>{{item.cate_name}}
        <!-- </router-link> -->
        </a>
      </li>
    </ul>
    <div class="search">
      <form>
        <input type="text" class="keys" placeholder="输入文章关键字">
        <input type="submit" class="btn" value="搜索">
      </form>
    </div>
  </div>
  <div class="aside">
    <div class="widgets">
      <el-button class="btn" type="success" round icon="el-icon-setting" @click="toOwnCenter()">个人中心</el-button>
      <el-button class="btn" type="primary" round @click="toAnnounceList()">公告</el-button>
      <el-button class="btn" type="danger" round @click="logout()">退出</el-button>
    </div>
    <div class="widgets">
      <h4>随机推荐</h4>
      <ul class="body random">
        <li v-for="item in randCommend" :key="item.article_id">
          <a @click="toShowDetail(item.article_id)">
            <p class="title">{{item.article_title}}</p>
            <p class="reading">阅读({{item.article_click}})</p>
            <div class="pic">
              <img :src="item.article_file" alt="">
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="widgets">
      <h4>最新评论</h4>
      <ul class="body discuz">
        <li v-for="item in lastComment" :key="item.cmt_id">
          <a href="javascript:;">
            <div class="avatar">
              <img :src="item.user_pic" alt="">
            </div>
            <div class="txt">
              <p>
                <span>{{item.user_nickname}}</span>({{item.cmt_addtime}})评论文章【{{item.article_title}}】说:
              </p>
              <p>{{item.cmt_content}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <!-- 子组件显示位置 -->
  <router-view></router-view>
  <div class="footer">
    <p>© 2016 XIU主题演示 本站主题由 themebetter 提供</p>
  </div>
</div>
</template>
<script>
import Mixin from './ShowHome_Mixin'
export default {
  mixins: [Mixin]
}
</script>
<style scoped>
/* .el-button.btn {
  margin: 0 20px;
} */
</style>
