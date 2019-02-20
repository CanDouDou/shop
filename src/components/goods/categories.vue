<template>
  <el-card class="box-card">
    <cus-bread leave1="商品管理" leave2="商品分类" class="info"></cus-bread>
    <el-button type="success" plain @click="addCate">添加分类</el-button>
    <!-- 表格展示 -->
    <el-table :data="categories">
      <!-- 表格的分类展示 -->
      <el-tree-grid prop="cat_name" label="分类名称" treeKey="cat_id" parentKey="cat_pid" levelKey="cat_level" childKey="children" :indentSize="30">

      </el-tree-grid>
      <el-table-column label="级别" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-if="scope.row.cat_level === 1">二级</span>
          <span v-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">
          <span>
            {{scope.row.cat_deleted ? '无效' : '有效'}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-col>
              <el-button size="mini" circle plain type="primary" icon="el-icon-edit" @click="editCate(scope.row)"></el-button>
              <el-button size="mini" circle plain type="danger" icon="el-icon-delete" @click="deleteCate(scope.row)"></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!-- 对话框 编辑分类 -->
    <el-dialog title="分类名称" :visible.sync="dialogFormVisibleEdit">
      <el-form label-position="right">
        <el-form-item label="分类名称" label-width="80px">
          <el-input autocomplete="off" v-model="form.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="suerEdit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框 添加分类 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="right" :model="formCat">
        <el-form-item label="分类名称" label-width="80px">
          <el-input autocomplete="off" v-model="formCat.cat_name"></el-input>
        </el-form-item>
        <!-- 级联下拉框 -->
        <el-form-item label="分类" label-width="80px">{{selectedOptions2}}
          <el-cascader expand-trigger="hover" change-on-select clearable :options="options" v-model="selectedOptions2" @change="handleChange" :props="dafaultProps">
            </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid'
export default {
  data () {
    return {
      categories: [],
      defaultProps: {
        label: 'cat_name',
        children: 'children'
      },
      pagenum: 1,
      pagesize: 5,
      total: 1,
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd: false,
      form: {
        cat_name: ''
      },
      formCat: {
        cat_pid: -1,
        cat_name: '',
        cat_level: -1
      },
      options: [],
      selectedOptions2: [],
      dafaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  created () {
    this.getcate()
  },
  methods: {
    // 获取分类
    async getcate () {
      const res = await this.$axios.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      const { data: { meta: { status, msg }, data } } = res
      if (status === 200) {
        this.total = data.total
        this.categories = data.result
      } else {
        this.$message.error(msg)
      }
    },
    handleChange () {},
    // 修改分类名称
    editCate (user) {
      this.dialogFormVisibleEdit = true
      this.form = user

      console.log(user)
    },
    async suerEdit () {
      const res = await this.$axios.put(`categories/${this.form.cat_id}`, {
        cat_name: this.form.cat_name
      })
      const { data: { meta: { msg, status } } } = res
      if (status === 200) {
        this.getcate()
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
      this.dialogFormVisibleEdit = false
    },
    // 删除分类
    deleteCate (user) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.delete(`categories/${user.cat_id}`)
          const { data: { meta: { msg, status } } } = res
          if (status === 200) {
            this.$message({
              type: 'success',
              message: msg
            })
          } else {
            this.$message({
              type: 'error',
              message: msg
            })
          }
          this.getcate()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 添加分类(按钮点击)
    async addCate () {
      this.formCat.cat_name = ''
      this.selectedOptions2 = []
      this.dialogFormVisibleAdd = true
      const res = await this.$axios.get(`categories?type=2`)
      const { data: { meta: { status, msg }, data } } = res
      if (status === 200) {
        this.options = data
      } else {
        this.$message.error(msg)
      }
    },
    async sureAdd () {
      // 添加一级类
      if (this.selectedOptions2.length === 0) {
        this.formCat.cat_pid = 0
        this.formCat.cat_level = 0
        const res1 = await this.$axios.post(`categories`, this.formCat)
        const {data: {meta: {status, msg}}} = res1
        if (status === 201) {
          this.dialogFormVisibleAdd = false
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      } else if (this.selectedOptions2.length === 1) {
        this.formCat.cat_pid = this.selectedOptions2[0]
        this.formCat.cat_level = 1
        const res2 = await this.$axios.post(`categories`, this.formCat)
        const {data: {meta: {status, msg}}} = res2
        if (status === 201) {
          this.dialogFormVisibleAdd = false
          this.$message.success(msg)
        } else {
          this.$message.errror(msg)
        }
      } else {
        this.formCat.cat_pid = this.selectedOptions2[1]
        this.formCat.cat_level = 2
        const res3 = await this.$axios.post(`categories`, this.formCat)
        const {data: {meta: {status, msg}}} = res3
        if (status === 201) {
          this.dialogFormVisibleAdd = false
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      }
      this.getcate()
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getcate()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getcate()
    }
  },
  components: {
    ElTreeGrid
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
  overflow: auto;
}
.info {
  margin-bottom: 15px;
}
/* .el-cascader-menu__item.is-active {
  color: black;
} */
</style>
