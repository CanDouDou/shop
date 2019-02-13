<template>
    <div class="home-index">
        <!-- 布局容器整体 -->
        <el-container>
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
                        <a href="">退出</a>
                    </el-col>
            </el-row>
            </el-header>
            <!-- 主干 -->
            <el-container>
                <!-- 左侧边栏 -->
                <el-aside width="200px">Aside</el-aside>
                <!-- 右主体内容 -->
                <el-main>Main</el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
export default {}
</script>

<style>
body,html{
    height: 100%;
}
.home-index {
  height: 100%;
}
.index-nav {
  background: #b3c0d1
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
</style>
