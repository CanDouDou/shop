<template>
  <el-card class="box-card">
    <cus-bread leave1="商品管理" leave2="分类参数" class="cus-bread"></cus-bread>
    <el-alert title="注意:只允许为第三级分类设置参数" type="warning" show-icon class="cus-bread">
    </el-alert>
    <!-- 级联 -->
    <el-row class="params">
      <el-col>
        <span>请选择商品分类</span>
        <el-cascader :show-all-levels="false" clearable expand-trigger="hover" :options="options" v-model="selectedOptions2" :props="defaultProps" @change="handleChange">
        </el-cascader>{{selectedOptions2}}
      </el-col>
    </el-row>
    <!-- tab参数设置 -->
    <el-tabs v-model="activeName" @tab-click="tabChange">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="primary" size="mini" :disabled="many">设置动态参数</el-button>
        <el-table :data="formMany" style="width: 100%" height="400">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i" closable :disable-transitions="false" @close="handleClose(scope.row,i)">
                {{item}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="#" type="index">
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">
        <el-button type="primary" size="mini" :disabled="only">设置静态参数</el-button>
        <!-- 静态参数表格 -->
        <el-table ref="singleTable" :data="formOnly" highlight-current-row style="width: 100%;" height="400">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180">
          </el-table-column>
          <el-table-column prop="attr_vals" label="属性值" width="180">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button plain size="mini" icon="el-icon-edit"></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      many: true,
      formMany: [],
      only: true,
      formOnly: [],
      activeName: 'first',
      options: [],
      selectedOptions2: [],
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.getOption()
  },
  methods: {
    // 获取级联options
    async getOption () {
      const res = await this.$axios.get(`categories`)
      const { data: { meta: { status, msg }, data } } = res
      if (status === 200) {
        this.options = data
      } else {
        console.log(msg)
      }
    },
    tabChange () {
      if (this.selectedOptions2.length !== 3) {
        this.$message.warning('请选择三级分类')
      }
    },
    // 级联框有内容时
    async handleChange () {
      if (this.selectedOptions2.length !== 3) {
        this.only = true
        this.many = true
        this.formOnly = []
        return
      }
      this.many = false
      this.only = false
      // 获取静态参数
      const res = await this.$axios.get(
        `categories/${this.selectedOptions2[2]}/attributes?sel=only`
      )
      const { data: { meta: { msg, status }, data } } = res
      if (status === 200) {
        this.formOnly = data
      } else {
        console.log(msg)
      }
      // 获取动态参数
      const res2 = await this.$axios.get(
        `categories/${this.selectedOptions2[2]}/attributes?sel=many`
      )
      const {
        data: { meta: { msg: msg2, status: status2 }, data: result }
      } = res2
      if (status2 === 200) {
        result.forEach(item => {
          item.attr_vals = item.attr_vals.trim().split(',')
        })
        this.formMany = result
      } else {
        console.log(msg2)
      }
    },
    // 关闭标签tag
    async handleClose (cat, i) {
      cat.attr_vals.splice(i, 1)
      const catEdit = {
        attr_sel: cat.attr_sel,
        attr_name: cat.attr_name,
        attr_vals: cat.attr_vals.join(',')
      }
      const res = await this.$axios.put(
        `categories/${cat.cat_id}/attributes/${cat.attr_id}`,
        catEdit
      )
      const { data: { meta: { status, msg } } } = res
      if (status === 200) {
        this.$message({
          message: msg,
          type: 'success'
        })
      } else {
        this.$message({
          message: msg,
          type: 'error'
        })
      }
    },
    // 添加标签
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    async handleInputConfirm (attr) {
      // let inputValue = this.inputValue
      if (this.inputValue) {
        attr.attr_vals.push(this.inputValue)
        const attrEdit = {
          attr_sel: attr.attr_sel,
          attr_name: attr.attr_name,
          attr_vals: attr.attr_vals.join(',')
        }
        const res = await this.$axios.put(`categories/${attr.cat_id}/attributes/${attr.attr_id}`, attrEdit)
        const {data: {meta: {msg, status}}} = res
        if (status === 200) {
          this.$message.success(msg)
        } else {
          this.$message.error(msg)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
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
.cus-bread {
  margin-bottom: 20px;
}
.params {
  vertical-align: middle;
  line-height: 40px;
  font-size: 14px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
