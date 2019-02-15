<template>
    <div class="home-index">
        <!-- 布局容器整体 -->
        <el-container class="container">
            <!-- 头部 -->
            <el-header class="index-nav">
                <el-row>
                    <el-col :span="5">
                        <img src="../assets/logo.png" alt="">
                    </el-col>
                    <el-col :span="18">
                        <h2>电商后台管理系统</h2>
                    </el-col>
                    <el-col :span="1">
                        <a href="#" @click.prevent="exit">退出</a>
                    </el-col>
                </el-row>
            </el-header>
            <!-- 主干 -->
            <el-container class="main">
                <!-- 左侧边栏 -->
                <el-aside width="200px" class="aside">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" unique-opened="true" :router="true">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">用户管理</span>
                            </template>
                            <el-menu-item index="users">
                                <i class="el-icon-menu"></i>
                                用户列表
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">权限管理</span>
                            </template>
                            <el-menu-item index="2-1">
                                <i class="el-icon-menu"></i>
                                角色列表
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <i class="el-icon-menu"></i>
                                权限列表
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">商品管理</span>
                            </template>
                            <el-menu-item index="3-1">
                                <i class="el-icon-menu"></i>
                                商品列表
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <i class="el-icon-menu"></i>
                                分类参数
                            </el-menu-item>
                            <el-menu-item index="3-3">
                                <i class="el-icon-menu"></i>
                                商品分类
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">订单管理</span>
                            </template>
                            <el-menu-item index="4-1">
                                <i class="el-icon-menu"></i>
                                订单列表
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">数据统计</span>
                            </template>
                            <el-menu-item index="5-1">
                                <i class="el-icon-menu"></i>
                                数据报表
                            </el-menu-item>
                            <el-menu-item index="4-2">
                                <i class="el-icon-menu"></i>
                                权限列表
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!-- 右主体内容 -->
                <el-main class="main-right">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
export default {
  data() {
    return {
      mens: []
    };
  },
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({
        path: "/login"
      });
    }
  },
  created() {
    this.holdMenus();
  },
  methods: {
    // 退出账户
    exit() {
      localStorage.clear();
      this.$router.push({
        path: "/login"
      });
      this.$message({
        message: "退出成功",
        type: "success"
      });
    },
    async holdMenus() {
      let data = await this.$axios.get("menus");
      console.log(data);
      //   this.$axios.get('menus').then(res => {
      // console.log(res)
      //   })
    },
    handleOpen(key, keyPath) {
      //   console.log(this.list)
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style>
.index-nav {
  background: #b3c0d1;
}
.index-nav h2 {
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.index-nav a {
  text-align: center;
  line-height: 60px;
  text-decoration: none;
}
.index-nav img {
  vertical-align: middle;
  line-height: 68px;
}
.main-right {
  /* height: 100%; */
  background-color: #e9eef3;
}
.aside {
  border-right: 2px solid #e6e6e6;
}
.aside ul,
.aside li {
  border-right: none;
}
.container,
.aside,
.main,
body,
html,
.home-index {
  height: 100%;
}
</style>
