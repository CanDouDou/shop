<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{leave1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{leave2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'cusBread',
  props: ['leave1', 'leave2']
}
</script>

<style>
</style>
