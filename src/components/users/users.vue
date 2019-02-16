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
                <el-button type="success" plain @click="addUser">添加成员</el-button>
            </div>
        </el-row>
        <!-- 对话框  添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form label-position="right" :model="formdata" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formdata.username" :hide-required-asterisk="true"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formdata.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formdata.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formdata.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="sureUser">确 定</el-button>
            </div>
        </el-dialog>
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
            <el-table-column label="创建日期" width="200">
                <template slot-scope="scope">
                    {{scope.row.create_time | frmdate}}
                </template>
            </el-table-column>
            <el-table-column label="用户状态">
                <template slot-scope="scope">
                    <el-switch @change="handleSwitchChange(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="500">
                <template slot-scope="scope">
                    <el-row>
                        <el-col>
                            <el-button @click="editUserData(scope.row)" size="mini" circle plain type="primary" icon="el-icon-edit"></el-button>
                            <el-button @click="deleteUser(scope.row)" size="mini" circle plain type="danger" icon="el-icon-delete"></el-button>
                            <el-button @click="setRole(scope.row)" size="mini" circle plain type="success" icon="el-icon-check"></el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑对话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
            <el-form label-position="right" :model="formdata" label-width="80px" :rules="rules">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formdata.username" :hide-required-asterisk="true" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formdata.email"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="formdata.mobile"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                <el-button type="primary" @click="editUser">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="dialogFormVisibleSet">
          <el-form label-width="80">
            <el-form-item label="用户名">
              {{formdata.username}}
            </el-form-item>
            <el-form-item label="角色">
              <el-select v-model="selectVal" placeholder="请选择活动区域">
                <el-option label="请选择" :value="-1"></el-option>
                <el-option v-for="(item) in roles" :key="item.id" :label="item.roleName" :value="item.id">

                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleSet = false">取 消</el-button>
            <el-button type="primary" @click="setRoleSure">确 定</el-button>
          </div>
        </el-dialog>
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
      total: 1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSet: false,
      selectVal: -1,
      roles: [],
      formdata: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 搜索用户
    searchUser() {
      this.pagenum = 1;
      this.getUserList();
    },
    addUser() {
      this.dialogFormVisibleAdd = true;
      this.formdata = {};
    },
    // 添加用户
    async sureUser() {
      const sureRes = await this.$axios.post("users", this.formdata);
      const { data: { meta: { msg, status } } } = sureRes;
      if (status === 201) {
        this.$message({
          message: msg,
          type: "success"
        });
        this.dialogFormVisibleAdd = false;
        this.formdata = {};
        this.pagenum = 1;
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
    // 改变用户状态
    async handleSwitchChange(user) {
      const userStatus = await this.$axios.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      const { data: { meta: { msg, status } } } = userStatus;
      if (status === 200) {
        this.$message({
          message: msg,
          type: "success"
        });
      }
    },
    // 清空事件
    clearTable() {
      this.pagenum = 1;
      this.getUserList();
    },
    // 获取编辑用户数据
    async editUserData(user) {
      this.dialogFormVisibleEdit = true;
      const editRes = await this.$axios.get("users/" + user.id);
      this.formdata = user;
    },
    // 编辑用户
    async editUser() {
      this.dialogFormVisibleEdit = false;
      const edit = await this.$axios.put(
        "users/" + this.formdata.id,
        this.formdata
      );
      console.log(edit);
      const { data: { meta: { msg, status } } } = edit;
      console.log(status);
      if (status === 200) {
        this.$message({
          showClose: true,
          message: msg,
          type: "success"
        });
      } else if (status === 500) {
        this.$message({
          showClose: true,
          message: msg,
          type: "error"
        });
      }
      this.getUserList();
    },
    // 删除用户
    deleteUser(user) {
      this.$confirm("此操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const deleteRes = await this.$axios.delete(`users/${user.id}`);
          console.log(deleteRes);
          const { data: { meta: { msg, status } } } = deleteRes;
          if (status === 200) {
            this.pagenum = 1;
            this.getUserList();
            this.$message({
              type: "success",
              message: msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击分配按钮
    async setRole(user) {
      const roleRes = await this.$axios.get(`roles`);
      const { data: { data } } = roleRes;
      this.roles = data;
      this.dialogFormVisibleSet = true;
      this.formdata = user;
      const roleId = await this.$axios.get(`users/${user.id}`);
      const { data: { data: { rid } } } = roleId;
      this.selectVal = rid;
    },
    async setRoleSure() {
      const resRole = await this.$axios.put(`users/${this.formdata.id}/role`, {
        rid: this.selectVal
      });
      const { data: { meta: { msg, status } } } = resRole;
      if (status === 200) {
        this.dialogFormVisibleSet = false;
        this.$message.success(msg);
      }
    },
    // 获取数据
    async getUserList() {
      //   this.$axios.defaults.headers.common[
      //     'Authorization'
      //   ] = localStorage.getItem('token')
      let res = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const { data: { meta: { status } } } = res;
      if (status === 200) {
        const { data: { data: { total, users } } } = res;
        this.list = users;
        this.total = total;
      }
    },
    // 显示条数改变
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    // 当前页数改变
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
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
