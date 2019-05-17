<template>
  <div class="welcome_container">
    <h1 class="welcome">欢迎来到基于Vue信息资讯展示与管理平台管理员系统</h1>
    <img src="../../../static/welcome.jpg" alt="" class="welcome_pic">
  </div>
</template>
<script>
export default {
  name: 'Welcome'
}
</script>
<style scoped>
.welcome_container {
  width: 100%;
  height: 100%;
  position: relative;
}
.welcome {
  position: absolute;
  top: 64%;
  left: 8%;
  font-size: 30px;
}
.welcome_pic {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
