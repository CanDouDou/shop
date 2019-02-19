<template>
    <el-card class="box-card">
        <cus-bread leave1="商品管理" leave2="商品分类" class="info"></cus-bread>
        <el-button type="success" plain>成功按钮</el-button>
        <!-- 表格展示 -->
        <el-table :data="categories" style="width: 100%">
            <el-table-tree-column
            lable="分类名称"
            prop="">

            </el-table-tree-column>
            <el-table-column prop="date" label="级别" width="180">
            </el-table-column>
            <el-table-column prop="name" label="是否有效" width="180">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-row>
                        <el-col>
                            <el-button size="mini" circle plain type="primary" icon="el-icon-edit"></el-button>
                            <el-button size="mini" circle plain type="danger" icon="el-icon-delete"></el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页功能 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </el-card>
</template>

<script>
// var ElTreeGrid = require('element-tree-grid')
export default {
  data () {
    return {
      categories: [],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      }
    }
  },
  methods: {
    async getcate () {
      const res = await this.$axios.get('categories')
      const {data: {meta: {status, msg}}} = res
      if (status === 200) {

      } else {
        this.$message.error(msg)
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
.info {
  margin-bottom: 15px;
}
</style>
