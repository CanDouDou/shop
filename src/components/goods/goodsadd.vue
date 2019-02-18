<template>
    <el-card class="box-card">
        <cus-bread leave1="商品管理" leave2="商品列表" class="info"></cus-bread>
        <template>
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false">
            </el-alert>
        </template>
        <!-- 步骤条 -->
        <el-steps :active="0" finish-status="success" align-center class="step">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
        </el-steps>
        <!-- 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="left">
            <el-tab-pane label="基本信息" name="first">
                <el-form label-position="top" :model="formgoods" class="badeInfo">
                    <el-form-item label="商品名称">
                        <el-input v-model="formgoods.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格">
                        <el-input v-model="formgoods.region"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量">
                        <el-input v-model="formgoods.type"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量">
                        <el-input v-model="formgoods.type"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">

                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="second">
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="third">

            </el-tab-pane>
            <el-tab-pane label="商品图片" name="fourth">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="five">定时任务补偿</el-tab-pane>
        </el-tabs>
    </el-card>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first',
      formgoods: [],
      fileList2: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    // 删除已上传的图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
</style>
