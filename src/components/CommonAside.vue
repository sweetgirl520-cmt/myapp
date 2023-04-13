<template>
    <!-- el-menu使用vue-router的模式，以index进行路由跳转，当前激活菜单:default-active="$route.path"，
    这样就会默认以当前路由路径高亮菜单选项，解决刷新等情况的高亮问题 -->
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h4>{{isCollapse ? "后台":"通用后台管理系统"}}</h4>
    <el-menu-item  @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.path">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChilren" :key="item.label" :index="item.path">
      <template slot="title">
        <i class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group  v-for="subItem in item.children" :key="subItem.name">    
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu> 
</template>

<script>
import Cookie from 'js-cookie';

export default {
  data() {
    return {
      // menuData:[
      //   {
      //     path: '/',
      //     name: 'home',
      //     label: '首页',
      //     icon: 's-home',
      //     url: 'Home/Home'
      //   },
      //   {
      //     path: '/mall',
      //     name: 'mall',
      //     label: '商品管理',
      //     icon: 'video-play',
      //     url: 'MallManage/MallManage'
      //   },
      //   {
      //     path: '/user',
      //     name: 'user',
      //     label: '用户管理',
      //     icon: 'user',
      //     url: 'UserManage/UserManage'
      //   },
      //   {
      //     path: '/other',
      //     name: 'other',
      //     label: '其他',
      //     icon: 'location',
      //     children: [
      //       {
      //         path: '/other/page1',
      //         name: 'page1',
      //         label: '页面1',
      //         icon: 'setting',
      //         url: 'Other/PageOne'
      //       },
      //       {
      //         path: '/other/page2',
      //         name: 'page2',
      //         label: '页面2',
      //         icon: 'setting',
      //         url: 'Other/PageTwo'
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单
    clickMenu(item){
      // 当页面的路由与跳转的路由不一致才允许跳转
      if((this.$route.path != item.path) && !(this.$route.path === "/home" && item.path === "/")){
        this.$router.push(item.path)
      }
      //为tags数组添加点击了的菜单
      this.$store.commit('tag/selectMenu',item)
    },
  },
  computed:{
      noChildren(){
          return this.menuData.filter(item => !item.children)
      },
      hasChilren(){
          return this.menuData.filter(item => item.children)
      },
      isCollapse(){
        return this.$store.state.tab.isCollapse
      },
      menuData(){
        return JSON.parse(Cookie.get("menu")) || this.$store.state.menu.menu
      }
  }
};
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100vh;
    border-right: none;
    h4{
      color: white;
      text-align: center;
      line-height: 48px;
      font-style: 16px;
      font-weight: 400;
    }
  }
</style>