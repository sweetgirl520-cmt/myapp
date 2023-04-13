<template>
  <div class="header-container">
    <div class="l-content">
      <el-button @click="isOpen" icon="el-icon-menu" size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
          <!--很明显 首页 一定是存在的 所以这里直接写死-->
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item 
            v-for="breadItem in $route.matched.slice(1)" 
            :key="breadItem.path" 
            v-show="breadItem.meta.title !== '首页'">{{breadItem.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      
    </div>
    <div class="r-content">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.png">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie"
export default {
  name: "Header",
  methods:{
    isOpen(){
      this.$store.commit('tab/isOpen')
    },
    handleCommand(command){
      if(command === "exit"){
        Cookie.remove("token")
        Cookie.remove("menu")
        this.$router.push("/login")
      }
    }
  },
};
</script>

<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
  .user{
      width: 40px;
      height: 40px;
      border-radius: 50%;
  }
  .l-content{
    display: flex;
    align-items: center;
    .el-button{
      margin-right: 20px;
    }
    /deep/.el-breadcrumb__inner{
      color: white;
    }
  }
}

</style>