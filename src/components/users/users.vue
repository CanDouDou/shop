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
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable @clear="clearTable()">
                    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
                </el-input>
                <el-button type="success" plain>添加成员</el-button>
            </div>

        </el-row>
        <!-- 表格展示 -->
        <el-table ref="singleTable" :data="list" highlight-current-row @current-change="handleCurrentChange" style="width: 100%" class="users-table">
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column prop="username" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="240">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="200">
            </el-table-column>
            <el-table-column label="创建日期" width="240">
                <template slot-scope="scope">
                    {{scope.row.create_time | frmdate}}
                </template>
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-row>
                        <el-button size="mini" circle plain type="primary" icon="el-icon-edit"></el-button>
                        <el-button size="mini" circle plain type="danger" icon="el-icon-delete"></el-button>
                        <el-button size="mini" circle plain type="success" icon="el-icon-check"></el-button>
                    </el-row>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页功能 -->
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      list: [],
      total: 1
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
      // 搜索用户
      searchUser() {
          this.pagenum = 1
          this.getUserList()
      },
      //清空事件
        clearTable() {
            this.pagenum = 1
            this.getUserList()
        },
    // 获取数据
    async getUserList() {
      this.$axios.defaults.headers.common[
        "Authorization"
      ] = localStorage.getItem("token");
      let res = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      const { data: { meta: { msg, status } } } = res;
      if (status === 200) {
        const { data: { data: { total, users } } } = res;
        this.list = users;
        this.total = total;
      } else {
        this.$message({
          message: msg,
          type: "warning"
        });
      }
    },
    // 显示条数改变
    handleSizeChange(val) {
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.pagenum = val
      this.getUserList()
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
.users-table {
    margin-top: 20px;
}
</style>
