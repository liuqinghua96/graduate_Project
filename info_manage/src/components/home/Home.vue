<template>
  <el-container class="home_container">
    <el-header class="home_header">
      <el-button icon="iconfont icon-menu"
                 style="background:#fff;border:#fff"
                 @click="toggleMenu()"
                 circle></el-button>
      <span class="title"
            style="color:#fff">基于Vue信息资讯展示与管理平台</span>
      <el-button class="btn"
                 type="danger"
                 @click="logout()"
                 round>退出</el-button>
      <el-button class="btn"
                 type="success"
                 round
                 icon="el-icon-setting"
                 @click="toMyOwn()">个人中心</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse?'65px':'200px'"
                class="home_aside">
        <el-menu :collapse="collapse"
                 :collapse-transition="false"
                 background-color="#354c5f"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :unique-opened="true"
                 style="border: 0;width: 100%"
                 :default-active="'./'+$route.name"
                 router
                 ref="navMenu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-star-off"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/userList">
                <i class="el-icon-menu"></i>
                <span>用户列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articleList">
                <i class="el-icon-menu"></i>
                <span>文章列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>评论管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/commentList">
                <i class="el-icon-menu"></i>
                <span>评论列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>公告管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/announceList">
                <i class="el-icon-menu"></i>
                <span>公告列表</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="home_main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    toMyOwn () {
      this.$router.push('/myown')
    }
  }
}
</script>
<style scoped>
.home_container {
  height: 100%;
  width: 100%;
}
.home_header {
  background: #396d6a;
  line-height: 60px;
}
.home_header .title {
  color: #ccc;
  font-size: 18px;
  padding-left: 16px;
}
.home_header .btn {
  float: right;
  margin-top: 14px;
  margin-right: 10px;
}
.home_aside {
  background: #354c5f;
  height: auto;
}
.home_main {
  background: #fff;
  position: relative;
  width: 100%;
  height: auto;
}
</style>
