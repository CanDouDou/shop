<template>
    <el-card class="box-card">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框 -->
        <el-row>
            <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain>添加成员</el-button>
            </div>

        </el-row>
        <!-- 表格展示 -->
        <el-table ref="singleTable" :data="list" highlight-current-row @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column property="date" label="姓名" width="120">
            </el-table-column>
            <el-table-column property="name" label="邮箱" width="200">
            </el-table-column>
            <el-table-column property="address" label="电话">
            </el-table-column>
            <el-table-column property="address" label="创建日期">
            </el-table-column>
            <el-table-column property="address" label="用户状态">
            </el-table-column>
            <el-table-column property="address" label="操作">
            </el-table-column>

        </el-table>
        <!-- 分页功能 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: "",
      pagesize: "",
      list: [],
      total: 1
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  height: 100%;
}
.input-with-select {
  width: 400px;
}
</style>
