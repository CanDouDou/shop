<template>
    <el-card class="box-card">
        <!-- 面包屑 -->
        <cus-bread leave1="数据统计" leave2="数据报表"></cus-bread>
        <!-- 列表展示 -->
        <div id="main" style="width: 800px;height:500px;"></div>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      option: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    table () {},
    // 获取图表信息
    async getData () {
      const res = await this.$axios.get(`reports/type/1`)
      const { data: { meta: { status, msg } } } = res
      if (status === 200) {
        const optionEcharts = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          }
        }
        this.option = { ...res.data.data, ...optionEcharts }
      } else {
        this.$message.error(msg)
      }
      console.log(res)
      var myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption(this.option)
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
</style>
