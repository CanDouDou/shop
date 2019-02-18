<template>
    <el-card class="box-card">
        <!-- 面包屑导航 -->
        <cus-bread leave1="订单管理" leave2="订单列表" class="info"></cus-bread>
        <!-- 表格展示 -->
        <el-table :data="goodlist" border style="width: 100%;height:620px;overflow:auto;" :stripe="true">
            <el-table-column type="index" label="#" width="60">
            </el-table-column>
            <el-table-column prop="order_number" label="订单编号" width="300">
            </el-table-column>
            <el-table-column prop="order_price" label="订单价格">
            </el-table-column>
            <el-table-column label="是否付款">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.pay_status === '0'">未付款</el-tag>
                    <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货">
            </el-table-column>
            <el-table-column label="下单时间">
                <template slot-scope="scope">
                    {{scope.row.update_time | frmdate}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button type="primary" icon="el-icon-edit" :plain="true" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </el-card>
</template>

<script>
export default {
  data() {
    return {
      goodlist: [],
      pagenum: 1,
      pagesize: 10,
      total: 10,
      consignee_addr:''
    }
  },
  created() {
    this.getgoods()
  },
  methods: {
    async getgoods() {
      const res = await this.$axios.get(
        `orders?pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      )
      const { data: { meta: { status, msg } } } = res
      if (status === 200) {
        const { data } = res.data
        this.total = data.total
        this.goodlist = data.goods
        // console.log(res)
      } else {
        this.$message.error(msg)
      }
    },
    // pagesize改变
    handleSizeChange(val) {
        this.pagesize = val
      this.pagenum = 1
      this.getgoods()
    },
    // pagenum改变
    handleCurrentChange(val) {
      this.pagenum = val
      this.getgoods()
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
