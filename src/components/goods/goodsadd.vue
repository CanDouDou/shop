<template>
  <el-card class="box-card">
    <cus-bread leave1="商品管理" leave2="商品列表" class="info"></cus-bread>
    <template>
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
      </el-alert>
    </template>
    <!-- 步骤条 -->
    <el-steps :active="active*1" finish-status="success" align-center class="step">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- 分页tab -->
    <el-form label-position="top" label-width="80px" :model="form" class="badeInfo">
      <el-tabs tab-position="left" v-model="active" @tab-click="tabclick">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联 -->
            <el-cascader expand-trigger="hover" clearable :options="options" v-model="selectedOptions2" @change="handleChange" :props="dafaultProps">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品参数  动态参数 -->
        <el-tab-pane label="商品参数" name="2">
          <el-form-item :label="item1.attr_name" v-for="(item1) in manydata" :key="item1.attr_id">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" true-label v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品属性  静态参数 -->
        <el-tab-pane label="商品属性" name="3">
          <el-form-item :label="item.attr_name" v-for="(item) in onlydata" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 商品图片 -->
        <el-tab-pane label="商品图片" name="4">
          <el-upload class="upload-demo" :action="action" :headers="headers" :on-success="handlePreview" :on-remove="handleRemove" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <el-button type="primary" plain @click="submitGoods">添加商品</el-button>
          <quill-editor class="editor" v-model="form.goods_introduce">

          </quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      options: [],
      dafaultProps: {
        value: 'cat_id',
        label: 'cat_name'
        // children: 'children'
      },
      // 级联三级id
      selectedOptions2: [],
      manydata: [],
      onlydata: [],
      // 图片上传数据
      action: 'http://localhost:8888/api/private/v1/upload',
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  created () {
    this.getcatalist()
  },
  methods: {
    // 点击tab触发事件
    async tabclick () {
      if (this.active === '2' || this.active === '3') {
        if (this.selectedOptions2.length !== 3) {
          this.$message.error('请选择商品的三级分类')
          return
        }
        // 点击tab2的时候获取动态参数
        if (this.active === '2') {
          const resmany = await this.$axios.get(
            `categories/${this.selectedOptions2[2]}/attributes?sel=many`
          )
          const { data: { meta: { status, msg }, data } } = resmany
          if (status === 200) {
            data.forEach(item => {
              item.attr_vals = item.attr_vals.split(',')
            })
            this.manydata = data
          } else {
            this.$message.error(msg)
          }
        } else {
          // 点击tab3的时候获取静态参数
          const resonly = await this.$axios.get(
            `categories/${this.selectedOptions2[2]}/attributes?sel=only`
          )
          const { data: { meta: { status, msg }, data } } = resonly
          if (status === 200) {
            this.onlydata = data
          } else {
            this.$message.error(msg)
          }
        }
      }
    },
    // 获取商品分类
    async getcatalist () {
      const res = await this.$axios.get(`categories`)
      const { data: { meta: { status, msg }, data } } = res
      if (status === 200) {
        this.options = data
      } else {
        this.$message.error(msg)
      }
    },
    //
    handleChange () {},
    // 删除图片
    handleRemove (file, fileList) {
      // console.log(file)
      this.pics = []
      fileList.forEach(item => {
        var obj = {}
        obj.pic = item.response.data.tmp_path
        this.pics.push(obj)
      })
    },
    // 上传图片
    handlePreview (response, file, filelist) {
      this.pics = []
      if (response.meta.status === 200) {
        filelist.forEach(item => {
          var obj = {}
          obj.pic = item.response.data.tmp_path
          this.pics.push(obj)
        })
        // console.log(filelist)
        this.$message.success('图片上传成功')
      }
    },
    // 添加商品
    async submitGoods () {
      this.attrs = [...this.manydata, ...this.onlydata]
      this.form.goods_cat = this.selectedOptions2.join(',')
      console.log(this.form)
      const res = await this.$axios.post(`goods`, this.form)
      const {data: {meta: {status, msg}}} = res
      if (status === 201) {
        this.$router.push({
          path: '/goods'
        })
        this.$message.success(msg)
      } else if (status === 400) {
        this.$message.error(msg)
      }
    }
  },
  // 富文本编辑器组件
  components: {
    quillEditor
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
.info {
  margin-bottom: 26px;
}
.step {
  margin-top: 15px;

  margin-bottom: 15px;
}
.el-step__title {
  font-size: 10px;
}
.badeInfo {
  height: 400px;
  overflow: auto;
}
.editor .ql-editor {
  height: 280px;
}
</style>
