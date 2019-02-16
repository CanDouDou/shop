<template>
    <el-card class="box-card">
        <!-- 面包屑导航 -->
        <cus-bread leave1="权限管理" leave2="权限列表"></cus-bread>
        <!-- 展示表格 -->
        <el-table :data="list" border style="width: 100%" stripe class="rights-table" show-header height="500">
            <el-table-column type="index" label="#" width="100">
            </el-table-column>
            <el-table-column prop="authName" label="权限名称" width="250">
            </el-table-column>
            <el-table-column prop="path" label="路径" width="200">
            </el-table-column>
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <span v-if="scope.row.level==='0'">一级</span>
                    <span v-if="scope.row.level==='1'">二级</span>
                    <span v-if="scope.row.level==='2'">三级</span>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.$axios.defaults.headers.common[
        'Authorization'
      ] = localStorage.getItem('token')
      const res = await this.$axios.get(`rights/list`)
      const { data: { meta: { msg, status } } } = res
      if (status === 200) {
        //   console.log(res.data.data)
        this.list = res.data.data
      } else {
        this.$message.warning(msg)
      }
      console.log(res)
    }
  }
}
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
.rights-table {
  margin-top: 20px;
}
</style>
