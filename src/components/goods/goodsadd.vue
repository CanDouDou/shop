<template>
    <el-card class="box-card">
        <cus-bread leave1="商品管理" leave2="商品列表" class="info"></cus-bread>
        <template>
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
            </el-alert>
        </template>
        <!-- 步骤条 -->
        <el-steps :active="0" finish-status="success" align-center class="step">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
    </el-card>
</template>

<script>
export default {}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 100%;
  height: 100%;
}
.info {
  margin-bottom: 26px;
}
.step{
    margin-top: 15px;
}
</style>
