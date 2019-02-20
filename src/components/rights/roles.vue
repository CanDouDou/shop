<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <cus-bread leave1="权限管理" leave2="角色列表" class="role-cus"></cus-bread>
    <el-button>添加角色</el-button>
    <!-- 表格展示 -->
    <el-table :data="list" style="width: 100%" class="role-table">
      <!-- 权限展示 -->
      <el-table-column type="expand" max-height="500">
        <template slot-scope="scope">
          <!-- 一级权限 -->
          <el-row v-for="(item,index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <el-tag :disable-transitions="false" closable @close="closeBlue(scope.row, scope.row.children ,item,)">{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级权限 -->
              <el-row v-for="(item2,index2) in item.children" :key="index2">
                <el-col :span="4">
                  <el-tag closable type="success" :disable-transitions="false" @close="closeBlue(scope.row, item.children, item2)">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag :disable-transitions="false" v-for="(item3,index3) in item2.children" :key="index3" closable @close="closeBlue(scope.row, item2.children, item3)" type="warning">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            未分配权限
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" type="index" width="80">
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="260">
      </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc" width="260">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col>
              <el-button size="mini" circle plain type="primary" icon="el-icon-edit"></el-button>
              <el-button size="mini" circle plain type="danger" icon="el-icon-delete"></el-button>
              <el-button @click="openRight(scope.row)" size="mini" circle plain type="success" icon="el-icon-check"></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限对话框 -->
    <el-dialog title="分配权限" :visible.sync="dialogVisibleRight">
      <el-tree :data="listRights" ref="tree" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="idList" :props="defaultProps">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="sureRight()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      dialogVisibleRight: false,
      listRights: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      roleID: '',
      idList: []
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    // 获取角色数据
    async getRolesList () {
      const res = await this.$axios.get(`roles`)
      const { data: { meta: { status } } } = res
      // console.log(res.data.data)
      if (status === 200) {
        const { data: { data } } = res
        this.list = data
        // console.log(this.list)
      }
    },
    // 树状权限展示（对话框）
    async openRight (user) {
      this.roleID = user.id
      let arrayID = []
      // console.log(user.children.length)
      // 一级权限个数  len1
      for (var i = 0, len1 = user.children.length; i < len1; i++) {
        let obj = user.children[i]
        // 二级权限个数
        for (var j = 0, len2 = obj.children.length; j < len2; j++) {
          let obj2 = obj.children[j]
          for (var k = 0, len3 = obj2.children.length; k < len3; k++) {
            arrayID.push(obj2.children[k].id)
          }
        }
      }
      // console.log(arrayID)
      this.idList = arrayID
      this.dialogVisibleRight = true
      const res = await this.$axios.get(`rights/tree`)
      const {data: {meta: {status, msg}, data}} = res
      if (status === 200) {
        this.listRights = data
        // console.log(data)
      } else {
        this.$message.errordf(msg)
      }
    },
    // 授权
    async sureRight () {
      const check = this.$refs.tree.getCheckedKeys()
      const checkall = this.$refs.tree.getHalfCheckedKeys()
      const array = [...check, ...checkall]
      const res = await this.$axios.post(`roles/${this.roleID}/rights`, {rids: array.join(',')})
      const {meta: {msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      } else if (status === 400) {
        this.$message.error(msg)
      }
      this.getRolesList()
      this.dialogVisibleRight = false
    },

    // 限删除事件
    async closeBlue (role, array, item) {
      // e = event | window.event
      // console.log(e)
      const res = await this.$axios.delete(`roles/${role.id}/rights/${item.id}`)
      const {data: {meta: {msg, status}}} = res
      if (status === 200) {
        array.splice(array.indexOf(item), 1)
        // const { data: { data } } = res
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.role-cus {
  margin-bottom: 20px;
}
.box-card {
  height: 100%;
  overflow: auto;
}
</style>
