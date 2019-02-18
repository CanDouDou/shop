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
                <el-aside width="202px" class="aside">
                    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true" :router="true">
                        <el-submenu :index="item.id+''" v-for="(item) in menus" :key="item.order">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span @click="holdMenus">{{item.authName}}</span>
                            </template>
                            <el-menu-item :index="item2.path+''" v-for="(item2,i) in item.children" :key="i">
                                <i class="el-icon-menu"></i>
                                {{item2.authName}}
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
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.getSide()
    this.holdMenus()
  },
  methods: {
    // 获取侧边栏数据
    async getSide () {
      const res = await this.$axios.get(`menus`)
      const {meta: {status}} = res.data
      if (status === 200) {
        const {data} = res.data
        this.menus = data
      }
      console.log(this.menus)
    },
    // 退出账户
    exit () {
      localStorage.clear()
      this.$router.push({
        path: '/login'
      })
      this.$message({
        message: '退出成功',
        type: 'success'
      })
    },
    async holdMenus () {
      //   let data = await this.$axios.get('menus')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
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
