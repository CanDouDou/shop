<template>
    <el-card class="box-card">
        <cus-bread leave1="商品管理" leave2="商品列表"></cus-bread>
        <!-- 搜索框 -->
        <el-row>
            <div style="margin-top: 15px;margin-bottom: 15px;">
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select" clearable>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button type="success" plain @click="goodsAdd">添加商品</el-button>
            </div>
        </el-row>
        <!-- 表格展示 -->
        <el-table :data="goodsList" height="578" border style="width: 100%">
            <el-table-column type="index" label="#" width="80">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）" width="180">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="180">
            </el-table-column>
            <el-table-column label="创建日期" width="180">
                <template slot-scope="scope">
                    {{scope.row.upd_time | frmdate}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template>
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
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 10,
      goodsList: [],
      total: 100
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取商品数据
    async getGoodsList () {
      const res = await this.$axios.get(`goods/?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: {meta: {status}}} = res
      if (status === 200) {
        const {data: {data: {goods, total}}} = res
        this.goodsList = goods
        this.total = total
      }
    },
    // 添加商品
    goodsAdd () {
      this.$router.push({path: '/goodsadd'})
    },
    // 显示条数改变
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getGoodsList()
    },
    // 当前页数改变
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoodsList()
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
  width: 100%;
  height: 100%;
}
.input-with-select {
  width: 400px;
}
</style>
